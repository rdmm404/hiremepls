import zendriver as zd

from curl_cffi import requests
from bs4 import BeautifulSoup
from loguru import logger


class JobsFetcher:
    MAX_ATTEMPTS = 10

    async def get_page_contents(self, url: str) -> str:
        html = await self.get_html_with_cffi(url)

        content = self._get_text_from_html(html)

        if self._requires_javascript(html):
            logger.info(f"JS is required for {url}, using zendriver")
            content = await self.get_html_with_zendriver(url, content)

        return content

    async def get_html_with_cffi(self, url: str) -> str:
        async with requests.AsyncSession() as s:
            resp = await s.get(url)

        return resp.text

    async def get_html_with_zendriver(self, url: str, og_content: str) -> str:
        browser = await zd.start(headless=True)
        page = await browser.get(url)

        attempts = 0
        while attempts < self.MAX_ATTEMPTS:
            html = await page.get_content()
            content = self._get_text_from_html(html)
            if content != og_content:
                break
            await page.sleep(1)
            attempts += 1

        await page.close()
        await browser.stop()
        return content

    def _get_text_from_html(self, html: str) -> str:
        soup = BeautifulSoup(html, features="lxml")
        return soup.get_text(separator=" ")

    def _requires_javascript(self, html: str) -> bool:
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
