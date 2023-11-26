/*定义常量*/

// 请求头token的前缀
export const TokenPre = 'Bearer ';
// tokenKey
export const TokenKey = 'Authorization';
// 是否是暗黑模式key
export const IsNightKey = 'IsNightKey';
// 主题设置key
export const ThemeOptionsKey = 'ThemeOptionsKey';
// 用于记录是否是第一次加载
export const IsFirstLogin = 'IsFirstLogin';
// 锁屏key
export const LockedKey = 'LockedKey';
// 加盐
export const salt = 'EIpWsyfiy@R@X#qn17!StJNdZK1fFF8iV6ffN!goZkqt#JxO';

// 登录超时code码，弹出登录对话框
export const loginTimeOutCode = 1012;
// token错误，重新登录
export const tokenErrorCode = 1010;

// 左侧菜单变成over模式最大的宽度
export const SideCollapsedMaxWidth = 700;
// 顶部菜单变成over模式最大的宽度
export const TopCollapsedMaxWidth = 1247;

// 左侧菜单的宽度
export const SideNavWidth = 208; // 如果修改，请同步修改@left-nav-width的值
// Collapsed状态下左侧菜单的宽度
export const CollapsedNavWidth = 48; // 如果修改，请同步修改@collapsed-nav-width的值
