FROM node:14.17.1-alpine

WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/

RUN apk update && apk add bash
RUN npm install

COPY . /app/

EXPOSE 8000
CMD ["npm", "run", "start"]
