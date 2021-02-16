import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true },
  replyUser: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true },
  post: { type: Schema.Types.ObjectId, ref: 'post', autopopulate: true },
  votes: [{ type: Schema.Types.ObjectId, ref: 'vote', autopopulate: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('comment', commentSchema);
