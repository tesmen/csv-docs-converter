FROM node:14

WORKDIR /app

COPY . .
RUN npm i
RUN npm i nodemon -g

EXPOSE 3099
CMD nodemon ./index.js
