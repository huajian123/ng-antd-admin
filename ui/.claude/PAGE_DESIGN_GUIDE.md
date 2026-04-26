# 页面 UI 改造指南

本文档记录了对 `feat/multilingual` 和 `feat/msg` 两个页面进行 UI 改造的完整经验，供后续改造其他页面时参考。

---

## 1. 使用的 Skill 组合

### 主要参考：`design-taste-frontend` + `high-end-visual-design`

这两个 skill 的以下设计原则适用于后台管理系统：

| 原则 | 说明 |
|---|---|
| Eyebrow 标签 | 页面顶部小胶囊标签，用 `@primary-color` 背景 + 白色文字 |
| Section Label 分隔 | 大写字母 + 图标的区块分隔符，替代 `nz-card` 的 `nzTitle` |
| 弹簧过渡曲线 | 所有 `transition` 统一用 `cubic-bezier(0.32, 0.72, 0, 1)` |
| 按钮触感反馈 | `:active` 状态加 `transform: scale(0.97) translateY(1px)` |
| 禁止 3 列等宽卡片 | 用 `nz-row` + 非对称 `nzMd` 比例替代 |

**过滤掉不适合后台系统的部分：**
- ❌ GSAP / Framer Motion 动效
- ❌ 全屏 Hero、Bento Grid
- ❌ 自定义双边框卡片（与暗色主题不兼容，改用 `nz-card`）

---

## 2. 优先使用 ng-zorro 组件

**核心原则：凡是 ng-zorro 有的组件，不自己写。** 这样明暗主题切换时背景色、边框色、文字色全部自动跟随，无需额外处理。

```html
<!-- ✅ 正确：用 nz-card，主题自动适配 -->
<nz-card [nzBordered]="false">...</nz-card>

<!-- ❌ 错误：自定义双边框卡片，暗色主题下背景色失效 -->
<div class="card-shell"><div class="card-core">...</div></div>
```

**按钮颜色优先用 ng-zorro 原生属性：**

```html
<button nz-button nzType="primary">主要</button>
<button nz-button nzType="primary" nzDanger>危险</button>
<button nz-button nzType="primary" nzGhost class="btn-ghost-success">成功</button>
<button nz-button nzType="default" class="btn-warning">警告</button>
```

Success / Warning 按钮因为 ng-zorro 没有原生对应的 `nzType`，用 `nzGhost` + 自定义类补充颜色，颜色值直接硬编码（`#52c41a` / `#faad14`），不走 Less 变量，避免主题编译问题。

---

## 3. 使用 `base.less` 原子类

项目 `src/styles/themes/base.less` 提供了间距、字号、flex 等原子类，**优先在模板里直接用，减少组件 Less 文件的代码量。**

### 常用原子类速查

**间距（margin）**
```
m-b-8  m-b-10  m-b-20  m-b-24  m-b-30
m-t-8  m-t-10  m-t-15  m-t-20  m-t-30
m-r-8  m-r-10  m-l-8   m-l-10
```

**间距（padding）**
```
p-8   p-16   p-24
p-t-8  p-t-16  p-b-8  p-b-16
p-l-8  p-l-16  p-r-8  p-r-16
```

**字号**
```
sp-12  sp-14  sp-16  sp-18  sp-28  sp-32
```

**布局**
```
flex            display: flex
flex-1          flex: 1
flex-column     flex-direction: column
center          display:flex + align/justify center
space-between   justify-content: space-between
text-center     text-align: center
```

**圆角**
```
b-r-8   border-radius: 8px
b-r-12  border-radius: 12px
```

**动画**
```
animate-02   transition: all 0.2s
animate-03   transition: all 0.3s
```

**其他**
```
full-height    height: 100%
hand-model     cursor: pointer
relative       position: relative
```

### 使用示例

```html
<!-- 用原子类替代组件内 Less -->
<div class="section-label m-b-10">...</div>
<nz-card class="m-b-24" [nzBordered]="false">...</nz-card>
<div class="hero-section text-center m-b-30">...</div>
```

