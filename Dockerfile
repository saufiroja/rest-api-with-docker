FROM  node:16-alpine
EXPOSE 5000
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
