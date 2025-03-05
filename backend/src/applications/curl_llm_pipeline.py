#  type: ignore
import zendriver as zd
import asyncio

from pathlib import Path
from curl_cffi import requests
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from rich import print
from bs4 import BeautifulSoup

from schema import JobDescription


async def load_content(path: Path, url: str):
    try:
        with path.open() as f:
            content = f.read()
    except Exception:
        html = await get_html_with_cffi(url)

        if requires_javascript(html):
            print("JS is required, using zendriver")
            soup = BeautifulSoup(html, features="lxml")
            content = await get_html_with_zendriver(url, soup.get_text(separator=" "))
        with path.open("w") as f:
            f.write(content)

    return content


async def get_html_with_cffi(url: str) -> str | None:
    async with requests.AsyncSession() as s:
        resp = await s.get(url)

    return resp.text


async def get_html_with_zendriver(url: str, og_content: str) -> str:
    browser = await zd.start(headless=True)
    page = await browser.get(url)

    while True:
        html = await page.get_content()
        soup = BeautifulSoup(html, features="lxml")
        content = soup.get_text(separator=" ")
        if content != og_content:
            break

    return content


def requires_javascript(html: str) -> bool:
    js_indicators = [
        "window.onload",
        "document.addEventListener",
        "DOMContentLoaded",
        "noscript",
        "enable JavaScript",
        "JavaScript is required",
    ]

    for indicator in js_indicators:
        if indicator in html:
            return True

    return False


html_file = Path("/tmp/application.txt")
# jd_url = "https://jane.app/careers/dd49af0b-ee59-494c-91d1-ad947ea1b2e4/apply?source=LinkedIn"
jd_url = "https://app.careerpuck.com/job-board/lyft/job/7882790002?gh_jid=7882790002"


async def main():
    content = await load_content(html_file, jd_url)

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.5)

    system_prompt = """
    You will receive a text representing a job description. Your job is to read this
    and turn it into a structured JSON output following the provided schema. Be
    accurate and refrain from adding any details that are not present.

    If the input doesn't have enough information for generating a job description, just fill
    everything with null values, and set the parsed value to false.

    Make sure to extract and include salary information under the 'compensation' field only.
    DO NOT ADD SALARY INFORMATION IN ANY OTHER FIELD.

    Ensure that salary details appear only in the 'compensation' field.

    Please make sure to include all the information possible. Especially referring to the job
    requirements. This is very important as it will serve as a reference for the future.
    """.strip()

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{application}"),
        ],
    )

    chain = prompt | llm.with_structured_output(JobDescription)
    result = chain.invoke({"application": content})

    print(result)


if __name__ == "__main__":
    asyncio.run(main())