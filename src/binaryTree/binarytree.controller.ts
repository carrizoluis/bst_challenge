import {
    BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
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
  ReturnDeepestValuesResponseDTO,
  ReturnValueResponseDTO,
} from './dto/binarytree.dto';

@Controller('binarytree')
export class BinaryTreeController {
  private logger: Logger;

  constructor(private readonly binaryService: BinaryTreeService) {
    this.logger = new Logger(BinaryTreeController.name);
  }

  @ApiOperation({
    description: 'Operation which creates a binary tree in memory.',
  })
  @ApiCreatedResponse({ type: CreateBinaryTreeResponseDTO })
  @Post('/new')
  async createBinaryTree(
    @Body() body?: CreateBinaryTreeRequestDTO,
  ): Promise<CreateBinaryTreeResponseDTO> {
    return await this.binaryService.create(body.values);
  }

  @ApiOperation({
    description: 'Operation which inserts a value into an existent binary tree.',
  })
  @ApiCreatedResponse({ type: InserValueResponseDTO })
  @ApiBadRequestResponse({type: BadRequestException, description: 'It means that the binarytree doesn\'t exists'})
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
    description: 'Operation which returns the deeper value in the tree. (NOT FINISHED)',
  })
  @ApiOkResponse({ type: ReturnDeepestValuesResponseDTO, description: 'Values and depth' })
  @ApiBadRequestResponse({ type: BadRequestException, description: 'When the tree doesn\'t exist' })
  @ApiBadRequestResponse({ type: BadRequestException, description: 'When the tree doesn\'t have values'})
  @Get('/depth')
  async getDeeperValue(): Promise<ReturnDeepestValuesResponseDTO> {
    return await this.binaryService.deeper();
  }
}
