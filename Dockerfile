FROM alpine:latest

COPY src/index.js package.json

RUN echo "開始"

EXPOSE 80

CMD [ "node", "src/index.js" ]