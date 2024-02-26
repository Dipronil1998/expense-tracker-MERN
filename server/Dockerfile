FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
# EXPOSE 27017

# CMD ["mongod", "--bind_ip_all", "--smallfiles"]
CMD ["npm", "start"]
