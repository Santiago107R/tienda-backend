import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductService,

    private readonly categoryService: CategoryService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService
  ) { }

  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers()

    await this.insertNewCategories()
    await this.insertNewProducts(adminUser)

    return 'SEED EXECUTED'
  }

  private async deleteTables() {

    await this.productService.deleteAllTables();
    await this.categoryService.deleteAllTables();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = seedUsers.map(user => this.userRepository.create(user));

    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }

  private async insertNewCategories() {
    const categories = initialData.categories;

    await Promise.all(
      categories.map((category) => this.categoryService.create(category))
    );

    return true;
  }

  private async insertNewProducts(user: User) {
    const products = initialData.products;
    const hostApi = this.configService.get('HOST_API');

    const categories = await this.categoryService.findAll();

    await Promise.all(
      products.map((product) => {
        const category = categories.find(cat => cat.name === product.category);

        if (!category) return

        return this.productService.create(
          {
            ...product,
            image: `${hostApi}/files/product/${product.image}`,
            category: category?.id,
          },
          user
        );
      })
    );

    return true;
  }

}
