import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


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
    path: 'login/password/:email',
    loadChildren: () => import('./pages/sesion/login/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'recuperar/:email',
    loadChildren: () => import('./pages/sesion/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'tabs/:id',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/sesion/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'resul-qr',
    loadChildren: () => import('./modals/resul-qr/resul-qr.module').then( m => m.ResulQrPageModule),
    ...canActivate(()=> redirectUnauthorizedTo(["/login/user"]))
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
