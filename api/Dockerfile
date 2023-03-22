FROM node:current-alpine3.17

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

EXPOSE 4242

CMD ["npm", "run", "dev"]