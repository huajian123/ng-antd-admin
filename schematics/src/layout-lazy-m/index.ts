import {apply, chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {createCssSelectorForTs} from "cyia-code-util";
import ts from "typescript";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
// 生成路由代码
export default function (_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      async () => {
        // 读取文件
        let tsFile = tree.read('src/app/layout/default/default-routing.module.ts')?.toString()!;
        // 转换成抽象语法树
        // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
        let selector = createCssSelectorForTs(tsFile)
        let result = selector.queryOne(`SourceFile VariableStatement VariableDeclarationList VariableDeclaration ArrayLiteralExpression ObjectLiteralExpression PropertyAssignment ArrayLiteralExpression ObjectLiteralExpression`) as (ts.ObjectLiteralExpression);
        let recorder = tree.beginUpdate('src/app/layout/default/default-routing.module.ts');
        recorder.insertLeft(result.pos, `
      {
        path: '${dasherize(_options.name)}',
        loadChildren: () => import('../../pages/${dasherize(_options.name)}/${dasherize(_options.name)}.module').then(m => m.${classify(_options.name)}Module)
      },`);
        await tree.commitUpdate(recorder);
      }
    ]);
  };
}
