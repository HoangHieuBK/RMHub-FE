import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppModule } from '@app/app.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => AppModule,
        data: { preload: true }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule { }
