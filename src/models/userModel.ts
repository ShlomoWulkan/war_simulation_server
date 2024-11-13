import { model, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    organization: string;
    area: string | null;
    resorses: [];
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
    organization: {
        type: String,
        required: true
    },
    area: {
        type: String,
    },
    resorses: {
        type: [],
        required: true
    }
});

export default model<IUser>("users", userSchema);
