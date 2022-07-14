import { Injectable, Logger } from '@nestjs/common';
import { BinarySearchTree } from './binaryEntity/binarytree.entity';
import {
  CreateBinaryTreeResponseDTO,
  InsertValueRequestDTO,
  InserValueResponseDTO,
  ReturnValueResponseDTO,
} from './dto/binarytree.dto';

@Injectable()
export class BinaryTreeService {
  
  private binaryTree: BinarySearchTree<Number>;
  private logger: Logger;

  constructor() {

    this.logger = new Logger(BinaryTreeService.name);

  }

  /** It initializes the tree with an array of numbers.
   *
   */
  async create(numbers?: Number[]): Promise<CreateBinaryTreeResponseDTO> {
    
    this.logger.debug(`Binary tree creation request ${numbers}`)

    if(numbers.length <= 0){
        this.binaryTree = new BinarySearchTree(this.comparator);
    }else{
        this.binaryTree = new BinarySearchTree(this.comparator);

        numbers.forEach(n => {
            this.binaryTree.insert(n);
        });
    } 

    const response: CreateBinaryTreeResponseDTO = {
        status: 'OK',
        values: numbers
    }

    this.logger.log(`Binary tree created: ${JSON.stringify(response)}`)
    

    return response;
  }

  /** Insert a number into the tree.
   *
   * @param number
   */
  async insert(number: InsertValueRequestDTO): Promise<InserValueResponseDTO> {
    return null;
  }

  /** This method returns a requested value. It searchs in the tree.
   *
   * @param value Number to search
   * @returns String with value and depth.
   */
  async search(value: number): Promise<ReturnValueResponseDTO> {
    return null;
  }

  /** This method returns the deeper node
   *
   * @returns String with the value and the depht.
   */
  async deeper(): Promise<ReturnValueResponseDTO> {
    return null;
  }

  private comparator(a: number, b: number) {
    if (a < b) return -1;
  
    if (a > b) return 1;
  
    return 0;
  }
}
