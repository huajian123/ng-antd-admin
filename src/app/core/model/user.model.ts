export interface User {
    id: string;
    name: string;
    available?: boolean;
    sex?: number;
    email?: string;
    dienthoai?: string;
    zalo?: string;
    diachi?:string;
    sotienno?:number;
    password?:string;
    phongban_id?: string,
    lastLoginTime?: Date
}