# TypeScript MVC Todo App

TypeScriptを使用したMVCパターンのTodoアプリケーションです。

## 機能

- Todoの作成、読み取り、更新、削除（CRUD操作）
- モダンなUIデザイン
- レスポンシブデザイン
- RESTful API

## 技術スタック

- TypeScript
- Express.js
- EJS (テンプレートエンジン)
- Bootstrap 5
- Node.js

## セットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd typescript-mvc-app
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

4. ブラウザでアクセス
```
http://localhost:3000
```

## ビルド

本番用ビルドを作成する場合：
```bash
npm run build
```

## テスト

テストを実行する場合：
```bash
npm test
```

## プロジェクト構造

```
src/
├── controllers/     # コントローラー
├── models/         # モデル
├── services/       # ビジネスロジック
├── views/          # ビューテンプレート
├── public/         # 静的ファイル
│   ├── css/
│   └── js/
└── routes/         # ルーティング
```

## ライセンス

MIT 