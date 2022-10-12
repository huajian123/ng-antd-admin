import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/*
 * 模块预加载service
 * */
@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload'] && route.path != null) {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
