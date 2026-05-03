import { IsArray, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    price: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    slug?: string;

    @IsOptional()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    @IsArray()
    sizes?: string[];

    @IsOptional()
    @IsString()
    gender?: string;

    @IsString()
    image: string;

    @IsNumber()
    @IsPositive()
    category: number;
}
