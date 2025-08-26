# ng-antd-admin

[![CodeFactor](https://www.codefactor.io/repository/github/huajian123/ng-antd-admin/badge)](https://www.codefactor.io/repository/github/huajian123/ng-antd-admin)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)

---

## ✨前言 / Foreword

我作为angular的粉丝，想以本项目作为我为angular社区尽一点力所能及之力，希望大家喜欢这个模板，也希望更多的国内开发者能重新审视angular这一前端框架，特别是ng17以后的版本，我相信angular会越来越好，我也会一直维护下去，如果您有什么好的建议，可以加我的微信号hj345678912，我拉你进交流群，一起学习进步交流（平时群里说话人不多）。

---

As an Angular fan, I want to contribute to the community with this project. I hope you like this template and that more domestic developers will reconsider Angular, especially post-NG17 versions. I believe Angular will get better and better, and I will continue to maintain this project. If you have any suggestions, please add my WeChat (**hj345678912**), and I'll add you to our discussion group for learning and collaboration.

## ✨如何启动 / How to Start

### 1. 如果你只想看看前端运行效果，直接拉取源码[这里](https://github.com/huajian123/ng-antd-admin/tree/ng17-mock)，这个ng18的纯前端版本，所有后台数据采用mock来提供
直接运行npm install，npm run start查看效果。

---

### 1. If you just want to see the frontend in action, pull the source code from [here](https://github.com/huajian123/ng-antd-admin/tree/ng17-mock). This pure frontend version uses mock data for all backend requests.

Simply run `npm install` and then `npm run start` to see the result.

### 2. 如果你想体验完整的真实的前后端增删改查，需要以下操作

1.  需要本地安装好docker，目的是安装数据库，如果你是高手，知道自己该做什么，可以忽略。
2.  进入nest-api目录下
3.  在命令行运行命令"docker-compose up -d"，用以安装postgresql镜像以及容器，
4.  启动docker中的容器新拉的postgresql容器，
5.  你可能需要一款数据库连接工具，例如用DataGrip,Navicat等工具连接docker中的postgres数据库。用户名“admin”，密码“123456”，数据库名称“ng-antd-admin-db”
6.  执行nest-api目录下的ng-antd-admin-db.sql这个sql
7.  在nest-api目录下npm install ,执行npm run start.在ui目录下执行npm install ,以及npm run push-drizzle,npm run start

---

### 2. If you want a complete experience with real backend CRUD functionality, you need to do the following:

1.  **Install Docker** locally to set up the database. (If you are an advanced user and know what to do, you can ignore this step.)
2.  Navigate to the `nest-api` directory.
3.  In the command line, run `docker-compose up -d` to install the PostgreSQL image and container.
4.  Start the new PostgreSQL container in Docker.
5.  You might need a database connection tool like DataGrip or Navicat to connect to the PostgreSQL database in Docker. The credentials are: **username** "admin", **password** "123456", **database name** "ng-antd-admin-db".
6.  Execute the `ng-antd-admin-db.sql` SQL script in the `nest-api` directory.
7.  In the `nest-api` directory, run `npm install` and then `npm run start`. In the `ui` directory, run `npm install` and  `npm run push-drizzle` then `npm run start`.

## ✨项目介绍 / Project Introduction

本项目也有一点点教学性质，其中用到大量angular新特性，有详细的注释以及参考文章链接在代码中，大家可以看看源码，有问题与我讨论，有改进处可以提pr，我们一起进步。

<font color=red>在线预览地址</font> [这里](https://huajian123.github.io/ng-antd-admin/)为了节省服务器费用，这个预览地址是基于ng18的纯静态网站，所有数据采用mswjs作为mock，如果你只想简单本地启动前端看看效果，可以下载这里的代码，直接npm安装好依赖就可以启动，源码[这里](https://github.com/huajian123/ng-antd-admin/tree/ng17-mock)，

我也提供了剔除掉所有第三方包以及所有业务，仅保留框架基本结构的纯净版，你可以基于纯净版对接你自己的后端服务，项目地址 [pure](https://gitee.com/hjxiaoqianduan/ng-antd-admin-pure/)，<br>

如果您用我的项目进行学习或者参考，请先确定您使用的是angular哪个版本，因为angular15后写法有部分不一样，所以我的建议是，您正在使用angular什么版本，则下载对应版本的ng-antd-admin,最新版本直接从master分支下载即可，历史版本在这个链接进行下载[这里](https://github.com/huajian123/ng-antd-admin/releases)。<br>

---

This project also has a teaching nature, using many of Angular's new features. There are detailed comments and reference links in the code. Feel free to explore the source code, discuss any issues with me, or submit a PR for improvements. Let's make progress together.

<font color=red>Online Preview Address</font> [here](https://huajian123.github.io/ng-antd-admin/). To save server costs, this preview is a pure static website based on NG18, with all data mocked using MSW. If you just want to run the frontend locally, you can download the code from [here](https://github.com/huajian123/ng-antd-admin/tree/ng17-mock), install dependencies, and run it.

I also provide a pure version with all third-party packages and business logic removed, retaining only the basic framework structure. You can use this pure version to connect to your own backend services. The project address is [pure](https://gitee.com/hjxiaoqianduan/ng-antd-admin-pure/).<br>

If you use my project for learning or reference, please confirm which Angular version you are using, as some writing styles have changed after Angular 15. My suggestion is to download the corresponding `ng-antd-admin` version for your Angular version. The latest version can be downloaded directly from the `master` branch, and historical versions can be downloaded from this link [here](https://github.com/huajian123/ng-antd-admin/releases).<br>

## ✨关于前端 / About the Frontend

* 支持最新angular版本 / Support the latest angular version
* 所有组件onPush,性能卓越 / All components use OnPush, excellent performance
* 代码示例丰富，有完整服务端后台，前后端分离示例 / Rich code examples with a complete backend and frontend separation example
* 常用工具类，服务， 指令，管道，封装了表格，抽屉，对话框等常用功能 / Common utility classes, services, directives, and pipes. It also encapsulates common functions like tables, drawers, and dialog boxes.
* <font color=red size=6>全部组件均为独立组件，文件量减少（如果需要module版本，请看[这里](https://github.com/huajian123/ng-antd-admin/releases/tag/v15.0)）</font> / <font color=red size=6>All components are standalone components, reducing the number of files (for the module version, see [here](https://github.com/huajian123/ng-antd-admin/releases/tag/v15.0))</font>
* 已开启zoneless / Zoneless is enabled

## ✨关于后端 / About the Backend

采用nestjs,drizzle,postgresql,以rbac为权限模型，集成了jwt,添加了接口权限，功能权限。完成用户管理，菜单管理，部门管理，角色管理等模块。开箱即用。

---

Built with NestJS, Drizzle, and PostgreSQL, using an RBAC (Role-Based Access Control) permission model. It integrates JWT and includes interface and function permissions. It features modules for user management, menu management, department management, and role management, ready to use out-of-the-box.

## ✨特性 / Features

* 支持最新angular版本 / Support the latest angular version
* 所有组件onPush,性能卓越 / All components use OnPush, excellent performance
* 代码示例丰富，有完整服务端后台，前后端分离示例 / Rich code examples with a complete backend and frontend separation example
* 常用工具类，服务， 指令，管道，封装了表格，抽屉，对话框等常用功能 / Common utility classes, services, directives, and pipes. It also encapsulates common functions like tables, drawers, and dialog boxes.
* <font color=red size=6>全部组件均为独立组件，文件量减少（如果需要module版本，请看[这里](https://github.com/huajian123/ng-antd-admin/releases/tag/v15.0)）</font> / <font color=red size=6>All components are standalone components, reducing the number of files (for the module version, see [here](https://github.com/huajian123/ng-antd-admin/releases/tag/v15.0))</font>

# ✨以前录制的使用教程 / Previous Video Tutorials

* 快速二开使用详解 [快速二开使用详解](https://www.bilibili.com/video/BV1gF411x7rN/)<br>
* 项目搭建简易教程 [项目搭建简易教程](https://www.bilibili.com/video/BV1EM4y1w7zd/)<br>

---

* Quick Development Guide: [https://www.bilibili.com/video/BV1gF411x7rN/](https://www.bilibili.com/video/BV1gF411x7rN/)<br>
* Simple Project Setup Guide: [https://www.bilibili.com/video/BV1EM4y1w7zd/](https://www.bilibili.com/video/BV1EM4y1w7zd/)<br>

# ✨前端的一些配置项 / Frontend Configuration

### 路由的key(routing key)

key需要设置成路由地址最后一个'/'后的字符串，并且要所有路由中唯一<br>
The key needs to be set to the string after the last '/' of the routing address, and it must be unique across all routes.<br>

```typescript
const routes: Routes = [
   {path: '', data: {key: 'login', shouldDetach: 'no'}, component: LoginFormComponent}
];
```

---

# 组件不需要保存状态，(Modules don't need to save state)
保存状态的意思是，类似于vue的keep-alive，在angular中称为路由复用，组件的状态会保留，不会由于切换页签而丢失状态，默认都是开启的，如果不需要这个功能，则配置shouldDetach: 'no'

---
Saving state is similar to Vue's keep-alive. In Angular, it's called route reuse, where the component's state is preserved and won't be lost when switching tabs. This is enabled by default. If you don't need this feature, set shouldDetach: 'no'.

---

```typescript
const routes: Routes = [
  {path: '', data: {key: 'login', shouldDetach: 'no'}, component: LoginFormComponent}
];
```

# 组件在保存状态下的生命周期(The temporary statement cycle of switching tab calls is as follows)
组件在保存状态下(即“路由复用”)的情况下切换页签，onInit,onOndestroy会失效(因为组件被缓存了，没有重新创建或者销毁)，我们提供了临时声明周期如下，可以在进入页面，或者离开页面时被触发
直接在目标组件中写出方法名为_onReuseInit或者_onReuseDestroy的方法即可实现，你可以全局搜这两个方法的名字，看示例<br>
It can be realized by directly writing the method named _onReuseInit or _onReuseDestroy in the target component<br>
```typescript
_onReuseInit: () => void;
_onReuseDestroy: () => void;

```

# 栅格系统监听(grid system monitoring)
```angular2html
enum EquipmentWidth {
  xs,  // (max-width: 575.98px)
  sm,  // (min-width: 576px) and (max-width: 767.98px)
  md,  // (min-width: 768px) and (max-width: 991.98px)
  lg,  // (min-width: 992px) and (max-width: 1199.98px)
  xl,  // (min-width: 1200px) and (max-width: 1599.98px)
  xxl  // (min-width: 1600px)
}
```
使用方式(How to use)
```
  constructor(private windowsWidthService: WindowsWidthService) {
  }
  
  this.windowsWidthService.getWindowWidthStore().pipe(takeUntil(this.destory$)).subscribe(res => {
    this.currentEquipmentWidth = res;
    this.cdr.markForCheck();
  })
```


# 组件不要预加载(Modules do not need to be preloaded)
如果模块不需要预加载则添加以下配置，默认都是开启的

---
If a module does not need to be preloaded, add the following configuration. Preloading is enabled by default.

```typescript
export const routes: Routes = [
  {
    path: 'contact',
    loadChildren: import(() => './contact/contact.module').then(m => m.ContactModule),
    data: {
      preload: false
    }
  }
];
```


# 模块中打开新tab页来展示详情，必须设置参数如下(Open a new tab page in the module to display the details, and the parameters must be set as follows)
在data中设置，这个场景请看在线地址上的演示，菜单为：功能>标签页操作>打开详情页1、打开详情页2、打开详情页3

---
Set this in the data object. For a demonstration of this scenario, see the online preview under the menu: Function > Tab Operations > Open Details Page 1, Open Details Page 2, Open Details Page 3.
```typescript
const routes: Routes = [
  {path: '', component: TabsComponent, data: {title: '标签页操作', key: 'tabs'}},
  {path: 'example-detail', component: DetailComponent, data: {newTab:'true', title: '演示详情', key: 'example-detail'}}
];
```

# 在当前页签中打开详情（Open details in the current tab）
在data中设置title需要是同样的，这样就可以在当前页签中打开详情，这个场景请看在线地址上的演示，菜单为：系统管理>角色管理>设置权限

---
Set the title in the data object to be the same for both routes. This allows the details to open in the current tab. For a demonstration, see the online preview under the menu: System Management > Role Management > Set Permissions.
```typescript
export default [
  {
    path: '',
    component: RoleManageComponent,
    title: '角色管理',
    data: { key: 'role-manage' }
  },
  {
    path: 'set-role',
    component: SetRoleComponent,
    title: '角色管理',
    data: {
      key: 'set-role',
      authCode: ActionCode.RoleManagerSetRole
    }
  }
] satisfies Route[];
```

# 缓存页面中指定容器的滚动条(The scroll bar of the specified container in the cache page)
在data中设置scrollContain 为元素选择器 (Set scrollContain as element selector in data)，这个场景请看在线地址上的演示，菜单为：功能>滚动条>缓存滚动条

---
Set scrollContain in the data object to an array of element selectors. For a demonstration, see the online preview under the menu: Function > Scrollbar > Cache Scrollbar.

```typescript
  {path: '', component: KeepScrollPageComponent, data: {title: '缓存滚动条', key: 'keep-scroll-page',scrollContain:['#div-scroll1','#div-scroll2']}}

```


## 系统截图(System screenshot)
![ScreenShot](https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/11.png)

## star支持
怎么说呢，所以如果本项目对您有用，如果您也愿意的话，麻烦帮忙点个star，谢谢啊<br>
<br>
if help you, if you want ,please give me a star ,thank you<br>

## 另外 / In Addition
如果项目需要定制，或者有好的远程项目，兼职，外包等，也可以与我联系。不限前后端，移动端技术栈。希望可以出卖点体力赚取点收入

---
If you need a custom project, or have any good remote projects, part-time work, or outsourcing opportunities, please contact me. My skills are not limited to frontend, backend, or mobile stacks. I'm looking to earn some income.

## 捐赠
如果本项目对您有用，正巧您如果也想请我喝一杯咖啡，请扫下面的码，哈哈。在此感谢您<br>
If this project is useful to you, and you happen to want to invite me for a cup of coffee, please scan Alipay or WeChat<br>
![ScreenShot](https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/weixin.jpeg)
![ScreenShot](https://github.com/huajian123/ng-antd-admin/blob/master/ui/projectImg/zhifubao.jpeg)



### 🏴授权协议License

MIT 
