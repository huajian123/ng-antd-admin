import {apply, applyTemplates, mergeWith, Rule, SchematicContext, Tree, url} from '@angular-devkit/schematics';
import {strings} from "@angular-devkit/core";


export default function (_options: any): Rule {
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
