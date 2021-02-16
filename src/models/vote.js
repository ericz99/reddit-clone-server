import mongoose, { Schema } from 'mongoose';

const voteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true },
  post: { type: Schema.Types.ObjectId, ref: 'post', autopopulate: true },
  comment: { type: Schema.Types.ObjectId, ref: 'comment', autopopulate: true },
});

voteSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('vote', voteSchema);
