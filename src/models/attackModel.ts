import { model, Schema } from "mongoose";

interface Iattack {
    organization: string;
    area: string;
    missile: string;
    date: Date;
    time: number;
    status: string;
}

const attackSchema = new Schema({
    organization: {
        type: String,
    },
    area: {
        type: String,
    },
    missile: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        type: Number,
    },
    status: {
        type: String,
    }
});

export default model("attacks", attackSchema);
