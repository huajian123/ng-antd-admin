# 页面 UI 改造指南

本文档记录功能展示页的 UI 改造经验。通用编码规范（原子类、命名、Less 结构）见 `STYLE_GUIDE.md`，本文档是其补充。

---

## 1. 页面结构

每个页面统一使用 `app-page-header` 作为页面头部，不自定义 Hero Section（居中大标题是营销页风格，不适合后台系统）。

```html
<app-page-header [pageHeaderInfo]="pageHeaderInfo" />

<div class="p-24">
  <!-- Section 区块 -->
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

TS 中配置 pageHeaderInfo：

```typescript
pageHeaderInfo: Partial<PageHeaderType> = {
  title: '页面标题',
  breadcrumb: ['首页', '功能', '页面标题'],
  desc: '页面描述'
};
```

---

## 2. 视觉设计原则

参考 `design-taste-frontend` + `high-end-visual-design` skill，适配后台系统的部分：

| 原则 | 说明 |
|---|---|
| Section Label | 图标 + 大写字母区块分隔符，替代 `nz-card` 的 `nzTitle` |
| 弹簧过渡曲线 | `transition` 统一用 `cubic-bezier(0.32, 0.72, 0, 1)` |
| 按钮触感反馈 | `:active` 加 `transform: scale(0.97) translateY(1px)` |
| 非对称布局 | 用 `nz-row` + 非等宽 `nzLg` 比例，避免 3 列等宽卡片 |

**不适合后台系统，禁止使用：**
- ❌ 居中大标题 Hero Section
- ❌ GSAP / Framer Motion 动效
- ❌ 自定义双边框卡片（暗色主题不兼容，用 `nz-card` 替代）

---

## 3. 优先使用 ng-zorro 组件

**这是暗色主题兼容的核心手段。** ng-zorro 组件的背景色、边框色、文字色在明暗主题下自动跟随，不需要写任何 Less 变量。

```html
<!-- ✅ nz-card 主题自动适配 -->
<nz-card [nzBordered]="false">...</nz-card>

<!-- ✅ 按钮优先用 ng-zorro 原生属性 -->
<button nz-button nzType="primary">主要</button>
<button nz-button nzType="primary" nzDanger>危险</button>
<button nz-button nzType="primary" nzGhost class="btn-ghost-success">成功</button>
<button nz-button nzType="default" class="btn-warning">警告</button>
```

Success / Warning 按钮 ng-zorro 没有原生 `nzType`，用 `nzGhost` + 硬编码色值：

```less
.btn-ghost-success {
  color: #52c41a !important;
  border-color: #52c41a !important;
}
.btn-warning {
  color: #faad14 !important;
  border-color: #faad14 !important;
}
```

---

## 4. nz-card 使用策略

### 4.1 基础用法

功能展示页的卡片统一用 `[nzBordered]="false"`，让内容区域更干净：

```html
<nz-card class="m-b-24" [nzBordered]="false">
  <p class="card-desc m-b-20">说明文字</p>
  <!-- 内容 -->
</nz-card>
```

### 4.2 nz-card-meta：替代自定义 avatar + title + description 布局

当卡片内容是"左侧图标/头像 + 右侧标题/描述"结构时，用 `nz-card-meta` 替代自定义 div，不要手写 flex 布局：

```html
<!-- ✅ 用 nz-card-meta -->
<nz-card [nzBordered]="true">
  <nz-card-meta
    [nzAvatar]="avatarTpl"
    [nzTitle]="item.name"
    [nzDescription]="descTpl">
  </nz-card-meta>
  <ng-template #avatarTpl>
    <span class="flag">{{ item.flag }}</span>
  </ng-template>
  <ng-template #descTpl>
    <div>{{ item.subtitle }}</div>
    <div class="meta">{{ item.region }}</div>
  </ng-template>
</nz-card>

<!-- ❌ 不要自己写 -->
<nz-card>
  <div style="display:flex;align-items:center;gap:12px">
    <div class="avatar">...</div>
    <div class="info">
      <div class="title">...</div>
      <div class="desc">...</div>
    </div>
  </div>
</nz-card>
```

**`nz-card-meta` 的属性：**

| 属性 | 类型 | 说明 |
|---|---|---|
| `nzAvatar` | `TemplateRef` | 左侧图标/头像，只接受模板引用 |
| `nzTitle` | `string \| TemplateRef` | 主标题 |
| `nzDescription` | `string \| TemplateRef` | 副标题/描述，支持多行 |

### 4.3 nzExtra：卡片头部右侧操作区

`nzExtra` 渲染在 `ant-card-head` 的右侧，**只有当 `nzTitle` 或 `nzExtra` 存在时才会渲染头部区域**。适合放操作按钮、标签等：

```html
<nz-card nzTitle="翻译对照表" [nzExtra]="extraTpl" [nzBordered]="false">
  <!-- 内容 -->
</nz-card>

<ng-template #extraTpl>
  <nz-tag [nzColor]="currentLang().color">{{ currentLang().label }}</nz-tag>
</ng-template>
```

**注意：** 不要把行内元素（如 indicator 圆点）放到 `nzExtra`，它会触发头部区域渲染，改变整体布局。行内右侧元素应保留在 body 里用 flex 对齐：

```html
<!-- ✅ indicator 放在 body 里，flex 对齐 -->
<nz-card [nzBordered]="true">
  <div class="card-body-row">
    <nz-card-meta [nzAvatar]="..." [nzTitle]="..."></nz-card-meta>
    <div class="indicator" [style.background]="item.color">...</div>
  </div>
