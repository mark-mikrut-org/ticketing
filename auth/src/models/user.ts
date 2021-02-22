import mongoose from 'mongoose';
import { Password } from "../services/password";

// An interface that describes the properties required to
// create a new user
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that
// a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that
// a User Document has which can be a LARGER set
// than what build takes
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, // this is a constructor thus the uppercase
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

// this is the document being saved if we make this a function
// but if we make it an arrow function, this would be the file where
// called from
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) { // only hash password if IT was modified
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
