// https://www.thinktecture.com/angular/view-transition-api-integration-in-angular-a-brave-new-world-part-1/
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ViewTransitionDirective } from '@shared/directives/view-transition.directive';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

export interface TechItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
  tags: string[];
  desc: string;
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: 1,
    title: 'Angular Signals',
    subtitle: '细粒度响应式',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#dd0031',
    tags: ['响应式', '性能', 'Zoneless'],
    desc: 'Signals 是 Angular 引入的细粒度响应式原语，让变更检测更精准、更高效。无需 Zone.js，组件只在真正依赖的数据变化时才重新渲染。'
  },
  {
    id: 2,
    title: 'View Transitions API',
    subtitle: '原生页面过渡',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#1890ff',
    tags: ['动画', '路由', 'UX'],
    desc: 'View Transitions API 是浏览器原生支持的页面过渡能力。Angular 17+ 通过 withViewTransitions() 与路由深度集成，实现零配置的共享元素动画。'
  },
  {
    id: 3,
    title: 'Deferrable Views',
    subtitle: '按需延迟加载',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#52c41a',
    tags: ['性能', '懒加载', '模板'],
    desc: '@defer 块让你可以将组件的加载推迟到真正需要时，支持 on viewport、on interaction 等多种触发条件，大幅提升首屏性能。'
  },
  {
    id: 4,
    title: 'Control Flow',
    subtitle: '内置控制流语法',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#722ed1',
    tags: ['模板', '语法', '性能'],
    desc: '@if、@for、@switch 取代了 *ngIf、*ngFor 等结构指令，语法更直观，性能更好，且无需额外导入模块。'
  },
  {
    id: 5,
    title: 'SSR & Hydration',
    subtitle: '服务端渲染',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#fa8c16',
    tags: ['SSR', 'SEO', '性能'],
    desc: 'Angular 的增量水合（Incremental Hydration）让服务端渲染的 HTML 可以按需激活，避免全量重渲染，显著提升 LCP 和 TTI 指标。'
  },
  {
    id: 6,
    title: 'Zoneless Angular',
    subtitle: '无 Zone.js 模式',
    imageUrl: 'https://angular.dev/assets/images/ng-image.jpg',
    color: '#13c2c2',
    tags: ['性能', '实验性', 'Signals'],
    desc: '通过 provideZonelessChangeDetection()，Angular 完全摆脱对 Zone.js 的依赖，变更检测完全由 Signals 驱动，包体积更小，性能更强。'
  }
];

@Component({
  selector: 'app-transitions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, ViewTransitionDirective, NzCardModule, NzGridModule, NzTagModule],
  templateUrl: './transitions.html',
  styleUrl: './transitions.less'
})
export class Transitions {
  private router = inject(Router);
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'View Transition API',
    breadcrumb: ['首页', '功能', 'View Transition API'],
    desc: '利用 Angular withViewTransitions() 实现路由级共享元素过渡动画，点击卡片体验效果。'
  };

  readonly items = TECH_ITEMS;

  toDetail(id:number) {
    this.router.navigate(['default/feat/transitions/transitions-detail'], { queryParams: { id } });
  }
}
