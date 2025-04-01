from typing import cast
from bs4 import BeautifulSoup
from bs4.element import Tag, Comment


class HTMLParser:
    PRESERVED_ATTRIBUTES = {
        "a": ["href"],
        "img": ["src", "alt"],
        "input": ["type", "name", "value", "checked", "disabled"],
        "button": ["type"],
        "form": ["action", "method"],
        "meta": ["charset", "name", "content"],
        "link": ["rel", "href"],
        "iframe": ["src"],
        "textarea": ["name", "rows", "cols"],
        "select": ["name", "multiple"],
        "option": ["value", "selected"],
    }

    TAGS_TO_REMOVE = ("script", "style", "noscript", "footer", "link")

    STYLE_TAGS_TO_UNWRAP = (
        "strong",
        "em",
        "b",
        "i",
        "u",
        "s",
        "strike",
        "del",
        "ins",
        "mark",
        "small",
        "big",
        "sub",
        "sup",
        "tt",
        "code",
        "kbd",
        "samp",
        "var",
        "bdo",
        "cite",
        "dfn",
        "abbr",
        "acronym",
        "font",
        "span",
    )

    def _get_soup(self, html: str) -> BeautifulSoup:
        return BeautifulSoup(html, "lxml")

    def parse(self, html: str) -> str:
        soup = self._get_soup(html)
        body = soup.body

        assert body, "No body found"
        self._clean_attributes_and_tags(body)

        return str(body)

    def _clean_attributes_and_tags(self, element: Tag) -> None:
        tags_to_remove: list[Tag] = []
        for child in element.find_all(self.TAGS_TO_REMOVE, recursive=False):
            tags_to_remove.append(cast(Tag, child))

        for tag in tags_to_remove:
            tag.decompose()

        tags_to_unwrap: list[Tag] = []
        for child in element.find_all(self.STYLE_TAGS_TO_UNWRAP, recursive=False):
            tags_to_unwrap.append(cast(Tag, child))

        for tag in tags_to_unwrap:
            tag.unwrap()

        if element.name:
            tag_name = element.name

            attrs_to_keep = self.PRESERVED_ATTRIBUTES.get(tag_name, [])

            attrs_to_remove = [attr for attr in element.attrs if attr not in attrs_to_keep]

            for attr in attrs_to_remove:
                del element[attr]

        for child in list(element.children):
            if isinstance(child, Comment):
                child.extract()
                continue

            if hasattr(child, "name") and child.name is not None:
                self._clean_attributes_and_tags(cast(Tag, child))
