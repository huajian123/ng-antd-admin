import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, ViewContainerRef, signal, viewChild } from '@angular/core';
import { ComponentPortal, CdkPortalOutletAttachedRef, PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { DynCard, DynCardTheme } from './dyn-card';
import { PortalCard, PortalStep } from './portal-card';

interface DynCardConfig {
  title: string;
  theme: DynCardTheme;
  ref: ComponentRef<DynCard>;
}

const PORTAL_STEPS: Record<PortalStep, { title: string; desc: string; icon: string; color: string; next: PortalStep | null; prev: PortalStep | null }> = {
  A: { title: '第一步：创建 Portal', desc: 'ComponentPortal 将组件包装为可传送的内容单元，与宿主模板完全解耦。', icon: '🏗️', color: 'blue', next: 'B', prev: null },
  B: { title: '第二步：注入数据', desc: 'attached 事件返回 CdkPortalOutletAttachedRef，通过 setInput() 传入数据、订阅 output。', icon: '🔌', color: 'purple', next: 'C', prev: 'A' },
  C: { title: '第三步：销毁与复用', desc: '调用 ref.destroy() 卸载组件，再次 set 新 Portal 即可复用同一个 outlet。', icon: '♻️', color: 'success', next: null, prev: 'B' }
};

@Component({
  selector: 'app-dynamic-comp',
  imports: [PageHeaderComponent, PortalModule, NzTabsModule, NzCardModule, NzGridModule, NzButtonModule, NzTagModule, NzDividerModule],
  templateUrl: './dynamic-comp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dynamic-comp.less'
})
export class DynamicComp implements AfterViewInit {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: '动态组件 & CDK Portal',
    breadcrumb: ['首页', '组件', '懒加载', '动态组件'],
    desc: '演示 ViewContainerRef.createComponent() 动态创建组件，以及 CDK ComponentPortal 传送点的核心用法。'
  };

  // ── Tab 1: createComponent ──────────────────────────────────────────────
  private readonly dynHost = viewChild.required('dynHost', { read: ViewContainerRef });
  readonly dynCards = signal<DynCardConfig[]>([]);

  private readonly THEMES: DynCardTheme[] = ['blue', 'green', 'purple', 'orange'];
  private themeIndex = 0;
  private readonly ICONS = ['🎯', '🚀', '💡', '🎨'];

  createCard(): void {
    const theme = this.THEMES[this.themeIndex % this.THEMES.length];
    const icon = this.ICONS[this.themeIndex % this.ICONS.length];
    this.themeIndex++;
    const ref = this.dynHost().createComponent(DynCard);
    ref.setInput('title', `动态卡片 #${this.themeIndex}`);
    ref.setInput('desc', `由 createComponent() 在运行时创建，setInput() 注入数据，output 订阅销毁事件。`);
    ref.setInput('icon', icon);
    ref.setInput('theme', theme);

    const config: DynCardConfig = { title: `动态卡片 #${this.themeIndex}`, theme, ref };
    this.dynCards.update(list => [...list, config]);
    ref.instance.destroy.subscribe(() => this.destroyCard(ref));
  }

  clearAll(): void {
    this.dynHost().clear();
    this.dynCards.set([]);
    this.themeIndex = 0;
  }

  private destroyCard(ref: ComponentRef<DynCard>): void {
    ref.destroy();
    this.dynCards.update(list => list.filter(c => c.ref !== ref));
  }

  // ── Tab 2: CDK Portal ───────────────────────────────────────────────────
  readonly currentStep = signal<PortalStep>('A');
  readonly selectedPortal = signal<ComponentPortal<PortalCard> | null>(null);
  readonly portalStepKeys: PortalStep[] = ['A', 'B', 'C'];
  readonly portalSteps = PORTAL_STEPS;

  initPortalCard(ref: CdkPortalOutletAttachedRef): void {
    if (!(ref instanceof ComponentRef)) return;
    const step = this.currentStep();
    const cfg = PORTAL_STEPS[step];
    ref.setInput('step', step);
    ref.setInput('title', cfg.title);
    ref.setInput('desc', cfg.desc);
    ref.setInput('icon', cfg.icon);
    ref.setInput('color', cfg.color);
    ref.instance.next.subscribe(() => {
      ref.destroy();
      this.goStep(cfg.next ?? 'A');
    });
    ref.instance.prev.subscribe(() => {
      ref.destroy();
      this.goStep(cfg.prev!);
    });
  }

  goStep(step: PortalStep): void {
    this.currentStep.set(step);
    this.selectedPortal.set(new ComponentPortal(PortalCard));
  }

  ngAfterViewInit(): void {
    this.goStep('A');
  }
}
