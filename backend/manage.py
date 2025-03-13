#!/usr/bin/env python3
import argparse
import inspect
import os

from typing import Callable
from src.users.repository import UserRepository
from src.users.models import UserCreate


def create_admin() -> None:
    user = os.getenv("ADMIN_USER", "admin@example.com")
    passwd = os.getenv("ADMIN_PASSWORD", "password")

    user_repo = UserRepository()
    user_model = UserCreate(
        name="Admin", last_name="Admin", email=user, is_superuser=True, password=passwd
    )
    if not user_repo.get_user_by_email(user):
        user_repo.create_user(user_model)


def get_commands() -> dict[str, Callable[[], None]]:
    commands: dict[str, Callable[[], None]] = {}
    for name, obj in globals().items():
        if (
            inspect.isfunction(obj)
            and not name.startswith("_")
            and name not in {"main", "get_commands"}
        ):
            commands[name] = obj
    return commands


def main() -> None:
    commands = get_commands()
    parser = argparse.ArgumentParser(
        description="Invoke one of the predefined functions in the module."
    )
    parser.add_argument(
        "function_name",
        type=str,
        choices=list(commands.keys()),
        help="Name of the function to call. Available functions: " + ", ".join(commands.keys()),
    )
    args: argparse.Namespace = parser.parse_args()

    func = commands[args.function_name]
    func()


if __name__ == "__main__":
    main()
