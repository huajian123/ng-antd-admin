# 使用方法：
# 先在此项目根目录执行
1：npm run build 
2：npm link 
# 第二步在“业务”项目中执行
npm link ng-ant-sch

# 如果是一级菜单直接使用下面的生成模块
# 生成模块
ng g ng-ant-sch:g-m

# 如果是二级菜单，需要执行生成模块命令，选择二级菜单后，单独执行生成组件命令
# 生成组件
ng g ng-ant-sch:b-c

# 生成d.ts
dtsgen -o ./src/pm/type.d.ts ./src/pm/schema.json
# 生成模块
ng g ng-ant-sch:bis-module
# 生成空白的原理图 
schematics @angular-devkit/schematics-cli:blank name

context.logger.info('My Full Schematic: ' + JSON.stringify(options));
tree.rename('hello', 'allo');
# template中定义变量
mergeWith(
apply(url('./files'), [
template({
INDEX: options.index,
name: options.name,
}),
]),
),
