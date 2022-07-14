import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
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
    try {
      this.logger.debug(
        `Binary tree creation request ${numbers ? numbers : ''}`,
      );

      if (isEmpty(numbers)) {
        this.binaryTree = new BinarySearchTree(this.comparator);
      } else {
        this.binaryTree = new BinarySearchTree(this.comparator);

        numbers.forEach((n) => {
          this.binaryTree.insert(n);
        });
      }

      const response: CreateBinaryTreeResponseDTO = {
        status: 'OK',
        values: numbers,
      };

      this.logger.log(`Binary tree created: ${JSON.stringify(response)}`);

      return response;
    } catch (e) {
      this.logger.error(JSON.stringify(e));

      throw e;
    }
  }

  /** It Inserts a number into the tree. If the binary tree doesn't exists then it returns an error.
   *
   * @param number DTO with a value.
   * @Returns DTO with the Inserted Value
   */
  async insert(number: InsertValueRequestDTO): Promise<InserValueResponseDTO> {
    try {
      this.logger.debug(`Binary insertion value request: ${number}`);

      if (!this.binaryTree) {
        throw new BadRequestException(
          `Binary tree doesn't exists, first create one.`,
        );
      }

      this.binaryTree.insert(number.value);

      const response: InserValueResponseDTO = {
        value: number.value,
      };

      this.logger.log(
        `Value successfuly inserted: ${JSON.stringify(response)}`,
      );

      return response;
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }

  /** This method returns a requested value. It searchs in the tree.
   *
   * @param value Number to search
   * @returns String with value and depth.
   */
  async search(value: number): Promise<ReturnValueResponseDTO> {
    try {
      this.logger.debug(`Search request: ${value}`);

      if (!this.binaryTree) {
        throw new BadRequestException(
          `Binary tree doesn't exists, first create one`,
        );
      }

      const element = this.binaryTree.search(value);

      if (!element) {
        this.logger.log(`No elements found`);

        return null;
      }

      const response: ReturnValueResponseDTO = {
        value: element.data,
        depth: element.depth,
      };

      this.logger.log(`Element found: ${JSON.stringify(response)}`);

      return response;
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw e;
    }
  }

  /** This method returns the deeper node
   *
   * @returns String with the value and the depht.
   */
  async deeper(): Promise<ReturnValueResponseDTO> {
    try{

        if (!this.binaryTree) {
            throw new BadRequestException(
              `Binary tree doesn't exists, first create one`,
            );
        }

        if(!this.binaryTree.root){
            throw new BadRequestException(
                `Binary tree doesn't have values, insert one`,
              ); 
        }

        return null;

    }catch(e){
        this.logger.error(JSON.stringify(e));
        throw e;
    }
  }

  private comparator(a: number, b: number) {
    if (a < b) return -1;

    if (a > b) return 1;

    return 0;
  }
}
