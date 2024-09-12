import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';
import { HomeRoutingModule } from './home-routing.module';
import { BootrstrapModule } from '../bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryInfoComponent } from './country-info/country-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    BaseComponent,
    CountryInfoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BootrstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
