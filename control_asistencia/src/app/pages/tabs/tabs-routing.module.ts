import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
      },
      {
        path: 'leer-qr',
        loadChildren: () => import('../leer-qr/leer-qr.module').then((m) => m.LeerQrPageModule),
      },
      {
        path: 'visualizar-asistencia',
        loadChildren: () => import('../asistencia/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../sesion/login/user/user.module').then((m) => m.UserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
