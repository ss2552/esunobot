FROM alpine:latest

WORKDIR /
COPY image/ .

CMD [ "node src/index.js" ]