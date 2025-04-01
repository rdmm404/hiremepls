from pydantic import HttpUrl
from slugify import slugify


def generate_slug(text: str) -> str:
    return slugify(text)


def clean_url(value: HttpUrl) -> HttpUrl:
    port = ""
    if value.port:
        port = f":{value.port}"
    url = f"{value.scheme}://{value.host}{port}{value.path}"
    return HttpUrl(url)
