#  type: ignore
import os
from pathlib import Path
from curl_cffi import requests
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import BSHTMLLoader
from langchain_core.output_parsers import StrOutputParser


html_file = Path("./application.html")
resp = requests.get("https://job-boards.greenhouse.io/openphone/jobs/4450974006?gh_src=88ff599c6us")
with html_file.open("w") as f:
    f.write(resp.text)


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0, max_tokens=None, timeout=None)

loader = BSHTMLLoader(file_path=html_file, get_text_separator="\n")

document = loader.load()[0]

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You will receive a text representing a job description. "
            "Your job is to read this and turn it into a structured JSON output. "
            "Please be accurate and do not include any details that are not present",
        ),
        ("human", "{application}"),
    ]
)

chain = prompt | llm | StrOutputParser()
result = chain.invoke({"application": document.page_content})

print(result)
