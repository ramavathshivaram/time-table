FROM node:22-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci --omit=dev

COPY . ./

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run","start"]