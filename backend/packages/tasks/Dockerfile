FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS builder
ARG PACKAGE=tasks

ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy
ENV UV_PYTHON_DOWNLOADS=0

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-workspace --no-dev --package $PACKAGE

COPY ./packages/$PACKAGE ./packages/$PACKAGE
COPY ./packages/lib/ ./packages/lib

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev --package $PACKAGE

FROM python:3.13-slim-bookworm

RUN apt-get update && apt-get install -y wget && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install --no-install-recommends -y ./google-chrome-stable_current_amd64.deb && rm google-chrome-stable_current_amd64.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY --from=builder /app /app

WORKDIR /app
ENV PATH="/app/.venv/bin:$PATH"

CMD ["fastapi", "run", "packages/tasks/main.py", "--reload", "--host", "0.0.0.0"]