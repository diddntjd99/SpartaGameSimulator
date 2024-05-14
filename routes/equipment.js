import express from 'express';
import Equipments from '../schemas/equipment.schema.js';
import Characters from '../schemas/characters.schema.js';
import Items from '../schemas/items.schema.js';

const router = express.Router();

// 캐릭터 장비 상세 조회 API
router.get('/characters/equipments/:character_Id', async (req, res, next) => {
  try {
    //캐릭터 컬랙션에서 검색
    const { character_Id } = req.params;
    const character = await Characters.findOne({
      character_id: character_Id,
    }).exec();

    if (!character) {
      return res
        .status(404)
        .json({ errorMessage: '존재하지 않는 캐릭터입니다.' });
    }

    const equipment = await Equipments.findOne({
      character: character._id,
    })
      .populate('character')
      .populate('item')
      .exec();

    return res.status(200).json({ equipment });
  } catch (error) {
    next(error);
  }
});

// 아이템 장착/탈착 API
router.patch('/characters/equipments/:character_Id', async (req, res, next) => {
  try {
    //캐릭터 컬랙션에서 검색
    const { character_Id } = req.params;
    const character = await Characters.findOne({
      character_id: character_Id,
    }).exec();

    if (!character) {
      return res
        .status(404)
        .json({ errorMessage: '존재하지 않는 캐릭터입니다.' });
    }

    const { item_code, equipment } = req.body;

    if (!item_code) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 데이터가 존재하지 않습니다.' });
    }

    if (equipment === undefined) {
      return res
        .status(400)
        .json({ errorMessage: 'Equipment 데이터가 존재하지 않습니다.' });
    }

    const equipments = await Equipments.findOne({
      character: character._id,
    }).populate('item');

    const item = await Items.findOne({
      item_code: item_code,
    });

    if (!item) {
      return res
        .status(404)
        .json({ errorMessage: '존재하지 않는 아이템입니다.' });
    }

    const itemIndex = equipments.item.findIndex((e) => e._id.equals(item._id));

    if (equipment) {
      // 아이템 장착
      if (itemIndex !== -1) {
        return res
          .status(400)
          .json({ errorMessage: '이미 장착한 아이템입니다.' });
      }

      equipments.item.push(item);

      if (item.item_stat.health) {
        character.health += item.item_stat.health;
      }
      if (item.item_stat.power) {
        character.power += item.item_stat.power;
      }
    } else {
      // 아이템 탈착
      if (itemIndex === -1) {
        return res
          .status(400)
          .json({ errorMessage: '장착중이지 않은 아이템입니다.' });
      }

      equipments.item.splice(itemIndex, 1);

      if (item.item_stat.health) {
        character.health -= item.item_stat.health;
      }
      if (item.item_stat.power) {
        character.power -= item.item_stat.power;
      }
    }

    await equipments.save();
    await character.save();

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

export default router;
