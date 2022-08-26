export interface TreeNode {
  departmentName: string;
  disabled?: boolean;
  children?: TreeNode[];
  id: number;
}

export class FilteredTreeResult {
  constructor(public treeData: TreeNode[], public needsToExpanded: TreeNode[] = []) {}
}
