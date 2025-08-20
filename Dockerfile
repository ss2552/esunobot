FROM alpine:latest

WORKDIR /app
COPY image/ .

CMD [ "sh", "-c", "ls && node app/src/index.js && ls app" ]