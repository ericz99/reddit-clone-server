import mongoose, { mongo, Schema } from 'mongoose';

const communitySchema = new Schema({
  name: {
    type: String,
    validate: {
      async validator(value) {
        const result = await this.constructor.findOne({ name: value });
        if (result) {
          return false;
        }
      },
      message: 'Community name already taken!',
    },
  },
  title: String,
  description: String,
  admins: [{ type: Schema.Types.ObjectId, ref: 'user', autopopulate: true }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'post', autopopulate: true }],
  users: [{ type: Schema.Types.ObjectId, ref: 'user', autopopulate: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

communitySchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('community', communitySchema);
