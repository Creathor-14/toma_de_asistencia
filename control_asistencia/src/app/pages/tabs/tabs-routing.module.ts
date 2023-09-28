import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'perfil/:id',
        loadChildren: () => import('../perfil/visualizar/visualizar.module').then((m) => m.VisualizarPageModule),
      },
      {
        path: 'leer-qr/:id',
        loadChildren: () => import('../leer-qr/leer-qr.module').then((m) => m.LeerQrPageModule),
      },
      {
        path: 'registrar-asistencia/:id',
        loadChildren: () => import('../registrar-asistencia/registrar-asistencia.module').then((m) => m.RegistrarAsistenciaPageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../sesion/login/user/user.module').then((m) => m.UserPageModule),
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
