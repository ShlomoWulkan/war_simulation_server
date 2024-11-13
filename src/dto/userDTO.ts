import { Iresources } from "../models/organizationsModel";

export interface LoginDTO {
    username: string;
    password: string;
}

export interface registerDTO extends LoginDTO {
    organization: string;
    area?: string;
    resources: Iresources[];
}
