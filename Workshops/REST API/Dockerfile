FROM node:lts-slim

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/app.js"]