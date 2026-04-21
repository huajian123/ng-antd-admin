import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { LazyService } from '@core/services/common/lazy.service';
import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

type LoadStatus = 'idle' | 'loading' | 'done' | 'cached' | 'error';

@Component({
  selector: 'app-lazy-loadscript',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzTagModule, NzDividerModule],
  templateUrl: './lazy-loadscript.html',
  styleUrl: './lazy-loadscript.less'
})
export class LazyLoadscript {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: '懒加载脚本 LazyService',
    breadcrumb: ['首页', '组件', '懒加载', '懒加载脚本'],
    desc: 'LazyService 按需动态插入 <script> / <link> 标签，支持缓存去重，避免重复加载。'
  };

  private readonly lazy = inject(LazyService);

  // ── Demo 1: loadScript ──────────────────────────────────────────────────
  readonly scriptStatus = signal<LoadStatus>('idle');
  readonly highlightResult = signal('');

  async loadScript(): Promise<void> {
    this.scriptStatus.set('loading');
    const url = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    const result = await this.lazy.loadScript(url);
    if (result.status === 'error') {
      this.scriptStatus.set('error');
      return;
    }
    this.scriptStatus.set(result.status === 'loading' ? 'cached' : 'done');
    // highlight.js 加载后调用其 API
    const code = `const ref = vcr.createComponent(MyComp);\nref.setInput('title', 'Hello');\nref.instance.close.subscribe(() => ref.destroy());`;
    // @ts-ignore
    this.highlightResult.set((window as any).hljs?.highlight(code, { language: 'typescript' })?.value ?? code);
  }

  // ── Demo 2: loadStyle ───────────────────────────────────────────────────
  readonly styleStatus = signal<LoadStatus>('idle');
  readonly fontApplied = signal(false);

  async loadStyle(): Promise<void> {
    this.styleStatus.set('loading');
    const url = 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
    const result = await this.lazy.loadStyle(url);
    this.styleStatus.set(result.status === 'ok' ? 'done' : 'error');
    this.fontApplied.set(true);
  }

  // ── Demo 3: load 批量 ───────────────────────────────────────────────────
  readonly batchStatus = signal<LoadStatus>('idle');
  readonly batchResults = signal<{ path: string; status: string }[]>([]);

  async loadBatch(): Promise<void> {
    this.batchStatus.set('loading');
    const resources = [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
    ];
    const results = await this.lazy.load(resources);
    this.batchResults.set(results.map(r => ({ path: r.path.split('/').pop()!, status: r.status })));
    this.batchStatus.set('done');
  }
}
