export interface AlainUtilArrayConfig {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string;
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string;
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** 父编号项名，默认：`'parent_id'` */
  parentIdMapName?: string;
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 标题项名，默认：`'title'` */
  titleMapName?: string;
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string;
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string;
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string;
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string;
}
