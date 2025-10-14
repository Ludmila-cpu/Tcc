const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: String,
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'],
        default: 'pendente'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    paymentMethod: {
        type: String,
        enum: ['cartao', 'pix', 'boleto'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pendente', 'aprovado', 'recusado'],
        default: 'pendente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
