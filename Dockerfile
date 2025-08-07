# Use official Node.js LTS image
FROM node:20-alpine
RUN apk add --no-cache python3

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]
