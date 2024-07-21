import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, TemplateRef, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { ThemeService } from '@store/common-store/theme.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, WaterMarkComponent, NzCardModule, NzIconModule, NzButtonModule, NzAvatarModule, AsyncPipe]
})
export class CardTableComponent implements AfterViewInit {
  private themesService = inject(ThemeService);
  isOverMode$ = this.themesService.getIsOverMode();
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: ''
  };
  list = [
    {
      id: 1,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      name: 'Alipay',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 2,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      name: 'Angular',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 3,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      name: 'Ant Design',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 4,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      name: 'Ant Design Pro',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 5,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      name: 'Bootstrap',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 6,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      name: 'React',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 7,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      name: 'Vue',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    },
    {
      id: 8,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
      name: 'Webpack',
      desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
    }
  ];
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '卡片列表',
      breadcrumb: ['首页', '列表页', '卡片列表'],
      desc: this.headerContent
    };
  }
}
