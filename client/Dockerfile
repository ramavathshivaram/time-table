# BUILD THE IMAGE
FROM node:22-alpine AS builder

WORKDIR /client

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# RUN THE APP
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]