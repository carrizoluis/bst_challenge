import { Test, TestingModule } from "@nestjs/testing";
import { BinaryTreeController } from "./binarytree.controller";
import { BinaryTreeService } from "./binarytree.service";
import { CreateBinaryTreeResponseDTO, InserValueResponseDTO, ReturnDeepestValuesResponseDTO, ReturnValueResponseDTO } from "./dto/binarytree.dto";

describe('BinaryTreeController', () => {
    let binaryTreeController: BinaryTreeController;
    let binaryTreeService: BinaryTreeService;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [BinaryTreeController],
        providers: [BinaryTreeService],
      }).compile();
  
      binaryTreeController = app.get<BinaryTreeController>(BinaryTreeController);
      binaryTreeService = app.get<BinaryTreeService>(BinaryTreeService);
    });
  
    describe('Binary Tree Controller', () => {
      it('Should return Status Ok with values', async () => {
        const result: CreateBinaryTreeResponseDTO = {status:'OK', values: [1,3,4]};
        jest.spyOn(binaryTreeService, 'create').mockImplementation(async () => result);
        expect(JSON.stringify(await binaryTreeController.createBinaryTree({values:[1,3,4]}))).toBe(JSON.stringify({status: 'OK', values: [1,3,4]}));
      });

      it('Should return Status Ok without values', async () => {
        expect(JSON.stringify(await binaryTreeController.createBinaryTree())).toBe(JSON.stringify({status: 'OK'}));
      });

      it('Should return Inserted value', async () => {
        const result: InserValueResponseDTO = {value: 2};
        jest.spyOn(binaryTreeService, 'insert').mockImplementation(async () => result);
        expect(JSON.stringify(await binaryTreeController.insertValue({value: 2}))).toBe(JSON.stringify({value: 2}));
      })

      it('Should return a searched element', async () => {
        const result: ReturnValueResponseDTO = {
            value: 2,
            depth: 0
        }
        jest.spyOn(binaryTreeService, 'search').mockImplementation(async () => result);
        expect(JSON.stringify(await binaryTreeController.getValue(2))).toBe(JSON.stringify(result));
      })

      it('Should return deepest elements', async () => {
        const result: ReturnDeepestValuesResponseDTO = {
            deepest: [1,3,4],
            depth: 2 
        };
        jest.spyOn(binaryTreeService, 'deepest').mockImplementation(async () => result);
        expect(JSON.stringify(await binaryTreeController.getDeeperValue())).toBe(JSON.stringify(result));
      })
    });
  });