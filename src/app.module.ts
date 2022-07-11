import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinaryTreeModule } from './binaryTree/binarytree.module';

@Module({
  imports: [BinaryTreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
