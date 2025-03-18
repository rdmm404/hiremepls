FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@latest-10

WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .

CMD [ "pnpm", "run", "dev", "--host" ]