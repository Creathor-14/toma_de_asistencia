import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResulQrPage } from './resul-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ResulQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResulQrPageRoutingModule {}
