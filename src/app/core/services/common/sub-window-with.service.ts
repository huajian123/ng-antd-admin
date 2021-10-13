import {Injectable} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {switchMap} from "rxjs/operators";
import {ThemeService} from "../store/theme.service";
import {SideCollapsedMaxWidth, TopCollapsedMaxWidth} from "../../../config/constant";

@Injectable({
  providedIn: 'root'
})
export class SubWindowWithService {
  constructor(private breakpointObserver: BreakpointObserver, private themesService: ThemeService) {
  }

  subWindowWidth() {
    this.themesService.getThemesMode().pipe(switchMap((res) => {
      let maxWidth = '';
      if (res.mode === 'side' || (res.mode === 'mixi' && !res.splitNav)) {
        maxWidth = `(max-width: ${SideCollapsedMaxWidth}px)`;
      } else if (res.mode === 'top' || (res.mode === 'mixi' && res.splitNav)) {
        maxWidth = `(max-width: ${TopCollapsedMaxWidth}px)`;
      }
      // 可以入参[Breakpoints.Small, Breakpoints.XSmall]
      return this.breakpointObserver.observe([maxWidth]);
    })).subscribe(result => {
      const isOverMode = result.matches;
      this.themesService.setIsOverMode(isOverMode);
      // 是over模式，展开折叠状态得左侧菜单
      if (isOverMode) {
        this.themesService.setIsCollapsed(false);
      }
    });
  }
}
