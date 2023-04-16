FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY prisma ./prisma/

COPY .env ./

RUN rm -rf node_modules && npm install

COPY . .

RUN npx prisma generate

CMD ["node", "dist/main"]