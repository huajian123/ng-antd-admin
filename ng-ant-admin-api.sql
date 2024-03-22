/*
 Navicat Premium Data Transfer

 Source Server         : huajian
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : ng-ant-admin-api

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 22/03/2024 14:52:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES (2, 1);
INSERT INTO `role_permission` VALUES (2, 40);
INSERT INTO `role_permission` VALUES (2, 41);
INSERT INTO `role_permission` VALUES (2, 42);
INSERT INTO `role_permission` VALUES (2, 113);
INSERT INTO `role_permission` VALUES (2, 114);
INSERT INTO `role_permission` VALUES (2, 119);
INSERT INTO `role_permission` VALUES (2, 120);
INSERT INTO `role_permission` VALUES (2, 121);
INSERT INTO `role_permission` VALUES (2, 134);
INSERT INTO `role_permission` VALUES (2, 135);
INSERT INTO `role_permission` VALUES (2, 136);
INSERT INTO `role_permission` VALUES (2, 122);
INSERT INTO `role_permission` VALUES (2, 137);
INSERT INTO `role_permission` VALUES (2, 138);
INSERT INTO `role_permission` VALUES (2, 139);
INSERT INTO `role_permission` VALUES (2, 140);
INSERT INTO `role_permission` VALUES (2, 123);
INSERT INTO `role_permission` VALUES (2, 126);
INSERT INTO `role_permission` VALUES (2, 127);
INSERT INTO `role_permission` VALUES (2, 128);
INSERT INTO `role_permission` VALUES (2, 129);
INSERT INTO `role_permission` VALUES (2, 130);
INSERT INTO `role_permission` VALUES (2, 131);
INSERT INTO `role_permission` VALUES (2, 132);
INSERT INTO `role_permission` VALUES (2, 133);
INSERT INTO `role_permission` VALUES (2, 125);
INSERT INTO `role_permission` VALUES (1, 1);
INSERT INTO `role_permission` VALUES (1, 40);
INSERT INTO `role_permission` VALUES (1, 41);
INSERT INTO `role_permission` VALUES (1, 42);
INSERT INTO `role_permission` VALUES (1, 43);
INSERT INTO `role_permission` VALUES (1, 44);
INSERT INTO `role_permission` VALUES (1, 45);
INSERT INTO `role_permission` VALUES (1, 46);
INSERT INTO `role_permission` VALUES (1, 47);
INSERT INTO `role_permission` VALUES (1, 48);
INSERT INTO `role_permission` VALUES (1, 49);
INSERT INTO `role_permission` VALUES (1, 50);
INSERT INTO `role_permission` VALUES (1, 51);
INSERT INTO `role_permission` VALUES (1, 52);
INSERT INTO `role_permission` VALUES (1, 53);
INSERT INTO `role_permission` VALUES (1, 54);
INSERT INTO `role_permission` VALUES (1, 55);
INSERT INTO `role_permission` VALUES (1, 56);
INSERT INTO `role_permission` VALUES (1, 61);
INSERT INTO `role_permission` VALUES (1, 62);
INSERT INTO `role_permission` VALUES (1, 63);
INSERT INTO `role_permission` VALUES (1, 64);
INSERT INTO `role_permission` VALUES (1, 65);
INSERT INTO `role_permission` VALUES (1, 66);
INSERT INTO `role_permission` VALUES (1, 67);
INSERT INTO `role_permission` VALUES (1, 68);
INSERT INTO `role_permission` VALUES (1, 69);
INSERT INTO `role_permission` VALUES (1, 70);
INSERT INTO `role_permission` VALUES (1, 146);
INSERT INTO `role_permission` VALUES (1, 149);
INSERT INTO `role_permission` VALUES (1, 71);
INSERT INTO `role_permission` VALUES (1, 72);
INSERT INTO `role_permission` VALUES (1, 73);
INSERT INTO `role_permission` VALUES (1, 74);
INSERT INTO `role_permission` VALUES (1, 75);
INSERT INTO `role_permission` VALUES (1, 151);
INSERT INTO `role_permission` VALUES (1, 76);
INSERT INTO `role_permission` VALUES (1, 77);
INSERT INTO `role_permission` VALUES (1, 78);
INSERT INTO `role_permission` VALUES (1, 79);
INSERT INTO `role_permission` VALUES (1, 80);
INSERT INTO `role_permission` VALUES (1, 81);
INSERT INTO `role_permission` VALUES (1, 82);
INSERT INTO `role_permission` VALUES (1, 83);
INSERT INTO `role_permission` VALUES (1, 84);
INSERT INTO `role_permission` VALUES (1, 85);
INSERT INTO `role_permission` VALUES (1, 86);
INSERT INTO `role_permission` VALUES (1, 87);
INSERT INTO `role_permission` VALUES (1, 88);
INSERT INTO `role_permission` VALUES (1, 89);
INSERT INTO `role_permission` VALUES (1, 90);
INSERT INTO `role_permission` VALUES (1, 91);
INSERT INTO `role_permission` VALUES (1, 92);
INSERT INTO `role_permission` VALUES (1, 93);
INSERT INTO `role_permission` VALUES (1, 94);
INSERT INTO `role_permission` VALUES (1, 95);
INSERT INTO `role_permission` VALUES (1, 96);
INSERT INTO `role_permission` VALUES (1, 97);
INSERT INTO `role_permission` VALUES (1, 98);
INSERT INTO `role_permission` VALUES (1, 99);
INSERT INTO `role_permission` VALUES (1, 100);
INSERT INTO `role_permission` VALUES (1, 101);
INSERT INTO `role_permission` VALUES (1, 102);
INSERT INTO `role_permission` VALUES (1, 103);
INSERT INTO `role_permission` VALUES (1, 141);
INSERT INTO `role_permission` VALUES (1, 142);
INSERT INTO `role_permission` VALUES (1, 144);
INSERT INTO `role_permission` VALUES (1, 143);
INSERT INTO `role_permission` VALUES (1, 152);
INSERT INTO `role_permission` VALUES (1, 153);
INSERT INTO `role_permission` VALUES (1, 104);
INSERT INTO `role_permission` VALUES (1, 105);
INSERT INTO `role_permission` VALUES (1, 106);
INSERT INTO `role_permission` VALUES (1, 107);
INSERT INTO `role_permission` VALUES (1, 108);
INSERT INTO `role_permission` VALUES (1, 109);
INSERT INTO `role_permission` VALUES (1, 110);
INSERT INTO `role_permission` VALUES (1, 111);
INSERT INTO `role_permission` VALUES (1, 112);
INSERT INTO `role_permission` VALUES (1, 147);
INSERT INTO `role_permission` VALUES (1, 148);
INSERT INTO `role_permission` VALUES (1, 150);
INSERT INTO `role_permission` VALUES (1, 113);
INSERT INTO `role_permission` VALUES (1, 114);
INSERT INTO `role_permission` VALUES (1, 115);
INSERT INTO `role_permission` VALUES (1, 116);
INSERT INTO `role_permission` VALUES (1, 117);
INSERT INTO `role_permission` VALUES (1, 118);
INSERT INTO `role_permission` VALUES (1, 119);
INSERT INTO `role_permission` VALUES (1, 120);
INSERT INTO `role_permission` VALUES (1, 121);
INSERT INTO `role_permission` VALUES (1, 134);
INSERT INTO `role_permission` VALUES (1, 135);
INSERT INTO `role_permission` VALUES (1, 136);
INSERT INTO `role_permission` VALUES (1, 122);
INSERT INTO `role_permission` VALUES (1, 137);
INSERT INTO `role_permission` VALUES (1, 138);
INSERT INTO `role_permission` VALUES (1, 139);
INSERT INTO `role_permission` VALUES (1, 140);
INSERT INTO `role_permission` VALUES (1, 123);
INSERT INTO `role_permission` VALUES (1, 126);
INSERT INTO `role_permission` VALUES (1, 127);
INSERT INTO `role_permission` VALUES (1, 128);
INSERT INTO `role_permission` VALUES (1, 129);
INSERT INTO `role_permission` VALUES (1, 124);
INSERT INTO `role_permission` VALUES (1, 130);
INSERT INTO `role_permission` VALUES (1, 131);
INSERT INTO `role_permission` VALUES (1, 132);
INSERT INTO `role_permission` VALUES (1, 133);
INSERT INTO `role_permission` VALUES (1, 125);

-- ----------------------------
-- Table structure for sys_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门名称',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `state` tinyint(1) NOT NULL DEFAULT 0 COMMENT '部门状态 0 禁用 1 可用',
  `father_id` int(11) NOT NULL DEFAULT 0 COMMENT '父级菜单id 默认为0',
  `order_num` int(11) NOT NULL COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
INSERT INTO `sys_department` VALUES (15, '开发部门', '2021-09-13 16:43:10', '2022-05-11 15:24:28', 1, 0, 1);
INSERT INTO `sys_department` VALUES (16, '客服部门', '2021-09-13 16:43:15', '2022-05-11 14:38:00', 1, 0, 2);
INSERT INTO `sys_department` VALUES (17, '开发一部', '2021-09-13 16:43:19', '2022-05-09 16:08:46', 1, 15, 1);
INSERT INTO `sys_department` VALUES (29, '开发二部', '2022-05-09 16:11:32', '2022-05-11 13:41:17', 1, 15, 3);
INSERT INTO `sys_department` VALUES (30, '测试部门', '2022-05-11 11:26:11', '2022-05-11 11:26:11', 1, 17, 1);
INSERT INTO `sys_department` VALUES (31, '客服部门子部门', '2022-05-13 17:34:15', '2022-05-13 17:34:15', 1, 16, 1);
INSERT INTO `sys_department` VALUES (32, '独立部门', '2022-05-13 17:34:24', '2022-05-13 17:34:24', 1, 0, 3);

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名字',
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单权限码',
  `father_id` int(11) NULL DEFAULT 0 COMMENT '父级菜单id 默认为0',
  `order_num` int(4) NULL DEFAULT 0 COMMENT '显示顺序',
  `path` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '路由地址',
  `menu_type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '菜单类型（C菜单 F按钮）',
  `visible` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `is_new_link` tinyint(1) NULL DEFAULT NULL COMMENT '是否是外链 0 否 1 是',
  `al_icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '阿里icon',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '#' COMMENT '菜单图标',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code_idx`(`code`) USING BTREE COMMENT '权限码唯一',
  UNIQUE INDEX `menu_idx`(`menu_name`) USING BTREE COMMENT '菜单名称唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 154 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES (1, 'Dashboard', 'default:dashboard', 0, 1, '/default/dashboard', 'C', '1', '1', 0, '', 'dashboard', '2022-03-31 08:03:44', '2022-05-11 13:42:19');
INSERT INTO `sys_permission` VALUES (40, '分析页', 'default:dashboard:analysis', 1, 1, '/default/dashboard/analysis', 'C', '1', '1', 0, '', 'fund', '2022-05-10 08:24:08', '2022-05-13 09:05:35');
INSERT INTO `sys_permission` VALUES (41, '监控页', 'default:dashboard:monitor', 1, 2, '/default/dashboard/monitor', 'C', '1', '1', 0, NULL, 'fund', '2022-05-10 08:24:55', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (42, '工作台', 'default:dashboard:workbench', 1, 3, '/default/dashboard/workbench', 'C', '1', '1', 0, NULL, 'appstore', '2022-05-10 08:25:19', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (43, '页面', 'default:page-demo', 0, 2, '/default/page-demo', 'C', '1', '1', 0, NULL, 'appstore', '2022-05-10 08:25:49', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (44, '表单页', 'default:page-demo:form', 43, 1, '/default/page-demo/form', 'C', '1', '1', 0, NULL, 'form', '2022-05-10 08:26:49', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (45, '基础表单', 'default:page-demo:form:base-form', 44, 1, '/default/page-demo/form/base-form', 'C', '1', '1', 0, NULL, 'form', '2022-05-10 08:40:56', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (46, '分步表单', 'default:page-demo:form:step-form', 44, 2, '/default/page-demo/form/step-form', 'C', '1', '1', 0, NULL, 'form', '2022-05-10 08:41:39', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (47, '高级表单', 'default:page-demo:form:advanced-form', 44, 3, '/default/page-demo/form/advanced-form', 'C', '1', '1', 0, NULL, 'form', '2022-05-10 08:43:02', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (48, '列表页', 'default:page-demo:list', 43, 2, '/default/page-demo/list', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:43:55', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (49, '搜索列表', 'default:page-demo:list:search-list', 48, 1, '/default/page-demo/list/search-list', 'C', '1', '1', 0, NULL, '', '2022-05-10 08:45:15', '2022-05-13 17:29:23');
INSERT INTO `sys_permission` VALUES (50, '搜索列表(文章)', 'default:page-demo:list:search-list:article', 49, 1, '/default/page-demo/list/search-list/article', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:47:13', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (51, '搜索列表(项目)', 'default:page-demo:list:search-list:project', 49, 2, '/default/page-demo/list/search-list/project', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:47:59', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (52, '搜索列表(应用)', 'default:page-demo:list:search-list:application', 49, 3, '/default/page-demo/list/search-list/application', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:49:16', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (53, '查询表格', 'default:page-demo:list:search-table', 48, 2, '/default/page-demo/list/search-table', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:50:30', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (54, '树状表格', 'default:page-demo:list:tree-list', 48, 3, '/default/page-demo/list/tree-list', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:51:14', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (55, '标准表格', 'default:page-demo:list:standard-table', 48, 4, '/default/page-demo/list/standard-table', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:51:50', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (56, '卡片列表', 'default:page-demo:list:card-table', 48, 5, '/default/page-demo/list/card-table', 'C', '1', '1', 0, NULL, 'table', '2022-05-10 08:52:23', '2022-05-10 10:31:12');
INSERT INTO `sys_permission` VALUES (61, '详情页', 'default:page-demo:detail', 43, 3, '/default/page-demo/detail', 'C', '1', '1', 0, NULL, 'profile', '2022-05-10 09:47:52', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (62, '基础详情页', 'default:page-demo:detail:base-detail', 61, 1, '/default/page-demo/detail/base-detail', 'C', '1', '1', 0, NULL, 'profile', '2022-05-10 09:48:10', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (63, '高级详情页', 'default:page-demo:detail:adv-detail', 61, 2, '/default/page-demo/detail/adv-detail', 'C', '1', '1', 0, NULL, 'profile', '2022-05-10 09:48:29', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (64, '结果页', 'default:page-demo:result', 43, 4, '/default/page-demo/result', 'C', '1', '1', 0, NULL, 'check-circle', '2022-05-10 09:49:22', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (65, '成功页', 'default:page-demo:result:success', 64, 1, '/default/page-demo/result/success', 'C', '1', '1', 0, NULL, 'check-circle', '2022-05-10 09:50:00', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (66, '失败页', 'default:page-demo:result:fail', 64, 2, '/default/page-demo/result/fail', 'C', '1', '1', 0, NULL, 'check-circle', '2022-05-10 09:50:42', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (67, '异常页', 'default:page-demo:except', 43, 5, '/default/page-demo/except', 'C', '1', '1', 0, NULL, 'warning', '2022-05-10 09:51:32', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (68, '403', 'default:page-demo:except:except403', 67, 1, '/default/page-demo/except/except403', 'C', '1', '1', 0, NULL, 'warning', '2022-05-10 09:51:55', '2022-05-10 14:58:35');
INSERT INTO `sys_permission` VALUES (69, '404', 'default:page-demo:except:except404', 67, 2, '/default/page-demo/except/except404', 'C', '1', '1', 0, NULL, 'warning', '2022-05-10 09:52:15', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (70, '500', 'default:page-demo:except:except500', 67, 3, '/default/page-demo/except/except500', 'C', '1', '1', 0, NULL, 'warning', '2022-05-10 09:52:37', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (71, '个人页', 'default:page-demo:personal', 43, 6, '/default/page-demo/personal', 'C', '1', '1', 0, NULL, 'user', '2022-05-10 09:53:13', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (72, '个人中心', 'default:page-demo:personal:personal-center', 71, 1, '/default/page-demo/personal/personal-center', 'C', '1', '1', 0, NULL, 'user', '2022-05-10 09:53:36', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (73, '个人设置', 'default:page-demo:personal:personal-setting', 71, 2, '/default/page-demo/personal/personal-setting', 'C', '1', '1', 0, '', 'user', '2022-05-10 09:54:03', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (74, '图形编辑器', 'default:page-demo:flow', 43, 7, '/default/page-demo/flow', 'C', '1', '1', 0, 'icon-mel-help', NULL, '2022-05-10 09:54:38', '2022-05-10 15:06:00');
INSERT INTO `sys_permission` VALUES (75, '流程图', 'default:page-demo:flow:flow-chat', 74, 1, '/default/page-demo/flow/flow-chat', 'C', '1', '1', 0, NULL, 'highlight', '2022-05-10 09:55:02', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (76, '功能', 'default:feat', 0, 3, '/default/feat', 'C', '1', '1', 0, NULL, 'star', '2022-05-10 09:55:41', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (77, '消息提示', 'default:feat:msg', 76, 1, '/default/feat/msg', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 09:56:21', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (78, '图标', 'default:feat:icons', 76, 2, '/default/feat/icons', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 09:56:43', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (79, '右键菜单', 'default:feat:context-menu', 76, 3, '/default/feat/context-menu', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 09:58:45', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (80, '图片预览', 'default:feat:img-preview', 76, 4, '/default/feat/img-preview', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 09:59:10', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (81, '全屏', 'default:feat:full-screen', 76, 5, '/default/feat/full-screen', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 09:59:33', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (82, '标签页操作', 'default:feat:tabs', 76, 6, '/default/feat/tabs', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:00:00', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (83, '拖拽modal', 'default:feat:ex-modal', 76, 7, '/default/feat/ex-modal', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:00:35', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (84, '封装抽屉', 'default:feat:ex-drawer', 76, 8, '/default/feat/ex-drawer', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:01:03', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (85, '富文本', 'default:feat:rich-text', 76, 9, '/default/feat/rich-text', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:01:26', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (86, 'clickOutSide', 'default:feat:click-out-side', 76, 10, '/default/feat/click-out-side', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:01:52', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (87, '外部文档', 'default:feat:frame', 76, 11, '/default/feat/frame', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:02:33', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (88, 'zorro文档', 'default:feat:frame:zorro-doc', 87, 1, '/default/feat/frame/zorro-doc', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:03:27', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (89, '外部链接', 'https://github.com/huajian123/ng-ant-admin', 87, 2, 'https://github.com/huajian123/ng-ant-admin', 'C', '1', '1', 1, NULL, 'usergroup-delete', '2022-05-10 10:05:11', '2022-05-10 14:58:53');
INSERT INTO `sys_permission` VALUES (90, '滚动条', 'default:feat:scroll', 76, 12, '/default/feat/scroll', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:05:43', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (91, '缓存滚动条', 'default:feat:scroll:keep-scroll-page', 90, 1, '/default/feat/scroll/keep-scroll-page', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:06:02', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (92, '玩弄滚动条', 'default:feat:scroll:play-scroll', 90, 2, '/default/feat/scroll/play-scroll', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:06:24', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (93, '图表', 'default:feat:charts', 76, 13, '/default/feat/charts', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:06:59', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (94, '高德', 'default:feat:charts:gaode-map', 93, 1, '/default/feat/charts/gaode-map', 'C', '1', '1', 0, NULL, 'highlight', '2022-05-10 10:07:28', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (95, '百度', 'default:feat:charts:baidu-map', 93, 2, '/default/feat/charts/baidu-map', 'C', '1', '1', 0, NULL, 'highlight', '2022-05-10 10:07:52', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (96, 'Echarts', 'default:feat:charts:echarts', 93, 3, '/default/feat/charts/echarts', 'C', '1', '1', 0, NULL, 'highlight', '2022-05-10 10:08:14', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (97, '其他登录方式', 'blank:other-login', 76, 14, '/blank/other-login', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:08:41', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (98, '第一种', 'blank:other-login:login1', 97, 1, '/blank/other-login/login1', 'C', '1', '1', 0, NULL, 'highlight', '2022-05-10 10:09:10', '2022-05-10 14:58:36');
INSERT INTO `sys_permission` VALUES (99, '颜色选择器', 'default:feat:color-sel', 76, 15, '/default/feat/color-sel', 'C', '1', '1', 0, NULL, 'usergroup-delete', '2022-05-10 10:09:41', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (100, '水波纹', 'default:feat:ripple', 76, 16, '/default/feat/ripple', 'C', '1', '1', 0, NULL, 'usergroup-delete', '2022-05-10 10:10:02', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (101, '剪切板', 'default:feat:copy', 76, 17, '/default/feat/copy', 'C', '1', '1', 0, NULL, 'usergroup-delete', '2022-05-10 10:10:24', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (102, '空白页', 'blank:empty-page', 76, 18, '/blank/empty-page', 'C', '1', '1', 0, NULL, 'usergroup-delete', '2022-05-10 10:10:46', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (103, '引导页', 'default:feat:setup', 76, 19, '/default/feat/setup', 'C', '1', '1', 0, NULL, 'codepen', '2022-05-10 10:11:25', '2022-05-10 15:00:24');
INSERT INTO `sys_permission` VALUES (104, '组件', 'default:comp', 0, 4, '/default/comp', 'C', '1', '1', 0, NULL, 'star', '2022-05-10 10:11:52', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (105, '基础组件', 'default:comp:basic', 104, 1, '/default/comp/basic', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:12:09', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (106, '动画组件', 'default:comp:transition', 104, 2, '/default/comp/transition', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:12:32', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (107, '在线excel', 'default:comp:luckysheet', 104, 3, '/default/comp/luckysheet', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:12:49', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (108, '组件懒加载', 'default:comp:lazy', 104, 4, '/default/comp/lazy', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:13:15', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (109, '基础懒加载组件', 'default:comp:lazy:lazy-basic', 108, 1, '/default/comp/lazy/lazy-basic', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:13:33', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (110, '滚动懒加载', 'default:comp:lazy:lazy-scroll', 108, 2, '/default/comp/lazy/lazy-scroll', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:13:52', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (111, '详情组件', 'default:comp:desc', 104, 5, '/default/comp/desc', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:14:23', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (112, '密码强度校验组件', 'default:comp:strength-meter', 104, 6, '/default/comp/strength-meter', 'C', '1', '1', 0, NULL, 'dashboard', '2022-05-10 10:14:44', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (113, '多级菜单', 'default:level', 0, 5, '/default/level', 'C', '1', '1', 0, NULL, 'menu', '2022-05-10 10:15:12', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (114, 'Menu1', 'default:level:menu1', 113, 1, '/default/level/menu1', 'C', '1', '1', 0, NULL, 'menu', '2022-05-10 10:15:34', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (115, 'Menu1-1', 'default:level:menu1:menu1-1', 114, 1, '/default/level/menu1/menu1-1', 'C', '1', '1', 0, NULL, '', '2022-05-10 10:15:56', '2022-05-11 17:25:16');
INSERT INTO `sys_permission` VALUES (116, 'Menu1-1-1', 'default:level:menu1:menu1-1:menu1-1-1', 115, 1, '/default/level/menu1/menu1-1/menu1-1-1', 'C', '1', '1', 0, NULL, '', '2022-05-10 10:16:28', '2022-05-11 17:24:43');
INSERT INTO `sys_permission` VALUES (117, 'Menu1-1-2', 'default:level:menu1:menu1-1:menu1-1-2', 115, 2, '/default/level/menu1/menu1-1/menu1-1-2', 'C', '1', '1', 0, NULL, '', '2022-05-10 10:16:52', '2022-05-11 17:24:54');
INSERT INTO `sys_permission` VALUES (118, 'Menu1-2', 'default:level:menu1:menu1-2', 114, 2, '/default/level/menu1/menu1-2', 'C', '1', '1', 0, NULL, 'menu', '2022-05-10 10:17:14', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (119, 'Menu2', 'default:level:menu2', 113, 2, '/default/level/menu2', 'C', '1', '1', 0, NULL, 'menu', '2022-05-10 10:17:37', '2022-05-10 14:58:37');
INSERT INTO `sys_permission` VALUES (120, '系统管理', 'default:system', 0, 6, '/default/system', 'C', '1', '1', 0, '', 'menu', '2022-05-10 10:18:12', '2022-05-10 15:07:49');
INSERT INTO `sys_permission` VALUES (121, '账号管理', 'default:system:account', 120, 1, '/default/system/account', 'C', '1', '1', 0, '', 'menu', '2022-05-10 10:18:29', '2022-05-10 15:08:02');
INSERT INTO `sys_permission` VALUES (122, '角色管理', 'default:system:role-manager', 120, 2, '/default/system/role-manager', 'C', '1', '1', 0, 'icon-mel-help', '', '2022-05-10 10:18:55', '2022-05-10 15:08:12');
INSERT INTO `sys_permission` VALUES (123, '菜单管理', 'default:system:menu', 120, 3, '/default/system/menu', 'C', '1', '1', 0, '', 'menu', '2022-05-10 10:21:23', '2022-05-10 15:08:23');
INSERT INTO `sys_permission` VALUES (124, '部门管理', 'default:system:dept', 120, 4, '/default/system/dept', 'C', '1', '1', 0, 'icon-mel-help', '', '2022-05-10 10:21:58', '2022-05-10 15:08:34');
INSERT INTO `sys_permission` VALUES (125, '关于', 'default:about', 0, 7, '/default/about', 'C', '1', '1', 0, 'icon-medium', '', '2022-05-10 10:22:35', '2022-05-10 15:08:39');
INSERT INTO `sys_permission` VALUES (126, '菜单管理新增', 'default:system:menu:add', 123, 1, NULL, 'F', '1', '1', 0, NULL, NULL, '2022-05-10 10:21:23', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (127, '菜单管理编辑', 'default:system:menu:edit', 123, 2, NULL, 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:51:38', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (128, '菜单管理删除', 'default:system:menu:del', 123, 3, NULL, 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:52:25', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (129, '菜单管理添加下级', 'default:system:menu:addlowlevel', 123, 4, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:54:33', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (130, '部门管理新增', 'default:system:dept:add', 124, 1, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:57:09', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (131, '部门管理编辑', 'default:system:dept:edit', 124, 2, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:57:33', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (132, '部门管理删除', 'default:system:dept:del', 124, 3, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:57:57', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (133, '部门管理添加下级', 'default:system:dept:addlowlevel', 124, 4, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:58:30', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (134, '账号管理新增', 'default:system:account:add', 121, 1, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 10:59:54', '2022-05-10 15:05:49');
INSERT INTO `sys_permission` VALUES (135, '账号管理编辑', 'default:system:account:edit', 121, 2, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:00:15', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (136, '账号管理删除', 'default:system:account:del', 121, 3, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:00:40', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (137, '角色管理新增', 'default:system:role-manager:add', 122, 1, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:01:17', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (138, '角色管理编辑', 'default:system:role-manager:edit', 122, 2, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:01:35', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (139, '角色管理删除', 'default:system:role-manager:del', 122, 3, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:01:59', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (140, '角色管理设置角色', 'default:system:role-manager:set-role', 122, 4, '', 'F', '0', '1', 0, NULL, NULL, '2022-05-10 11:02:20', '2022-05-10 15:05:50');
INSERT INTO `sys_permission` VALUES (141, '登录超时', 'default:feat:session-timeout', 76, 20, '/default/feat/session-timeout', 'C', '1', '1', 0, NULL, 'yuque', '2022-05-11 14:57:16', '2022-05-11 14:57:28');
INSERT INTO `sys_permission` VALUES (142, 'websocket', 'default:feat:websocket', 76, 21, '/default/feat/websocket', 'C', '1', '1', 0, NULL, 'border-horizontal', '2022-05-11 15:55:21', '2022-05-11 17:29:17');
INSERT INTO `sys_permission` VALUES (143, '文件下载', 'default:feat:download', 76, 23, '/default/feat/download', 'C', '1', '1', 0, NULL, 'arrow-down', '2022-05-12 15:46:03', '2022-05-12 15:46:03');
INSERT INTO `sys_permission` VALUES (144, '文件上传', 'default:feat:upload', 76, 22, '/default/feat/upload', 'C', '1', '1', 0, NULL, 'up', '2022-05-13 09:11:19', '2022-05-13 09:15:09');
INSERT INTO `sys_permission` VALUES (146, '网络错误', 'default:page-demo:except:network-error', 67, 4, '/default/page-demo/except/network-error', 'C', '1', '1', 0, '', 'warning', '2022-08-30 14:11:33', '2022-08-30 14:11:33');
INSERT INTO `sys_permission` VALUES (147, 'Form', 'default:comp:form', 104, 7, '/default/comp/form', 'C', '1', '1', 0, NULL, 'form', '2022-09-02 14:20:21', '2022-09-02 14:20:21');
INSERT INTO `sys_permission` VALUES (148, '可收缩表单', 'default:comp:form:shrink-form', 147, 1, '/default/comp/form/shrink-form', 'C', '1', '1', 0, NULL, 'minus-square', '2022-09-02 14:21:30', '2022-09-02 14:34:24');
INSERT INTO `sys_permission` VALUES (149, '无数据', 'default:page-demo:except:no-data', 67, 5, '/default/page-demo/except/no-data', 'C', '1', '1', 0, NULL, 'warning', '2022-09-10 18:09:25', '2022-09-10 18:09:25');
INSERT INTO `sys_permission` VALUES (150, '表单增删', 'default:comp:form:append-form', 147, 2, '/default/comp/form/append-form', 'C', '1', '1', 0, NULL, 'chrome', '2022-10-21 21:31:08', '2022-10-21 21:31:08');
INSERT INTO `sys_permission` VALUES (151, '任务', 'default:page-demo:task', 43, 8, '/default/page-demo/task', 'C', '1', '1', 0, NULL, 'border-bottom', '2023-10-10 21:49:45', '2023-10-10 21:49:45');
INSERT INTO `sys_permission` VALUES (152, '二维码', 'default:feat:qrcode', 76, 24, '/default/feat/qrcode', 'C', '1', '1', 0, NULL, 'gitlab', '2023-10-10 21:50:27', '2023-10-10 21:50:27');
INSERT INTO `sys_permission` VALUES (153, '水印', 'default:feat:water-mark', 76, 25, '/default/feat/water-mark', 'C', '1', '1', 0, NULL, 'windows', '2023-10-10 22:05:21', '2023-10-10 22:05:21');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名',
  `role_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', '超级管理员');
INSERT INTO `sys_role` VALUES (2, '开发工程师', '专注java开发三十年');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `is_available` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 禁用 1 可用',
  `sex` int(1) NULL DEFAULT 1 COMMENT '0 女 1 男',
  `mobile` bigint(20) NULL DEFAULT NULL COMMENT '手机',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `last_login_time` timestamp(0) NULL DEFAULT NULL COMMENT '最后登录时间',
  `education` tinyint(1) NULL DEFAULT NULL COMMENT '学历 1 初中 2 高中 3 大学 4 研究生 5 硕士 6 博士 ',
  `telephone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '座机',
  `department_id` int(11) NULL DEFAULT NULL COMMENT '所属部门',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name_idx`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '$2a$10$Op3Vb2KJTHbLXzpHEu4vr.mhCNjZQ0Oo4YFkZgZ.uameG.c6eQDUi', '2021-01-21 14:39:08', '2022-05-18 07:56:39', 1, 1, 13683758197, 'f13683758197@163.com', '2023-10-10 22:01:02', 3, '0375-0981', 15);
INSERT INTO `sys_user` VALUES (2, 'normal', '$2a$10$Op3Vb2KJTHbLXzpHEu4vr.mhCNjZQ0Oo4YFkZgZ.uameG.c6eQDUi', '2021-01-21 14:39:08', '2022-05-11 10:37:07', 1, 1, 13683758197, 'f13683758197@163.com', '2022-05-12 15:39:12', 3, '11111111', 29);
INSERT INTO `sys_user` VALUES (15, 'admin1', '$2a$10$Z4qyfF./GsGWqNPdUYZ.a.Op474tpd2FzMMkc3SFfP4btG/erYuSa', '2022-05-13 17:30:22', '2022-05-13 17:30:22', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);
INSERT INTO `sys_user` VALUES (16, 'admin2', '$2a$10$NBgZt6yuRPsPABtE4ijn/uztszhf9o5JxY8jWXS/3/Mkr8ndjfgPS', '2022-05-13 17:30:34', '2022-05-13 17:30:34', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 15);
INSERT INTO `sys_user` VALUES (17, 'admin3', '$2a$10$H4gdRk6p0kLS7xiahfKkk.tPt6fE6.GLShTlzzZq8vDVeYg4dvQe.', '2022-05-13 17:30:55', '2022-05-13 17:30:55', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 30);
INSERT INTO `sys_user` VALUES (18, 'admin4', '$2a$10$fW0wNdXRVgIBIBSE/qNE4e7gk2oTBGE7bEDZdsUWWXxNSURWxVUVm', '2022-05-13 17:31:52', '2022-05-13 17:31:52', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);
INSERT INTO `sys_user` VALUES (19, 'admin5', '$2a$10$dinxmu2ciMwNWj.wsPWaw.DjQe3X6YDdHS0OT0a2Hyzf0.mR//LHi', '2022-05-13 17:32:53', '2022-05-13 17:32:53', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);
INSERT INTO `sys_user` VALUES (20, 'admin6', '$2a$10$IUJyoba3WxhQ3PmuYoQd/ewaenpLxF6rKeorGAXTq.PO.KAY9H2se', '2022-05-13 17:33:05', '2022-05-13 17:33:05', 1, 1, 13131313131, '287643967@qq.com', NULL, NULL, '02884449802', 15);
INSERT INTO `sys_user` VALUES (21, 'admin7', '$2a$10$sG4dHshMCrPCok2ymQRE1eNT4N2tlr3FMC58dE/ewnHgQ6RXVxypi', '2022-05-13 17:33:16', '2022-05-13 17:33:16', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);
INSERT INTO `sys_user` VALUES (22, 'admin8', '$2a$10$uCdChqAXREB7AahFVlOrJ.huaBEcEyY5ZGVz2nJuJVKifqmPljBYe', '2022-05-13 17:33:27', '2022-05-13 17:33:27', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);
INSERT INTO `sys_user` VALUES (23, 'admin9', '$2a$10$KEr2Fet0ZAIrYZdSLYGnR.JrTUqVtum3TXc7.f6UWnYSV86zJMAqe', '2022-05-13 17:33:40', '2022-05-13 17:33:40', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 15);
INSERT INTO `sys_user` VALUES (24, 'admin10', '$2a$10$EUpmW8KmM.2c0sLl62OVZu.ovDC85WgHSvFhr1wkbuRVBxc8Lj50.', '2022-05-13 17:33:53', '2022-05-13 17:33:53', 1, 1, 13131313131, '345@adf.v', NULL, NULL, '02884449802', 17);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1);
INSERT INTO `user_role` VALUES (2, 2);
INSERT INTO `user_role` VALUES (3, 2);
INSERT INTO `user_role` VALUES (4, 1);
INSERT INTO `user_role` VALUES (5, 1);
INSERT INTO `user_role` VALUES (6, 1);
INSERT INTO `user_role` VALUES (7, 1);
INSERT INTO `user_role` VALUES (8, 1);
INSERT INTO `user_role` VALUES (9, 1);
INSERT INTO `user_role` VALUES (11, 1);
INSERT INTO `user_role` VALUES (12, 1);
INSERT INTO `user_role` VALUES (13, 1);
INSERT INTO `user_role` VALUES (14, 1);
INSERT INTO `user_role` VALUES (10, 1);
INSERT INTO `user_role` VALUES (15, 2);
INSERT INTO `user_role` VALUES (16, 1);
INSERT INTO `user_role` VALUES (16, 2);
INSERT INTO `user_role` VALUES (17, 1);
INSERT INTO `user_role` VALUES (18, 1);
INSERT INTO `user_role` VALUES (19, 1);
INSERT INTO `user_role` VALUES (19, 2);
INSERT INTO `user_role` VALUES (20, 1);
INSERT INTO `user_role` VALUES (21, 1);
INSERT INTO `user_role` VALUES (21, 2);
INSERT INTO `user_role` VALUES (22, 1);
INSERT INTO `user_role` VALUES (23, 1);
INSERT INTO `user_role` VALUES (23, 2);
INSERT INTO `user_role` VALUES (24, 1);
INSERT INTO `user_role` VALUES (24, 2);

SET FOREIGN_KEY_CHECKS = 1;
