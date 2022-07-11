import { Module } from "@nestjs/common";
import { BinaryTreeController } from "./binarytree.controller";
import { BinaryTreeService } from "./binarytree.service";

@Module({
    imports: [],
    providers: [BinaryTreeService],
    controllers: [BinaryTreeController]
})
export class BinaryTreeModule {}