import { NgModule } from '@angular/core';
import { NgAccordionComponent, NgAccordionGroupComponent } from './ng-accordion.component';
import { CommonModule } from '@angular/common';
import { NgAccordionContentDirective } from './ng-accordion-content.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgAccordionGroupComponent, NgAccordionComponent, NgAccordionContentDirective],
  exports: [NgAccordionGroupComponent, NgAccordionComponent, NgAccordionContentDirective],
})
export class NgAccordionModule {}
