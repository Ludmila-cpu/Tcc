require('dotenv').config();
const mongoose = require('mongoose');

// Schema do usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function listUsers() {
    try {
        console.log('🔄 Conectando ao MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Conectado ao MongoDB\n');

        const users = await User.find({}).select('name email createdAt');
        
        if (users.length === 0) {
            console.log('⚠️  Nenhum usuário encontrado no banco de dados.');
            console.log('\n💡 Para criar um usuário teste, execute:');
            console.log('   node create-user.js');
        } else {
            console.log(`📋 ${users.length} usuário(s) cadastrado(s):\n`);
            users.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name}`);
                console.log(`   📧 Email: ${user.email}`);
                console.log(`   📅 Cadastrado em: ${user.createdAt.toLocaleString('pt-BR')}\n`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

listUsers();
