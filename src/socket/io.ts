import { io } from '../app';
import { Socket } from "socket.io";

export const handleSocketConnection = (client: Socket) => {
    console.log(`new socket connection: ${client.id}`);
    client.on("disconnect", () => {
        console.log("user disconnected");
    })

    client.on("example", () => {
        console.log("example event");
        io.emit("client-example event");
    })
};
