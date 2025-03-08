#!/bin/sh
set -e

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running Alembic migrations..."
  alembic upgrade head
fi

if [ "$CREATE_ADMIN_USER" = "true" ]; then
  echo "Creating admin..."
  ./manage.py create_admin
fi

exec "$@"
