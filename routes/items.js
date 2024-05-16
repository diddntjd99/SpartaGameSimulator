import express from 'express';
import Items from '../schemas/items.schema.js';
import Characters from '../schemas/characters.schema.js';
import Equipments from '../schemas/equipment.schema.js';

const router = express.Router();

// 아이템 생성 API
router.post('/items', async (req, res, next) => {
  try {
    const { item_name, item_stat } = req.body;

    if (!item_name) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 이름 데이터가 존재하지 않습니다.' });
    }
    if (!item_stat) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 스탯 데이터가 옳바르지 않습니다.' });
    }
    if (!item_stat.health && !item_stat.power) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 스탯 데이터가 존재하지 않습니다.' });
    }

    const items = await Items.find({ item_name: item_name }).exec();
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
  } catch (error) {
    next(error);
  }
});

// 아이템 하나 조회 API
router.get('/items/:item_code', async (req, res, next) => {
  try {
    const { item_code } = req.params;

    if (!item_code) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 Code 데이터가 존재하지 않습니다.' });
    }

    const item = await Items.findOne({
      item_code: item_code,
    }).exec();

    if (!item) {
      return res
        .status(404)
        .json({ errorMessage: '존재하지 않는 아이템입니다.' });
    }

    return res.status(200).json({ item });
  } catch (error) {
    next(error);
  }
});

// 아이템 목록 조회 API
router.get('/items', async (req, res, next) => {
  try {
    const items = await Items.find().sort('item_code').exec();

    return res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
});

// 아이템 수정 API
router.patch('/items/:item_code', async (req, res, next) => {
  try {
    const { item_code } = req.params;
    const { item_name, health, power } = req.body;
    const item = await Items.findOne({
      item_code: item_code,
    }).exec();

    if (!item) {
      return res
        .status(404)
        .json({ errorMessage: '존재하지 않는 아이템입니다.' });
    }

    if (!item_name && !health && !power) {
      return res
        .status(400)
        .json({ errorMessage: '수정할 아이템 데이터가 존재하지 않습니다.' });
    }

    const equalsNAmeItem = await Items.findOne({ item_name: item_name }).exec();
    if (equalsNAmeItem) {
      if (equalsNAmeItem.item_code !== item.item_code) {
        return res
          .status(400)
          .json({ errorMessage: '이미 존재하는 아이템입니다.' });
      }
    }

    let old_health, old_power;

    //req.body에 입력된 값이 있어야지 수정
    if (item_name) {
      item.item_name = item_name;
    }
    if (health) {
      old_health = item.item_stat.health;
      item.item_stat.health = health;
    }
    if (power) {
      old_power = item.item_stat.power;
      item.item_stat.power = power;
    }

    await item.save();

    //현재 수정한 아이템을 장착중인 캐릭터가 있다면 수정된 스탯으로 캐릭터 스탯 수정
    const equipments = await Equipments.find({ item: item._id })
      .populate('character')
      .populate('item')
      .exec();

    if (equipments.length > 0) {
      for (let i = 0; i < equipments.length; i++) {
        const character = await Characters.findOne({
          _id: equipments[i].character,
        }).exec();

        if (health) {
          character.health -= old_health;
          character.health += health;
        }
        if (power) {
          character.power -= old_power;
          character.power += power;
        }

        if (health || power) {
          await character.save();
        }
      }
    }

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

export default router;
