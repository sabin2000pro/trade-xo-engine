FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -D nodemon ts-node typescript

COPY tsconfig.json ./
COPY src ./src

EXPOSE 5560
CMD ["npm", "run", "dev"] 