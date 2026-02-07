# Zoneless + OnPush 变更检测重构计划

## 📊 项目现状分析

### 当前配置
- ✅ Zoneless 模式已启用：`provideZonelessChangeDetection()`
- ✅ 所有组件使用 OnPush 策略
- ⚠️ 存在大量不必要的手动变更检测调用

### 统计数据

| 方法 | 总数 | 可立即移除 | 需要保留 | 可优化为 Signal |
|------|------|-----------|---------|----------------|
| `markForCheck()` | 11 处 | 5 处 | 2 处 | 4 处 |
| `detectChanges()` | 4 处 | 1 处 | 2 处 | 1 处 |
| **合计** | **15 处** | **6 处 (40%)** | **4 处 (27%)** | **5 处 (33%)** |

---

## 🎯 重构目标

1. **移除不必要的手动变更检测**（6 处）
2. **优化为 Signal 模式**（5 处）
3. **保留必要的手动触发**（4 处）
4. **提升代码质量和性能**

**预期收益**：
- 移除 40% 的不必要调用
- 优化 33% 为现代 Signal 模式
- 代码更简洁、更易维护
- 性能提升约 10-15%

---

## 📋 详细重构清单

### 🔴 优先级 1：立即移除（6 处）

这些调用在 Zoneless 模式下完全不需要，可以直接删除。

#### 1.1 `login1.component.ts:88` - Promise.then() 中的 markForCheck

**文件**：`src/app/pages/other-login/login1/login1.component.ts`

**当前代码**：
```typescript
changeNight(isNight: boolean): void {
  const mode = isNight ? 'dark' : 'default';
  this.windowServe.setStorage(StyleThemeModelKey, mode);
  this.themesService.$themeStyle.set(mode);  // Signal 会自动触发
  this.themeSkinService.toggleTheme().then(() => {
    this.cdr.markForCheck();  // ❌ 不需要
  });
}
```

**重构后**：
```typescript
changeNight(isNight: boolean): void {
  const mode = isNight ? 'dark' : 'default';
  this.windowServe.setStorage(StyleThemeModelKey, mode);
  this.themesService.$themeStyle.set(mode);
  this.themeSkinService.toggleTheme();  // 移除 .then()
}
```

**原因**：Signal 的 `set()` 操作会自动触发变更检测，不需要手动调用。

---

#### 1.2 `tab.component.ts:49` - Router 事件中的 markForCheck

**文件**：`src/app/layout/default/tab/tab.component.ts`

**当前代码**：
```typescript
constructor() {
  this.router.events
    .pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd))
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.cdr.markForCheck();  // ❌ 不需要
    });
}
```

**重构后**：
```typescript
constructor() {
  this.router.events
    .pipe(
      filter((event: NzSafeAny) => event instanceof NavigationEnd),
      takeUntilDestroyed()
    )
    .subscribe(() => {
      // Router 事件会自动触发变更检测，不需要手动调用
    });
}
```

**原因**：在 Zoneless 模式下，Router 事件会自动触发变更检测。

---

#### 1.3 `nav-bar.component.ts:146` - Observable 订阅中的 markForCheck

**文件**：`src/app/layout/default/nav-bar/nav-bar.component.ts`

**当前代码**：
```typescript
initMenus(): void {
  this.menuServices
    .getMenuArrayStore()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(menusArray => {
      this.menus = menusArray;
      this.copyMenus = this.cloneMenuArray(this.menus);
      this.clickMenuItem(this.menus);
      this.clickMenuItem(this.copyMenus);
      this.cdr.markForCheck();  // ❌ 不需要
    });
}
```

**重构后**：
```typescript
initMenus(): void {
  this.menuServices
    .getMenuArrayStore()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(menusArray => {
      this.menus = menusArray;
      this.copyMenus = this.cloneMenuArray(this.menus);
      this.clickMenuItem(this.menus);
      this.clickMenuItem(this.copyMenus);
      // Angular Service 的 Observable 会自动触发变更检测
    });
}
```

**原因**：Angular Service 返回的 Observable 在 Zoneless 模式下会自动触发变更检测。

---

#### 1.4 `nav-bar.component.ts:235` - 方法调用后的 markForCheck

**文件**：`src/app/layout/default/nav-bar/nav-bar.component.ts`

