FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY prisma ./prisma

COPY . . 

RUN npx prisma generate

RUN npm run build

ENV PORT 8001

EXPOSE 8001

CMD ["node", "./dist/server.js"]