FROM node:22-alpine AS builder

WORKDIR /client

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]