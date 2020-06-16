import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgAccordionModule } from '../../projects/ng-accordion/src/lib/ng-accordion.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NgAccordionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
