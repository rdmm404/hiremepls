from sqlmodel import select, func, col, case, inspect, Session
from sqlalchemy.orm import joinedload
from collections.abc import Sequence
from datetime import datetime, timedelta, UTC
from typing import TypedDict

from lib.repository.base import BaseRepository, OrderBy
from lib.model.applications import Application, ApplicationStatus
from lib.status_flow import STATUS_ORDER


class ApplicationAverages(TypedDict):
    daily: float
    weekly: float
    monthly: float


class ApplicationRepository(BaseRepository):
    def __init__(self, session: Session) -> None:
        super().__init__(session)
        self.sortable_columns = inspect(Application).columns.keys()

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
        self,
        user_id: int,
        limit: int,
        offset: int,
        order_by: OrderBy | None = None,
    ) -> Sequence[Application]:
        query = (
            select(Application)
            .options(
                joinedload(Application.job, innerjoin=True),  # type: ignore
            )
            .where(Application.user_id == user_id)
        )
        order_by = order_by or []
        for column, order in order_by:
            if column not in self.sortable_columns:
                raise ValueError(f"Invalid column: {column}")

            if column == "status":
                # Create a CASE statement for status ordering based on STATUS_ORDER
                status_order_case = case(
                    *[(Application.status == status, i) for i, status in enumerate(STATUS_ORDER)],
                    else_=len(STATUS_ORDER),
                )
                query = query.order_by(
                    status_order_case.desc() if order == "desc" else status_order_case.asc()
                )
            else:
                # For other fields, use direct column ordering
                order_column = getattr(Application, column)
                query = query.order_by(
                    order_column.desc() if order == "desc" else order_column.asc()
                )

        query = query.limit(limit).offset(offset)
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
