import { Injectable } from '@angular/core';

// Node class for the AVL tree
class Node {
  key: number;
  height: number;
  left: Node | null;
  right: Node | null;

  constructor(key: number) {
    this.key = key;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

@Injectable()
export class AvlTreeService {
  root: Node | null = null;

  private getHeight(node: Node | null): number {
    return node ? node.height : 0;
  }

  private getBalanceFactor(node: Node | null): number {
    if (!node) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private rightRotate(y: Node): Node {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  private leftRotate(x: Node): Node {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }

  insert(key: number): void {
    this.root = this.insertNode(this.root, key);
  }

  private insertNode(node: Node | null, key: number): Node {
    if (!node) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // Duplicate keys not allowed
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalanceFactor(node);

    if (balance > 1 && key < node.left!.key) {
      return this.rightRotate(node);
    }

    if (balance < -1 && key > node.right!.key) {
      return this.leftRotate(node);
    }

    if (balance > 1 && key > node.left!.key) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    if (balance < -1 && key < node.right!.key) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  getTreeStructure(): Node | null {
    return this.root;
  }
}