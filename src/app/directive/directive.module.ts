import { NgModule } from '@angular/core';
import { DropDirective } from './drag-drop/drop.directive';
import { DragDirective } from './drag-drop/drag.directive';
import { DragDropService } from './drag-drop.service';
@NgModule({
  declarations: [
    DropDirective,
    DragDirective,
  ],
  exports: [
    DropDirective,
    DragDirective,
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
