/*配置权限码*/
export const ActionCode = {
  /*标签页操作打开详情*/
  TabsDetail: 'default:feat:tabs:example-detail',
  /*查询表格 打开查看*/
  SearchTableDetail: 'default:page-demo:search-table:example-detail',

  /*系统管理*/
  AccountAdd: 'default:system:account:add', // 账号管理新增
  AccountEdit: 'default:system:account:edit', // 账号管理编辑
  AccountDel: 'default:system:account:del', // 账号管理删除

  /*角色管理*/
  RoleManagerAdd: 'default:system:role-manager:add', // 角色管理新增
  RoleManagerEdit: 'default:system:role-manager:edit', // 角色管理编辑
  RoleManagerDel: 'default:system:role-manager:del', // 角色管理删除
  RoleManagerSetRole: 'default:system:role-manager:set-role', // 角色管理设置角色

  /*菜单管理*/
  MenuAdd: 'default:system:menu:add', // 菜单新增
  MenuEdit: 'default:system:menu:edit', // 菜单编辑
  MenuDel: 'default:system:menu:del', // 菜单删除
  MenuAddLowLevel: 'default:system:menu:addlowlevel', // 菜单添加下级

  /*部门管理*/
  DeptAdd: 'default:system:dept:add', // 部门管理新增
  DeptEdit: 'default:system:dept:edit', // 部门管理编辑
  DeptDel: 'default:system:dept:del', // 部门管理删除
  DeptAddLowLevel: 'default:system:dept:addlowlevel' // 部门管理添加下级
};
