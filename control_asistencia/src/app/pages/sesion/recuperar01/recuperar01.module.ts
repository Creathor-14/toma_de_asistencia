import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Recuperar01PageRoutingModule } from './recuperar01-routing.module';

import { Recuperar01Page } from './recuperar01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Recuperar01PageRoutingModule
  ],
  declarations: [Recuperar01Page]
})
export class Recuperar01PageModule {}
