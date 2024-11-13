import { attackDTO } from "../dto/attackDTO";
import attackModel from "../models/attackModel"
import missilesModel from "../models/missilesModel";

export const getAttacksOfOrg = async (org: { org: string;}) => {
    try {
        return await attackModel.find({organization: org.org}).lean()
        
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
