# Install dependencies only when needed
FROM node:21-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build the app with cache dependencies
FROM node:22.4.1-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:22.4.1-alpine3.20 AS runner
# Set working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD [ "node", "dist/main.js" ]