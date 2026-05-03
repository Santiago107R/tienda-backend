import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { Query } from '@nestjs/common';

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    offset?: number;

    @IsOptional()
    gender?: 'men' | 'women' | 'unisex' | 'kid' | '';

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @Type(() => String)
    sizes?: string;

    @IsOptional()
    @Type(() => String)
    query?: string

    @IsOptional()
    @Type(() => Number)
    minPrice?: number

    @IsOptional()
    @Type(() => Number)
    maxPrice?: number
}