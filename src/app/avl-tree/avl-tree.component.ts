import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvlTreeService } from './avl-tree.service';

@Component({
  selector: 'app-avl-tree',
  standalone: true,
  imports: [CommonModule],
  providers: [AvlTreeService],
  template: `
    <div>
      <h2>AVL Tree Implementation</h2>
      <input #nodeKey type="number" placeholder="Enter a number" />
      <button (click)="insertNode(nodeKey.value); nodeKey.value=''">Insert Node</button>
    </div>
    <h3>Tree Structure (JSON View)</h3>
    <pre>{{ treeStructure | json }}</pre>
  `,
  styles: [`
    div { margin-bottom: 1rem; }
    input { margin-right: 0.5rem; padding: 8px; }
    button { padding: 8px 12px; }
    pre { background-color: #f4f4f4; border: 1px solid #ddd; padding: 10px; border-radius: 4px; }
  `]
})
export class AvlTreeComponent {
  treeStructure: any;
  
  constructor(public avlTreeService: AvlTreeService) {
    this.treeStructure = this.avlTreeService.getTreeStructure();
  }

  insertNode(key: string): void {
    const numKey = parseInt(key, 10);
    if (!isNaN(numKey)) {
      this.avlTreeService.insert(numKey);
      this.treeStructure = this.avlTreeService.getTreeStructure();
    }
  }
}