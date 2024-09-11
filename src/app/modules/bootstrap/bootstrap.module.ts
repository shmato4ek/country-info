import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

const BootstrapComponents = [
    NgbPaginationModule,
]

@NgModule({
  imports: [BootstrapComponents],
  exports: [BootstrapComponents]
})
export class BootrstrapModule { }
