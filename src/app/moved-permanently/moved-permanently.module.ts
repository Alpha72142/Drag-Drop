import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovedPermanentlyRoutingModule } from './moved-permanently-routing.module';
import { MovedPermanentlyComponent } from './moved-permanently.component';

@NgModule({
  imports: [
    CommonModule,
    MovedPermanentlyRoutingModule
  ],
  declarations: [MovedPermanentlyComponent]
})
export class MovedPermanentlyModule { }
