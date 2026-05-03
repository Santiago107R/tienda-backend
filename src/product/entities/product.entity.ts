import { User } from "../../auth/entities/user.entity";
import { Category } from "../../category/entities/category.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('float')
    price: number;

    @Column('text', {
        nullable: true
    })
    description?: string;

    @Column('text')
    slug: string;

    @Column('int', {
        default: 1
    })
    stock: number;

    @Column('text', {
        array: true,
        nullable: true,
    })
    sizes?: string[];

    @Column('text', {
        nullable: true,
    })
    gender?: string;

    @Column('text')
    image: string;

    @ManyToOne(
        () => Category,
        (category) => category.product,
    )
    category: Category;

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
