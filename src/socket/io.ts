import { io } from '../app';
import { Socket } from "socket.io";
import { createAttack, decUserResources } from '../services/attacksService';

export const handleSocketConnection = (client: Socket) => {
    console.log(`new socket connection: ${client.id}`);
    client.on("disconnect", () => {
        console.log("user disconnected");
    })

    client.on("createAttack", async (attackData) => {
        console.log(attackData);
        decUserResources(attackData.attacker_id, attackData.missile)
        createAttack(attackData)
        io.emit("newAttackCreated", attackData);
    })
};
