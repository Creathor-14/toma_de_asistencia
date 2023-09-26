import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login/user',
    pathMatch: 'full'
  },
  {
    path: 'login/user',
    loadChildren: () => import('./pages/sesion/login/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'login/password/:id',
    loadChildren: () => import('./pages/sesion/login/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/sesion/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'tabs/:id',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/sesion/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },/*
  {
    path: 'perfil/ver/:id',
    loadChildren: () => import('./pages/perfil/ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'perfil/editar/:id',
    loadChildren: () => import('./pages/perfil/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'leer-qr/:id',
    loadChildren: () => import('./pages/leer-qr/leer-qr.module').then( m => m.LeerQrPageModule)
  },
  {
    path: 'registrar-asistencia/:id',
    loadChildren: () => import('./pages/registrar-asistencia/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule)
  },*/
  {
    path: 'recuperar01/:id',
    loadChildren: () => import('./pages/sesion/recuperar01/recuperar01.module').then( m => m.Recuperar01PageModule)
  },/*
  {
    path: 'ver-asistencia/:id',
    loadChildren: () => import('./pages/ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },*/
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule)
  },  {
    path: 'a',
    loadChildren: () => import('./pages/p/a/a.module').then( m => m.APageModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./pages/perfil/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
