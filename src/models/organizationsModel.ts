import { model, Schema } from "mongoose";

interface Iresources extends Document {
    name: string;
    amount: number
}

interface IOrganization extends Document {
    name: string;
    resources: Iresources[]
    budget: number
}

const organizationSchema = new Schema<IOrganization>({
    name: {
        type: String,
    },
    resources: [
        {
            name: {
                type: String,
            },
            amount: {
                type: Number,
            }
        }
    ],
    budget: {
        type: Number,
    }
})

export default model<IOrganization>("organizations", organizationSchema);
