import {
  pgTable,
  integer,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
};

// User 表
export const userTable = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }), // 可选字段
  userName: varchar('user_name', { length: 255 }).notNull(), // 用户名
  password: varchar({ length: 255 }).notNull(), // 密码
  available: boolean().notNull(), // 可用性
  sex: integer().notNull(), // 性别
  mobile: varchar({ length: 20 }).notNull(), // 手机号码
  telephone: varchar({ length: 20 }), // 电话号码
  departmentId: integer('department_id').notNull(), // 部门 ID
  lastLoginTime: timestamp('last_login_time').defaultNow(), // 最后登录时间
  ...timestamps,
});

// Role 表
export const roleTable = pgTable('role', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roleName: varchar('role_name', { length: 255 }).notNull(), // 角色名称
  roleDesc: varchar('role_desc', { length: 255 }), // 可选的角色描述
  ...timestamps,
});

export const departmentTable = pgTable('department', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fatherId: integer('father_id'), // fatherId 字段
  departmentName: varchar('department_name', { length: 255 }), // departmentName 字段
  orderNum: integer('order_num'), // orderNum 字段
  state: boolean().default(true), // state 字段，默认值为 true
  ...timestamps,
});

// Menu 表
export const menuTable = pgTable('menu', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fatherId: integer('father_id').notNull(), // 父级菜单 ID
  menuName: varchar('menu_name', { length: 255 }).notNull(), // 菜单名称
  menuType: varchar('menu_type', { length: 100 }).notNull(), // 菜单类型
  alIcon: varchar('al_icon', { length: 255 }), // 可选的阿里图标
  icon: varchar({ length: 255 }), // 可选的图标
  path: varchar({ length: 255 }), // 路径
  code: varchar({ length: 100 }).notNull(), // 代码
  orderNum: integer('order_num').notNull(), // 排序号
  status: boolean().default(true), // 状态
  newLinkFlag: boolean('new_link_flag').default(false), // 新链接标志
  visible: boolean().default(true), // 是否可见
  ...timestamps,
});

// SysRolePerm 表
export const sysRolePermTable = pgTable('sys_role_perm', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roleId: integer('role_id').notNull(), // 角色 ID
  permCode: varchar('perm_code', { length: 255 }).notNull(), // 权限码
  ...timestamps,
});

// SysUserRole 表
export const sysUserRoleTable = pgTable('sys_user_role', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roleId: integer('role_id').notNull(), // 角色 ID
  userId: integer('user_id').notNull(), // 用户 ID
  ...timestamps,
});
