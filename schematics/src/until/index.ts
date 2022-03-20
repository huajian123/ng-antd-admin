import {chain, Rule, SchematicContext, Tree} from "@angular-devkit/schematics";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {createCssSelectorForTs} from "cyia-code-util";
import ts from "typescript";

// 添加import
const fnGenerateImport = function (name: string, filePath: string, tree: Tree, suffix: 'Component' | 'Modal' = 'Component', isOneLevel = true, mName = ''): Rule {
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
            console.log(suffix);
            if (suffix === "Component") {
                recorder.insertLeft(result.pos, `import {${classify(name)}Component} from "./${dasherize(name)}.component";
`);
            } else {
                let path = `import {${classify(name)}ModalModule} from "@widget/biz-widget/${dasherize(name)}-modal/${dasherize(name)}-modal.module";
`;
                if (!isOneLevel) {
                    path = `import {${classify(name)}ModalModule} from "@widget/biz-widget/${dasherize(mName)}/${dasherize(name)}-modal/${dasherize(name)}-modal.module";
`;
                }
                recorder.insertLeft(result.pos, path);
            }

            await tree.commitUpdate(recorder);
        }
    ]);
}

// default-routing.module.ts生成懒加载
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

// 业务模块中导入对话框modal
const fnGenerateModalModule = function (tree: Tree, path: string, name: string): Rule {
    return chain([
        async () => {
            // 读取文件
            let tsFile = tree.read(path)?.toString()!;
            // 转换成抽象语法树
            // let ast = ts.createSourceFile('default-routing.module', tsFile, ScriptTarget.Latest)
            let selector = createCssSelectorForTs(tsFile)
            let result = selector.queryOne(`SourceFile ClassDeclaration Decorator CallExpression ObjectLiteralExpression PropertyAssignment[name=imports] ArrayLiteralExpression Identifier`) as (ts.Identifier);
            let recorder = tree.beginUpdate(path);
            recorder.insertLeft(result.pos, `
    ${classify(name)}ModalModule,`);
            await tree.commitUpdate(recorder);
        }
    ]);
}

export {
    fnGenerateImport,
    fnGenerateModalModule,
    fnGenerateRouteModulePath
};
