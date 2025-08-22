/*
 Navicat Premium Dump SQL

 Source Server         : ng-antd-admin-db
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : localhost:5432
 Source Catalog        : ng-antd-admin-db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 22/08/2025 19:25:14
*/


-- ----------------------------
-- Sequence structure for department_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."department_id_seq";
CREATE SEQUENCE "public"."department_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."department_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for menu_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."menu_id_seq";
CREATE SEQUENCE "public"."menu_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."menu_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_id_seq";
CREATE SEQUENCE "public"."role_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."role_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for sys_role_perm_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sys_role_perm_id_seq";
CREATE SEQUENCE "public"."sys_role_perm_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."sys_role_perm_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for sys_user_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sys_user_role_id_seq";
CREATE SEQUENCE "public"."sys_user_role_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."sys_user_role_id_seq" OWNER TO "admin";

-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."user_id_seq" OWNER TO "admin";

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS "public"."department";
CREATE TABLE "public"."department" (
                                       "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                           INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                       "father_id" int4,
                                       "department_name" varchar(255) COLLATE "pg_catalog"."default",
                                       "order_num" int4,
                                       "state" bool DEFAULT true,
                                       "updated_at" timestamp(6),
                                       "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                       "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."department" OWNER TO "admin";

-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (1, 0, 'Ant科技', 0, 't', NULL, '2024-11-19 13:28:41.89055', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (2, 1, '南京总公司', 0, 't', NULL, '2024-11-19 13:28:50.898313', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (3, 1, '上海分公司', 0, 't', NULL, '2024-11-19 13:29:01.310086', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (4, 2, '研发部门', 0, 't', NULL, '2024-11-19 13:29:09.132471', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (5, 2, '测试部门', 1, 't', NULL, '2024-11-19 13:29:15.138077', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (6, 3, '市场部门', 0, 't', NULL, '2024-11-19 13:29:21.009278', NULL);
INSERT INTO "public"."department" ("id", "father_id", "department_name", "order_num", "state", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (7, 3, '营销部门', 1, 't', NULL, '2024-11-19 13:29:27.913413', NULL);
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."menu";
CREATE TABLE "public"."menu" (
                                 "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                     INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                 "father_id" int4 NOT NULL,
                                 "menu_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                                 "menu_type" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
                                 "al_icon" varchar(255) COLLATE "pg_catalog"."default",
                                 "icon" varchar(255) COLLATE "pg_catalog"."default",
                                 "path" varchar(255) COLLATE "pg_catalog"."default",
                                 "code" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
                                 "order_num" int4 NOT NULL,
                                 "status" bool DEFAULT true,
                                 "new_link_flag" bool DEFAULT false,
                                 "visible" bool DEFAULT true,
                                 "updated_at" timestamp(6),
                                 "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                 "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."menu" OWNER TO "admin";

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (1, 0, 'Dashboard', 'C', '', 'dashboard', '/default/dashboard', 'default:dashboard', 1, 't', 'f', 't', '2022-05-11 05:42:19', '2022-03-31 00:03:44', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (40, 1, '分析页', 'C', '', 'fund', '/default/dashboard/analysis', 'default:dashboard:analysis', 1, 't', 'f', 't', '2022-05-13 01:05:35', '2022-05-10 00:24:08', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (44, 43, '表单页', 'C', NULL, 'form', '/default/page-demo/form', 'default:page-demo:form', 1, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:26:49', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (45, 44, '基础表单', 'C', NULL, 'form', '/default/page-demo/form/base-form', 'default:page-demo:form:base-form', 1, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:40:56', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (49, 48, '搜索列表', 'C', NULL, '', '/default/page-demo/list/search-list', 'default:page-demo:list:search-list', 1, 't', 'f', 't', '2022-05-13 09:29:23', '2022-05-10 00:45:15', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (50, 49, '搜索列表(文章)', 'C', NULL, 'table', '/default/page-demo/list/search-list/article', 'default:page-demo:list:search-list:article', 1, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:47:13', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (62, 61, '基础详情页', 'C', NULL, 'profile', '/default/page-demo/detail/base-detail', 'default:page-demo:detail:base-detail', 1, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:48:10', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (65, 64, '成功页', 'C', NULL, 'check-circle', '/default/page-demo/result/success', 'default:page-demo:result:success', 1, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:50:00', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (68, 67, '403', 'C', NULL, 'warning', '/default/page-demo/except/except403', 'default:page-demo:except:except403', 1, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:51:55', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (72, 71, '个人中心', 'C', NULL, 'user', '/default/page-demo/personal/personal-center', 'default:page-demo:personal:personal-center', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:53:36', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (75, 74, '流程图', 'C', NULL, 'highlight', '/default/page-demo/flow/flow-chat', 'default:page-demo:flow:flow-chat', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:55:02', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (77, 76, '消息提示', 'C', NULL, 'dashboard', '/default/feat/msg', 'default:feat:msg', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:56:21', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (88, 87, 'zorro文档', 'C', NULL, 'dashboard', '/default/feat/frame/zorro-doc', 'default:feat:frame:zorro-doc', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:03:27', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (91, 90, '缓存滚动条', 'C', NULL, 'dashboard', '/default/feat/scroll/keep-scroll-page', 'default:feat:scroll:keep-scroll-page', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:06:02', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (94, 93, '高德', 'C', NULL, 'highlight', '/default/feat/charts/gaode-map', 'default:feat:charts:gaode-map', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:07:28', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (98, 97, '第一种', 'C', NULL, 'highlight', '/blank/other-login/login1', 'blank:other-login:login1', 1, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:09:10', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (105, 104, '基础组件', 'C', NULL, 'dashboard', '/default/comp/basic', 'default:comp:basic', 1, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:12:09', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (109, 108, '基础懒加载组件', 'C', NULL, 'dashboard', '/default/comp/lazy/lazy-basic', 'default:comp:lazy:lazy-basic', 1, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:13:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (114, 113, 'Menu1', 'C', NULL, 'menu', '/default/level/menu1', 'default:level:menu1', 1, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:15:34', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (115, 114, 'Menu1-1', 'C', NULL, '', '/default/level/menu1/menu1-1', 'default:level:menu1:menu1-1', 1, 't', 'f', 't', '2022-05-11 09:25:16', '2022-05-10 02:15:56', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (116, 115, 'Menu1-1-1', 'C', NULL, '', '/default/level/menu1/menu1-1/menu1-1-1', 'default:level:menu1:menu1-1:menu1-1-1', 1, 't', 'f', 't', '2022-05-11 09:24:43', '2022-05-10 02:16:28', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (121, 120, '账号管理', 'C', '', 'menu', '/default/system/account', 'default:system:account', 1, 't', 'f', 't', '2022-05-10 07:08:02', '2022-05-10 02:18:29', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (126, 123, '菜单管理新增', 'F', NULL, NULL, NULL, 'default:system:menu:add', 1, 't', 'f', 't', '2022-05-10 07:05:49', '2022-05-10 02:21:23', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (130, 124, '部门管理新增', 'F', NULL, NULL, '', 'default:system:dept:add', 1, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:57:09', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (134, 121, '账号管理新增', 'F', NULL, NULL, '', 'default:system:account:add', 1, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:59:54', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (137, 122, '角色管理新增', 'F', NULL, NULL, '', 'default:system:role-manager:add', 1, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:01:17', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (148, 147, '可收缩表单', 'C', NULL, 'minus-square', '/default/comp/form/shrink-form', 'default:comp:form:shrink-form', 1, 't', 'f', 't', '2022-09-02 06:34:24', '2022-09-02 06:21:30', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (41, 1, '监控页', 'C', NULL, 'fund', '/default/dashboard/monitor', 'default:dashboard:monitor', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:24:55', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (43, 0, '页面', 'C', NULL, 'appstore', '/default/page-demo', 'default:page-demo', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:25:49', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (46, 44, '分步表单', 'C', NULL, 'form', '/default/page-demo/form/step-form', 'default:page-demo:form:step-form', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:41:39', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (48, 43, '列表页', 'C', NULL, 'table', '/default/page-demo/list', 'default:page-demo:list', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:43:55', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (51, 49, '搜索列表(项目)', 'C', NULL, 'table', '/default/page-demo/list/search-list/project', 'default:page-demo:list:search-list:project', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:47:59', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (53, 48, '查询表格', 'C', NULL, 'table', '/default/page-demo/list/search-table', 'default:page-demo:list:search-table', 2, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:50:30', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (63, 61, '高级详情页', 'C', NULL, 'profile', '/default/page-demo/detail/adv-detail', 'default:page-demo:detail:adv-detail', 2, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:48:29', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (66, 64, '失败页', 'C', NULL, 'check-circle', '/default/page-demo/result/fail', 'default:page-demo:result:fail', 2, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:50:42', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (69, 67, '404', 'C', NULL, 'warning', '/default/page-demo/except/except404', 'default:page-demo:except:except404', 2, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:52:15', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (73, 71, '个人设置', 'C', '', 'user', '/default/page-demo/personal/personal-setting', 'default:page-demo:personal:personal-setting', 2, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:54:03', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (78, 76, '图标', 'C', NULL, 'dashboard', '/default/feat/icons', 'default:feat:icons', 2, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:56:43', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (89, 87, '外部链接', 'C', NULL, 'usergroup-delete', 'https://github.com/huajian123/ng-antd-admin', 'https://github.com/huajian123/ng-antd-admin', 2, 't', 't', 't', '2022-05-10 06:58:53', '2022-05-10 02:05:11', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (92, 90, '玩弄滚动条', 'C', NULL, 'dashboard', '/default/feat/scroll/play-scroll', 'default:feat:scroll:play-scroll', 2, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:06:24', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (95, 93, '百度', 'C', NULL, 'highlight', '/default/feat/charts/baidu-map', 'default:feat:charts:baidu-map', 2, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:07:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (106, 104, '动画组件', 'C', NULL, 'dashboard', '/default/comp/transition', 'default:comp:transition', 2, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:12:32', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (110, 108, '滚动懒加载', 'C', NULL, 'dashboard', '/default/comp/lazy/lazy-scroll', 'default:comp:lazy:lazy-scroll', 2, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:13:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (117, 115, 'Menu1-1-2', 'C', NULL, '', '/default/level/menu1/menu1-1/menu1-1-2', 'default:level:menu1:menu1-1:menu1-1-2', 2, 't', 'f', 't', '2022-05-11 09:24:54', '2022-05-10 02:16:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (118, 114, 'Menu1-2', 'C', NULL, 'menu', '/default/level/menu1/menu1-2', 'default:level:menu1:menu1-2', 2, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:17:14', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (119, 113, 'Menu2', 'C', NULL, 'menu', '/default/level/menu2', 'default:level:menu2', 2, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:17:37', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (122, 120, '角色管理', 'C', 'icon-mel-help', '', '/default/system/role-manager', 'default:system:role-manager', 2, 't', 'f', 't', '2022-05-10 07:08:12', '2022-05-10 02:18:55', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (127, 123, '菜单管理编辑', 'F', NULL, NULL, NULL, 'default:system:menu:edit', 2, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:51:38', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (131, 124, '部门管理编辑', 'F', NULL, NULL, '', 'default:system:dept:edit', 2, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:57:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (135, 121, '账号管理编辑', 'F', NULL, NULL, '', 'default:system:account:edit', 2, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:00:15', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (138, 122, '角色管理编辑', 'F', NULL, NULL, '', 'default:system:role-manager:edit', 2, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:01:35', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (150, 147, '表单增删', 'C', NULL, 'chrome', '/default/comp/form/append-form', 'default:comp:form:append-form', 2, 't', 'f', 't', '2022-10-21 13:31:08', '2022-10-21 13:31:08', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (42, 1, '工作台', 'C', NULL, 'appstore', '/default/dashboard/workbench', 'default:dashboard:workbench', 3, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:25:19', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (47, 44, '高级表单', 'C', NULL, 'form', '/default/page-demo/form/advanced-form', 'default:page-demo:form:advanced-form', 3, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:43:02', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (52, 49, '搜索列表(应用)', 'C', NULL, 'table', '/default/page-demo/list/search-list/application', 'default:page-demo:list:search-list:application', 3, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:49:16', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (54, 48, '树状表格', 'C', NULL, 'table', '/default/page-demo/list/tree-list', 'default:page-demo:list:tree-list', 3, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:51:14', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (61, 43, '详情页', 'C', NULL, 'profile', '/default/page-demo/detail', 'default:page-demo:detail', 3, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:47:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (70, 67, '500', 'C', NULL, 'warning', '/default/page-demo/except/except500', 'default:page-demo:except:except500', 3, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:52:37', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (76, 0, '功能', 'C', NULL, 'star', '/default/feat', 'default:feat', 3, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:55:41', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (79, 76, '右键菜单', 'C', NULL, 'dashboard', '/default/feat/context-menu', 'default:feat:context-menu', 3, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:58:45', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (96, 93, 'Echarts', 'C', NULL, 'highlight', '/default/feat/charts/echarts', 'default:feat:charts:echarts', 3, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:08:14', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (107, 104, '在线excel', 'C', NULL, 'dashboard', '/default/comp/luckysheet', 'default:comp:luckysheet', 3, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:12:49', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (123, 120, '菜单管理', 'C', '', 'menu', '/default/system/menu', 'default:system:menu', 3, 't', 'f', 't', '2022-05-10 07:08:23', '2022-05-10 02:21:23', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (128, 123, '菜单管理删除', 'F', NULL, NULL, NULL, 'default:system:menu:del', 3, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:52:25', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (132, 124, '部门管理删除', 'F', NULL, NULL, '', 'default:system:dept:del', 3, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:57:57', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (136, 121, '账号管理删除', 'F', NULL, NULL, '', 'default:system:account:del', 3, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:00:40', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (139, 122, '角色管理删除', 'F', NULL, NULL, '', 'default:system:role-manager:del', 3, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:01:59', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (55, 48, '标准表格', 'C', NULL, 'table', '/default/page-demo/list/standard-table', 'default:page-demo:list:standard-table', 4, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:51:50', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (64, 43, '结果页', 'C', NULL, 'check-circle', '/default/page-demo/result', 'default:page-demo:result', 4, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:49:22', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (80, 76, '图片预览', 'C', NULL, 'dashboard', '/default/feat/img-preview', 'default:feat:img-preview', 4, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:59:10', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (104, 0, '组件', 'C', NULL, 'star', '/default/comp', 'default:comp', 4, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:11:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (108, 104, '组件懒加载', 'C', NULL, 'dashboard', '/default/comp/lazy', 'default:comp:lazy', 4, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:13:15', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (124, 120, '部门管理', 'C', 'icon-mel-help', '', '/default/system/dept', 'default:system:dept', 4, 't', 'f', 't', '2022-05-10 07:08:34', '2022-05-10 02:21:58', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (129, 123, '菜单管理添加下级', 'F', NULL, NULL, '', 'default:system:menu:addlowlevel', 4, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:54:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (133, 124, '部门管理添加下级', 'F', NULL, NULL, '', 'default:system:dept:addlowlevel', 4, 't', 'f', 'f', '2022-05-10 07:05:49', '2022-05-10 02:58:30', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (140, 122, '角色管理设置角色', 'F', NULL, NULL, '', 'default:system:role-manager:set-role', 4, 't', 'f', 'f', '2022-05-10 07:05:50', '2022-05-10 03:02:20', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (146, 67, '网络错误', 'C', '', 'warning', '/default/page-demo/except/network-error', 'default:page-demo:except:network-error', 4, 't', 'f', 't', '2022-08-30 06:11:33', '2022-08-30 06:11:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (56, 48, '卡片列表', 'C', NULL, 'table', '/default/page-demo/list/card-table', 'default:page-demo:list:card-table', 5, 't', 'f', 't', '2022-05-10 02:31:12', '2022-05-10 00:52:23', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (67, 43, '异常页', 'C', NULL, 'warning', '/default/page-demo/except', 'default:page-demo:except', 5, 't', 'f', 't', '2022-05-10 06:58:35', '2022-05-10 01:51:32', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (81, 76, '全屏', 'C', NULL, 'dashboard', '/default/feat/full-screen', 'default:feat:full-screen', 5, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:59:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (111, 104, '详情组件', 'C', NULL, 'dashboard', '/default/comp/desc', 'default:comp:desc', 5, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:14:23', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (113, 0, '多级菜单', 'C', NULL, 'menu', '/default/level', 'default:level', 5, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:15:12', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (149, 67, '无数据', 'C', NULL, 'warning', '/default/page-demo/except/no-data', 'default:page-demo:except:no-data', 5, 't', 'f', 't', '2022-09-10 10:09:25', '2022-09-10 10:09:25', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (71, 43, '个人页', 'C', NULL, 'user', '/default/page-demo/personal', 'default:page-demo:personal', 6, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 01:53:13', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (82, 76, '标签页操作', 'C', NULL, 'dashboard', '/default/feat/tabs', 'default:feat:tabs', 6, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:00:00', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (112, 104, '密码强度校验组件', 'C', NULL, 'dashboard', '/default/comp/strength-meter', 'default:comp:strength-meter', 6, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:14:44', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (120, 0, '系统管理', 'C', '', 'menu', '/default/system', 'default:system', 6, 't', 'f', 't', '2022-05-10 07:07:49', '2022-05-10 02:18:12', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (74, 43, '图形编辑器', 'C', 'icon-mel-help', NULL, '/default/page-demo/flow', 'default:page-demo:flow', 7, 't', 'f', 't', '2022-05-10 07:06:00', '2022-05-10 01:54:38', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (83, 76, '拖拽modal', 'C', NULL, 'dashboard', '/default/feat/ex-modal', 'default:feat:ex-modal', 7, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:00:35', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (147, 104, 'Form', 'C', NULL, 'form', '/default/comp/form', 'default:comp:form', 7, 't', 'f', 't', '2022-09-02 06:20:21', '2022-09-02 06:20:21', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (84, 76, '封装抽屉', 'C', NULL, 'dashboard', '/default/feat/ex-drawer', 'default:feat:ex-drawer', 8, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:01:03', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (151, 43, '任务', 'C', NULL, 'border-bottom', '/default/page-demo/task', 'default:page-demo:task', 8, 't', 'f', 't', '2023-10-10 13:49:45', '2023-10-10 13:49:45', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (85, 76, '富文本', 'C', NULL, 'dashboard', '/default/feat/rich-text', 'default:feat:rich-text', 9, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:01:26', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (166, 43, '新布局', 'C', NULL, 'caret-down', '/default/page-demo/page-demo1', 'default:page-demo:page-demo1', 9, 't', 'f', 't', '2024-05-02 15:24:50', '2024-05-02 15:24:50', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (86, 76, 'clickOutSide', 'C', NULL, 'dashboard', '/default/feat/click-out-side', 'default:feat:click-out-side', 10, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:01:52', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (154, 43, '新页面2', 'C', NULL, 'up', '/default/page-demo/page-demo2', 'default:page-demo:page-demo2', 10, 't', 'f', 't', '2024-05-02 15:18:31', '2024-05-02 15:18:31', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (87, 76, '外部文档', 'C', NULL, 'dashboard', '/default/feat/frame', 'default:feat:frame', 11, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:02:33', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (167, 43, '新页面3', 'C', NULL, 'down', '/default/page-demo/page-demo3', 'default:page-demo:page-demo3', 11, 't', 'f', 't', '2024-05-02 15:25:14', '2024-05-02 15:25:14', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (90, 76, '滚动条', 'C', NULL, 'dashboard', '/default/feat/scroll', 'default:feat:scroll', 12, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:05:43', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (168, 43, '新页面4', 'C', NULL, 'caret-down', '/default/page-demo/page-demo4', 'default:page-demo:page-demo4', 12, 't', 'f', 't', '2024-05-02 15:25:53', '2024-05-02 15:25:53', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (93, 76, '图表', 'C', NULL, 'dashboard', '/default/feat/charts', 'default:feat:charts', 13, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:06:59', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (97, 76, '其他登录方式', 'C', NULL, 'dashboard', '/blank/other-login', 'blank:other-login', 14, 't', 'f', 't', '2022-05-10 06:58:36', '2022-05-10 02:08:41', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (99, 76, '颜色选择器', 'C', NULL, 'usergroup-delete', '/default/feat/color-sel', 'default:feat:color-sel', 15, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:09:41', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (100, 76, '水波纹', 'C', NULL, 'usergroup-delete', '/default/feat/ripple', 'default:feat:ripple', 16, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:10:02', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (101, 76, '剪切板', 'C', NULL, 'usergroup-delete', '/default/feat/copy', 'default:feat:copy', 17, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:10:24', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (102, 76, '空白页', 'C', NULL, 'usergroup-delete', '/blank/empty-page', 'blank:empty-page', 18, 't', 'f', 't', '2022-05-10 06:58:37', '2022-05-10 02:10:46', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (160, 104, 'blingbling', 'C', NULL, 'caret-down', '/default/comp/blingbling', 'default:comp:blingbling', 8, 't', 'f', 't', '2024-05-02 15:21:26', '2025-08-22 11:07:12.252', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (103, 76, '引导页', 'C', NULL, 'codepen', '/default/feat/setup', 'default:feat:setup', 19, 't', 'f', 't', '2022-05-10 07:00:24', '2022-05-10 02:11:25', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (141, 76, '登录超时', 'C', NULL, 'yuque', '/default/feat/session-timeout', 'default:feat:session-timeout', 20, 't', 'f', 't', '2022-05-11 06:57:28', '2022-05-11 06:57:16', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (142, 76, 'websocket', 'C', NULL, 'border-horizontal', '/default/feat/websocket', 'default:feat:websocket', 21, 't', 'f', 't', '2022-05-11 09:29:17', '2022-05-11 07:55:21', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (144, 76, '文件上传', 'C', NULL, 'up', '/default/feat/upload', 'default:feat:upload', 22, 't', 'f', 't', '2022-05-13 01:15:09', '2022-05-13 01:11:19', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (143, 76, '文件下载', 'C', NULL, 'arrow-down', '/default/feat/download', 'default:feat:download', 23, 't', 'f', 't', '2022-05-12 07:46:03', '2022-05-12 07:46:03', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (152, 76, '二维码', 'C', NULL, 'gitlab', '/default/feat/qrcode', 'default:feat:qrcode', 24, 't', 'f', 't', '2023-10-10 13:50:27', '2023-10-10 13:50:27', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (153, 76, '水印', 'C', NULL, 'windows', '/default/feat/water-mark', 'default:feat:water-mark', 25, 't', 'f', 't', '2023-10-10 14:05:21', '2023-10-10 14:05:21', NULL);
INSERT INTO "public"."menu" ("id", "father_id", "menu_name", "menu_type", "al_icon", "icon", "path", "code", "order_num", "status", "new_link_flag", "visible", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (4, 76, 'KeepAlive', 'C', NULL, 'border-horizontal', '/default/feat/keep-alive', 'default:feat:keep-alive', 26, 't', 'f', 't', NULL, '2025-08-22 11:11:18.893', NULL);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
                                 "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                     INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                 "role_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                                 "role_desc" varchar(255) COLLATE "pg_catalog"."default",
                                 "updated_at" timestamp(6),
                                 "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                 "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."role" OWNER TO "admin";

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO "public"."role" ("id", "role_name", "role_desc", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (1, '超级管理员', '拥有所有权限', NULL, '2024-11-19 13:26:21.226165', NULL);
INSERT INTO "public"."role" ("id", "role_name", "role_desc", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (2, '普通开发', '权限有限', NULL, '2024-11-19 13:26:33.038129', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_perm
-- ----------------------------
DROP TABLE IF EXISTS "public"."sys_role_perm";
CREATE TABLE "public"."sys_role_perm" (
                                          "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                              INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                          "role_id" int4 NOT NULL,
                                          "perm_code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                                          "updated_at" timestamp(6),
                                          "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                          "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."sys_role_perm" OWNER TO "admin";

-- ----------------------------
-- Records of sys_role_perm
-- ----------------------------
BEGIN;
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (1, 2, 'default:dashboard', NULL, '2024-11-19 13:26:42.775771', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (2, 2, 'default:dashboard:analysis', NULL, '2024-11-19 13:26:42.775771', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (3, 2, 'default:dashboard:monitor', NULL, '2024-11-19 13:26:42.775771', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (4, 2, 'default:dashboard:workbench', NULL, '2024-11-19 13:26:42.775771', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (5, 2, 'default:about', NULL, '2024-11-19 13:26:42.775771', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (358, 1, 'default:dashboard', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (359, 1, 'default:dashboard:analysis', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (360, 1, 'default:dashboard:monitor', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (361, 1, 'default:dashboard:workbench', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (362, 1, 'default:page-demo', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (363, 1, 'default:page-demo:form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (364, 1, 'default:page-demo:form:base-form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (365, 1, 'default:page-demo:form:step-form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (366, 1, 'default:page-demo:form:advanced-form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (367, 1, 'default:page-demo:list', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (368, 1, 'default:page-demo:list:search-list', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (369, 1, 'default:page-demo:list:search-list:article', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (370, 1, 'default:page-demo:list:search-list:project', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (371, 1, 'default:page-demo:list:search-list:application', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (372, 1, 'default:page-demo:list:search-table', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (373, 1, 'default:page-demo:list:tree-list', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (374, 1, 'default:page-demo:list:standard-table', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (375, 1, 'default:page-demo:list:card-table', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (376, 1, 'default:page-demo:detail', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (377, 1, 'default:page-demo:detail:base-detail', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (378, 1, 'default:page-demo:detail:adv-detail', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (379, 1, 'default:page-demo:result', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (380, 1, 'default:page-demo:result:success', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (381, 1, 'default:page-demo:result:fail', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (382, 1, 'default:page-demo:except', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (383, 1, 'default:page-demo:except:except403', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (384, 1, 'default:page-demo:except:except404', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (385, 1, 'default:page-demo:except:except500', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (386, 1, 'default:page-demo:except:network-error', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (387, 1, 'default:page-demo:except:no-data', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (388, 1, 'default:page-demo:personal', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (389, 1, 'default:page-demo:personal:personal-center', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (390, 1, 'default:page-demo:personal:personal-setting', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (391, 1, 'default:page-demo:flow', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (392, 1, 'default:page-demo:flow:flow-chat', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (393, 1, 'default:page-demo:task', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (394, 1, 'default:page-demo:page-demo1', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (395, 1, 'default:page-demo:page-demo2', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (396, 1, 'default:page-demo:page-demo3', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (397, 1, 'default:page-demo:page-demo4', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (398, 1, 'default:feat', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (399, 1, 'default:feat:msg', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (400, 1, 'default:feat:icons', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (401, 1, 'default:feat:context-menu', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (402, 1, 'default:feat:img-preview', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (403, 1, 'default:feat:full-screen', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (404, 1, 'default:feat:tabs', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (405, 1, 'default:feat:ex-modal', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (406, 1, 'default:feat:ex-drawer', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (407, 1, 'default:feat:rich-text', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (408, 1, 'default:feat:click-out-side', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (409, 1, 'default:feat:frame', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (410, 1, 'default:feat:frame:zorro-doc', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (411, 1, 'https://github.com/huajian123/ng-antd-admin', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (412, 1, 'default:feat:scroll', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (413, 1, 'default:feat:scroll:keep-scroll-page', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (414, 1, 'default:feat:scroll:play-scroll', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (415, 1, 'default:feat:charts', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (416, 1, 'default:feat:charts:gaode-map', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (417, 1, 'default:feat:charts:baidu-map', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (418, 1, 'default:feat:charts:echarts', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (419, 1, 'blank:other-login', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (420, 1, 'blank:other-login:login1', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (421, 1, 'default:feat:color-sel', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (422, 1, 'default:feat:ripple', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (423, 1, 'default:feat:copy', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (424, 1, 'blank:empty-page', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (425, 1, 'default:feat:setup', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (426, 1, 'default:feat:session-timeout', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (427, 1, 'default:feat:websocket', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (428, 1, 'default:feat:upload', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (429, 1, 'default:feat:download', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (430, 1, 'default:feat:qrcode', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (431, 1, 'default:feat:water-mark', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (432, 1, 'default:feat:keep-alive', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (433, 1, 'default:comp', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (434, 1, 'default:comp:basic', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (435, 1, 'default:comp:transition', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (436, 1, 'default:comp:luckysheet', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (437, 1, 'default:comp:lazy', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (438, 1, 'default:comp:lazy:lazy-basic', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (439, 1, 'default:comp:lazy:lazy-scroll', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (440, 1, 'default:comp:desc', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (441, 1, 'default:comp:strength-meter', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (442, 1, 'default:comp:form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (443, 1, 'default:comp:form:shrink-form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (444, 1, 'default:comp:form:append-form', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (445, 1, 'default:comp:blingbling', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (446, 1, 'default:level', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (447, 1, 'default:level:menu1', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (448, 1, 'default:level:menu1:menu1-1', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (449, 1, 'default:level:menu1:menu1-1:menu1-1-1', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (450, 1, 'default:level:menu1:menu1-1:menu1-1-2', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (451, 1, 'default:level:menu1:menu1-2', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (452, 1, 'default:level:menu2', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (453, 1, 'default:system', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (454, 1, 'default:system:account', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (455, 1, 'default:system:account:add', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (456, 1, 'default:system:account:edit', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (457, 1, 'default:system:account:del', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (458, 1, 'default:system:role-manager', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (459, 1, 'default:system:role-manager:add', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (460, 1, 'default:system:role-manager:edit', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (461, 1, 'default:system:role-manager:del', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (462, 1, 'default:system:role-manager:set-role', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (463, 1, 'default:system:menu', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (464, 1, 'default:system:menu:add', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (465, 1, 'default:system:menu:edit', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (466, 1, 'default:system:menu:del', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (467, 1, 'default:system:menu:addlowlevel', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (468, 1, 'default:system:dept', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (469, 1, 'default:system:dept:add', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (470, 1, 'default:system:dept:edit', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (471, 1, 'default:system:dept:del', NULL, '2025-08-22 11:20:35.781271', NULL);
INSERT INTO "public"."sys_role_perm" ("id", "role_id", "perm_code", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (472, 1, 'default:system:dept:addlowlevel', NULL, '2025-08-22 11:20:35.781271', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."sys_user_role";
CREATE TABLE "public"."sys_user_role" (
                                          "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                              INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                          "role_id" int4 NOT NULL,
                                          "user_id" int4 NOT NULL,
                                          "updated_at" timestamp(6),
                                          "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                          "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."sys_user_role" OWNER TO "admin";

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO "public"."sys_user_role" ("id", "role_id", "user_id", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (3, 1, 3, NULL, '2024-11-23 09:52:45.101522', NULL);
INSERT INTO "public"."sys_user_role" ("id", "role_id", "user_id", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (5, 2, 4, NULL, '2024-11-23 10:09:51.870838', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
                                 "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
                                     INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
                                 "email" varchar(255) COLLATE "pg_catalog"."default",
                                 "user_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                                 "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                                 "available" bool NOT NULL,
                                 "sex" int4 NOT NULL,
                                 "mobile" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
                                 "telephone" varchar(20) COLLATE "pg_catalog"."default",
                                 "department_id" int4 NOT NULL,
                                 "last_login_time" timestamp(6) DEFAULT now(),
                                 "updated_at" timestamp(6),
                                 "created_at" timestamp(6) NOT NULL DEFAULT now(),
                                 "deleted_at" timestamp(6)
)
;
ALTER TABLE "public"."user" OWNER TO "admin";

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO "public"."user" ("id", "email", "user_name", "password", "available", "sex", "mobile", "telephone", "department_id", "last_login_time", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (3, '287643967@qq.com', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$Luz1aQm4lsNaUL3G2EjIaw$8D/tDbkhT02WmB42CY/beFPDYot9TMppOvMKZ3LYo4I', 't', 1, '13131313131', '02884449802', 4, '2024-11-23 09:52:45.101522', NULL, '2024-11-23 09:52:45.101522', NULL);
INSERT INTO "public"."user" ("id", "email", "user_name", "password", "available", "sex", "mobile", "telephone", "department_id", "last_login_time", "updated_at", "created_at", "deleted_at") OVERRIDING SYSTEM VALUE VALUES (4, '287643967@qq.com', '普通用户', '$argon2id$v=19$m=65536,t=3,p=4$+7i55+ojvRh0ch48FHaknQ$7XQTQRICP4y+0xtkAJ/y9NSggiXt5ISkkxjznF2bNG4', 't', 1, '13131313131', '02884449802', 5, '2024-11-23 09:53:08.019371', NULL, '2024-11-23 10:09:51.872', NULL);
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."department_id_seq"
    OWNED BY "public"."department"."id";
SELECT setval('"public"."department_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."menu_id_seq"
    OWNED BY "public"."menu"."id";
SELECT setval('"public"."menu_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."role_id_seq"
    OWNED BY "public"."role"."id";
SELECT setval('"public"."role_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sys_role_perm_id_seq"
    OWNED BY "public"."sys_role_perm"."id";
SELECT setval('"public"."sys_role_perm_id_seq"', 472, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sys_user_role_id_seq"
    OWNED BY "public"."sys_user_role"."id";
SELECT setval('"public"."sys_user_role_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_id_seq"
    OWNED BY "public"."user"."id";
SELECT setval('"public"."user_id_seq"', 4, true);

-- ----------------------------
-- Auto increment value for department
-- ----------------------------
SELECT setval('"public"."department_id_seq"', 7, true);

-- ----------------------------
-- Primary Key structure for table department
-- ----------------------------
ALTER TABLE "public"."department" ADD CONSTRAINT "department_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for menu
-- ----------------------------
SELECT setval('"public"."menu_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for role
-- ----------------------------
SELECT setval('"public"."role_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for sys_role_perm
-- ----------------------------
SELECT setval('"public"."sys_role_perm_id_seq"', 472, true);

-- ----------------------------
-- Primary Key structure for table sys_role_perm
-- ----------------------------
ALTER TABLE "public"."sys_role_perm" ADD CONSTRAINT "sys_role_perm_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for sys_user_role
-- ----------------------------
SELECT setval('"public"."sys_user_role_id_seq"', 5, true);

-- ----------------------------
-- Primary Key structure for table sys_user_role
-- ----------------------------
ALTER TABLE "public"."sys_user_role" ADD CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
SELECT setval('"public"."user_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
