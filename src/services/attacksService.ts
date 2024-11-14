import { io } from "../app";
import { attackDTO } from "../dto/attackDTO";
import attackModel from "../models/attackModel"
import userModel from "../models/userModel";
import missilesModel from "../models/missilesModel";

export const getAttacksOfOrg = async (attacker_id: string) => {
    try {
        return await attackModel.find({attacker_id}).lean()
    } catch (error) {
        console.log(error);
        throw new Error("Could not get attacks of org")
    }
};

export const getAttacksOfDefense = async (area: string) => {
    try {
        return await attackModel.find({area}).lean()
    } catch (error) {
        console.log(error);
        throw new Error("Could not get attacks of defense")
    }
}

export const createAttack = async (attack: attackDTO) => {
    try {
        const missile = await missilesModel.findOne({name: attack.missile}).lean()
        if(!missile) throw new Error("Missile not found")
        attack.speed = missile.speed
        attack.timeToHit = missile.speed * 60
        const newAttack = new attackModel(attack)
        return await newAttack.save()
    } catch (error) {
        console.log(error);
        throw new Error("Could not create attack")
    }
}

export const updateAttackStatus = async (attack: {attack_id: string, status: string}) => {
    try {
        const existAttack = await attackModel.findByIdAndUpdate(attack.attack_id, {
            $set: {
                status: attack.status
            }
        })
        return existAttack;
    } catch (error) {
        console.log(error);
        throw error  
    }
}

export const decUserResources = async (userId: string, missileName: string) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId, "resources.name": missileName },
            { $inc: { "resources.$.amount": -1 } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found or resource not found');
        }

        console.log("Updated user:", updatedUser);
        return updatedUser;

    } catch (error) {
        console.log("Error updating user resources:", error);
        throw error;
    }
};


setInterval(async () => {
    const attacks = await attackModel.find({ status: "launched" }); 
    attacks.forEach(async (attack) => {
        if (attack.timeToHit! > 0) {
            attack.timeToHit! -= 1;
            await attack.save();
            io.emit("updateAttackTime", { id: attack._id, timeToHit: attack.timeToHit });
        } else {
            attack.status = "hit";
            await attack.save();
            io.emit("updateAttackStatus", { id: attack._id, status: attack.status });
        }
    });
}, 1000);
