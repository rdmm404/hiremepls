from sqlmodel import select

from src.common.base_repository import BaseRepository
from src.applications.models import Application


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
