import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'analysis', pathMatch: 'full' },
  {
    title: 'menu.default:dashboard:analysis',
    path: 'analysis',
    data: { preload: true, key: 'analysis' },
    loadComponent: () => import('./analysis/analysis.component').then(m => m.AnalysisComponent)
  },
  { path: 'monitor', title: 'menu.default:dashboard:monitor', data: { key: 'monitor' }, loadComponent: () => import('./monitor/monitor.component').then(m => m.MonitorComponent) },
  { path: 'workbench', title: 'menu.default:dashboard:workbench', data: { key: 'workbench' }, loadComponent: () => import('./workbench/workbench.component').then(m => m.WorkbenchComponent) }
] satisfies Route[];
