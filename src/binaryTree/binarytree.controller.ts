import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BinaryTreeService } from './binarytree.service';
import {
  CreateBinaryTreeRequestDTO,
  CreateBinaryTreeResponseDTO,
  InsertValueRequestDTO,
  InserValueResponseDTO,
  ReturnValueResponseDTO,
} from './dto/binarytree.dto';

@Controller('binarytree')
export class BinaryTreeController {
  private logger: Logger;

  constructor(private readonly binaryService: BinaryTreeService) {
    this.logger = new Logger(BinaryTreeController.name);
  }

  @ApiOperation({
    description: 'Operation which initializes a binary tree in memory.',
  })
  @ApiCreatedResponse({ type: CreateBinaryTreeResponseDTO })
  @Post('/initialize')
  async createBinaryTree(
    @Body() body?: CreateBinaryTreeRequestDTO,
  ): Promise<CreateBinaryTreeResponseDTO> {
    return await this.binaryService.create(body.values);
  }

  @ApiOperation({
    description: 'Operation which inserts a value in a binary tree.',
  })
  @ApiOkResponse({ type: InserValueResponseDTO })
  @Post('')
  async insertValue(
    @Body() value: InsertValueRequestDTO,
  ): Promise<InserValueResponseDTO> {
    return await this.binaryService.insert(value);
  }

  @ApiOperation({
    description: 'Operation which returns a value if exists in the tree.',
  })
  @ApiOkResponse({ type: ReturnValueResponseDTO })
  @Get('')
  async getValue(
    @Query('value') value: number,
  ): Promise<ReturnValueResponseDTO> {
    return await this.binaryService.search(value);
  }

  @ApiOperation({
    description: 'Operation which returns the deeper value in the tree.',
  })
  @ApiOkResponse({ type: ReturnValueResponseDTO })
  @Get('/deeper')
  async getDeeperValue(): Promise<ReturnValueResponseDTO> {
    return await this.binaryService.deeper();
  }
}
