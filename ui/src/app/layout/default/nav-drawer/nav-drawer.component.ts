import { Component, ChangeDetectionStrategy, inject, DestroyRef, signal, effect, computed } from '@angular/core';

import { SideNavWidth } from '@app/config/constant';
import { ThemeService } from '@store/common-store/theme.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDrawerModule, NzLayoutModule, SideNavComponent]
})
export class NavDrawerComponent {
  private themesService = inject(ThemeService);
  isShowModal = signal(false);
  $themesOptions = computed(() => this.themesService.$themesOptions());
  destroyRef = inject(DestroyRef);
  SideNavWidth = SideNavWidth;

  changeOverModeEffect = effect(() => {
    const source = this.themesService.$isOverModeTheme();
    if (!source) {
      this.isShowModal.set(false);
    }
  });

  showDraw(): void {
    this.isShowModal.set(true);
  }
}
