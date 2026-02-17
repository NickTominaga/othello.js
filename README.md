# Othello Express Sandbox

Express 主体の構成（`routes` / `lib` / `public`）に揃え、
フロントエンドは React ではなく Vanilla.js で実装しています。

## ディレクトリ構成

- `server.js`: Express の起動エントリ
- `electron-main.js`: Electron のメインプロセス（内部で Express を起動）
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

起動後: `http://localhost:3450`

## Electron で起動

```bash
npm install
npm run electron
```

- Express バックエンドはそのまま利用されます。
- Electron 起動時は `electron-main.js` が `server.js` を読み込み、
  ローカルの Express サーバーに接続して表示します。

## メモ

- ディレクトリ構成は `server.js` + `routes` + `lib` + `public` を基本としています。
