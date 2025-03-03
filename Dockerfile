FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY index.js ./index.js
COPY keep_alive.js ./keep_alive.js
COPY env ./env
RUN npm install

CMD ["node", "index.js"]