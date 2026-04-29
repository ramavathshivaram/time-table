FROM node:22-alpine

WORKDIR /worker

COPY package*.json ./

RUN npm ci --omit=dev

COPY . ./

ENV NODE_ENV=production

CMD [ "npm","run", "start" ]