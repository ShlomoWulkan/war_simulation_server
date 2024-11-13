import { model, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
    referens: Schema.Types.ObjectId;

}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    referens: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model<IUser>("User", userSchema);
