import { UserModel } from './user.model';

export interface PayloadModel {
    user: UserModel;
    exp: number;
    iss: string;
    aud: string;
}
