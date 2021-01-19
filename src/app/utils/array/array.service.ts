import { Injectable } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AlainConfigService, AlainUtilArrayConfig } from '../config';

export interface ArrayServiceTreeToArrOptions {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string;
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string;
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 是否移除 `children` 节点，默认：`true` */
  clearChildren?: boolean;
  /** 转换成数组结构时回调 */
  cb?: (item: NzSafeAny, parent: NzSafeAny, deep: number) => void;
}

export interface ArrayServiceArrToTreeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** 父编号项名，默认：`'parent_id'` */
  parentIdMapName?: string;
  /**
   * 根父编号值，默认会自动计算得到最合适的根父编号值，例如：
   * @example
   * ```ts
   * const res = srv.arrToTree([
   *    { id: 2, parent_id: 'a', title: 'c1' },
   *    { id: 4, parent_id: 2, title: 't1' },
   *  ],
   *  { rootParentValue: 'a' });
   * ```
   */
  rootParentIdValue?: any;
  /** 子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 转换成树数据时回调 */
  cb?: (item: NzSafeAny) => void;
}

export interface ArrayServiceArrToTreeNodeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** 父编号项名，默认：`'parent_id'` */
  parentIdMapName?: string;
  /** 标题项名，默认：`'title'` */
  titleMapName?: string;
  /** 设置为叶子节点项名，若数据源不存在时自动根据 `children` 值决定是否为叶子节点，默认：`'isLeaf'` */
  isLeafMapName?: string;
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string;
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string;
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string;
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string;
  /** 转换成树数据后，执行的递归回调 */
  cb?: (item: NzSafeAny, parent: NzSafeAny, deep: number) => void;
}

export interface ArrayServiceGetKeysByTreeNodeOptions {
  /** 是否包含半选状态的值，默认：`true` */
  includeHalfChecked?: boolean;
  /** 是否重新指定 `key` 键名，若不指定表示使用 `NzTreeNode.key` 值 */
  keyMapName?: string;
  /** 回调，返回一个值 `key` 值，优先级高于其他 */
  cb?: (item: NzTreeNode, parent: NzTreeNode, deep: number) => NzSafeAny;
}

@Injectable({ providedIn: 'root' })
export class ArrayService {
  private c: AlainUtilArrayConfig;
  constructor(cog: AlainConfigService) {
    this.c = cog.merge('utilArray', {
      deepMapName: 'deep',
      parentMapName: 'parent',
      idMapName: 'id',
      parentIdMapName: 'parent_id',
      childrenMapName: 'children',
      titleMapName: 'title',
      checkedMapname: 'checked',
      selectedMapname: 'selected',
      expandedMapname: 'expanded',
      disabledMapname: 'disabled',
    })!;
  }
  /**
   * 将树结构转换成数组结构
   */
  treeToArr(tree: NzSafeAny[], options?: ArrayServiceTreeToArrOptions): NzSafeAny[] {
    const opt = {
      deepMapName: this.c.deepMapName,
      parentMapName: this.c.parentMapName,
      childrenMapName: this.c.childrenMapName,
      clearChildren: true,
      cb: null,
      ...options,
    } as ArrayServiceTreeToArrOptions;
    const result: NzSafeAny[] = [];
    const inFn = (list: NzSafeAny[], parent: NzSafeAny, deep: number = 0) => {
      for (const i of list) {
        i[opt.deepMapName!] = deep;
        i[opt.parentMapName!] = parent;
        if (opt.cb) {
          opt.cb(i, parent, deep);
        }
        result.push(i);
        const children = i[opt.childrenMapName!];
        if (children != null && Array.isArray(children) && children.length > 0) {
          inFn(children, i, deep + 1);
        }
        if (opt.clearChildren) {
          delete i[opt.childrenMapName!];
        }
      }
    };
    inFn(tree, 1);
    return result;
  }

