FROM node:22-alpine AS builder

WORKDIR /client

# 👇 important

ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

COPY package\*.json ./
RUN npm ci

COPY . .

RUN npm run build

- name: Build Docker image
  run: |
  docker build \
   --build-arg VITE_GOOGLE_CLIENT_ID=${{ secrets.VITE_GOOGLE_CLIENT_ID }} \
   -t your-image .

---

in react the issue with env of google key
we have to fix it
