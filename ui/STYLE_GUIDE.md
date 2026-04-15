# 项目样式代码风格规范

## 1. HTML 模板结构和组织方式

### 1.1 页面结构
- **统一使用 `<app-page-header>` 组件**作为页面头部
- **使用 `.normal-table-wrap` 或 `.content-wrap` 包裹主内容区**
- **使用 `<app-water-mark>` 组件添加水印**

```html
<!-- 标准页面结构 -->
<app-page-header [pageHeaderInfo]="pageHeaderInfo" />

<div class="normal-table-wrap">
  <nz-card>
    <app-water-mark />
    <!-- 页面内容 -->
  </nz-card>
</div>
```

### 1.2 模板组织
- **使用 `ng-template` 定义可复用模板**，放在文件末尾
- **使用 `@for` 和 `@if` 控制流语法**（Angular 新语法）
- **避免在模板中使用复杂逻辑**

```html
<!-- 模板定义放在文件末尾 -->
<ng-template #extraTemplate>
  <a class="operate-text">全部项目</a>
</ng-template>

<ng-template #cardTitleTpl>
  <nz-avatar [nzSize]="24" [nzSrc]="'...'"></nz-avatar>
  <span class="m-l-10">Angular</span>
</ng-template>
```

## 2. CSS 类命名规范

### 2.1 极致的原子类优先策略

**核心原则**：最大化使用 base.less 提供的原子类，避免在业务组件中重复写基础样式。

#### 可用的原子类

**布局类**：
- `flex` - display: flex
- `flex-column` - flex-direction: column
- `flex-1` - flex: 1
- `flex-auto` - flex: auto
- `center` - 水平垂直居中
- `space-between` - justify-content: space-between
- `space-around` - justify-content: space-around
- `left-start-center` - justify-content: flex-start
- `end-start-center` - justify-content: flex-end

**间距类**：
- 外边距：`m-t-10`, `m-b-20`, `m-l-8`, `m-r-5`, `m-0`, `m-10`
- 内边距：`p-0`, `p-8`, `p-16`, `p-24`, `p-t-8`, `p-l-16`, `p-b-24`

**文本类**：
- 字体大小：`sp-11`, `sp-12`, `sp-14`, `sp-16`, `sp-18`, `sp-28`
- 对齐：`text-center`, `text-left`, `text-right`

**其他**：
- 圆角：`b-r-8`, `b-r-12`
- 动画：`animate-02`, `animate-03`
- 交互：`hand-model` (cursor: pointer)
- 操作文本：`operate-text`

#### 使用示例

```html
<!-- ✅ 推荐：使用原子类 -->
<div class="flex space-between m-t-20 m-b-10">
  <span class="sp-14 m-l-10">文本</span>
</div>

<div class="flex flex-column center p-t-24 p-b-24">
  <span class="sp-28">图标</span>
  <span class="sp-12">描述</span>
</div>

<!-- ❌ 避免：在业务组件 LESS 中重复写这些样式 -->
<div class="custom-container">
  <span class="custom-text">文本</span>
</div>

.custom-container {
  display: flex;              // ❌ 应该用 flex 类
  justify-content: space-between;  // ❌ 应该用 space-between 类
  margin-top: 20px;           // ❌ 应该用 m-t-20 类
}

.custom-text {
  font-size: 14px;            // ❌ 应该用 sp-14 类
  margin-left: 10px;          // ❌ 应该用 m-l-10 类
}
```

#### 内联样式的使用场景

当 base.less 没有提供对应的原子类时，可以使用少量内联样式：

```html
<!-- ✅ 可接受：base.less 没有 gap 原子类 -->
<div class="flex" style="gap: 12px; flex-wrap: wrap">

<!-- ✅ 可接受：base.less 没有 align-items: flex-start 原子类 -->
<div class="flex" style="align-items: flex-start; gap: 6px">

<!-- ✅ 可接受：动态样式 -->
<div [style.border-left-color]="col.color">
```

### 2.2 自定义类命名

**仅在以下情况下创建自定义类**：
1. 无法用原子类表达的样式（如 hover 效果、伪类、特殊过渡）
2. 需要覆盖 ng-zorro 组件样式
3. 需要响应式媒体查询
4. 需要特殊的业务逻辑样式（如拖拽占位符）

**命名规则**：
- **使用 kebab-case 命名**：`task-card`, `drag-placeholder`, `col-empty-opacity`
- **语义化命名**：描述元素的功能或位置
- **避免过度嵌套**：最多 3 层
- **禁止创建原子类**：不要在业务组件中创建 `font-weight-500`、`display-flex` 这类原子样式类

