import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { APageRoutingModule } from './a-routing.module';

import { APage } from './a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    APageRoutingModule
  ],
  declarations: [APage]
})
export class APageModule {}
