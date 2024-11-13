import { Iresources } from "../models/organizationsModel";

export interface LoginDTO {
    _id: string;
    username: string;
    password: string;
    organization: string;
    area?: string;
}

export interface registerDTO extends LoginDTO {
    area?: string;
    resources: Iresources[];
}
