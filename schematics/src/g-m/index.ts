import {chain, Rule, schematic, SchematicContext, Tree} from '@angular-devkit/schematics';
import {dasherize} from "@angular-devkit/core/src/utils/strings";
import {createCssSelectorForTs} from "cyia-code-util";
import ts from "typescript";
import {fnGenerateImport} from "../until";

export default function (_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        /*是二级菜单*/
        if (_options.isTwoLevel == true) {
            return chain([
                schematic('layout-lazy-m', {name: _options.name}),
                schematic('b-m', {name: _options.name, isTwoLevel: false}),
                generTwoLevelModuleRoute(_options, tree),
                // schematic('component-lazy-m', {name: _options.name, isTwoLevel: false}),
            ]);
        } else {
            /*一级菜单*/
            return chain([
                /* 添加default-routing.module.ts 路由*/
                schematic('layout-lazy-m', {name: _options.name}),
                schematic('b-s', {dirname: _options.name, filename: _options.name}),
                schematic('b-m', {name: _options.name, isTwoLevel: false}),
                schematic('b-c', {name: _options.name, mName: _options.name}),
                fnGenerateImport(_options.name, `src/app/pages/${dasherize(_options.name)}/${dasherize(_options.name)}-routing.module.ts`, tree)
            ]);
        }
    };
}


// 二级菜单时，修改一级模块路由
function generTwoLevelModuleRoute(_options: any, tree: Tree): Rule {
    return chain([
        async () => {
            let path = `src/app/pages/${dasherize(_options.name)}/${dasherize(_options.name)}-routing.module.ts`;
            // 读取文件
            let tsFile = tree.read(path)?.toString()!;
            // 转换成抽象语法树
            // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
            let selector = createCssSelectorForTs(tsFile)
            let result = selector.queryOne(`SourceFile VariableStatement VariableDeclarationList VariableDeclaration ArrayLiteralExpression ObjectLiteralExpression
`) as (ts.ObjectLiteralExpression);
            let recorder = tree.beginUpdate(path);
            recorder.remove(result.pos, result.end - result.pos);
            recorder.insertRight(result.pos, `
  {path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)},
  {path: '', redirectTo: 'demo', pathMatch: 'full'},`);
            await tree.commitUpdate(recorder);
        }
    ]);
}
