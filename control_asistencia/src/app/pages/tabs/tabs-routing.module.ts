import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

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
        ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
      },
      {
        path: 'leer-qr',
        loadChildren: () => import('../leer-qr/leer-qr.module').then((m) => m.LeerQrPageModule),
        ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
      },
      {
        path: 'asistencia/visualizar',
        loadChildren: () => import('../asistencia/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
        ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
      },
      {
        path: 'perfil/editar',
        loadChildren: () => import('../perfil/editar/editar.module').then((m) => m.EditarPageModule),
        ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
      },
      {
        path: 'api',
        loadChildren: () => import('../api/api.module').then( m => m.ApiPageModule),
        ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
