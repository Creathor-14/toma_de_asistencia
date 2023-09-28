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
    path: 'recuperar/:id',
    loadChildren: () => import('./pages/sesion/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'tabs/:id',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/sesion/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
