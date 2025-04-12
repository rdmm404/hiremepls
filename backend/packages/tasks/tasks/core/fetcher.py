import zendriver as zd

from curl_cffi import requests
from bs4 import BeautifulSoup
from loguru import logger


class JobsFetcher:
    MAX_ATTEMPTS = 1

    def _get_session(self) -> requests.AsyncSession:
        return requests.AsyncSession(impersonate="chrome")

    async def get_page_contents(self, url: str) -> str:
        html, success = await self.get_html_with_cffi(url)

        content = self._get_text_from_html(html)

        if self._requires_javascript(html) or not success or not content.strip():
            logger.info(f"JS is required for {url}, using zendriver")
            content = await self.get_html_with_zendriver(url, content)

        return content

    async def get_html_with_cffi(self, url: str) -> tuple[str, bool]:
        # TODO: parse ld+json https://autodesk.wd1.myworkdayjobs.com/Ext/job/Toronto-ON-CAN/Software-Engineer--Back-End_25WD84869?src=JB-10065&source=LinkedIn
        async with self._get_session() as s:
            resp = await s.get(url)

        return resp.text, resp.ok

    async def get_html_with_zendriver(self, url: str, og_content: str) -> str:
        browser = await zd.start(headless=True)
        page = await browser.get(url)

        await page.evaluate(
            expression="""
                new Promise((resolve) => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        document.addEventListener('readystatechange', () => {
                            if (document.readyState === 'complete') {
                                resolve();
                            }
                        });
                    }
                });
            """,
            await_promise=True,
        )
        await page.sleep(1)
        assert await self._wait_for_cloudflare(page), "Didn't pass cloudflare verification."

        attempts = 0
        html = ""
        while attempts < self.MAX_ATTEMPTS:
            html = await page.get_content()
            content = self._get_text_from_html(html)
            if content != og_content:
                break
            await page.sleep(0.5)
            attempts += 1

        await page.close()
        await browser.stop()
        return str(html)

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

    async def _wait_for_cloudflare(self, page: zd.Tab) -> bool:
        cloudflare_texts = [
            "Verifying you are human",
            "Additional Verification Required",
            "Please wait",
        ]

        cloudflare_check = False
        cloudflare_text_index = 0
        for i, cloudflare_text in enumerate(cloudflare_texts):
            cloudflare_check = await page.find_element_by_text(cloudflare_text)
            if cloudflare_check:
                cloudflare_text_index = i
                break

        if cloudflare_check:
            logger.info("Cloudflare verification detected. waiting until done")

        attempts = 0
        while attempts < self.MAX_ATTEMPTS and cloudflare_check:
            attempts += 1
            logger.debug("Cloudflare still verifying")
            cloudflare_check = await page.find_element_by_text(
                cloudflare_texts[cloudflare_text_index]
            )
            await page.sleep(1)

        if cloudflare_check:
            logger.info("Cloudflare couldn't be verified. Moving on...")
            return False

        logger.info("Cloudflare verified. Moving on...")
        return True
