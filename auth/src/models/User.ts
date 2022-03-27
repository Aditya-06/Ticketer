import mongoose, { Model, Document } from 'mongoose';

// User interface required to create a user
// we need to make sure the type matches in acc to attrs
interface UserAttrs {
  email: string;
  password: string;
}

// interface that deinfes the properties of the model
// we are adding the build property to the user model and we need to inform typescript about it
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// we will need another interface which will define which properties the user Document should have
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// add the type checking as a static function to make things easier
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// <what we pass, what the function will return>
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// wrapper that we will use to make sure type checks are implemented
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
