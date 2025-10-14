require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: 'Maçã Orgânica',
        description: 'Maçãs frescas e crocantes cultivadas sem agrotóxicos (500g)',
        price: 7.90,
        image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
        category: 'frutas',
        stock: 50,
        unit: 'kg'
    },
    {
        name: 'Banana Nanica',
        description: 'Bananas maduras e doces ideais para lanches (1kg)',
        price: 5.50,
        image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e43e?auto=format&fit=crop&w=600&q=80',
        category: 'frutas',
        stock: 80,
        unit: 'kg'
    },
    {
        name: 'Cenoura',
        description: 'Cenouras crocantes ricas em betacaroteno (500g)',
        price: 4.20,
        image: 'https://images.unsplash.com/photo-1582515073490-dc84f5ed9b32?auto=format&fit=crop&w=600&q=80',
        category: 'verduras',
        stock: 100,
        unit: 'kg'
    },
    {
        name: 'Tomate Italiano',
        description: 'Tomates suculentos ideais para molhos e saladas (500g)',
        price: 8.40,
        image: 'https://images.unsplash.com/photo-1561136594-7f68413bfae3?auto=format&fit=crop&w=600&q=80',
        category: 'verduras',
        stock: 60,
        unit: 'kg'
    },
    {
        name: 'Alface Crespa',
        description: 'Folhas verdes e frescas para uma salada saudável (unidade)',
        price: 3.90,
        image: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=600&q=80',
        category: 'verduras',
        stock: 40,
        unit: 'un'
    }
];

async function seedDatabase() {
    try {
        // Conectar ao MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vereco', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✓ Conectado ao MongoDB');

        // Limpar produtos existentes
        await Product.deleteMany({});
        console.log('✓ Produtos antigos removidos');

        // Inserir novos produtos
        await Product.insertMany(products);
        console.log(`✓ ${products.length} produtos inseridos com sucesso!`);

        // Listar produtos criados
        const createdProducts = await Product.find({});
        console.log('\nProdutos cadastrados:');
        createdProducts.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} - R$ ${p.price.toFixed(2)} (${p.stock} ${p.unit})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Erro ao popular banco:', error);
        process.exit(1);
    }
}

seedDatabase();
