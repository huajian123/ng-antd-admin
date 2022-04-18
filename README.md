# ng-ant-admin
[![CodeFactor](https://www.codefactor.io/repository/github/huajian123/ng-ant-admin/badge)](https://www.codefactor.io/repository/github/huajian123/ng-ant-admin)


# 项目视频介绍
使用本项目遇到问题，可以加入376065816 qq群号与我沟通。<br>
如果本项目对您有用，麻烦帮我点个star，谢谢啊<br>
if help you, if you want ,please give me a star ,thank you<br>
If you use this project for production ,if you want ,please tell me on this way[issues](https://github.com/huajian123/ng-ant-admin/issues/10), Someone is using this project,let me happy.<br>
快速二开使用详解 [快速二开使用详解](https://www.bilibili.com/video/BV1gF411x7rN/)<br>
项目搭建简易教程 [项目搭建简易教程](https://www.bilibili.com/video/BV1EM4y1w7zd/)<br>
online demo地址 [demo](http://124.71.128.53:8080/)<br>

# 路由的key
key需要设置成路由地址最后一个'/'后的字符串，并且要唯一
```typescript
const routes: Routes = [
  {path: '', data: {key: 'login', shouldDetach: 'no'}, component: LoginFormComponent}
];
```
# 栅格系统监听
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
使用方式
```
  constructor(private windowsWidthService: WindowsWidthService) {
  }
  
  this.windowsWidthService.getWindowWidthStore().pipe(takeUntil(this.destory$)).subscribe(res => {
    this.currentEquipmentWidth = res;
    this.cdr.markForCheck();
  })
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

# 模块中打开新tab页来展示详情，必须设置参数如下
在data中设置newTab
```typescript
const routes: Routes = [
  {path: '', component: TabsComponent, data: {title: '标签页操作', key: 'tabs'}},
  {path: 'example-detail', component: DetailComponent, data: {newTab:'true', title: '演示详情', key: 'example-detail'}}
];
```

# 缓存页面中指定容器的滚动条
在data中设置scrollContain 为元素选择器
```typescript
  {path: '', component: KeepScrollPageComponent, data: {title: '缓存滚动条', key: 'keep-scroll-page',scrollContain:['#div-scroll1','#div-scroll2']}}

```

# 切换tab调用的临时声明周期如下
relatedLink数组中保存相关联的两个路由，值为每个路由地址最后的/后的字符串
```typescript
_onReuseInit: () => void;
_onReuseDestroy: () => void;

```
直接在目标组件中写出方法名为_onReuseInit或者_onReuseDestroy的方法即可实现

# 我在线求全职或者兼职或者接单
坐标南京，希望做Angular，java,flutter,go，小程序，vue
请联系287643967@qq.com

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


## 捐赠
如果本项目对您有用，正巧您如果想请我喝一杯咖啡，请扫下面的码，哈哈<br>
If this project is useful to you, and you happen to want to invite me for a cup of coffee, please scan Alipay or WeChat<br>
![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/weixin.jpeg)
![ScreenShot](https://github.com/huajian123/ng-ant-admin/blob/master/projectImg/zhifubao.jpeg)



### License

MIT 
