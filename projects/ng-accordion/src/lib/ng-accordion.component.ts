import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgAccordionContentDirective } from './ng-accordion-content.directive';

@Component({
  selector: 'ng-accordion-group',
  templateUrl: './ng-accordion-group.component.html',
  styleUrls: ['./ng-accordion-group.component.scss'],
  animations: [
    trigger('expandedCollapsed', [
      transition(':enter', [
        style({ height: 0, opacity: 0, visibility: 'hidden', minHeight: '0', overflow: 'hidden' }),
        animate('400ms', style({ height: '*', opacity: 1, visibility: 'visible', minHeight: '39px' })),
      ]),
      transition(':leave', [
        animate('400ms', style({ height: 0, opacity: 0, visibility: 'hidden', minHeight: '0', overflow: 'hidden' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgAccordionGroupComponent {
  @Output() expandedChange: EventEmitter<boolean> = new EventEmitter();

  @ContentChild(NgAccordionContentDirective, { static: true, read: TemplateRef })
  contentTemplateRef: TemplateRef<any>;

  @Input() header: string;
  @Input() headerTemplate: TemplateRef<{ title: string; collapsed: boolean }>;
  @Input() expanded: boolean = false;

  constructor(
    @Inject(forwardRef(() => NgAccordionComponent)) private accordion: NgAccordionComponent,
    private cdRef: ChangeDetectorRef
  ) {}

  public handleExpandedChange(isExpanded: boolean) {
    this.setWithChangeDetection({ expanded: isExpanded });

    if (this.accordion.closeOthers) {
      this.accordion.closeOtherGroups(this);
    }
  }

  public setWithChangeDetection(data: Partial<NgAccordionGroupComponent>) {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }
}

@Component({
  selector: 'ng-accordion',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgAccordionComponent {
  @ContentChildren(NgAccordionGroupComponent) accordionGroups: QueryList<NgAccordionGroupComponent>;

  @Input() closeOthers: boolean;

  public closeOtherGroups(target: NgAccordionGroupComponent) {
    this.accordionGroups.filter(group => group !== target).forEach(a => a.setWithChangeDetection({ expanded: false }));
  }
}
