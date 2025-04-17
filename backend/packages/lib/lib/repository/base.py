from collections.abc import Sequence
from typing import Literal
from sqlmodel import Session


class BaseRepository:
    def __init__(self, session: Session) -> None:
        self.session = session


type OrderBy = Sequence[tuple[str, Literal["asc", "desc"]]]