</nz-card>
```

```less
.card-body-row {
  display: flex;
  align-items: center;
  gap: 8px;

  nz-card-meta {
    flex: 1;
    min-width: 0;
  }
}
```

### 4.4 nzHoverable

`nzHoverable` 给卡片加 hover 阴影和 `cursor: pointer`，但 hover 时边框变 `transparent`（不是主题色）。如果需要 hover 时显示主题色边框，仍需自定义：

```less
.my-card:hover {
  border-color: #1677ff !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

---

## 6. 表格：使用封装的 `app-ant-table`

所有带分页、排序、checkbox 的列表页面使用此组件，不直接用 `nz-table`。

```typescript
import { AntTableComponent, AntTableConfig } from '@shared/components/ant-table/ant-table.component';

tableConfig: AntTableConfig = {
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  headers: [
    { title: '名称', field: 'name', width: 200 },
    { title: '操作', tdTemplate: this.operateTpl, notNeedEllipsis: true, width: 120 }
  ]
};
```

```html
<app-ant-table
  [tableConfig]="tableConfig"
  [tableData]="dataList()"
  (changePageIndex)="onPageIndexChange($event)"
  (changePageSize)="onPageSizeChange($event)">
</app-ant-table>
```

静态展示数据（无分页需求）时，设 `pageSize: 100` 即可隐藏分页效果。

---

## 7. Less 样式规则

### 5.1 核心原则：不用 Less 主题变量，不用 CSS 变量

`.themeMixin()` 每次调用会把规则展开 4 份（default / dark / aliyun / compact），增大打包体积。**目标是完全不用 `.themeMixin()`，也不用 `var(--ant-xxx)` CSS 变量**，用以下方式替代所有颜色需求。

### 5.2 颜色处理策略

**文字颜色 → 用 `opacity`**

```less
.section-label { opacity: 0.55; }   /* 次要标签 */
.card-desc     { opacity: 0.65; }   /* 说明文字 */
.demo-hint     { opacity: 0.45; }   /* 辅助提示 */
```

`opacity` 基于当前文字色做透明度，明暗主题下自动正确，无需任何变量。

**主题色 → 用 ng-zorro 组件原生属性，不自己写颜色**

```html
<!-- ✅ 让 ng-zorro 处理颜色，不写任何色值 -->
<button nz-button nzType="primary">主要按钮</button>
<nz-tag nzColor="blue">标签</nz-tag>
<nz-badge [nzColor]="color">徽标</nz-badge>
```

**白色文字 → 直接硬编码**

```less
.tag-on-color { color: #fff; }
```

**区分层次 → 用透明 `border` 替代背景色**

背景色在明暗主题下值不同，没有简单的替代方案，但透明边框可以自然适配：

```less
.stat-item {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}

.inline-code {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
```

**Success / Warning 按钮色 → 硬编码，ng-zorro 无原生对应**

```less
.btn-ghost-success {
  color: #52c41a !important;
  border-color: #52c41a !important;
}
.btn-warning {
  color: #faad14 !important;
  border-color: #faad14 !important;
}
```

### 5.3 代码演示区块

代码块固定深色背景，明暗主题下均适用：

```less
.code-block {
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  background: #1a1a2e;

  code {
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
    line-height: 1.7;
    white-space: pre;
    color: #a8d8a8;
  }
}
```

### 5.4 主题色硬编码

项目未自定义主题色，直接硬编码 Ant Design 默认蓝，无需任何变量：

```less
/* hover/active 状态的主题色边框和文字 */
.lang-card {
  &:hover    { border-color: #1677ff !important; }
  &--active  { border-color: #1677ff !important; }
  &--active .name { color: #1677ff; }
}

.preview-item:hover { border-color: #1677ff; }
```

这样 themeMixin 可以完全不用，Less 文件只有纯结构性样式。

---

## 8. 响应式断点

统一用 `nzLg`（992px）作为多列/单列的切换点，小屏 `nzXs="24"` 堆叠：

```html
<!-- 四列卡片：xs单列 → sm/md双列 → lg四列 -->
<div nz-col [nzLg]="6" [nzMd]="12" [nzSm]="12" [nzXs]="24">

<!-- 左右分栏 -->
<div nz-col [nzLg]="14" [nzXs]="24">
<div nz-col [nzLg]="10" [nzXs]="24">

<!-- 两列等宽 -->
<div nz-col [nzLg]="12" [nzXs]="24">
```

---

## 9. Angular 编码规范

遵循项目内 `angular-developer` skill 的完整规范。以下是与本项目直接相关的关键约束（来自 `CLAUDE.md`）：

- 不写 `standalone: true`，Angular v20+ 默认
- `changeDetection: ChangeDetectionStrategy.OnPush` 必须设置
- 用 `inject()` 替代构造函数注入
- 用 `signal()` / `computed()` 管理状态
- 用 `input()` / `output()` 替代 `@Input` / `@Output` 装饰器
- 不用 `@HostBinding` / `@HostListener`，放到 `host` 对象里
- 不用 `ngClass`，用 `[class]` 绑定
- 不用 `ngStyle`，用 `[style]` 绑定
- 控制流用 `@if` / `@for` 新语法
- 表单优先用 Reactive Forms

---

## 10. 保留的 Skill 清单

| Skill | 用途 |
|---|---|
| `angular-developer` | Angular 编码规范、最佳实践 |
| `design-taste-frontend` | 视觉设计原则参考（section label、弹簧曲线等） |
| `high-end-visual-design` | 高端视觉设计参考（按钮触感、过渡等） |
| `full-output-enforcement` | 强制完整输出，禁止截断代码 |
