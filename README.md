# Othello Express Sandbox

Express 主体の構成（`routes` / `lib` / `public`）に揃え、
フロントエンドは React ではなく Vanilla.js で実装しています。

## ディレクトリ構成

- `server.js`: Express の起動エントリ
- `routes/index.js`: ルーティング（`/`, `/api/initial-state`）
- `lib/game.js`: サーバー側のゲームユーティリティ
- `public/index.html`: 画面
- `public/style.css`: スタイル
- `public/app.js`: Vanilla.js のゲームロジック

## 起動

```bash
npm install
npm run start
```

起動後: `http://localhost:3000`

## メモ

- ディレクトリ構成は `server.js` + `routes` + `lib` + `public` を基本としています。
