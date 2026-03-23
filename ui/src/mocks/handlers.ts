import { login, loginOut } from './business/login';
import { user } from './business/user';
import { department } from './business/department';
import { role } from './business/role';
import { menu } from './business/menu';
import { permission } from './business/permission';

export const handlers = [
  login,
  loginOut,
  ...user,
  ...department,
  ...role,
  ...menu,
  ...permission,
];
