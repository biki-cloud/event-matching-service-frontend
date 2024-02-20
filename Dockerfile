FROM node:20-alpine

# フロントエンドのビルド
WORKDIR /app/frontend
COPY . /app/frontend

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start", "--prefix", "/app/frontend"]
