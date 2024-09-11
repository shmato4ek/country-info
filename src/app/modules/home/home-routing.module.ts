import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                component: HeaderComponent
            },
            {
                path: '',
                component: HomeComponent
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}