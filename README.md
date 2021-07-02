# 项目视频介绍
如果本项目对你有用，如果你愿意的话，麻烦点个star啊
视频介绍地址 [项目介绍](https://www.bilibili.com/video/BV12B4y1T7h7/)
在线预览地址 [在线预览](http://124.71.128.53:8081/)
# 禁用严格模式

可以通过在应用程序的 TypeScript 配置文件 tsconfig.json 中设置 strictTemplates: false 来完全禁用严格检查。
https://angular.cn/guide/template-typecheck
# 路由的key
key需要设置成路由地址最后一个'/'后的字符串，并且要唯一
```typescript
const routes: Routes = [
  {path: '', data: {key: 'login', shouldDetach: 'no'}, component: LoginFormComponent}
];
```


# 模块不需要预加载

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

# 模块不需要保存状态

```typescript
const routes: Routes = [
  {path: '', data: {key: 'login', shouldDetach: 'no'}, component: LoginFormComponent}
];
```

# 模块中有类似详情页面需要跳转，必须设置参数如下
relatedLink数组中保存相关联的两个路由，值为每个路由地址最后的/后的字符串
```typescript
const routes: Routes = [
  {path: 'set-role', component: SetRoleComponent, data: {title: '角色管理', key: 'set-role', relatedLink: ['role', 'set-role']}},
  {path: '', component: RoleManageComponent, data: {title: '角色管理', key: 'role', relatedLink: ['role', 'set-role']}},
];

```
# 切换tab调用的临时声明周期如下
relatedLink数组中保存相关联的两个路由，值为每个路由地址最后的/后的字符串
```typescript
 _onReuseInit: () => void;
  _onReuseDestroy: () => void;

```
直接在目标组件中写出方法名为_onReuseInit或者_onReuseDestroy的方法即可实现

## 系统截图

 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/1.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/2.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/3.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/4.jpg)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/5.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/6.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/7.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/8.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/9.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/10.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/11.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/12.png)
 ![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/13.png)
