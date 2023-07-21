FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app/Frontend/

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /app/Frontend/
USER node

CMD ["npm", "start"]
