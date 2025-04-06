# Tasks

This directory will have the more heavy duty stuff like llm-calling, website parsing, etc.
This will run as a separate cloud run service, and will be trigered by google cloud tasks.

I could potentially have separate services depending on the purpose but for now it's fine. This is just to reduce cold starts in the web api.
