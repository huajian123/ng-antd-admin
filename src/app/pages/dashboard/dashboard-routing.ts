import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'analysis', pathMatch: 'full' },
  {
    path: 'analysis',
    data: { preload: true, title: '分析页', key: 'analysis' },
    loadComponent: () => import('./analysis/analysis.component').then(m => m.AnalysisComponent)
  },
  { path: 'monitor', data: { title: '监控页', key: 'monitor' }, loadComponent: () => import('./monitor/monitor.component').then(m => m.MonitorComponent) },
  { path: 'workbench', data: { title: '工作台', key: 'workbench' }, loadComponent: () => import('./workbench/workbench.component').then(m => m.WorkbenchComponent) }
] as Route[];
