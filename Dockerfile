FROM node:22-alpine

#Set working directory
WORKDIR /app

RUN npm install
#Expose the Next.js port
EXPOSE 8080

#Start Next.js in production mode
CMD ["npm", "start"]