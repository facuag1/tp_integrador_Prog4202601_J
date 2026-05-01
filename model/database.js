const { Sequelize, DataTypes, Model } = require('sequelize');

// 1. Configuración de la conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'model/db/database.sqlite', // Archivo donde se guardarán los datos
  define: {
    timestamps: false, 
    freezeTableName: true
  }
});

// 2. DEFINICIÓN DE CLASES (MODELOS)

class Usuario extends Model {}
Usuario.init({
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  apellido: { type: DataTypes.STRING },
  nombre: { type: DataTypes.STRING },
  nombre_usuario: { type: DataTypes.STRING, unique: true },
  contrasenia: { type: DataTypes.STRING },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, tableName: 'usuarios' });


class InscripcionEstado extends Model {}
InscripcionEstado.init({
  id_inscripcion_estado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcion: { type: DataTypes.STRING },
  es_activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, tableName: 'inscripciones_estados' });


class CursoEstado extends Model {}
CursoEstado.init({
  id_curso_estado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcion: { type: DataTypes.STRING },
  es_activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, tableName: 'cursos_estados' });


class Estudiante extends Model {}
Estudiante.init({
  id_estudiante: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  documento: { type: DataTypes.STRING, unique: true },
  apellido: { type: DataTypes.STRING },
  nombres: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  fecha_nacimiento: { type: DataTypes.DATE },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  id_usuario_modificacion: { type: DataTypes.INTEGER },
  fecha_hora_modificacion: { type: DataTypes.DATE }
}, { sequelize, tableName: 'estudiantes' });


class Curso extends Model {}
Curso.init({
  id_curso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  fecha_inicio: { type: DataTypes.DATE },
  cantidad_horas: { type: DataTypes.INTEGER },
  inscriptos_max: { type: DataTypes.INTEGER },
  id_curso_estado: { type: DataTypes.INTEGER },
  id_usuario_modificacion: { type: DataTypes.INTEGER },
  fecha_hora_modificacion: { type: DataTypes.DATE }
}, { sequelize, tableName: 'cursos' });


class Inscripcion extends Model {}
Inscripcion.init({
  id_inscripcion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_curso: { type: DataTypes.INTEGER },
  id_estudiante: { type: DataTypes.INTEGER },
  fecha_hora_inscripcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  id_inscripcion_estado: { type: DataTypes.INTEGER },
  id_usuario_modificacion: { type: DataTypes.INTEGER },
  fecha_hora_modificacion: { type: DataTypes.DATE }
}, { sequelize, tableName: 'inscripciones' });


// 3. DEFINICIÓN DE RELACIONES (CLAVES FORÁNEAS)

// --- Relaciones de Estudiante ---
// Un usuario modifica a un estudiante
Estudiante.belongsTo(Usuario, { foreignKey: 'id_usuario_modificacion', as: 'usuarioModificacion' });
Usuario.hasMany(Estudiante, { foreignKey: 'id_usuario_modificacion' });

// --- Relaciones de Curso ---
// Un curso tiene un estado
Curso.belongsTo(CursoEstado, { foreignKey: 'id_curso_estado', as: 'estado' });
CursoEstado.hasMany(Curso, { foreignKey: 'id_curso_estado' });

// Un usuario modifica un curso
Curso.belongsTo(Usuario, { foreignKey: 'id_usuario_modificacion', as: 'usuarioModificacion' });
Usuario.hasMany(Curso, { foreignKey: 'id_usuario_modificacion' });

// --- Relaciones de Inscripción ---
// Una inscripción pertenece a un curso
Inscripcion.belongsTo(Curso, { foreignKey: 'id_curso', as: 'curso' });
Curso.hasMany(Inscripcion, { foreignKey: 'id_curso' });

// Una inscripción pertenece a un estudiante
Inscripcion.belongsTo(Estudiante, { foreignKey: 'id_estudiante', as: 'estudiante' });
Estudiante.hasMany(Inscripcion, { foreignKey: 'id_estudiante' });

// Una inscripción tiene un estado
Inscripcion.belongsTo(InscripcionEstado, { foreignKey: 'id_inscripcion_estado', as: 'estado' });
InscripcionEstado.hasMany(Inscripcion, { foreignKey: 'id_inscripcion_estado' });

// Un usuario modifica una inscripción
Inscripcion.belongsTo(Usuario, { foreignKey: 'id_usuario_modificacion', as: 'usuarioModificacion' });
Usuario.hasMany(Inscripcion, { foreignKey: 'id_usuario_modificacion' });


// 4. SINCRONIZACIÓN Y EXPORTACIÓN

// Esto crea las tablas en SQLite si no existen
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos y tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = {
  sequelize,
  Usuario,
  InscripcionEstado,
  CursoEstado,
  Estudiante,
  Curso,
  Inscripcion
};