import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadGatewayComponent } from './bad-gateway.component';

const routes: Routes = [
    {
        path: '', component: BadGatewayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BadGatewayRoutingModule {
}
