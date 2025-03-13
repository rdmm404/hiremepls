from src.common.base_repository import BaseRepository
from src.applications.models import Application


class ApplicationRepository(BaseRepository):
    def create_application(self, application: Application) -> Application:
        self.session.add(application)
        self.session.commit()
        self.session.refresh(application)
        return application
