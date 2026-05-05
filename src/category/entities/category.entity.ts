import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../product/entities/product.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @ApiProperty({
        example: 1,
        description: 'Category ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'tecnologia',
        description: 'Category Name',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    name: string;

    @OneToMany(
        () => Product,
        (product) => product.category,
        { eager: true }
    )
    product: Product;

    @BeforeInsert()
    nameToLower() {
        if (this.name) {
            this.name = this.name.toLowerCase();
        }
    }
}