import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {createCssSelectorForTs} from "cyia-code-util";
import ts from "typescript";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";

export default function (_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        return chain([
            async () => {
                let path = "";
                // 是一级菜单
                if (_options.mName === _options.name) {
                    path = `src/app/pages/${dasherize(_options.mName)}/${dasherize(_options.mName)}-routing.module.ts`;
                } else {
                    path = `src/app/pages/${dasherize(_options.mName)}/${dasherize(_options.name)}/${dasherize(_options.name)}-routing.module.ts`;

                }
                // 读取文件
                let tsFile = tree.read(path)?.toString()!;
                // 转换成抽象语法树
                // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
                let selector = createCssSelectorForTs(tsFile)
                let result = selector.queryOne(`SourceFile VariableStatement VariableDeclarationList VariableDeclaration ArrayLiteralExpression ObjectLiteralExpression
`) as (ts.ObjectLiteralExpression);
                let recorder = tree.beginUpdate(path);
                recorder.remove(result.pos,result.end-result.pos);
                recorder.insertRight(result.pos, `
  {path: '', component: ${classify(_options.name)}Component, data: {title: '${_options.title}', key: '${dasherize(_options.name)}'}}`);
                await tree.commitUpdate(recorder);
            }
        ]);
    };
}
