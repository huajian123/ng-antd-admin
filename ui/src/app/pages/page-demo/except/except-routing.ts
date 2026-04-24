import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'except403', pathMatch: 'full' },
  { path: 'except403', title: 'menu.default:page-demo:except:except403', data: { key: 'except403' }, loadComponent: () => import('./except403/except403.component').then(m => m.Except403Component) },
  { path: 'except404', title: 'menu.default:page-demo:except:except404', data: { key: 'except404' }, loadComponent: () => import('./except404/except404.component').then(m => m.Except404Component) },
  { path: 'except500', title: 'menu.default:page-demo:except:except500', data: { key: 'except500' }, loadComponent: () => import('./except500/except500.component').then(m => m.Except500Component) },
  { path: 'network-error', title: 'menu.default:page-demo:except:network-error', data: { key: 'network-error' }, loadComponent: () => import('./network-error/network-error.component').then(m => m.NetworkErrorComponent) },
  { path: 'no-data', title: 'menu.default:page-demo:except:no-data', data: { key: 'no-data' }, loadComponent: () => import('./no-data/no-data.component').then(m => m.NoDataComponent) }
] satisfies Route[];