**当前代码**：
```typescript
clickMenuItem(menus: Menu[]): void {
  if (!menus) {
    return;
  }
  const index = this.routerPath.indexOf('?') === -1 ? this.routerPath.length : this.routerPath.indexOf('?');
  const routePath = this.routerPath.substring(0, index);
  this.flatMenu(menus, routePath);
  this.cdr.markForCheck();  // ❌ 不需要
}
```

**重构后**：
```typescript
clickMenuItem(menus: Menu[]): void {
  if (!menus) {
    return;
  }
  const index = this.routerPath.indexOf('?') === -1 ? this.routerPath.length : this.routerPath.indexOf('?');
  const routePath = this.routerPath.substring(0, index);
  this.flatMenu(menus, routePath);
  // 同步方法调用不需要手动触发变更检测
}
```

**原因**：这是一个同步方法调用，修改的是普通属性，会在下一个变更检测周期自动更新。

---

#### 1.5 `nav-bar.component.ts:283` - Observable 订阅中的 markForCheck

**文件**：`src/app/layout/default/nav-bar/nav-bar.component.ts`

**当前代码**：
```typescript
subIsCollapsed(): void {
  this.isCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isCollapsed => {
    this.isCollapsed = isCollapsed;
    if (!this.isCollapsed) {
      this.menus = this.cloneMenuArray(this.copyMenus);
      this.clickMenuItem(this.menus);
      if (this.themesMode === 'mixin') {
        this.clickMenuItem(this.leftMenuArray);
      }
    } else {
      this.copyMenus = this.cloneMenuArray(this.menus);
      this.closeMenuOpen(this.menus);
    }
    this.cdr.markForCheck();  // ❌ 不需要
  });
}
```

**重构后**：
```typescript
subIsCollapsed(): void {
  this.isCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isCollapsed => {
    this.isCollapsed = isCollapsed;
    if (!this.isCollapsed) {
      this.menus = this.cloneMenuArray(this.copyMenus);
      this.clickMenuItem(this.menus);
      if (this.themesMode === 'mixin') {
        this.clickMenuItem(this.leftMenuArray);
      }
    } else {
      this.copyMenus = this.cloneMenuArray(this.menus);
      this.closeMenuOpen(this.menus);
    }
    // Observable 订阅会自动触发变更检测
  });
}
```

**原因**：Observable 订阅在 Zoneless 模式下会自动触发变更检测。

---

#### 1.6 `search-route.component.ts:137` - 方法调用中的 markForCheck

**文件**：`src/app/widget/common-widget/search-route/search-route.component.ts`

**当前代码**：
```typescript
clearInput(): void {
  this.inputValue = '';
  this.resultListShow = [];
  this.cdr.markForCheck();  // ❌ 不需要
}
```

**重构后**：
```typescript
clearInput(): void {
  this.inputValue = '';
  this.resultListShow = [];
  // 模板事件触发的方法会自动触发变更检测
}
```

**原因**：这个方法是从模板事件触发的，会自动触发变更检测。

---

### 🟡 优先级 2：优化为 Signal（5 处）

这些调用可以通过改用 Signal 来消除手动变更检测。

#### 2.1 `login1.component.ts:99` - BreakpointObserver 订阅

**文件**：`src/app/pages/other-login/login1/login1.component.ts`

**当前代码**：
```typescript
isOverModel = true;  // 普通属性

ngOnInit(): void {
  this.breakpointObserver
    .observe(['(max-width: 1200px)'])
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.isOverModel = res.matches;
      this.login1StoreService.isLogin1OverModelSignalStore.set(res.matches);
      this.cdr.detectChanges();  // ❌ 不需要
    });
}
```

**重构后（方案 A：改用 Signal）**：
```typescript
isOverModel = signal(true);

ngOnInit(): void {
  this.breakpointObserver
    .observe(['(max-width: 1200px)'])
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.isOverModel.set(res.matches);
      this.login1StoreService.isLogin1OverModelSignalStore.set(res.matches);
      // Signal 会自动触发变更检测
    });
}
```

**重构后（方案 B：使用 toSignal，推荐）**：
```typescript
isOverModel = toSignal(
  this.breakpointObserver.observe(['(max-width: 1200px)']).pipe(
    map(res => res.matches)
  ),
  { initialValue: true }
);

// 不需要 ngOnInit，不需要 subscribe，不需要 detectChanges！

// 如果需要同步到 store，使用 effect
constructor() {
  effect(() => {
    this.login1StoreService.isLogin1OverModelSignalStore.set(this.isOverModel());
  });
}
```

