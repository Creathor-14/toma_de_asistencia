import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APage } from './a.page';

const routes: Routes = [
  {
    path: '',
    component: APage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APageRoutingModule {}
