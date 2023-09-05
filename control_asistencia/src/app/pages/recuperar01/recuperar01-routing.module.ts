import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Recuperar01Page } from './recuperar01.page';

const routes: Routes = [
  {
    path: '',
    component: Recuperar01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Recuperar01PageRoutingModule {}
