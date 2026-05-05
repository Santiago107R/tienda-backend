import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'Product Title or name',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Product Price',
        default: 0,
    })
    @IsNumber()
    @IsPositive()
    @Min(1)
    price: number;

    @ApiProperty({
        description: 'Product Description',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    description?: string;

    @ApiProperty({
        description: 'Product Slug',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    slug?: string;

    @ApiProperty({
        description: 'Product Stock',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    stock: number;

    @ApiProperty({
        description: 'Product Sizes',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @IsArray()
    sizes?: string[];

    @ApiProperty({
        description: 'Product Description',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    gender?: string;

    @ApiProperty({
        description: 'Product Image',
        nullable: false,
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Product Category',
        nullable: false,
    })
    @IsNumber()
    @IsPositive()
    category: number;
}
