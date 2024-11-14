import { attackDTO } from "../dto/attackDTO";
import attackModel from "../models/attackModel"
import missilesModel from "../models/missilesModel";

export const getAttacksOfOrg = async (attacker_id: { attacker_id: string;}) => {
    try {
        return await attackModel.find({user_id: attacker_id.attacker_id }).lean()
        
    } catch (error) {
        console.log(error);
        throw new Error("Could not get attacks of org")
    }
};

export const getAttacksOfDefense = async (area: { area: string;}) => {
    try {
        return await attackModel.find({area: area.area}).lean()
        
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
