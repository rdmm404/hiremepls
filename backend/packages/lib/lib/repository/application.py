from sqlmodel import select, func, col
from collections.abc import Sequence

from lib.repository.base import BaseRepository
from lib.model import Application


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

    def count_all_user_applications(self, user_id: int) -> int:
        query = select(func.count(col(Application.id))).where(Application.user_id == user_id)
        return self.session.exec(query).one()

    # TODO: This is the exacte same as create_application. maybe reuse some?
    def update_application(self, application: Application) -> Application:
        self.session.add(application)
        self.session.commit()
        self.session.refresh(application)
        return application
