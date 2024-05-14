import express from 'express';
import connect from './schemas/index.js';
import characterRouter from './routes/characters.js';
import itemRouter from './routes/items.js';
import equipmentRouter from './routes/equipment.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

app.use('/api', [characterRouter, itemRouter, equipmentRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
