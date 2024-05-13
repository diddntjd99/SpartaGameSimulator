import mongoose from 'mongoose';

const charactersSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  health: {
    type: Number,
    require: true,
  },
  power: {
    type: Number,
    require: true,
  },
});

export default mongoose.model('Characters', charactersSchema);
