from sqlmodel import select, func, col
from collections.abc import Sequence
from datetime import datetime, timedelta, UTC
from typing import TypedDict

from lib.repository.base import BaseRepository
from lib.model import Application, ApplicationStatus


class ApplicationAverages(TypedDict):
    daily: float
    weekly: float
    monthly: float


class ApplicationRepository(BaseRepository):
    def create_application(self, application: Application) -> Application:
        self.session.add(application)
        self.session.commit()
        self.session.refresh(application)
        return application

    def get_application_by_id_and_user(
        self, application_id: int, user_id: int
    ) -> Application | None:
        query = select(Application).where(
            Application.id == application_id and Application.user_id == user_id
        )
        return self.session.exec(query).first()

    def get_all_user_applications(
        self, user_id: int, limit: int, offset: int
    ) -> Sequence[Application]:
        query = (
            select(Application).where(Application.user_id == user_id).limit(limit).offset(offset)
        )
        return self.session.exec(query).all()

    def count_all_user_applications(self, user_id: int, include_pending: bool = True) -> int:
        where = []
        if not include_pending:
            where.append(col(Application.status) != ApplicationStatus.PENDING)

        query = select(func.count(col(Application.id))).where(
            Application.user_id == user_id, *where
        )
        return self.session.exec(query).one()

    def get_application_count_per_status(
        self, user_id: int, include_pending: bool = True
    ) -> dict[ApplicationStatus, int]:
        where = []
        if not include_pending:
            where.append(col(Application.status) != ApplicationStatus.PENDING)

        query = (
            select(Application.status, func.count())
            .where(Application.user_id == user_id, *where)
            .group_by(Application.status)
        )
        return {
            ApplicationStatus(status): count for status, count in self.session.exec(query).all()
        }

    def get_application_count_in_days(
        self, user_id: int, days: int, include_pending: bool = True
    ) -> int:
        where = []
        if not include_pending:
            where.append(col(Application.status) != ApplicationStatus.PENDING)

        cutoff_date = datetime.now(UTC) - timedelta(days=days)
        query = (
            select(func.count())
            .select_from(Application)
            .where(
                Application.user_id == user_id,
                col(Application.created_at) >= cutoff_date,
                *where,
            )
        )
        return self.session.exec(query).one()

    def get_active_applications_count(self, user_id: int) -> int:
        inactive_states = [
            ApplicationStatus.REJECTED,
            ApplicationStatus.HIRED,
            ApplicationStatus.OFFER_DECLINED,
            ApplicationStatus.GHOSTED,
            ApplicationStatus.POSITION_CLOSED,
            ApplicationStatus.PENDING,
        ]
        query = (
            select(func.count())
            .select_from(Application)
            .where(Application.user_id == user_id, col(Application.status).not_in(inactive_states))
        )
        return self.session.exec(query).one()

    def update_application(self, application: Application) -> Application:
        self.session.add(application)
        self.session.commit()
        self.session.refresh(application)
        return application

    def delete_application(self, application: Application) -> None:
        self.session.delete(application)
        self.session.commit()

    def get_days_since_first_application(
        self, user_id: int, include_pending: bool = True
    ) -> float | None:
        where = []
        if not include_pending:
            where.append(col(Application.status) != ApplicationStatus.PENDING)

        first_app_query = (
            select(Application)
            .where(Application.user_id == user_id, *where)
            .order_by(col(Application.created_at))
            .limit(1)
        )
        first_application = self.session.exec(first_app_query).first()

        if not first_application or not first_application.created_at:
            return None

        return (datetime.now() - first_application.created_at).days

    def get_application_averages(
        self, user_id: int, total_applications: int | None = None, include_pending: bool = True
    ) -> ApplicationAverages:
        total = (
            total_applications
            if total_applications is not None
            else self.count_all_user_applications(user_id, include_pending=include_pending)
        )
        if total == 0:
            return ApplicationAverages(daily=0.0, weekly=0.0, monthly=0.0)

        days = self.get_days_since_first_application(user_id, include_pending=include_pending)
        if days is None:
            return ApplicationAverages(daily=0.0, weekly=0.0, monthly=0.0)

        if days <= 0:
            # All applications were made today
            return ApplicationAverages(
                daily=float(total), weekly=float(total), monthly=float(total)
            )

        daily_avg = total / days
        weekly_avg = daily_avg * 7
        monthly_avg = daily_avg * 30

        return ApplicationAverages(daily=daily_avg, weekly=weekly_avg, monthly=monthly_avg)
