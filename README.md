## 概要

vite-plugin-nodeでexpressを動かして
Dockerでpostgresのサーバー立てて
prismaでpostgresに接続するリポジトリ

## prismaの使い方

### ざっくり
下の3つのファイルをみるといいと思います
- prisma/schema.prisma
- prisma/seed.ts
- src/app.ts

## 操作

### 立ち上げ方
- .env.localをコピーして.envを作成
- `yarn`で依存関係をインストール
- `docker compose up -d`でpostgresを立ち上げる
- `yarn dev`で開発サーバーを立ち上げる


### seederの動かし方
- `npx prisma db seed`でprisma/seed.tsが動く（package.jsonで設定）
