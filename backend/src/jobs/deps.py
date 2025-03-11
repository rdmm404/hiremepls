from fastapi import Depends
from typing import Annotated

from src.jobs.llm import JobsLLMFlow
from src.jobs.fetcher import JobsFetcher
from src.jobs.parser import HTMLParser

JobsLLMFlowDep = Annotated[JobsLLMFlow, Depends(JobsLLMFlow)]
JobsFetcherDep = Annotated[JobsFetcher, Depends(JobsFetcher)]
HTMLParserDep = Annotated[HTMLParser, Depends(HTMLParser)]
