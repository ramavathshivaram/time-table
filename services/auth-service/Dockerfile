# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /auth

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /auth

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /auth/dist ./dist
COPY --from=builder /auth/keys ./keys

CMD ["npm", "run", "start"]