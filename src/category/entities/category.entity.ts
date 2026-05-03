import { Product } from "../../product/entities/product.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
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