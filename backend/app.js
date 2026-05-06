const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(cors());
const Experiencia = require('./models/experiencia');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hojadevida')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// RUTA INICIO
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// GET
app.get('/experiencias', async (req, res) => {
  try {
    const experiencias = await Experiencia.find();
    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener experiencias' });
  }
});

// POST
app.post('/experiencias', async (req, res) => {
  try {
    const nuevaExperiencia = new Experiencia(req.body);
    await nuevaExperiencia.save();
    res.json(nuevaExperiencia);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar experiencia' });
  }
});

app.put('/experiencias/:id', async (req, res) => {
  try {
    const experienciaActualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(experienciaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar experiencia' });
  }
});

app.delete('/experiencias/:id', async (req, res) => {
  try {
    await Experiencia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar experiencia' });
  }
});


app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});