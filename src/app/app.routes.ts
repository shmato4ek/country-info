import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
  },
];
