FROM node:21.7.1

# 作業ディレクトリの設定
WORKDIR /app

# プロジェクトファイルをコピー
COPY package.json .
COPY package-lock.json .

# パッケージのインストール
RUN npm install

# ソースコードのコピー
COPY . .

# 開発サーバーの起動
CMD ["npm", "run", "dev"]
