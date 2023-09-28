import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil/visualizar',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'perfil/visualizar',
        loadChildren: () => import('../perfil/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
      },
      {
        path: 'leer-qr',
        loadChildren: () => import('../leer-qr/leer-qr.module').then((m) => m.LeerQrPageModule),
      },
      {
        path: 'asistencia/visualizar',
        loadChildren: () => import('../asistencia/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
      },
      {
        path: 'perfil/editar',
        loadChildren: () => import('../perfil/editar/editar.module').then((m) => m.EditarPageModule),
      },
      {
        path: 'asistencia/registrar',
        loadChildren: () => import('../asistencia/registrar/registrar.module').then((m) => m.RegistrarPageModule),
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
