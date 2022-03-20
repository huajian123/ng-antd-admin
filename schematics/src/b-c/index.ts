import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule, schematic,
    SchematicContext, SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics';
import {strings} from "@angular-devkit/core";
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {addDeclarationToModule} from "@schematics/angular/utility/ast-utils";
import {InsertChange} from "@schematics/angular/utility/change";
import {ts} from "dtsgenerator";
import {fnGenerateImport, fnGenerateModalModule, fnGenerateRouteModulePath} from "../until";


export default function (_options: any): Rule {
    const isOneLevel = _options.mName === _options.name;
    return (tree: Tree, _context: SchematicContext) => {
        let rules: Rule[] = [];
        // 是一级菜单
        if (isOneLevel) {
            rules = [...rules, ...[
                oneLevelRule(_options),
                addDeclarationToNgModule(_options, `${dasherize(_options.mName)}/${dasherize(_options.name)}`),
                schematic('component-lazy-m', {
                    mName: _options.mName,
                    name: _options.name
                },),
            ]]
        } else {
            rules = [...rules, ...[
                twoLevelRule(_options),
                addDeclarationToNgModule(_options, `${dasherize(_options.mName)}/${dasherize(_options.name)}/${dasherize(_options.name)}`),
                fnGenerateImport(_options.name, `src/app/pages/${dasherize(_options.mName)}/${dasherize(_options.name)}/${dasherize(_options.name)}-routing.module.ts`, tree),
                fnGenerateRouteModulePath(tree, `src/app/pages/${dasherize(_options.mName)}/${dasherize(_options.mName)}-routing.module.ts`, _options.name,)
            ]]

        }
        if (_options.needAddModal) {
            rules.push(schematic("b-modal", {name: _options.name,isOneLevel:isOneLevel,mName:_options.mName}));
            // 业务组件中modal位置
            let modalComponentFilePath = `./src/app/pages/${_options.name}/${_options.name}.module.ts`;
            if (!isOneLevel) {
                rules.push(move(`./src/app/widget/biz-widget/${_options.name}-modal`, `./src/app/widget/biz-widget/${_options.mName}/${_options.name}-modal`),)
                modalComponentFilePath = `./src/app/pages/${_options.mName}/${_options.name}/${_options.name}.module.ts`;
            }
            // 添加import
            rules.push(fnGenerateImport(_options.name, modalComponentFilePath, tree, "Modal",isOneLevel,_options.mName))
            // 添加imports[]里面的
            rules.push(fnGenerateModalModule(tree,modalComponentFilePath,_options.name))

        }
        return chain(rules);
    };
}

function oneLevelRule(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const sourceTemplates = url('./files'); // 使用範本
        const sourceParametrizedTemplates = apply(sourceTemplates, [
            // renameTemplateFiles(), // 去掉后缀
            applyTemplates({
                ...strings,
                ..._options, // 使用者所輸入的參數
            })
        ]);
        return mergeWith(sourceParametrizedTemplates);
    };

}


function twoLevelRule(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        let source = apply(url(`./files/src/app/pages`), [move(`./src/app/pages/${_options.mName}`), applyTemplates({
            ...strings,
            ..._options, // 使用者所輸入的參數
        })]);
        return chain([
            mergeWith(source),
            schematic('b-s', {dirname: _options.mName, filename: _options.name},),
            schematic('b-m', {name: _options.name, isTwoLevel: true},),
            move(`./src/app/pages/${_options.name}`, `./src/app/pages/${_options.mName}/${_options.name}`),
            schematic('component-lazy-m', {mName: _options.mName, name: _options.name},),
        ])
    };

}

function addDeclarationToNgModule(_options: any, path: string): Rule {
    return (tree: Tree, context) => {
        // const path = findModuleFromOptions(host, {name: _options.name});
        const modulePath = `src/app/pages/${path}.module.ts`;
        let tsFile = tree.read(modulePath)?.toString()!;

        const updateRecorder = tree.beginUpdate(modulePath);
        const source = readIntoSourceFile(tree, modulePath);
        const changes = addDeclarationToModule(
            source,
            modulePath,
            `${classify(_options.name)}Component`,
            `./${dasherize(_options.name)}.component`
        ) as InsertChange[];
        for (const change of changes) {
            if (change instanceof InsertChange) {
                updateRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(updateRecorder);
        return tree;
    }
}

function readIntoSourceFile(host: Tree, modulePath: string): any {
    const text = host.read(modulePath);
    if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
    }

    return ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
}
