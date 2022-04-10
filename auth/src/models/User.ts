import mongoose, { Model, Document } from 'mongoose';
import { Password } from '../services/password';

// User interface required to create a user
// we need to make sure the type matches in acc to attrs
interface UserAttrs {
  email: string;
  password: string;
}

// interface that deinfes the properties of the model -> We want to add build
// we are adding the build property to the user model and we need to inform typescript about it
// This defines properties the entire User collection will have i.e -> build
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// we will need another interface which will define which properties the user Document should have
// This defines properties an individual user must have
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

// we want somew transformations to the object (only id instead of _id and no password)
userSchema.set('toJSON', {
  // doc -> the mongoose document
  // ret -> the JSON object we want to return
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  },
});

// hash the password everytime it is supplied
// we don't use the arrow function because data in 'this' keyword will be lost
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// add the type checking as a static function to make things easier
// This basically checks whether all attrs being passsed meet the requirement
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
