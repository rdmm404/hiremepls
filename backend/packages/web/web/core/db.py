from sqlmodel import Session, create_engine, SQLModel
from typing import Generator

from web.core.config import settings, Settings


def get_connection_string(settings: Settings) -> str:
    return (
        f"postgresql+psycopg://"
        f"{settings.DATABASE_USER}:{settings.DATABASE_PASSWORD}@"
        f"{settings.DATABASE_HOST}:{settings.DATABASE_PORT}"
        f"/{settings.DATABASE_DB}"
    )


engine = create_engine(
    get_connection_string(settings),
    echo=settings.ENVIRONMENT == "dev",
)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


def init_db() -> None:
    SQLModel.metadata.create_all(engine)
    # user = session.exec(select(User).where(User.email == settings.FIRST_SUPERUSER)).first()
    # if not user:
    #     user_in = UserCreate(
    #         email=settings.FIRST_SUPERUSER,
    #         password=settings.FIRST_SUPERUSER_PASSWORD,
    #         is_superuser=True,
    #     )
    #     user = crud.create_user(session=session, user_create=user_in)
