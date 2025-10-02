ARG NODE_VERSION=20.19.0

FROM node:${NODE_VERSION}-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST=0.0.0.0
ENV NODE_ENV=development

EXPOSE 9000

CMD ["npm", "run", "dev"]
