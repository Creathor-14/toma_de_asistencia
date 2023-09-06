import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login/user',
    pathMatch: 'full'
  },
  {
    path: 'login/user',
    loadChildren: () => import('./pages/login/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'login/password/:id',
    loadChildren: () => import('./pages/login/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'inicio/:id',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
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
  },
  {
    path: 'recuperar01/:id',
    loadChildren: () => import('./pages/recuperar01/recuperar01.module').then( m => m.Recuperar01PageModule)
  },
  {
    path: 'ver-asistencia/:id',
    loadChildren: () => import('./pages/ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
