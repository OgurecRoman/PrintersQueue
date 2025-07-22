FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

COPY src ./src
COPY tests ./tests

RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]