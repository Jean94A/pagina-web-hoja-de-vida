const mongoose = require('mongoose');

const ExperienciaSchema = new mongoose.Schema({
  empresa: String,
  cargo: String,
  descripcion: String,
  fecha_inicio: String,
  fecha_fin: String
});

module.exports = mongoose.model('Experiencia', ExperienciaSchema);
