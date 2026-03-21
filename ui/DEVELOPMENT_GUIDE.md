# 开发指南

本文档说明项目开发过程中的一些重要规则和约定。

## 代码格式化

### Prettier 格式化规则

**重要**：所有 Prettier 格式化操作由开发者手动执行，AI 助手不应自动运行 prettier 命令。

#### 手动格式化命令

```bash
# 格式化单个文件
npx prettier --write "path/to/file.ts"

# 格式化多个文件
npx prettier --write "src/app/pages/**/*.{ts,html,less}"

# 格式化整个项目
npx prettier --write "src/**/*.{ts,html,less,css,json}"

# 检查格式（不修改文件）
npx prettier --check "src/**/*.{ts,html,less}"
```

#### 为什么手动执行

1. **开发者控制**：开发者应该清楚地知道何时格式化代码
2. **避免干扰**：AI 助手自动格式化可能会干扰开发者的工作流程
3. **减少噪音**：避免在每次代码修改后都看到格式化输出
4. **Git 提交控制**：开发者可以选择在合适的时机（如提交前）统一格式化

#### AI 助手行为规范

当 AI 助手修改代码文件后：
- ❌ **不要**自动运行 `npx prettier --write` 命令
- ❌ **不要**在响应中提示"已格式化文件"
- ✅ **可以**在必要时提醒开发者手动运行格式化命令
- ✅ **可以**在代码修改完成后提示："如需格式化，请运行 `npx prettier --write ...`"

#### 示例

```markdown
<!-- ❌ 错误：AI 自动格式化 -->
我已经修改了文件，现在运行 prettier 格式化...
[执行 npx prettier --write ...]

<!-- ✅ 正确：提示开发者手动格式化 -->
我已经修改了以下文件：
- src/app/pages/task/task.component.ts
- src/app/pages/task/task.component.html

如需格式化，请运行：
npx prettier --write "src/app/pages/task/task.component.{ts,html}"
```

## 代码提交

### Git 提交规范

- 使用语义化提交信息（Conventional Commits）
- 提交前确保代码已格式化
- 提交前运行测试（如果有）

```bash
# 提交前格式化
npx prettier --write "src/**/*.{ts,html,less}"

# 提交
git add .
git commit -m "feat: add task management feature"
```

### 提交信息类型

- `feat`: 新功能
- `fix`: 修复 bug
- `refactor`: 重构代码
- `style`: 样式调整（不影响代码逻辑）
- `docs`: 文档更新
- `test`: 测试相关
- `chore`: 构建工具或辅助工具的变动

## 开发工作流

### 1. 开始新功能

```bash
# 创建新分支
git checkout -b feature/task-management

# 开发...
```

### 2. 开发过程中

- 遵循 STYLE_GUIDE.md 中的样式规范
- 遵循 .claude/CLAUDE.md 中的 Angular 最佳实践
- 定期提交代码

### 3. 完成功能

```bash
# 格式化代码
npx prettier --write "src/**/*.{ts,html,less}"

# 检查格式
npx prettier --check "src/**/*.{ts,html,less}"

# 提交
git add .
git commit -m "feat: complete task management feature"

# 推送
git push origin feature/task-management
```

## 与 AI 助手协作

### AI 助手应该做的

- ✅ 遵循 STYLE_GUIDE.md 中的样式规范
- ✅ 遵循 .claude/CLAUDE.md 中的 Angular 最佳实践
- ✅ 使用 base.less 提供的原子类
- ✅ 避免创建重复的原子样式类
- ✅ 在修改代码后提示开发者手动格式化

### AI 助手不应该做的

- ❌ 自动运行 prettier 格式化命令
- ❌ 在业务组件中创建原子样式类（如 font-weight-500）
- ❌ 重复写 base.less 已有的样式
- ❌ 使用过时的 Angular API（如 @HostBinding、@HostListener）

## 常见问题

### Q: 为什么不让 AI 自动格式化？

A: 因为格式化应该由开发者控制，这样可以：
- 避免不必要的格式化噪音
- 让开发者清楚地知道何时格式化
- 在合适的时机（如提交前）统一格式化
- 避免 AI 频繁执行命令影响性能

### Q: 什么时候应该格式化代码？

A: 建议在以下时机格式化：
- Git 提交前
- 完成一个功能模块后
- 代码审查前
- 合并分支前

### Q: 如何确保团队成员都遵循格式化规范？

A: 可以使用以下方法：
- 配置 Git pre-commit hook 自动格式化
- 在 CI/CD 中检查格式
- 使用 IDE 的自动格式化功能（保存时格式化）

## 相关文档

- [样式规范](./STYLE_GUIDE.md) - 项目样式代码风格规范
- [Angular 最佳实践](./.claude/CLAUDE.md) - Angular 开发最佳实践
- [base.less](./src/styles/themes/base.less) - 原子类定义
