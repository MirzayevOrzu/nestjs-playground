FROM node:16.15.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000

CMD ["node", "dist/main.js"]
