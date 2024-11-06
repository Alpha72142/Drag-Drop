
       import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ARoutingModule } from './a-routing.module';


@NgModule({
  declarations: [],
  imports: [   CommonModule,
    ARoutingModule
  ],
exports: [ARoutingModule]
})
export class AModule { }
