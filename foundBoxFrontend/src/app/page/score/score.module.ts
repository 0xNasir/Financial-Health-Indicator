import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    ScoreComponent
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule
  ]
})
export class ScoreModule { }
