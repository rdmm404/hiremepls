from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from typing import cast

from tasks.core.llm_schema import LLMResult


class JobsLLMFlow:
    SYSTEM_PROMPT = """
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

    def __init__(self) -> None:
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.5)

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                ("human", "{application}"),
            ],
        )

        self.chain = prompt | self.llm.with_structured_output(LLMResult)

    async def get_job_from_raw_content(self, content: str) -> LLMResult:
        result = cast(LLMResult, await self.chain.ainvoke({"application": content}))
        return result
