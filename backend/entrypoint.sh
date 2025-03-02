#!/bin/sh
set -e

if [ "$DOCKER_RUN_MIGRATIONS" = "true" ]; then
  echo "Running Alembic migrations..."
  alembic upgrade head
fi

exec "$@"
