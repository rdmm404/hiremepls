FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS builder
ARG PACKAGE=web

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


FROM python:3.13-slim-bookworm as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY --from=builder /app /app

WORKDIR /app
ENV PATH="/app/.venv/bin:$PATH"

FROM base as dev

RUN --mount=from=ghcr.io/astral-sh/uv,source=/uv,target=/bin/uv \
    uv add alembic
COPY ./alembic ./alembic
COPY alembic.ini entrypoint.sh manage.py ./
RUN chmod +x entrypoint.sh && chmod +x manage.py


ENTRYPOINT ["./entrypoint.sh"]

CMD ["fastapi", "dev", "packages/web/main.py", "--host", "0.0.0.0"]

FROM base as prd

CMD ["fastapi", "run", "packages/web/main.py", "--host", "0.0.0.0"]