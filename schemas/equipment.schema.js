import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Characters',
    require: true,
  },
  item: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Items',
    },
  ],
});

export default mongoose.model('Equipment', equipmentSchema);
