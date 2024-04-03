FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

# Define the command to run your application
CMD ["node", "--loader", "ts-node/esm", "app.ts"]