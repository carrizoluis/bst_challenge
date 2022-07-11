import { Controller, Get, Logger, Post, Query } from "@nestjs/common";

@Controller('binarytree')
export class BinaryTreeController{

    private logger:Logger;

    constructor(){
        this.logger = new Logger(BinaryTreeController.name);
    }

    @Post('/initialize')
    async createBinaryTree(): Promise<void>{

    }

    @Post('')
    async insertValue(): Promise<string>{
        return null;
    }

    @Get('')
    async getValue(@Query('value') value: number): Promise<any>{
        return null;
    }

    @Get('/deeper')
    async getDeeperValue(): Promise<any>{

    }
}