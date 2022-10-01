export interface TreeNode {
    menuName: string;
    disabled?: boolean;
    children?: TreeNode[];
    id: number;
  }
  
  export class FilteredTreeResult {
    constructor(public treeData: TreeNode[], public needsToExpanded: TreeNode[] = []) {}
  }
  