  /**
   * 数组转换成树数据
   */
  arrToTree(arr: NzSafeAny[], options?: ArrayServiceArrToTreeOptions): NzSafeAny[] {
    const opt = {
      idMapName: this.c.idMapName,
      parentIdMapName: this.c.parentIdMapName,
      childrenMapName: this.c.childrenMapName,
      cb: null,
      ...options,
    } as ArrayServiceArrToTreeOptions;
    if (arr.length === 0) {
      return [];
    }
    const tree: NzSafeAny[] = [];
    const childrenOf: NzSafeAny = {};
    let rootPid = opt.rootParentIdValue;
    if (!rootPid) {
      const pids = arr.map(i => i[opt.parentIdMapName!]);
      const emptyPid = pids.findIndex(w => w == null);
      rootPid = emptyPid !== -1 ? pids[emptyPid] : pids.sort()[0];
    }
    for (const item of arr) {
      const id = item[opt.idMapName!];
      const pid = item[opt.parentIdMapName!];
      childrenOf[id] = childrenOf[id] || [];
      item[opt.childrenMapName!] = childrenOf[id];
      if (opt.cb) {
        opt.cb(item);
      }
      if (pid !== rootPid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  /**
   * 数组转换成 `nz-tree` 数据源，通过 `options` 转化项名，也可以使用 `options.cb` 更高级决定数据项
   */
  arrToTreeNode(arr: NzSafeAny[], options?: ArrayServiceArrToTreeNodeOptions): NzTreeNode[] {
    const opt = {
      idMapName: this.c.idMapName,
      parentIdMapName: this.c.parentIdMapName,
      titleMapName: this.c.titleMapName,
      isLeafMapName: 'isLeaf',
      checkedMapname: this.c.checkedMapname,
      selectedMapname: this.c.selectedMapname,
      expandedMapname: this.c.expandedMapname,
      disabledMapname: this.c.disabledMapname,
      cb: null,
      ...options,
    } as ArrayServiceArrToTreeNodeOptions;
    const tree = this.arrToTree(arr, {
      idMapName: opt.idMapName,
      parentIdMapName: opt.parentIdMapName,
      childrenMapName: 'children',
    });
    this.visitTree(tree, (item: NzSafeAny, parent: NzSafeAny, deep: number) => {
      item.key = item[opt.idMapName!];
      item.title = item[opt.titleMapName!];
      item.checked = item[opt.checkedMapname!];
      item.selected = item[opt.selectedMapname!];
      item.expanded = item[opt.expandedMapname!];
      item.disabled = item[opt.disabledMapname!];
      if (item[opt.isLeafMapName!] == null) {
        item.isLeaf = item.children.length === 0;
      } else {
        item.isLeaf = item[opt.isLeafMapName!];
      }
      if (opt.cb) {
        opt.cb(item, parent, deep);
      }
    });
    return tree.map(node => new NzTreeNode(node));
  }

  /**
   * 递归访问整个树
   */
  visitTree(
    tree: NzSafeAny[],
    cb: (item: NzSafeAny, parent: NzSafeAny, deep: number) => void,
    options?: {
      /** 子项名，默认：`'children'` */
      childrenMapName?: string;
    },
  ): void {
    options = {
      childrenMapName: this.c.childrenMapName,
      ...options,
    };
    const inFn = (data: NzSafeAny[], parent: NzSafeAny, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        const childrenVal = item[options!.childrenMapName!];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }

  /**
   * 获取所有已经选中的 `key` 值
   */
  getKeysByTreeNode(tree: NzTreeNode[], options?: ArrayServiceGetKeysByTreeNodeOptions): NzSafeAny[] {
    const opt = {
      includeHalfChecked: true,
      ...options,
    } as ArrayServiceGetKeysByTreeNodeOptions;
    const keys: NzSafeAny[] = [];
    this.visitTree(tree, (item: NzTreeNode, parent: NzTreeNode, deep: number) => {
      if (item.isChecked || (opt.includeHalfChecked && item.isHalfChecked)) {
        keys.push(opt.cb ? opt.cb(item, parent, deep) : opt.keyMapName ? item.origin[opt.keyMapName] : item.key);
      }
    });
    return keys;
  }
}
