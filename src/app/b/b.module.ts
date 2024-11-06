import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BRoutingModule } from './b-routing.module';
import { GridstackComponent, GridstackModule } from 'gridstack/dist/angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, BRoutingModule, GridstackModule],
  exports: [BRoutingModule, GridstackModule],
  schemas: [NO_ERRORS_SCHEMA],
  
})
export class AModule {
  constructor() {
    // register all our dynamic components created in the grid
    GridstackComponent.addComponentToSelectorType([]);
  }
}