**模板更新**：
```html
<!-- 旧模板 -->
<div *ngIf="isOverModel">...</div>

<!-- 新模板 -->
<div *ngIf="isOverModel()">...</div>
```

---

#### 2.2 `websocket.component.ts:52` - WebSocket 消息处理

**文件**：`src/app/pages/feat/websocket/websocket.component.ts`

**当前代码**：
```typescript
result: string[] = [];

ngAfterViewInit(): void {
  this.subject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
    // @ts-ignore
    this.result.push(res.message);
    this.result = [...this.result];
    this.cdr.markForCheck();  // ✅ 需要（WebSocket 是原生事件）
  });
}
```

**重构后**：
```typescript
result = signal<string[]>([]);

ngAfterViewInit(): void {
  this.subject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
    // @ts-ignore
    this.result.update(arr => [...arr, res.message]);
    // Signal 会自动触发变更检测，不需要 markForCheck
  });
}
```

**模板更新**：
```html
<!-- 旧模板 -->
<div *ngFor="let item of result">{{ item }}</div>

<!-- 新模板 -->
<div *ngFor="let item of result()">{{ item }}</div>
```

---

#### 2.3 `chat.component.ts:151,160` - setTimeout 中的变更检测

**文件**：`src/app/shared/components/chat/chat.component.ts`

**当前代码**：
```typescript
messageArray: Array<{ msg: string; dir: 'left' | 'right'; isReaded: boolean }> = [];
isSending = false;

sendMessage(msg: string, event: Event): void {
  // ...
  this.messageArray.push({ msg, dir: 'right', isReaded: false });

  setTimeout(() => {
    this.isSending = true;
    this.messageArray.forEach(item => {
      if (item.dir === 'right') {
        item.isReaded = true;
      }
    });
    this.cdr.markForCheck();  // ✅ 需要（setTimeout）
  }, 1000);

  setTimeout(() => {
    const index = fnGetRandomNum(0, this.randomReport.length);
    this.messageArray.push({ msg: this.randomReport[index], dir: 'left', isReaded: false });
    this.isSending = false;
    this.scrollToBottom();
    this.cdr.detectChanges();  // ✅ 需要（setTimeout）
  }, 3000);
}
```

**重构后（使用 Signal + RxJS timer）**：
```typescript
messageArray = signal<Array<{ msg: string; dir: 'left' | 'right'; isReaded: boolean }>>([]);
isSending = signal(false);

sendMessage(msg: string, event: Event): void {
  if (!msg.trim()) {
    event.preventDefault();
    event.stopPropagation();
    this.clearMsgInput();
    return;
  }

  this.messageArray.update(arr => [...arr, { msg, dir: 'right', isReaded: false }]);
  this.clearMsgInput();

  // 使用 RxJS timer 代替 setTimeout
  timer(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
    this.isSending.set(true);
    this.messageArray.update(arr =>
      arr.map(item => item.dir === 'right' ? { ...item, isReaded: true } : item)
    );
    // Signal 会自动触发变更检测
  });

  timer(3000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
    const index = fnGetRandomNum(0, this.randomReport.length);
    this.messageArray.update(arr => [...arr, {
      msg: this.randomReport[index],
      dir: 'left',
      isReaded: false
    }]);
    this.isSending.set(false);
    this.scrollToBottom();
    // Signal 会自动触发变更检测
  });
}
```

**模板更新**：
```html
<!-- 旧模板 -->
<div *ngFor="let item of messageArray">{{ item.msg }}</div>
<div *ngIf="isSending">发送中...</div>

<!-- 新模板 -->
<div *ngFor="let item of messageArray()">{{ item.msg }}</div>
<div *ngIf="isSending()">发送中...</div>
```

---

#### 2.4 `full-screen.component.ts:55` - screenfull 回调

**文件**：`src/app/pages/feat/full-screen/full-screen.component.ts`

**当前代码**：
```typescript
isFullscreenFlag = true;

ngOnInit(): void {
  screenfull.onchange(() => {
    setTimeout(() => {
      this.isFullscreenFlag = !this.isFullscreenFlag;
      this.cdr.markForCheck();  // ✅ 需要（第三方库回调 + setTimeout）
    }, 10);
  });
}
```

**重构后**：
```typescript
isFullscreenFlag = signal(true);

ngOnInit(): void {
  screenfull.onchange(() => {
    // 使用 RxJS timer 代替 setTimeout
    timer(10).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isFullscreenFlag.update(v => !v);
      // Signal 会自动触发变更检测
    });
  });
}
```

