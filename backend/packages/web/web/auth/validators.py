import re


def validate_no_numbers(v: str) -> str:
    """
    Validates that a string contains no numbers.
    Raises ValueError if any digits are found.
    """
    if any(char.isdigit() for char in v):
        raise ValueError("Name must not contain any numbers")
    return v


def validate_password(password: str) -> str:
    """
    Validates a password against security requirements.
    Raises ValueError if password does not meet requirements.
    """
    # Check minimum length
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")

    # Check for uppercase letters
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")

    # Check for numbers
    if not re.search(r"\d", password):
        raise ValueError("Password must contain at least one number")

    # Check for special characters
    if not re.search(r"[!@#$%^&*()+=\-_,.?\":{}|<>\[\]/~`]", password):
        raise ValueError(
            'Password must contain at least one special character (!@#$%^&*()+=_-,.?":{}|<>[]~/`)'
        )

    return password
