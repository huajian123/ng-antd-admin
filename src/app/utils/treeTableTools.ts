/* eslint-disable prettier/prettier */
import { TreeNodeInterface } from '@shared/components/tree-table/tree-table.component';

function convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
  const stack: TreeNodeInterface[] = [];
  const array: TreeNodeInterface[] = [];
  const hashMap = {};
  stack.push({ ...root, level: 0, expand: false, _checked: false });

  while (stack.length !== 0) {
    const node = stack.pop()!;
    visitNode(node, hashMap, array);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ ...node.children[i], level: node.level! + 1, _checked: false, expand: false, parent: node });
      }
    }
  }

  return array;
}

function visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
  if (!hashMap[node.id]) {
    hashMap[node.id] = true;
    array.push(node);
  }
}

// 获取map形式的treeData,入参为dataList
const fnTreeDataToMap = function tableToTreeData(dataList: any[]): { [key: string]: TreeNodeInterface[] } {
  const mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  dataList.forEach(item => {
    mapOfExpandedData[item.id] = convertTreeToList(item);
  });
  return mapOfExpandedData;
};

/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 */
const fnFlatDataHasParentToTree = function translateDataToTree(data: any[], fatherId = 'fatherId'): any {
  //没有父节点的数据
  let parents = data.filter(value => value[fatherId] === 0);

  //有父节点的数据
  let children = data.filter(value => value[fatherId] !== 0);

  let translator = (parents: any[], children: any[]): any => {
    parents.forEach(parent => {
      children.forEach((current, index) => {
        let p1 = parent._id;
        let p2 = parent.id;
        if(p1 != undefined){
          if (current[fatherId] === p1) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            typeof parent.children !== 'undefined' ? parent.children.push(current) : (parent.children = [current]);
          }
        }else {
          if (current[fatherId] === p2) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            typeof parent.children !== 'undefined' ? parent.children.push(current) : (parent.children = [current]);
          }
        }
      });
    });
  };
  //调用转换方法
  translator(parents, children);
  return parents;
};

// 将树状结构数据添加层级以及是否是根节点的标记，根节点isLeaf为true，层级由level表示
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fnAddTreeDataGradeAndLeaf = function AddTreeDataGradeAndLeaf(array: any[], levelName = 'level', childrenName = 'children') {
  const recursive = (array: any[], level = 0): any => {
    level++;
    return array.map((v: any) => {
      v[levelName] = level;
      const child = v[childrenName];
      if (child && child.length > 0) {
        v.isLeaf = false;
        recursive(child, level);
      } else {
        v.isLeaf = true;
      }
      return v;
    });
  };
  return recursive(array);
};

// 摊平的tree数据
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fnFlattenTreeDataByDataList = function flattenTreeData(dataList: any[]) {
  const mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = fnTreeDataToMap(dataList);
  return fnGetFlattenTreeDataByMap(mapOfExpandedData);
};

// 获取摊平的tree数据,入参为map形式的treeData
const fnGetFlattenTreeDataByMap = function getFlattenTreeData(mapOfExpandedData: { [key: string]: TreeNodeInterface[] }): TreeNodeInterface[] {
  const targetArray: TreeNodeInterface[] = [];
  Object.values(mapOfExpandedData).forEach(item => {
    item.forEach(item_1 => {
      targetArray.push(item_1);
    });
  });
  return targetArray;
};

export { fnTreeDataToMap, fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList, fnGetFlattenTreeDataByMap };
