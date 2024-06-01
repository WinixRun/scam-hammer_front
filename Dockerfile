FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 4321

CMD ["serve", "-s", "dist", "-l", "4321"]
