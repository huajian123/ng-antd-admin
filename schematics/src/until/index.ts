import {chain, Rule, SchematicContext, Tree} from "@angular-devkit/schematics";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {createCssSelectorForTs} from "cyia-code-util";
import ts from "typescript";

const fnGenerateImport = function (name: string, filePath: string, path: string, tree: Tree,): Rule {
    return chain([
        async () => {
            let path = filePath;
            // 读取文件
            let tsFile = tree.read(path)?.toString()!;
            // 转换成抽象语法树
            // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
            let selector = createCssSelectorForTs(tsFile)
            let result = selector.queryOne(`SourceFile`) as (ts.SourceFile);
            let recorder = tree.beginUpdate(path);
            // recorder.remove(result.pos, result.end - result.pos);
            recorder.insertLeft(result.pos, `import {${classify(name)}Component} from "./${dasherize(name)}.component";
`);
            await tree.commitUpdate(recorder);
        }
    ]);
}

const fnGenerateRouteModulePath = function (tree: Tree, path: string, name: string): Rule {
    return chain([
        async () => {
            // 读取文件
            let tsFile = tree.read(path)?.toString()!;
            // 转换成抽象语法树
            // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
            let selector = createCssSelectorForTs(tsFile)
            let result = selector.queryOne(`SourceFile VariableStatement VariableDeclaration ArrayLiteralExpression ObjectLiteralExpression`) as (ts.ObjectLiteralExpression);
            let recorder = tree.beginUpdate(path);
            recorder.insertLeft(result.pos, `
  {path: '${dasherize(name)}', loadChildren: () => import('./${dasherize(name)}/${dasherize(name)}.module').then(m => m.${classify(name)}Module)},`);
            await tree.commitUpdate(recorder);
        }
    ]);
}

export {
    fnGenerateImport,
    fnGenerateRouteModulePath
};
