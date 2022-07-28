import { first, orderBy } from "lodash";

export class BinarySearchTreeNode<T> {
  data: T;
  depth: number;
  leftNode?: BinarySearchTreeNode<T>;
  rightNode?: BinarySearchTreeNode<T>;

  constructor(data: T) {
    this.data = data;
    this.depth = 0;
  }
}

export class BinarySearchTree<T> {
  root?: BinarySearchTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  insert(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(data);
      return this.root;
    }

    let current = this.root;

    while (true) {
      current.depth = current.depth + 1;
      if (this.comparator(data, current.data) === 1) {
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          current.rightNode = new BinarySearchTreeNode(data);
          return current.rightNode;
        }
      } else {
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          current.leftNode = new BinarySearchTreeNode(data);
          return current.leftNode;
        }
      }
    }
  }

  search(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current = this.root;
    
    while (this.comparator(data, current.data) !== 0) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.rightNode) return;

        current = current.rightNode;
      } else {
        if (!current.leftNode) return;

        current = current.leftNode;
      }
    }

    return current;
  }

  /** This method return an array of nodes with the deeper nodes.
   * 
   * @returns Array of BinarySearchTreeNode
   */
  deeperNodes(): BinarySearchTreeNode<T>[] {
    if(!this.root) return null;

    let resultNodes: BinarySearchTreeNode<T>[] = [];
    
    //WALK THROUGH RIGHT SIDE, LEFT AND RIGHT NODES OF THE RIGHT PART OF THE TREE
    if(this.root.rightNode){

      //Walk Right Side Right Node
      let currentRightSide = this.root.rightNode;
      let depthRightR = 0;
      let depthRightRNode: BinarySearchTreeNode<T>;
      while(currentRightSide){
        depthRightR = depthRightR + 1;

        if(!currentRightSide.rightNode) {
          
          depthRightRNode = currentRightSide;
          depthRightRNode.depth = depthRightR;
          
          resultNodes.push(depthRightRNode);

          break;
        }

        currentRightSide = currentRightSide.rightNode;
      }

      //WALK Left Side Right Node
      let currentRLeftSide = this.root.leftNode;
      let depthRightL = 0;
      let depthRightLNode: BinarySearchTreeNode<T>;

      while(currentRLeftSide) {
        depthRightL = depthRightL + 1;

        if(!currentRLeftSide.leftNode) {

          depthRightLNode = currentRLeftSide;
          depthRightLNode.depth = depthRightL;

          resultNodes.push(depthRightLNode);

          break;
        };

        currentRLeftSide = currentRLeftSide.leftNode;
      }
    }

    //ASK IF THE ROOT HAS A LEFT NODE AND WE WALK THROUGH LEFT SIDE
    if(this.root.leftNode){

      //Walk Left Side Left Node
      let currentLLeftSide = this.root.rightNode;
      let depthLeftR = 0;
      let depthLeftRNode: BinarySearchTreeNode<T>;
      while(currentLLeftSide){
        depthLeftR = depthLeftR + 1;

        if(!currentLLeftSide.leftNode) {
          
          depthLeftRNode = currentLLeftSide;
          depthLeftRNode.depth = depthLeftR;
          
          resultNodes.push(depthLeftRNode);

          break;
        }

        currentLLeftSide = currentLLeftSide.leftNode;
      }

      //WALK Left Side Right Node
      let currentLeftSideRightNode = this.root.rightNode;
      let depthLeftSideRNode = 0;
      let leftSideRNode: BinarySearchTreeNode<T>;

      while(currentLeftSideRightNode) {
        depthLeftSideRNode = depthLeftSideRNode + 1;

        if(!currentLeftSideRightNode.rightNode) {

          leftSideRNode = currentLeftSideRightNode;
          leftSideRNode.depth = depthLeftSideRNode;

          resultNodes.push(currentLeftSideRightNode);

          break;
        };

        currentLeftSideRightNode = currentLeftSideRightNode.rightNode;
      }

    }else{
      //IF TREE DOESN'T HAVE LEFT AND RIGHT NODE.
      const rootNode: BinarySearchTreeNode<T> = {
        data: this.root.data,
        depth: 0
      }
    
      resultNodes.push(this.root);
    }

    //WE ORDER THE ARRAY FROM MAJOR TO MINOR
    let majorToMinor: BinarySearchTreeNode<T>[] = orderBy(resultNodes, 'desc');

    resultNodes = majorToMinor.filter(node => {node.depth === first(majorToMinor).depth});

    return resultNodes;
  }  

  inOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.inOrderTraversal(node.leftNode);
      console.log(node.data);
      this.inOrderTraversal(node.rightNode);
    }
  }

  preOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.leftNode);
      this.preOrderTraversal(node.rightNode);
    }
  }

  postOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.postOrderTraversal(node.leftNode);
      this.postOrderTraversal(node.rightNode);
      console.log(node.data);
    }
  }
}
