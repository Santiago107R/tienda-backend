import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../auth/entities/user.entity";
import { Category } from "../../category/entities/category.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @ApiProperty({
        example: '65f78806-334d-4b65-b4ff-9bd7382ba9c7',
        description: 'Product ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Samsung Galaxy S24 Ultra',
        description: 'Product Title',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 1200,
        description: 'Product Price',
    })
    @Column('float')
    price: number;

    @ApiProperty({
        example: 'El último modelo de Samsung con IA integrada y pantalla de 120Hz.',
        description: 'Product Description',
        nullable: true,
    })
    @Column('text', {
        nullable: true
    })
    description?: string;

    @ApiProperty({
        example: 'samsung_s24_ultra',
        description: 'Product Slug',
    })
    @Column('text')
    slug: string;

    @ApiProperty({
        example: 15,
        description: 'Product Stock',
        default: 1,
    })
    @Column('int', {
        default: 1
    })
    stock: number;

    @ApiProperty({
        example: ["S", "M", "L", "XL"],
        description: 'Product Sizes',
        nullable: true,
    })
    @Column('text', {
        array: true,
        nullable: true,
    })
    sizes?: string[];

    @ApiProperty({
        example: 'men',
        description: 'Product Gender',
        nullable: true,
    })
    @Column('text', {
        nullable: true,
    })
    gender?: string;

    @ApiProperty({
        example: 'http://localhost:3000/api/files/product/18ab7782-5796-4efe-ae3c-62973290fac1.jpeg',
        description: 'Product Image',
    })
    @Column('text')
    image: string;

    @ApiProperty({
        example: 1,
        description: 'Product Category ID',
    })
    @ManyToOne(
        () => Category,
        (category) => category.product,
    )
    category: Category;

    @ApiProperty({
        example: 1,
        description: 'Product User ID'
    })
    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true },
    )
    user: User


    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
