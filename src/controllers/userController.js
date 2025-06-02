const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Gerar Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrar novo usuário
exports.registerUser = async (req, res) => {
    const { name, email, telefone, password } = req.body;

    if (!name || !email || !telefone || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = await User.create({ name, email, telefone, password });

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        telefone: user.telefone,
        token: generateToken(user.id),
    });
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            telefone:user.telefone,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
};
