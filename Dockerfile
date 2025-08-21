FROM node:latest

WORKDIR /app

COPY src/index.js src/index.js
COPY package.json .

RUN npm install

CMD [ "npm", "run", "start" ]