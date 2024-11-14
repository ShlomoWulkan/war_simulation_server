import { model, Schema } from "mongoose";

interface Iattack {
    organization: string;
    area: string;
    missile: string;
    date: Date;
    speed: number;
    status: string;
    attacker_id: string
    timeToHit: number
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
        default: Date.now
    },
    speed: {
        type: Number,
    },
    status: {
        type: String,
        default: "launched",
    },
    attacker_id: {
        type: String
    },
    timeToHit: {
        type: Number
    }
});

export default model("attacks", attackSchema);
