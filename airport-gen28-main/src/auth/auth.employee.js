const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Simulación de base de datos
const users = [
  { id: 1, name: 'Employee 1', email: 'employee1@example.com', password: 'password', role: 'employee' },
  { id: 2, name: 'User 2', email: 'user2@example.com', password: 'password', role: 'user' },
];

const repairs = [
  { id: 1, date: '2023-01-01', motorsNumber: 'M123', description: 'Motor repair', status: 'pending' },
  { id: 2, date: '2023-02-01', motorsNumber: 'M124', description: 'Engine repair', status: 'completed' },
];

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (user.role !== 'employee') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
}

// Ruta para autenticación y generación del token JWT
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Rutas protegidas para empleados
app.use('/employee', verifyToken);

// Obtener la lista de motos pendientes (pending) de reparar
app.get('/employee/repairs', (req, res) => {
  const pendingRepairs = repairs.filter((r) => r.status === 'pending');
  res.json(pendingRepairs);
});

// Obtener una moto pendiente de reparar por su id
app.get('/employee/repairs/:id', (req, res) => {
  const { id } = req.params;
  const repair = repairs.find((r) => r.id === parseInt(id, 10));

  if (!repair || repair.status !== 'pending') {
    return res.status(404).json({ message: 'Repair not found or not pending' });
  }

  res.json(repair);
});

// Actualizar el status de una reparación a completado (cambiar status a completed)
app.patch('/employee/repairs/:id', (req, res) => {
  const { id } = req.params;
  const repair = repairs.find((r) => r.id === parseInt(id, 10));

  if (!repair || repair.status !== 'pending') {
    return res.status(404).json({ message: 'Repair not found or not pending' });
  }

  repair.status = 'completed';
  res.json({ message: 'Repair status updated to completed' });
});

// Cancelar la reparación de un usuario (cambiar status a cancelled)
app.delete('/employee/repairs/:id', (req, res) => {
  const { id } = req.params;
  const repair = repairs.find((r) => r.id === parseInt(id, 10));

  if (!repair || repair.status !== 'pending') {
    return res.status(404).json({ message: 'Repair not found or not pending' });
  }

  repair.status = 'cancelled';
  res.json({ message: 'Repair status updated to cancelled' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
