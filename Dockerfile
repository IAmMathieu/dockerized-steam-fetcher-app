FROM node:current-alpine3.17 AS ui-build
WORKDIR /usr/src/app
COPY app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node:current-alpine3.17 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/app.js ./api/

EXPOSE 3080

CMD ["node", "./api/app.js"]