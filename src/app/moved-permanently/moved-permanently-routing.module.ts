import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovedPermanentlyComponent } from './moved-permanently.component';

const routes: Routes = [
    {
        path: '', component: MovedPermanentlyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovedPermanentlyRoutingModule {
}
