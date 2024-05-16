ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g sequelize-cli

USER node

EXPOSE 3000

CMD ["sh", "-c", "sequelize db:migrate && npm run dev"]
