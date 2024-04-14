export enum RolEnum{
    USER= "User",
    ADMIN= "Admin"
}

export type User = {
    userID?: number;
    userName: string;
    userLastName: string;
    userEmail: string;
    userPassword?: string;
    userAddress: string;
    userPhone: number;
    rol: RolEnum;
};

export type SimpleUser = {
    email: string;
    password: string;
};