import { model, Schema } from "mongoose";

interface IMissile {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const missileSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    speed: {
        type: Number,
    },
    intercepts: {
        type: [String],
    },
    price: {
        type: Number,
    }
});

export default model<IMissile>("missiles", missileSchema);
