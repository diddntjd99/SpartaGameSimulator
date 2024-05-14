import express from 'express';
import Characters from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 생성 API
router.post('/characters', async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ errorMessage: '캐릭터 이름 데이터가 존재하지 않습니다.' });
  }

  const characters = await Characters.find({ name: name }).exec();
  if (characters.length) {
    return res
      .status(400)
      .json({ errorMessage: '이미 존재하는 캐릭터입니다.' });
  }

  const current_id = await Characters.findOne().sort('-character_id').exec();
  const character_id = current_id ? current_id.character_id + 1 : 1;

  const createCharacters = new Characters({
    character_id: character_id,
    name: name,
    health: 500,
    power: 100,
  });
  await createCharacters.save();

  return res.status(201).json({ characters: createCharacters });
});

// 캐릭터 조회 API
router.get('/characters/:character_Id', async (req, res, next) => {
  const { character_Id } = req.params;
  const character = await Characters.findOne({
    character_id: character_Id,
  }).exec();

  return res.status(200).json({ character });
});

export default router;
