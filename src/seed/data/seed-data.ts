import * as bcrypt from 'bcrypt';

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type Gender = 'men' | 'women' | 'kid' | 'unisex';
type Roles = 'user' | 'admin' | 'super-user';

interface SeedProduct {
    title: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    gender?: Gender;
    sizes?: ValidSizes[];
    image: string;
    category: number; 
}

interface SeedCategory {
    id: number;
    name: string;
}

interface SeedUser {
    name: string;
    password: string;
    phone: string;
    roles: Roles[];
}

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
    categories: SeedCategory[];
}

export const initialData: SeedData = {
    categories: [
        { id: 1, name: 'tecnologia' },
        { id: 2, name: 'remera' },
        { id: 3, name: 'pantalon' },
        { id: 4, name: 'gorra' },
        { id: 5, name: 'zapatilla' },
    ],

    users: [
        {
            name: 'santiqN',
            password: bcrypt.hashSync('SanUel82025', 10),
            phone: '1134652123',
            roles: ['admin', 'user', 'super-user'],
        },
        {
            name: 'user_comun',
            password: bcrypt.hashSync('User123!', 10),
            phone: '1143345678',
            roles: ['user'],
        }
    ],

    products: [
        {
            title: "Samsung Galaxy S24 Ultra",
            slug: "samsung_s24_ultra",
            description: "El último modelo de Samsung con IA integrada y pantalla de 120Hz.",
            price: 1200,
            stock: 15,
            image: "s24_ultra.png",
            category: 1,
        },
        {
            title: "Remera Oversize Black",
            slug: "remera_oversize_black",
            description: "Remera de algodón 100% con corte moderno.",
            price: 25,
            stock: 50,
            gender: 'men',
            sizes: ['S', 'M', 'L', 'XL'],
            image: "remera_black.png",
            category: 2,
        },
        {
            title: "Pantalon Cargo Beige",
            slug: "pantalon_cargo_beige",
            description: "Pantalón resistente con múltiples bolsillos.",
            price: 45,
            stock: 20,
            gender: 'men',
            sizes: ['M', 'L', 'XL'],
            image: "cargo_pants.png",
            category: 3,
        },
        {
            title: "Gorra Snapback Classic",
            slug: "gorra_snapback_classic",
            description: "Gorra ajustable con visera plana.",
            price: 15,
            stock: 100,
            gender: 'unisex',
            image: "snapback.png",
            category: 4,
        },
        {
            title: "Zapatillas Running Pro",
            slug: "zapatillas_running_pro",
            description: "Zapatillas livianas para alto rendimiento.",
            price: 85,
            stock: 30,
            gender: 'women',
            sizes: ['S', 'M', 'L'], 
            image: "running_shoes.png",
            category: 5,
        },
    ]
}