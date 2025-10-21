require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: 'Maçã Fuji',
        description: 'Maçãs frescas e crocantes cultivadas sem agrotóxicos',
        price: 7.90,
        image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop',
        category: 'frutas',
        stock: 50,
        unit: 'kg'
    },
    {
        name: 'Banana Prata',
        description: 'Bananas maduras e doces ideais para lanches',
        price: 5.50,
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
        category: 'frutas',
        stock: 80,
        unit: 'kg'
    },
    {
        name: 'Cenoura Orgânica',
        description: 'Cenouras crocantes ricas em betacaroteno',
        price: 4.20,
        image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=400&fit=crop',
        category: 'verduras',
        stock: 100,
        unit: 'kg'
    },
    {
        name: 'Tomate Italiano',
        description: 'Tomates suculentos ideais para molhos e saladas',
        price: 8.40,
        image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop',
        category: 'verduras',
        stock: 60,
        unit: 'kg'
    },
    {
        name: 'Alface Crespa',
        description: 'Folhas verdes e frescas para saladas saudáveis',
        price: 3.90,
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop',
        category: 'verduras',
        stock: 40,
        unit: 'un'
    },
    {
        name: 'Morango',
        description: 'Morangos doces e suculentos direto da colheita',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
        category: 'frutas',
        stock: 30,
        unit: 'kg'
    },
    {
        name: 'Abacate',
        description: 'Abacates cremosos ricos em gorduras saudáveis',
        price: 9.90,
        image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&h=400&fit=crop',
        category: 'frutas',
        stock: 45,
        unit: 'kg'
    },
    {
        name: 'Brócolis',
        description: 'Brócolis fresco rico em nutrientes e vitaminas',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
        category: 'verduras',
        stock: 35,
        unit: 'kg'
    },
    {
        name: 'Laranja Pera',
        description: 'Laranjas suculentas perfeitas para sucos naturais',
        price: 4.90,
        image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=400&fit=crop',
        category: 'frutas',
        stock: 70,
        unit: 'kg'
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
