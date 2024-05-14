import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  item_code: {
    type: Number,
    require: true,
    unique: true,
  },
  item_name: {
    type: String,
    require: true,
    unique: true,
  },
  item_stat: {
    health: {
      type: Number,
    },
    power: {
      type: Number,
    },
  },
});

export default mongoose.model('Items', itemsSchema);
