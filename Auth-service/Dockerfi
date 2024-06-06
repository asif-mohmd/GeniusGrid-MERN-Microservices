FROM node:22.1.0-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

ENV AUTH_GRPC_PORT=8081

ENV JWT_SECRET=GeniusGrid123


CMD [ "npm", "start" ]