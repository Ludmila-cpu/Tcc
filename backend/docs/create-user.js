require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema do usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createUser() {
    try {
        console.log('🔄 Conectando ao MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Conectado ao MongoDB');

        // Verificar se usuário já existe
        const existingUser = await User.findOne({ email: 'teste@teste.com' });
        if (existingUser) {
            console.log('⚠️  Usuário teste@teste.com já existe!');
            process.exit(0);
        }

        // Criar senha com hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        // Criar usuário
        const user = new User({
            name: 'Usuario Teste',
            email: 'teste@teste.com',
            password: hashedPassword
        });

        await user.save();
        console.log('✅ Usuário criado com sucesso!');
        console.log('📧 Email: teste@teste.com');
        console.log('🔐 Senha: 123456');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

createUser();
