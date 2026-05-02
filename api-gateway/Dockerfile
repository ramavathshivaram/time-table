# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /api-gateway

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /api-gateway

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /api-gateway/dist ./dist
COPY --from=builder /api-gateway/keys ./keys

CMD ["npm", "run", "start"]