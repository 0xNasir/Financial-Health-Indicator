import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatTableModule} from "@angular/material/table";
import {FlexModule} from "@angular/flex-layout";
import {FinancePopComponent} from "./popup/finance.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    FlexModule,
    FinancePopComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    FinancePopComponent
  ]
})
export class HomeModule {
}
