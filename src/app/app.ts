import { Component } from '@angular/core';
import { AvlTreeComponent } from './avl-tree/avl-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AvlTreeComponent],
  template: `<app-avl-tree></app-avl-tree>`,
  styles: []
})
export class App {
  title = 'asl-visualizer';
}
