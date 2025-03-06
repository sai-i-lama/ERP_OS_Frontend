FROM node:17-alpine as builder

WORKDIR /app

COPY package*.json .

COPY yarn*.lock .

RUN npm install

RUN npm update

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
