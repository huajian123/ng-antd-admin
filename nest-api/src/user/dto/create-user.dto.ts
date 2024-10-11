export class CreateUserDto {
  userName: string;
  available: boolean;
  roleName: string[];
  sex: 0 | 1;
  mobile: number;
  email: string;
  lastLoginTime: number;
  createTime: number;
  telephone: string;
  departmentId: number;
  departmentName: string;
}
