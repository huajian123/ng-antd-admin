import { TemplateRef, TrackByFunction } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions } from 'ng-zorro-antd/drawer';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { NzTableData } from 'ng-zorro-antd/table';

export interface AlainSTConfig {
  /**
   * 起始页码，默认为：`1`
   */
  pi?: number;
  /**
   * 每页数量，默认：`10`
   */
  ps?: number;
  /**
   * 是否显示边框，默认：`false`
   */
  bordered?: boolean;
  /**
   * table大小，默认：`default`
   */
  size?: 'small' | 'middle' | 'default';
  /**
   * 是否开启响应式，默认：`true`
   */
  responsive?: boolean;
  /**
   * 是否在小屏幕下才显示顶部与底部，默认：`false`
   */
  responsiveHideHeaderFooter?: boolean;
  /** 请求体配置 */
  req?: {
    /**
     * 分页类型，默认：`page`
     * - `page` 使用 `pi`，`ps` 组合
     * - `skip` 使用 `skip`，`limit` 组合
     */
    type?: 'page' | 'skip';
    /** 请求方法，默认：`GET` */
    method?: string;
    /** 请求体 `Header` */
    headers?: NzSafeAny;
    /**
     * 重命名参数 `pi`、`ps`，默认：`{ pi: 'pi', ps: 'ps', skip: 'skip', limit: 'limit' }`
     * - `{ pi: 'Page' }` => `pi` 会被替换成 Page
     */
    reName?: {
      pi?: string;
      ps?: string;
      skip?: string;
      limit?: string;
    };
    /**
     * 是否将请求所有参数数据都放入 `body` 当中（`url` 地址本身参数除外），仅当 `method: 'POST'` 时有效，默认：`false`
     */
    allInBody?: boolean;
    /**
     * 是否延迟加载数据，即渲染结束后不会主动发起请求，默认：`false`
     */
    lazyLoad?: boolean;
    /**
     * 请求前数据处理
     */
    process?: (requestOptions: NzSafeAny) => NzSafeAny;
  };
  /** 返回体配置 */
  res?: {
    /**
     * 重命名返回参数 `total`、`list`，默认：`{ list: ['list'], total: ['total'] }`
     * - `{ total: 'Total' }` => Total 会被当作 `total`
     */
    reName?: {
      total?: string | string[];
      list?: string | string[];
    };
    /**
     * 数据预处理
     */
    process?: (data: NzSafeAny[], rawData?: NzSafeAny) => NzSafeAny[];
  };
  /** 返回体配置 */
  page?: {
    /**
     * 前端分页，当 `data` 为`any[]` 或 `Observable<any[]>` 有效，默认：`true`
     * - `true` 由 `st` 根据 `data` 长度受控分页，包括：排序、过滤等
     * - `false` 由用户通过 `total` 和 `data` 参数受控分页，并维护 `(change)` 当分页变更时重新加载数据
     */
    front?: boolean;
    /**
     * 后端分页是否采用`0`基索引，只在`data`类型为`string`时有效，默认：`false`
     */
    zeroIndexed?: boolean;
    /**
     * 指定分页显示的位置，默认：`bottom`
     */
    position?: 'top' | 'bottom' | 'both';
    /**
     * 指定分页分页方向，默认：`right`
     */
    placement?: 'left' | 'center' | 'right';
    /**
     * 是否显示分页器，默认：`true`
     */
    show?: boolean;
    /**
     * 是否显示分页器中改变页数，默认：`false`
     */
    showSize?: boolean;
    /**
     * 分页器中每页显示条目数下拉框值，默认：`[10, 20, 30, 40, 50]`
     */
    pageSizes?: number[];
    /**
     * 是否显示分页器中快速跳转，默认：`false`
     */
    showQuickJumper?: boolean;
    /**
     * 是否显示总数据量，默认：`true`
     * - `boolean` 类型显示与否，默认模板：`共 {{total}} 条`
     * - `string` 自定义模板，模板变量：
     *  - `{{total}}` 表示数据总量
     *  - `{{range[0]}}` 表示当前页开始数量值
     *  - `{{range[1]}}` 表示当前页结束数量值
     */
    total?: string | boolean;
    /**
     * 用于自定义页码的结构，用法参照 Pagination 组件
     */
    itemRender?: TemplateRef<PaginationItemRenderContext> | null;
    /**
     * 当添加该属性时，显示为简单分页，默认：`false`
     */
    simple?: boolean;
    /**
     * 切换分页时返回顶部，默认：`true`
     */
    toTop?: boolean;
    /**
     * 返回顶部偏移值，默认：`100`
     */
    toTopOffset?: number;
  };
  /**
   * 重命名排序值，`columns` 的重命名高于属性
   */
  sortReName?: { ascend?: string; descend?: string };
  /**
   * 单排序规则
   * - 若不指定，则返回：`columnName=ascend|descend`
   * - 若指定，则返回：`sort=columnName.(ascend|descend)`
   */
  singleSort?: {
    /** 请求参数名，默认：`sort` */
    key?: string;
    /** 列名与状态间分隔符，默认：`.` */
    nameSeparator?: string;
  };
  /**
   * 是否多排序，当 `sort` 多个相同值时自动合并，建议后端支持时使用
   */
  multiSort?: {
    /** 请求参数名，默认：`sort` */
    key?: string;
    /** 不同属性间分隔符，默认：`-` */
    separator?: string;
    /** 列名与状态间分隔符，默认：`.` */
    nameSeparator?: string;
    /**
     * 是否以数组的形式传递参数
     * - `true` 表示使用 `url?sort=name.asc&sort=age.desc` 形式
     * - `false` 表示使用 `url?sort=name.asc-age.desc` 形式
     */
    arrayParam?: boolean;
    /**
     * 是否全局多排序模式，默认：`true`
     * - `true` 表示所有 `st` 默认为多排序
     * - `false` 表示需要为每个 `st` 添加 `multiSort` 才会视为多排序模式
     */
    global?: boolean;
    /**
     * 是否保持空值的键名，默认：`true`
     * - `true` 表示不管是否有排序都会发送 `key` 键名
     * - `false` 表示无排序动作时不会发送 `key` 键名
     */
    keepEmptyKey?: boolean;
  };
  /**
   * 按钮模态框配置
   */
  modal?: {
    /**
     * 指定模态框目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
    /** 大小；例如：lg、600，默认：`lg` */
    size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number;
    /** 对话框 [ModalOptions](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/modal/modal-types.ts) 参数 */
    modalOptions?: ModalOptions;
    /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
    exact?: boolean;
  };
  /**
   * 按钮抽屉配置
   */
  drawer?: {
    /**
     * 抽屉目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
    /**
     * 大小；例如：lg、600，默认：`md`
     *
     * | 类型 | 默认大小 |
     * | --- | ------ |
     * | `sm` | `300` |
     * | `md` | `600` |
     * | `lg` | `900` |
     * | `xl` | `1200` |
     *
     * > 以上值，可通过覆盖相应的LESS参数自行调整
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    /**
     * 是否包含底部工具条，默认：`true`
     */
    footer?: boolean;
    /**
     * 底部工具条高度，默认：`55`
     */
    footerHeight?: number;
    /** 抽屉 [NzDrawerOptions](https://ng.ant.design/components/drawer/zh#nzdraweroptions) 参数 */
    drawerOptions?: NzDrawerOptions;
  };
  /**
   * 气泡参数
   */
  pop?: {
    /**
     * Title of the popover, default: `确认删除吗？`
     */
    title?: string;

    /**
     * Popover trigger mode, default: `click`
     */
    trigger?: 'click' | 'focus' | 'hover';

    /**
     * The position of the popover relative to the target, default: `top`
     */
    placement?:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom';

    /**
     * Class name of the popover card
     */
    overlayClassName?: string;

    /**
     * Style of the popover card
     */
    overlayStyle?: {};

    /**
     * Text of the Cancel button
     */
    cancelText?: string;

    /**
     * Text of the Confirm button
     */
    okText?: string;

    /**
     * Button `type` of the Confirm button
     */
    okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'default';

    /**
     * Customize icon of confirmation
     */
    icon?: string;
  };
  /**
   * 行单击多少时长之类为双击（单位：毫秒），默认：`200`
   */
  rowClickTime?: number;
  /**
   * 过滤按钮确认文本
   */
  filterConfirmText?: string;
  /**
   * 过滤按钮重置文本
   */
  filterClearText?: string;
  /**
   * 按钮图标
   */
  btnIcon?: {
    /** 图标主题风格，默认：`outline` */
    theme?: 'outline' | 'twotone' | 'fill';
    /** 是否有旋转动画，默认：`false` */
    spin?: boolean;
    /** 仅适用双色图标，设置双色图标的主要颜色，仅对当前 icon 生效 */
    twoToneColor?: string;
    /** 指定来自 IconFont 的图标类型 */
    iconfont?: string;
  };
  /**
   * 行号索引，默认：`1`
   * - 计算规则为：`index + noIndex`
   */
  noIndex?: number;
  /**
   * 表格行的类名
   */
  rowClassName?: (record: NzSafeAny, index: number) => string;
  /**
   * 通过点击行来展开子行，Default: `false`
   */
  expandRowByClick?: boolean;
  /**
   * 手风琴模式，Default: `false`
   */
  expandAccordion?: boolean;
  /**
   * 指定 `width` 模式
   */
  widthMode?: {
    /**
     * 宽度类型，默认：`default`
     * - `default` 默认行为
     * - `strict` 严格模式，即强制按 `width` 指定的宽度呈现，并根据 `strictBehavior` 类型处理
     */
    type?: 'strict' | 'default';
    /**
     * 严格模式的处理行为，默认：`truncate`
     * - `wrap` 强制换行
     * - `truncate` 截短
     */
    strictBehavior?: 'wrap' | 'truncate';
  };
  /**
   * Default: `54`
   */
  virtualItemSize?: number;
  /**
   * Default: `200`
   */
  virtualMaxBufferPx?: number;
  /**
   * Default: `100`
   */
  virtualMinBufferPx?: number;
  /**
   * The TrackByFunction to use for tracking changes
   */
  virtualForTrackBy?: TrackByFunction<NzTableData>;
  /**
   * Conditional expression rendering behavior, can be set to `hide` (default) or `disabled`, Default: `hide`
   */
  iifBehavior?: 'hide' | 'disabled';
  /**
   * The spinning indicator
   */
  loadingIndicator?: TemplateRef<void>;
  /**
   * Specifies a delay in milliseconds for loading state (prevent flush)
   */
  loadingDelay?: number;
  /**
   * Custom no result content
   */
  noResult?: string | TemplateRef<void>;
}
