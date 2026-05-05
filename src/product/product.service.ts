import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ArrayContains, Between, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductService {

  private logger = Logger
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) { }

  async create(createProductDto: CreateProductDto, user: User) {
    const { category, ...toCreate } = createProductDto

    const product = this.productRepository.create({
      ...toCreate,
      category: { id: category },
      user,
    })

    try {
      const savedProduct = await this.productRepository.save(product)

      return this.findOnePlain(savedProduct.id)
    } catch (error) {
      this.handleError(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, gender, category = 'all', sizes, query, minPrice, maxPrice } = paginationDto

    const sizesArray = sizes ? sizes.toUpperCase().split(',') : undefined

    const priceWhere =
      minPrice !== undefined && maxPrice !== undefined
        ? Between(minPrice, maxPrice)
        : minPrice !== undefined
          ? MoreThanOrEqual(minPrice)
          : maxPrice !== undefined
            ? LessThanOrEqual(maxPrice)
            : undefined

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        category: true,
      },
      order: {
        id: 'ASC',
      },
      where: {
        gender: gender ? gender : undefined,
        price: priceWhere,
        sizes: sizesArray ? ArrayContains(sizesArray) : undefined,
        title: query ? ILike(`%${query}%`) : undefined,
        category: category !== 'all' ? { name: category } : undefined,
      },
    })

    const totalProducts = await this.productRepository.count({
      where: {
        gender: gender ? gender : undefined,
        price: priceWhere,
        sizes: sizesArray ? ArrayContains(sizesArray) : undefined,
        title: query ? ILike(`%${query}%`) : undefined,
        category: category !== 'all' ? { name: category } : undefined,
      },
    });

    return {
      count: totalProducts,
      pages: Math.ceil(totalProducts / limit),
      products: products.map((product) => ({
        ...product,
        category: product.category.name
      }))
    }
  }

  async findOne(term: string) {
    let product: Product | null;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({
        where: [
          { id: term as any },
        ],
        relations: ['category']
      })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('slug =:slug', {
          slug: term.trim().toLowerCase(),
        })
        .leftJoinAndSelect('prod.category', 'prodCategory')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product with id or slug ${term} not found`)

    return product
  }

  async findOnePlain(term: string) {
    const { category, ...rest } = await this.findOne(term)

    return {
      ...rest,
      category: category.name,
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { category, ...toUpdate } = updateProductDto

    const product = await this.productRepository.preload({
      id,
      ...toUpdate,
      category: category ? { id: category } as any : undefined,
    })

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`)

    try {
      product.user = user;
      await this.productRepository.save(product);

      return this.findOnePlain(id)
    } catch (error) {
      this.handleError(error)
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id)

    await this.productRepository.remove(product)

    return 'DELETE EXECUTED SUCCESSFULLY'
  }

  async deleteAllTables() {
    const query = this.productRepository.createQueryBuilder('product');

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
    if (error.code == '23505')
      throw new BadRequestException(error.detail)


    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
