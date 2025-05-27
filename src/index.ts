import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { router } from './routes';

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ビューの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングの設定
app.use('/', router);

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 