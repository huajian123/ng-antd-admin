import { department } from './business/department';
import { login, loginOut } from './business/login';
import { menu } from './business/menu';
import { permission } from './business/permission';
import { role } from './business/role';
import { user } from './business/user';

export const handlers = [login, loginOut, ...user, ...department, ...role, ...menu, ...permission];
