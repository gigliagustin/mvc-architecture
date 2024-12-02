FROM node:20-alpine

WORKDIR /mvc-architecture

COPY . .

RUN npm install

CMD npm start