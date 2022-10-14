# 教学视频
[video](https://www.bilibili.com/video/BV1gF411x7rN?p=4&vd_source=c3b7b13740b8054236c94695a929eaa3)
# 使用方法：
# 先在此项目根目录执行
1：npm run build 
2：npm link 
# 第二步在“业务”项目中执行
npm link ng-ant-sch

# 如果是一级菜单直接使用下面的生成模块
# 生成模块
ng g ng-ant-sch:g-m

# 如果是二级菜单，需要执行"生成模块"命令，提问“是否是二级菜单”选择yes后，会先生成一级菜单，然后需要单独执行"生成组件"命令，这时候提问"模块名"，需要跟生成模块命令中的模块名一致
# 注意：
# 生成一级菜单后，再生成二级菜单，要把一级菜单中的路由模块  {path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)},删除，同时redirectTo: 'demo' 中的demo改成你自己的二级模块
# 再有报错，就是eslint的报错了，只要将eslint fix即可
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
