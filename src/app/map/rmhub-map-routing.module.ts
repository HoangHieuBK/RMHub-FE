import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RMHubMapsModule } from './screens/maps/maps.module';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'map',
                loadChildren: () => RMHubMapsModule
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }


