import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {Addon, Graph} from "@antv/x6";

@Component({
  selector: 'app-flow-chat',
  templateUrl: './flow-chat.component.html',
  styleUrls: ['./flow-chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowChatComponent implements OnInit, AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '流程编辑器',
    breadcrumb: ['首页', '扩展功能', '图形编辑器', '流程图'],
    desc: '千言万语不如一张图，流程图是表示算法思路的好方法'
  };
  graph!: Graph;
  @ViewChild('container') container!: ElementRef;

  /** x6画布的一些基础属性 */
  graphBasicConfig = {
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    panning: true, // 画布拖拽
    selecting: true,
    height: 400,
    connecting: {
      snap: true, // 连线的过程中距离节点或者连接桩 50px 时会触发自动吸附
      allowBlank: false, // 是否允许连接到画布空白位置的点
      allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
      allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
      allowEdge: false, // 是否允许边链接到另一个边
      connector: 'rounded',
      connectionPoint: 'boundary'
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  drag(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const shap = target.getAttribute('shap')!;

    const dnd = new Addon.Dnd({
      target: this.graph,
    })

    const node = this.graph.createNode({
      width: 100,
      height: 100,
      shape: shap,
      attrs: {
        body: {
          fill: '#ccc'
        }
      }
    });
    dnd.start(node, event);
  }

  initGraph(): void {
    const graphConfig = {
      ...this.graphBasicConfig,
      container: this.container.nativeElement,
    }
    this.graph = new Graph(graphConfig);
  }

  ngAfterViewInit(): void {
    this.initGraph();
  }

}