---

## 4. 页面结构模板

每个功能展示页面推荐以下结构：

```html
<div class="page-wrap p-24">

  <!-- Hero Section：页面标题区 -->
  <div class="hero-section text-center m-b-30">
    <div class="hero-eyebrow m-b-20">
      <span nz-icon nzTheme="outline" nzType="xxx"></span>
      页面分类标签
    </div>
    <h1 class="hero-title m-b-8">页面主标题</h1>
    <p class="hero-subtitle">一句话描述页面功能</p>
  </div>

  <!-- Section：功能区块 -->
  <div class="section-label m-b-10">
    <span nz-icon nzTheme="outline" nzType="xxx"></span>
    区块名称
  </div>
  <nz-card class="m-b-24" [nzBordered]="false">
    <p class="card-desc m-b-20">区块说明文字</p>
    <!-- 内容 -->
  </nz-card>

</div>
```

---

## 5. 表格：使用封装的 `app-ant-table` 组件

项目已封装 `src/app/shared/components/ant-table/ant-table.component.ts`，**所有带分页、排序、checkbox 的列表页面必须使用此组件，不要直接用 `nz-table`。**

### 核心接口

```typescript
import { AntTableComponent, AntTableConfig, TableHeader } from '@shared/components/ant-table/ant-table.component';

// 表头配置
tableConfig: AntTableConfig = {
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  headers: [
    { title: '名称', field: 'name', width: 200 },
    { title: '状态', field: 'status', pipe: 'statusPipe', width: 100 },
    { title: '操作', tdTemplate: this.operateTpl, notNeedEllipsis: true, width: 120 }
  ]
};
```

### 模板用法

```html
<app-ant-table
  [tableData]="dataList()"
  [tableConfig]="tableConfig"
  (changePageIndex)="onPageIndexChange($event)"
  (changePageSize)="onPageSizeChange($event)"
  (sortFn)="onSortChange($event)">
</app-ant-table>
```

### 支持的功能

- 分页（`pageIndex` / `pageSize` / `total`）
- 列排序（`showSort: true`）
- 列宽拖拽（`width` 配合 `nz-resizable`）
- 固定列（`fixed: true` + `fixedDir: 'left' | 'right'`）
- Checkbox 多选（`showCheckbox: true`）
- 自定义 td 模板（`tdTemplate`）
- 自定义 th 模板（`thTemplate`）
- 虚拟滚动（`virtualItemSize`）

---

## 6. 代码演示区块的暗色主题处理

页面中展示代码片段时，背景色**直接硬编码深色值**，不走 Less 变量。这是因为代码块在明暗主题下都应该保持深色背景，不需要跟随主题切换。

```less
.code-block {
  border-radius: 10px;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  background: #1a1a2e;  // 固定深色，明暗主题下均适用

  code {
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
    line-height: 1.7;
    white-space: pre;
    color: #a8d8a8;     // 固定绿色代码色，明暗主题下均适用
  }
}
```

模板中用 `<pre>` + `<code>` 结构，内容绑定 TS 中的字符串属性：

```html
<pre class="code-block m-t-16"><code>{{ codeExample }}</code></pre>
```

---

## 7. Less 变量安全使用规则

在组件 Less 文件的 `.themeMixin()` 内，**只能使用以下已验证的安全变量**。其他变量（尤其是 `@primary-1`、`@primary-3` 等色板派生变量）在 dark.less 里用了 `color()` / `colorPalette()` 函数重新计算，在组件级编译时会报错。

### ✅ 安全变量（项目其他组件已验证）

| 变量 | 亮色值 | 暗色值 | 用途 |
|---|---|---|---|
| `@primary-color` | 主题蓝 | 主题蓝 | 强调色、边框、背景 |
| `@primary-6` | 主题蓝深 | 主题蓝深 | 按钮 hover |
| `@component-background` | `#fff` | `#141414` | 卡片/容器背景 |
| `@background-color-base` | `hsv(0,0,96%)` | `fade(@white,8%)` | 次级背景、行 hover |
| `@text-color-secondary` | `rgba(0,0,0,0.45)` | `rgba(255,255,255,0.45)` | 次要文字、说明文字 |
| `@text-color-inverse` | `#fff` | `#fff` | 深色背景上的白色文字 |
| `@white` | `#fff` | `#fff` | 纯白 |

