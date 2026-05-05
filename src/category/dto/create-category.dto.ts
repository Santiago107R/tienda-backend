import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category Name',
    })
    @IsString()
    @MinLength(1)
    name: string;
}
