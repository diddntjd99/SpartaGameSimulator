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
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.model('Items', itemsSchema);