```less
// ✅ 推荐：只写无法用原子类表达的样式
.task-card {
  cursor: grab;
  border-left: 3px solid transparent !important;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  }

  &:active {
    cursor: grabbing;
  }
}

.drag-placeholder {
  min-height: 60px;
  border: 2px dashed var(--ant-color-primary, #1890ff);
  opacity: 0.6;
}

// ❌ 避免：创建原子类
.font-weight-500 {
  font-weight: 500;  // 这应该直接写在需要的元素上，或者添加到 base.less
}

.display-flex {
  display: flex;  // 应该使用 flex 原子类
}
```

## 3. LESS 文件组织结构

### 3.1 文件结构
- **极简原则**：只写必要的样式，大量使用 ng-zorro 组件默认样式
- **使用 `:host ::ng-deep` 覆盖 ng-zorro 组件样式**
- **响应式写在对应选择器内部**

```less
// 1. 顶层样式
.content-wrap {
  width: 100%;
  padding: 24px;
}

// 2. 组件覆盖
:host ::ng-deep {
  .ant-statistic {
    text-align: center;
  }
}

// 3. 响应式
@media (width <= 820px) {
  .mini-screen {
    display: block;
  }
}
```

### 3.2 嵌套规则
- **最多 3 层嵌套**
- **使用 LESS 的 mixin 复用**：`.center;`

```less
.flow-wrap {
  width: 100%;

  .rank-list {
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 35px;
    .center; // 复用 mixin
  }
}
```

## 4. 内联样式使用规范

### 4.1 极少使用内联样式
- **仅在动态样式或特殊情况下使用**
- **优先使用 `[style.xxx]` 绑定而非 `style=""`**

```html
<!-- 避免 -->
<div style="width: 270px; margin-top: 10px">

<!-- 推荐：使用类 -->
<div class="search-input">

<!-- 可接受：动态样式 -->
<div [style.border-left-color]="col.color">
```

### 4.2 允许的内联样式场景
- **宽度限制**：`style="width: 270px"`（搜索框等）
- **小间距调整**：`style="padding: 0 18px 0 0"`
- **动态颜色**：`[style.backgroundColor]="color"`

## 5. ng-zorro 组件使用规范

### 5.1 完全使用 ng-zorro 组件
- **避免使用裸 `<div>` 作为容器**，优先使用 `<nz-card>`
- **所有表单使用 `nz-form` 系列组件**
- **布局使用 `nz-row` + `nz-col`**

```html
<!-- 推荐：使用 nz-card -->
<nz-card nzTitle="标题" [nzExtra]="extraTpl">
  <app-water-mark />
  <!-- 内容 -->
</nz-card>

<!-- 避免：裸 div -->
<div class="card">
  <div class="card-header">标题</div>
  <div class="card-body">内容</div>
</div>
```

### 5.2 组件属性顺序
1. 结构属性：`nz-col`, `nz-row`
2. 尺寸属性：`nzSize`, `nzSpan`
3. 样式属性：`nzType`, `nzGhost`
4. 数据属性：`[nzData]`, `[nzValue]`
5. 事件属性：`(click)`, `(nzClick)`

```html
<button nz-button nzSize="small" nzType="primary" [disabled]="false" (click)="submit()">
  提交
</button>
```

## 6. 响应式布局实现方式

### 6.1 使用 ng-zorro 栅格系统
- **使用 `[nzXs]`, `[nzSm]`, `[nzMd]`, `[nzLg]`, `[nzXl]`, `[nzXXl]`**
- **断点顺序**：从小到大排列

```html
<div nz-row [nzGutter]="[16, 16]">
  <div nz-col [nzXs]="24" [nzSm]="24" [nzMd]="12" [nzLg]="8" [nzXl]="6">
    <!-- 内容 -->
  </div>
</div>
```

### 6.2 媒体查询
- **使用 `@media (width <= XXXpx)` 语法**
- **常用断点**：576px (xs), 768px (sm), 992px (md), 1200px (lg), 1600px (xl)

```less
@media (width <= 820px) {
  .mini-screen {
    display: block;
  }
}

@media screen and (width <= 576px) {
  .ant-divider-vertical {
    display: none;
  }
}
```

### 7.2 避免硬编码颜色
- **不要写 `#fff`, `#000` 等硬编码颜色**
- **使用 ng-zorro 组件的颜色属性**：`nzType="primary"`, `nzDanger`

```html
<!-- 推荐 -->
<nz-tag nzColor="blue">标签</nz-tag>
<button nz-button nzType="primary">按钮</button>

<!-- 避免 -->
<div style="background: #1890ff; color: #fff">
```

## 8. 间距和布局处理方式

