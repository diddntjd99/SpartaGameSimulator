import express from 'express';
import Items from '../schemas/items.schema.js';

const router = express.Router();

router.post('/items', async (req, res, next) => {
  const { item_name, item_stat } = req.body;

  if (!item_name) {
    return res
      .status(400)
      .json({ errorMessage: '아이템 이름 데이터가 존재하지 않습니다.' });
  }
  if (!item_stat) {
    return res
      .status(400)
      .json({ errorMessage: '아이템 스탯 데이터가 존재하지 않습니다.' });
  }

  const items = await Items.find({ item_code: item_code }).exec();
  if (items.length) {
    return res
      .status(400)
      .json({ errorMessage: '이미 존재하는 아이템입니다.' });
  }

  const current_code = await Items.findOne().sort('-item_code').exec();
  const item_code = current_code ? current_code.item_code + 1 : 1;

  const createItems = new Items({
    item_code: item_code,
    item_name: item_name,
    item_stat: item_stat,
  });
  await createItems.save();

  return res.status(201).json({ Items: createItems });
});

export default router;
