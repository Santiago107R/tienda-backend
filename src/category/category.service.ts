import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  private logger = Logger
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto)

    try {
      await this.categoryRepository.save(category)

      return category
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
    relations: {
      product: true
    },
    order: { id: 'ASC' }
  });

    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })

    if (!category) 
      throw new NotFoundException(`Category with id ${id} not found`)

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    })

    if (!category) 
      throw new NotFoundException(`Category with id ${id} not found`)

    try {
      await this.categoryRepository.save(category)

      return this.findOne(id)
    } catch (error) {
      this.handleError(error)
    }

  }

  async remove(id: number) {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category)

    return `DELETE EXECUTED SUCCESSFULLY`;
  }

  async deleteAllTables() {
    const query = this.categoryRepository.createQueryBuilder('category');

    try {

      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: any) {
    this.logger.error(error);
  }
}