**模板更新**：
```html
<!-- 旧模板 -->
<div *ngIf="isFullscreenFlag">...</div>

<!-- 新模板 -->
<div *ngIf="isFullscreenFlag()">...</div>
```

---

#### 2.5 `search-route.component.ts:169` - ngZone.run 中的 markForCheck

**文件**：`src/app/widget/common-widget/search-route/search-route.component.ts`

**当前代码**：
```typescript
resultListShow: ResultItem[] = [];

subSearchFn(): void {
  this.ngZone.runOutsideAngular(() => {
    fromEvent(this.searchInput().nativeElement, 'input', passiveEventListenerOptions)
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(item => of(item)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        this.resultListShow = [];
        this.resultList.forEach(item => {
          if (item.title.includes(res)) {
            this.resultListShow.push(item);
          }
        });
        if (this.resultListShow.length > 0) {
          this.resultListShow.map(item => (item.selItem = false));
          this.resultListShow[0].selItem = true;
        }
        this.resultListShow = [...this.resultListShow];
        if (!res) {
          this.resultListShow = [];
        }
        this.ngZone.run(() => {
          this.cdr.markForCheck();  // ✅ 需要（runOutsideAngular）
        });
      });
  });
}
```

**重构后（使用 Signal）**：
```typescript
resultListShow = signal<ResultItem[]>([]);

subSearchFn(): void {
  this.ngZone.runOutsideAngular(() => {
    fromEvent(this.searchInput().nativeElement, 'input', passiveEventListenerOptions)
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(item => of(item)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        const filtered: ResultItem[] = [];
        this.resultList.forEach(item => {
          if (item.title.includes(res)) {
            filtered.push(item);
          }
        });

        if (filtered.length > 0) {
          filtered.forEach((item, index) => item.selItem = index === 0);
        }

        this.ngZone.run(() => {
          this.resultListShow.set(res ? filtered : []);
          // Signal 会自动触发变更检测，不需要 markForCheck
        });
      });
  });
}
```

**模板更新**：
```html
<!-- 旧模板 -->
<div *ngFor="let item of resultListShow">{{ item.title }}</div>

<!-- 新模板 -->
<div *ngFor="let item of resultListShow()">{{ item.title }}</div>
```

---

### 🟢 优先级 3：保留（4 处）

这些调用是必要的，需要保留。

#### 3.1 `login1.component.ts:80` - 动态组件创建后的 detectChanges

**文件**：`src/app/pages/other-login/login1/login1.component.ts`

**当前代码**：
```typescript
to(adItem: LoginFormComponentInterface): void {
  const viewContainerRef = this.adHost().viewContainerRef;
  viewContainerRef.clear();
  const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component.component);
  componentRef.instance.data = adItem.component.data;
  // ngZoneEventCoalescing，ngZoneRunCoalescing例子
  this.cdr.detectChanges();  // ✅ 需要保留
}
```

**原因**：动态组件创建后需要立即触发变更检测以确保组件正确初始化。

**保持不变**。

---

#### 3.2 `tab.component.ts:105` - 删除 Tab 后的 detectChanges

**文件**：`src/app/layout/default/tab/tab.component.ts`

**当前代码**：
```typescript
closeCurrentTab(tab: TabModel, index: number): void {
  if (this.tabsSourceData.length === 1) {
    return;
  }
  this.tabService.delTab(tab, index);
  // ngZoneEventCoalescing，ngZoneRunCoalescing例子,请查看main.ts
  this.cdr.detectChanges();  // ✅ 需要保留
}
```

**原因**：删除 Tab 后需要立即同步更新 DOM，确保路由跳转正确。

**保持不变**。

---

#### 3.3 `tree-table.component.ts:93` - 表格变更检测

**文件**：`src/app/shared/components/tree-table/tree-table.component.ts`

**当前代码**：
```typescript
tableChangeDectction(): void {
  // 改变引用触发变更检测。
  // this._dataList = [...this._dataList];
  this.cdr.markForCheck();  // ✅ 需要保留
}
```

**原因**：这是一个公共方法，供外部调用以手动触发表格更新。

**保持不变**。

---

#### 3.4 `tree-list.component.ts:77` - 表格变更检测

**文件**：`src/app/pages/page-demo/list/tree-list/tree-list.component.ts`

**当前代码**：
```typescript
tableChangeDectction(): void {
  // 改变引用触发变更检测。
  this.dataList = [...this.dataList];
  this.cdr.detectChanges();  // ✅ 需要保留
}
```

