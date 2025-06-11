import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import User from './models/user.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('DB connected')).catch(err => console.error(err));

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update({ name, email, role });
      res.json(user);
    } else res.status(404).send('User not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'User deleted' });
    } else res.status(404).send('User not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
