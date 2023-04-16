FROM node:16.16.0-alpine As build

WORKDIR /usr/src/app

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

RUN npm install

COPY . .

RUN npx prisma generate

FROM node:16.16.0-alpine As development

COPY --from=build /usr/src/app .

RUN npm run start:dev

WORKDIR /usr/src/app

COPY package.json ./

COPY prisma ./src/prisma/

RUN npm install glob rimraf

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]