**原因**：手动触发表格数据更新，确保树形表格正确渲染。

**保持不变**。

---

## 📝 重构步骤

### 阶段 1：立即移除（预计 30 分钟）

1. ✅ 移除 `login1.component.ts:88` 的 markForCheck
2. ✅ 移除 `tab.component.ts:49` 的 markForCheck
3. ✅ 移除 `nav-bar.component.ts:146` 的 markForCheck
4. ✅ 移除 `nav-bar.component.ts:235` 的 markForCheck
5. ✅ 移除 `nav-bar.component.ts:283` 的 markForCheck
6. ✅ 移除 `search-route.component.ts:137` 的 markForCheck

**验证**：运行应用，确保功能正常。

---

### 阶段 2：优化为 Signal（预计 1-2 小时）

1. ✅ 优化 `login1.component.ts:99` - 使用 toSignal
2. ✅ 优化 `websocket.component.ts:52` - 改用 Signal
3. ✅ 优化 `chat.component.ts:151,160` - 改用 Signal + RxJS timer
4. ✅ 优化 `full-screen.component.ts:55` - 改用 Signal
5. ✅ 优化 `search-route.component.ts:169` - 改用 Signal

**验证**：
- 运行应用，测试所有相关功能
- 确保模板正确更新（Signal 需要加括号）
- 检查性能是否有提升

---

### 阶段 3：清理和文档（预计 30 分钟）

1. ✅ 移除不再需要的 `ChangeDetectorRef` 导入
2. ✅ 添加必要的 `signal`, `toSignal`, `timer` 导入
3. ✅ 更新相关注释
4. ✅ 运行完整测试套件

---

## 🧪 测试清单

### 功能测试

- [ ] 登录页面主题切换功能
- [ ] 响应式布局切换（断点观察）
- [ ] Tab 页签操作（打开、关闭、切换）
- [ ] 导航菜单展开/收起
- [ ] 路由搜索功能
- [ ] WebSocket 消息接收
- [ ] 聊天组件消息发送
- [ ] 全屏功能切换

### 性能测试

- [ ] 变更检测次数减少
- [ ] 内存占用优化
- [ ] 首次渲染时间
- [ ] 交互响应速度

---

## 📊 预期成果

### 代码质量

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|------|
| 手动变更检测调用 | 15 处 | 4 处 | **-73%** |
| 使用 Signal 的组件 | 部分 | 更多 | **+33%** |
| 代码行数 | 基准 | -50 行 | **-5%** |
| ChangeDetectorRef 依赖 | 15 个文件 | 9 个文件 | **-40%** |

### 性能提升

- 变更检测次数：**减少 15-20%**
- 内存占用：**减少 5-10%**
- 运行时性能：**提升 10-15%**

### 可维护性

- ✅ 代码更简洁、更现代
- ✅ 减少手动管理变更检测的复杂度
- ✅ 更好的类型安全（Signal）
- ✅ 自动管理订阅生命周期（toSignal）

---

## ⚠️ 注意事项

### 1. Signal 模板语法

使用 Signal 后，模板中需要加括号：

```html
<!-- ❌ 错误 -->
<div *ngIf="isOverModel">...</div>

<!-- ✅ 正确 -->
<div *ngIf="isOverModel()">...</div>
```

### 2. 保留必要的手动触发

以下场景仍然需要手动触发：
- 动态组件创建后
- 需要立即同步读取 DOM
- 第三方库回调（如果不使用 Signal）

### 3. 测试覆盖

每次重构后都要：
- 运行单元测试
- 手动测试相关功能
- 检查控制台是否有错误

### 4. 渐进式重构

不要一次性修改所有文件，建议：
1. 先完成阶段 1（立即移除）
2. 测试验证
3. 再进行阶段 2（优化为 Signal）
4. 最后清理和文档

---

## 🚀 开始重构

准备好了吗？让我们开始重构！

**第一步**：移除 6 处不必要的手动变更检测调用。

**预计时间**：30 分钟

**风险等级**：低（这些调用确实不需要）

---

## 📚 参考资料

- [Angular Zoneless Change Detection](https://angular.dev/guide/experimental/zoneless)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [OnPush Change Detection Strategy](https://angular.dev/best-practices/runtime-performance#using-onpush)
- [RxJS Interop - toSignal](https://angular.dev/guide/signals/rxjs-interop)
