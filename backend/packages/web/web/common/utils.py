from pydantic import HttpUrl


def clean_url(value: HttpUrl) -> HttpUrl:
    port = ""
    if value.port:
        port = f":{value.port}"
    url = f"{value.scheme}://{value.host}{port}{value.path}"
    return HttpUrl(url)
