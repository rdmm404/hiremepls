from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str
    last_name: str
    email: str
    is_superuser: bool = False