### ❌ 禁止在 `.themeMixin()` 内使用

```less
// 这些变量在 dark.less 里用了 color()/colorPalette()/mix() 重新计算
// 在组件级编译时会报：Cannot read properties of undefined (reading 'toLowerCase')
@primary-1        // mix(color(colorPalette(...)), ...)
@primary-3        // mix(@primary-color, ...)
@primary-color-outline
@highlight-color  // 依赖 @red-5 的 dark 计算链
@heading-color    // fade(@black/white, 85%) 在部分上下文不可用
@border-color-base
@border-color-split
@background-color-light
@disabled-color
```

### 替代方案

不能用 Less 变量时，用以下方式替代：

```less
// 次要文字色 → opacity
.subtitle { opacity: 0.65; }
.meta-text { opacity: 0.55; }

// 次级背景 → @background-color-base（已验证安全）
.item { background: @background-color-base; }

// 边框 → 直接省略或用 nz-card 自带边框
// 代码块背景 → 硬编码
.code-block { background: #1a1a2e; }
```

### `.themeMixin()` 标准写法

```less
// 结构性样式（间距、字号、布局）写在外面，不需要主题感知
.hero-title {
  font-size: 36px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 14px;
  opacity: 0.65;  // 用 opacity 替代颜色变量
}

// @import 紧贴 .themeMixin() 调用，放在文件末尾
@import 'mixin';
.themeMixin({
  :host {
    // 只放需要明暗主题感知的颜色规则
    .hero-eyebrow {
      background: @primary-color;
      color: @text-color-inverse;
    }

    .section-label {
      color: @text-color-secondary;
    }

    .item {
      background: @background-color-base;
    }
  }
});
```

---

## 8. Angular 编码规范（结合项目 CLAUDE.md）

遵循 `angular-developer` skill + 项目 `CLAUDE.md` 的约束：

```typescript
@Component({
  // ✅ 不写 standalone: true（Angular v20+ 默认）
  selector: 'app-xxx',
  templateUrl: './xxx.html',
  styleUrl: './xxx.less',
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅ 必须
  imports: [/* 按需引入 */]
})
export class XxxComponent {
  // ✅ 用 inject() 而非构造函数注入
  private service = inject(XxxService);

  // ✅ 用 signal() 管理本地状态
  loading = signal(false);

  // ✅ 用 computed() 派生状态
  displayName = computed(() => this.data().name.toUpperCase());

  // ✅ 用 input() / output() 而非装饰器
  value = input<string>('');
  valueChange = output<string>();
}
```

**模板规范：**

```html
<!-- ✅ 用原生控制流 -->
@if (loading()) { <nz-spin></nz-spin> }
@for (item of list(); track item.id) { ... }

<!-- ✅ 用 class 绑定，不用 ngClass -->
<div [class.active]="isActive()">

<!-- ✅ 用 style 绑定，不用 ngStyle -->
<div [style.color]="color()">
```

**Less 规范：**

```less
// ✅ 用纯色值，不用 CSS 变量
color: #1677ff;

// ✅ 需要主题适配时用 .themeMixin() + 安全 Less 变量
// ❌ 不用 var(--ant-color-xxx)
// ❌ 不用 @primary-color 等 Less 变量在 themeMixin 外直接写颜色
```

---

## 9. 保留的 Skill 清单

| Skill | 用途 |
|---|---|
| `angular-developer` | Angular 编码规范、最佳实践 |
| `design-taste-frontend` | 页面视觉设计原则（eyebrow、section label、弹簧曲线等） |
| `high-end-visual-design` | 高端视觉设计参考（双边框卡片概念、按钮触感等） |
| `full-output-enforcement` | 强制完整输出，禁止截断代码 |
