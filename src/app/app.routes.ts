import { Routes } from '@angular/router';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';

export const routes: Routes = [
    {
        path:'a' , component:AComponent
    },{
        path: 'b', component:BComponent
    },
    {
        path: 'c', component: CComponent
    }
];
