import mongoose, { mongo, Schema } from 'mongoose';

const postSchema = new Schema({
  title: String,
  body: String,
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'vote', autopopulate: true }],
  votes: [{ type: Schema.Types.ObjectId, ref: 'vote', autopopulate: true }],
  community: { type: Schema.Types.ObjectId, ref: 'community', autopopulate: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment', autopopulate: true }],
  author: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.plugin(require('mongoose-paginate-v2'));
postSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('post', postSchema);
