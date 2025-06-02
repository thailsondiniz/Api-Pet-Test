const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor adicione um nome'],
    },
    email: {
        type: String,
        required: [true, 'Por favor adicione um email'],
        unique: true,
    },
    telefone: {
        type: String,
        required: [true, 'Por favor adicione um telefone'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Por favor adicione uma senha'],
    },
}, {
    timestamps: true,
});

// Criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('user', userSchema);
