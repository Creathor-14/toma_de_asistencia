import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ResulQrPageRoutingModule } from './resul-qr-routing.module';

import { ResulQrPage } from './resul-qr.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ResulQrPageRoutingModule
  ],
  declarations: [ResulQrPage]
})
export class ResulQrPageModule {}
