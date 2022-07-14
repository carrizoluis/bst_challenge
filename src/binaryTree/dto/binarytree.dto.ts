import {  ApiProperty } from "@nestjs/swagger";
import {  IsNumber } from "class-validator";


export class CreateBinaryTreeRequestDTO {
    
    @ApiProperty()
    @IsNumber({},{each: true})
    values: Number[];
}

export class CreateBinaryTreeResponseDTO {
    
    @ApiProperty()
    status: string;

    @ApiProperty()
    values: Number[]

}

export class InsertValueRequestDTO {

    @ApiProperty()
    @IsNumber()
    value: number;
}

export class InserValueResponseDTO {
    
    @ApiProperty()
    value: number;

}

export class ReturnValueResponseDTO{

    @ApiProperty()
    value: number;

    @ApiProperty()
    depth: number;

}