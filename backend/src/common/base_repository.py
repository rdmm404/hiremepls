from typing import Self
from sqlmodel import Session

from src.core.db import engine


class BaseRepository:
    def __init__(self) -> None:
        self.session: Session = Session(engine)

    def __enter__(self) -> Self:
        return self

    def __exit__(self, *_) -> None:
        self.session.close()
