<div align="center">

# 🚀 ng-antd-admin

**基于 Angular 21 的企业级中后台前端解决方案**

[![CodeFactor](https://www.codefactor.io/repository/github/huajian123/ng-antd-admin/badge)](https://www.codefactor.io/repository/github/huajian123/ng-antd-admin)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%2021-red?logo=angular)](https://www.github.com/angular/angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![ng-zorro](https://img.shields.io/badge/ng--zorro--antd-21-blue?logo=ant-design)

[在线预览](https://huajian123.github.io/ng-antd-admin/) · [功能演示](https://www.bilibili.com/video/BV1gF411x7rN/) · [问题反馈](https://github.com/huajian123/ng-antd-admin/issues) · [更新日志](https://github.com/huajian123/ng-antd-admin/releases)

<img src="https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/11.png?raw=true" alt="系统截图" width="800"/>
</div>

---

## 📖 项目简介

**ng-antd-admin** 是一个**生产就绪**的企业级中后台前端解决方案，基于 **Angular 21** 和 **ng-zorro-antd 21** 构建。

本项目紧跟 Angular 技术演进，充分利用最新特性，包括 **Standalone Components**、**Zoneless Change Detection**、**Signals API** 和 **View Transitions**，旨在为开发者提供一个现代化、高性能、易于维护的开发模板。

### 💡 为什么选择 ng-antd-admin？

- ✅ **技术前沿**：率先拥抱 Angular 21 全新生态（Signals, Zoneless, Control Flow）。
- ✅ **性能卓越**：全链路 OnPush 策略 + 智能路由复用 + 懒加载，体验媲美原生应用。
- ✅ **开箱即用**：内置成熟的 RBAC 权限系统、主题切换、多页签管理等核心功能。
- ✅ **代码规范**：集成严格的 ESLint + TypeScript + Prettier 配置，保障代码质量。
- ✅ **教学友好**：代码注释详尽，不仅是脚手架，更是学习现代 Angular 的最佳实践。
- ✅ **持续维护**：承诺跟随 Angular 官方版本长期更新迭代。

---

## ✨ 核心特性

### 🎯 技术栈一览

| 技术 | 版本 | 说明 |
|------|------|------|
| **Angular** | 21.0.3 | 核心框架，全面采用 Standalone 架构 |
| **TypeScript** | 5.9.3 | 开发语言，开启严格模式 |
| **ng-zorro-antd** | 21.0.0 | 企业级 UI 组件库 (Ant Design) |
| **RxJS** | 7.8.0 | 响应式编程库 |
| **Less** | 4.2.0 | CSS 预处理器 |
| **NestJS** | 10.x | (可选) 后端服务框架 |

### 🚀 前沿特性详解

#### 1️⃣ Standalone Components - 零 NgModule
告别繁琐的 `NgModule`，组件依赖更清晰。
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './example.component.html'
})
export class ExampleComponent {}
```

#### 2️⃣ Zoneless Change Detection - 性能飞跃
移除 `zone.js` 依赖，变更检测性能提升 30% 以上。
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
```

#### 3️⃣ Signals API - 细粒度响应式
使用 Signals 替代部分 RxJS 流，状态管理更直观。
```typescript
export class ThemeService {
  $isNightTheme = signal(false);
  $themesOptions = signal<SettingInterface>({ ...defaultOptions });
  
  toggleTheme() {
    this.$isNightTheme.update(v => !v);
  }
}
```

#### 4️⃣ 智能路由复用 (Keep-Alive)
实现了类似 Vue `keep-alive` 的路由缓存机制，支持滚动位置记忆。
```typescript
// 路由配置
data: { 
  key: 'user-list',           // 缓存唯一标识
  scrollContain: ['#table']   // 自动恢复滚动条位置
}
```

#### 5️⃣ View Transitions API
原生级别的路由过渡动画，丝般顺滑。
```typescript
provideRouter(routes, withViewTransitions({ skipInitialTransition: true }))
```

---

## 🏗️ 架构与功能

### 前端架构
- **模块化设计**：清晰的目录结构 (`core` 核心, `shared` 共享, `pages` 页面, `widget` 组件)。
- **依赖注入**：全面使用 `inject()` 函数，代码更简洁。
- **极致性能**：全局 OnPush 策略 + 自定义预加载策略。

### UI 功能
- 🌈 **多主题**：默认、暗黑、阿里云、紧凑 4 种风格一键切换。
- 🔖 **多页签**：支持右键菜单、拖拽排序，类浏览器体验。
- 📱 **响应式**：完美适配 PC、平板、手机等各种屏幕尺寸。
- 🔒 **安全增强**：内置锁屏功能、细粒度的按钮级权限控制。

### 后端集成 (可选)
提供基于 **NestJS + PostgreSQL + Drizzle ORM** 的完整后端服务：
- **RBAC 模型**：用户-角色-菜单-权限的精细化控制。
- **JWT 认证**：标准的 Token 身份验证流程。
- **完整模块**：包含用户管理、部门管理、菜单管理等基础业务接口。

---

## 📦 快速开始

### 方式一：仅前端预览 (推荐体验)
使用 MSW (Mock Service Worker) 模拟数据，无需启动后端即可体验完整功能。

```bash
# 1. 克隆 mock 分支
git clone -b mock https://github.com/huajian123/ng-antd-admin.git

# 2. 进入前端目录
cd ng-antd-admin/ui

# 3. 安装依赖
npm install

# 4. 启动项目
npm start

# 5. 访问 http://localhost:4201
```

> 也可直接在线预览：[https://huajian123.github.io/ng-antd-admin/](https://huajian123.github.io/ng-antd-admin/)

### 方式二：完整全栈版 (前端 + 后端)
适合需要二次开发完整业务系统的场景。

#### 1. 启动后端 (NestJS)
```bash
# 1. 确保已安装 Docker
docker --version

# 2. 进入后端目录
cd nest-api

# 3. 启动 PostgreSQL 容器
docker-compose up -d

# 4. 导入数据库
# 使用 DataGrip/Navicat 等工具连接数据库
# 主机: localhost / 用户名: admin / 密码: 123456
# 数据库: ng-antd-admin-db
# 执行文件: nest-api/ng-antd-admin-db.sql

# 5. 安装依赖并启动
npm install
npm run start
```

#### 2. 启动前端
```bash
# 1. 进入前端目录
cd ui

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm start

# 4. 浏览器访问 http://localhost:4201
```

### 方式三：纯净版 (零业务代码)
仅保留基础架构，适合直接对接已有后端 API。

```html
https://gitee.com/hjxiaoqianduan/ng-ant-admin-pure
```

---

## 📚 核心开发指南

### 1. 路由复用配置
在路由定义中通过 `data` 属性控制缓存行为：

```typescript
const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: { 
      key: 'list-page',         // 必须：唯一标识
      shouldDetach: 'no',       // 可选：设为 'no' 则强制不缓存
      scrollContain: ['#list']  // 可选：缓存滚动条的选择器
    }
  }
];

// 组件生命周期钩子
export class ListComponent {
  _onReuseInit() {
    console.log('页面从缓存中恢复');
  }
  _onReuseDestroy() {
    console.log('页面被缓存');
  }
}
```

### 2. 响应式布局监听
使用 `WindowsWidthService` 轻松响应屏幕变化：

```typescript
// 注入服务
private winWidthService = inject(WindowsWidthService);

// 监听断点
this.winWidthService.getWindowWidthStore()
  .pipe(takeUntilDestroyed())
  .subscribe(width => {
    console.log('当前屏幕断点:', width); // xs, sm, md, lg, xl, xxl
  });
```

### 3. 多页签控制
支持在新标签页打开详情，或在同一标签页复用组件。

```typescript
// 场景A：列表点详情，打开新 Tab,请看在线地址上的演示，菜单为：功能>标签页操作>打开详情页1、打开详情页2、打开详情页3
{ 
  path: 'detail/:id', 
  component: DetailComponent, 
  data: { newTab: 'true', title: '详情', key: 'detail' } 
}

// 场景B：不同路由复用同一组件（如“添加”和“编辑”）,在当前页签中打开详情,场景请看在线地址上的演示，菜单为：系统管理>角色管理>设置权限
// 只要 title 相同，多页签系统会视为同一组业务
{ path: 'add', component: FormComponent, title: '用户管理' },
{ path: 'edit/:id', component: FormComponent, title: '用户管理' }
```

---

## 🗂️ 版本说明

| ng-antd-admin 版本 | Angular 版本 | 说明 | 下载 |
|-------------------|-------------|------|------|
| **Master (最新)** | **Angular 21+** | 全新架构，推荐使用 | [源码](https://github.com/huajian123/ng-antd-admin) |
| v18.x | Angular 18 | 稳定版 | [下载](https://github.com/huajian123/ng-antd-admin/tree/v18) |
| v17.x | Angular 17 | 引入 Signals | [下载](https://github.com/huajian123/ng-antd-admin/tree/v17) |
| v15.x | Angular 15 | 传统 NgModule 版本 | [下载](https://github.com/huajian123/ng-antd-admin/tree/v15) |

> ⚠️ **注意**：Angular 15+ 引入了 Standalone Components，项目结构变化较大。请根据您的团队技术栈选择对应的版本。

---

## 🤝 参与贡献

我们非常欢迎各种形式的贡献！
- 🐛 **提交 Bug**：请详细描述复现步骤。
- 💡 **功能建议**：提出您想要的特性。
- 📝 **文档改进**：帮助完善文档和注释。
- 🔧 **Pull Request**：提交您的代码改进。

### 开发规范命令
```bash
npm run prettier      # 格式化代码
npm run lint          # ESLint 检查
npm run lint:fix      # 自动修复 Lint 问题
npm run lint:style    # 样式检查
```

---

## ⭐ Star History

如果这个项目对你有帮助，请给个 **Star** ⭐️ 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=huajian123/ng-antd-admin&type=Date)](https://star-history.com/#huajian123/ng-antd-admin&Date)

---

## 💼 联系与支持

### 💬 交流群
如果你有好的建议，或者想参与项目开发，欢迎加微信：**hj345678912**，备注 "Angular"，我拉你进交流群一起学习进步！

### 💼 商业合作
提供企业级定制开发、远程工作、兼职外包服务。
- **前端**：Angular, React, Vue
- **后端**：NestJS, Node.js
- **移动端**：React Native, Flutter

### ☕ 赞助作者
如果本项目对您有用，正巧您如果也想请我喝一杯咖啡，请扫下面的码，哈哈。在此感谢您<br>

| 微信赞助 | 支付宝赞助 |
|:---:|:---:|
| <img src="https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/weixin.jpeg" width="150" alt="微信"/> | <img src="https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/zhifubao.jpeg" width="150" alt="支付宝"/> |

---

## 📄 开源协议

本项目基于 [MIT License](https://github.com/huajian123/ng-antd-admin/blob/master/LICENSE) 开源。

**Made with ❤️ by huajian123**
