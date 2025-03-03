FROM node:22-alpine

WORKDIR /app

RUN npm install

CMD ["npm", "start"]