
FROM node:14.16.0


WORKDIR /usr/src/client


COPY package.json .


RUN npm install --production


COPY . .

EXPOSE 3000

CMD ["npm", "start"]