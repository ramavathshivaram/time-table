FROM node:22-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci --omit=dev

COPY . ./

EXPOSE 8080

CMD ["npm", "run","start"]