### 8.1 使用原子类处理间距
- **外边距**：`m-t-20`, `m-b-10`, `m-l-8`, `m-r-5`
- **内边距**：`p-16`, `p-t-24`, `p-l-16`
- **数值**：5, 8, 10, 16, 20, 24, 30 等

```html
<div class="m-t-20 m-b-10">
  <span class="m-l-10">文本</span>
</div>
```

### 8.2 使用 nzGutter 处理栅格间距
```html
<div nz-row [nzGutter]="[16, 16]">
  <div nz-col nzSpan="12">列1</div>
  <div nz-col nzSpan="12">列2</div>
</div>
```

### 8.3 布局使用 flex

**优先使用原子类**：
- `flex` - display: flex
- `flex-column` - flex-direction: column
- `flex-1` - flex: 1
- `center` - 水平垂直居中
- `space-between` - justify-content: space-between
- `left-start-center` - justify-content: flex-start

**base.less 未提供的属性使用内联样式**：
- `gap` - 使用 `style="gap: 12px"`
- `align-items: flex-start` - 使用 `style="align-items: flex-start"`
- `flex-wrap` - 使用 `style="flex-wrap: wrap"`

```html
<!-- ✅ 推荐：原子类 + 内联样式 -->
<div class="flex space-between" style="gap: 12px; flex-wrap: wrap">
  <span class="flex-1 sp-14">文本</span>
</div>

<div class="flex flex-column center p-t-24">
  <span>内容</span>
</div>

<!-- ❌ 避免：在 LESS 中重复写 flex 布局 -->
.custom-layout {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
```

**仅在特殊情况下写自定义布局类**：
- 需要复杂的嵌套选择器
- 需要响应式媒体查询
- 需要伪类或特殊状态

```less
// ✅ 可接受：复杂的响应式布局
.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (width <= 900px) {
    grid-template-columns: 1fr;
  }
}
```

## 9. 表单样式规范

### 9.1 表单布局
- **使用 `nz-form` 组件**
- **使用 `.form-wrap` 类包裹表单**
- **标签宽度**：`[nzSm]="6"`, 内容宽度：`[nzSm]="14"`

```html
<form class="form-wrap" nz-form [formGroup]="form">
  <nz-form-item>
    <nz-form-label nzFor="title" nzRequired [nzSm]="6" [nzXs]="24">标题</nz-form-label>
    <nz-form-control nzErrorTip="请输入标题" [nzSm]="14" [nzXs]="24">
      <input id="title" formControlName="title" nz-input />
    </nz-form-control>
  </nz-form-item>
</form>
```

## 10. 特殊样式处理

### 10.1 覆盖 ng-zorro 样式
```less
:host ::ng-deep {
  .ant-card-body {
    padding: 10px 12px;
  }
}
```

### 10.2 过渡动画
```less
.task-card {
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  }
}
```

### 10.3 文本溢出
```less
.group {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
```

## 总结

**核心原则**：
1. ✅ 极简主义：只写必要的样式
2. ✅ 组件优先：完全使用 ng-zorro 组件
3. ✅ **原子类优先：最大化使用 base.less 提供的原子类，避免重复写基础样式**
4. ✅ **禁止创建原子类：不要在业务组件中创建 font-weight-500、display-flex 这类原子样式类**
5. ✅ **内联样式补充：当 base.less 没有提供对应原子类时（如 gap、align-items: flex-start），使用少量内联样式**
6. ✅ 主题适配：使用 CSS 变量，避免硬编码颜色
7. ✅ 响应式：使用栅格系统 + 媒体查询
8. ✅ 语义化：类名清晰表达意图
9. ✅ 避免嵌套：最多 3 层
10. ✅ 自定义类最小化：只在无法用原子类表达时才创建自定义类

**样式优先级**：
1. **第一优先**：base.less 原子类（flex, sp-14, m-t-20 等）
2. **第二优先**：少量内联样式（gap, align-items: flex-start 等 base.less 未提供的属性）
3. **第三优先**：自定义类（仅用于 hover、伪类、响应式、特殊业务逻辑）

**示例对比**：

```html
<!-- ❌ 错误：在 LESS 中重复写基础样式 -->
<div class="custom-container">
  <span class="custom-title">标题</span>
</div>

.custom-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.custom-title {
  font-size: 14px;
  font-weight: 600;
}

<!-- ✅ 正确：使用原子类 + 少量内联样式 + 必要的自定义类 -->
<div class="flex space-between m-t-20">
  <span class="sp-14 custom-title">标题</span>
</div>

.custom-title {
  font-weight: 600;  // 仅保留 base.less 未提供的样式
}
```
