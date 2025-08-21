FROM alpine:latest

WORKDIR /
COPY src/index.js package.json

CMD [ "ls && npm run start" ]