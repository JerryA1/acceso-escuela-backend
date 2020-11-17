var DataTypes = require("sequelize").DataTypes;
var _alumno = require("./alumno");
var _alumno_grupo = require("./alumno_grupo");
var _direccion_personal = require("./direccion_personal");
var _direccion_tutor = require("./direccion_tutor");
var _fecha = require("./fecha");
var _grupo = require("./grupo");
var _lista_acceso = require("./lista_acceso");
var _lista_salida = require("./lista_salida");
var _personal = require("./personal");
var _tipo_personal = require("./tipo_personal");
var _tipo_usuario = require("./tipo_usuario");
var _tutor = require("./tutor");
var _tutorado = require("./tutorado");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var alumno = _alumno(sequelize, DataTypes);
  var alumno_grupo = _alumno_grupo(sequelize, DataTypes);
  var direccion_personal = _direccion_personal(sequelize, DataTypes);
  var direccion_tutor = _direccion_tutor(sequelize, DataTypes);
  var fecha = _fecha(sequelize, DataTypes);
  var grupo = _grupo(sequelize, DataTypes);
  var lista_acceso = _lista_acceso(sequelize, DataTypes);
  var lista_salida = _lista_salida(sequelize, DataTypes);
  var personal = _personal(sequelize, DataTypes);
  var tipo_personal = _tipo_personal(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var tutor = _tutor(sequelize, DataTypes);
  var tutorado = _tutorado(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  alumno_grupo.belongsTo(alumno, { foreignKey: "id_alumno"});
  alumno.hasMany(alumno_grupo, { foreignKey: "id_alumno"});
  alumno_grupo.belongsTo(grupo, { foreignKey: "id_grupo"});
  grupo.hasMany(alumno_grupo, { foreignKey: "id_grupo"});
  direccion_personal.belongsTo(personal, { foreignKey: "id_personal"});
  personal.hasMany(direccion_personal, { foreignKey: "id_personal"});
  direccion_tutor.belongsTo(tutor, { foreignKey: "id_tutor"});
  tutor.hasMany(direccion_tutor, { foreignKey: "id_tutor"});
  grupo.belongsTo(personal, { foreignKey: "id_profesor"});
  personal.hasMany(grupo, { foreignKey: "id_profesor"});
  lista_acceso.belongsTo(fecha, { foreignKey: "id_fecha"});
  fecha.hasMany(lista_acceso, { foreignKey: "id_fecha"});
  lista_acceso.belongsTo(alumno, { foreignKey: "id_alumno"});
  alumno.hasMany(lista_acceso, { foreignKey: "id_alumno"});
  lista_acceso.belongsTo(personal, { foreignKey: "id_registrador"});
  personal.hasMany(lista_acceso, { foreignKey: "id_registrador"});
  lista_salida.belongsTo(personal, { foreignKey: "id_registrador"});
  personal.hasMany(lista_salida, { foreignKey: "id_registrador"});
  lista_salida.belongsTo(tutor, { foreignKey: "id_tutor"});
  tutor.hasMany(lista_salida, { foreignKey: "id_tutor"});
  lista_salida.belongsTo(fecha, { foreignKey: "id_fecha"});
  fecha.hasMany(lista_salida, { foreignKey: "id_fecha"});
  lista_salida.belongsTo(alumno, { foreignKey: "id_alumno"});
  alumno.hasMany(lista_salida, { foreignKey: "id_alumno"});
  personal.belongsTo(usuario, { foreignKey: "id_usuario"});
  usuario.hasMany(personal, { foreignKey: "id_usuario"});
  personal.belongsTo(tipo_personal, { foreignKey: "id_tipo_personal"});
  tipo_personal.hasMany(personal, { foreignKey: "id_tipo_personal"});
  tutor.belongsTo(usuario, { foreignKey: "id_usuario"});
  usuario.hasMany(tutor, { foreignKey: "id_usuario"});
  tutorado.belongsTo(tutor, { foreignKey: "id_tutor"});
  tutor.hasMany(tutorado, { foreignKey: "id_tutor"});
  tutorado.belongsTo(alumno, { foreignKey: "id_alumno"});
  alumno.hasMany(tutorado, { foreignKey: "id_alumno"});
  usuario.belongsTo(tipo_usuario, { foreignKey: "id_tipo_usuario"});
  tipo_usuario.hasMany(usuario, { foreignKey: "id_tipo_usuario"});

  return {
    alumno,
    alumno_grupo,
    direccion_personal,
    direccion_tutor,
    fecha,
    grupo,
    lista_acceso,
    lista_salida,
    personal,
    tipo_personal,
    tipo_usuario,
    tutor,
    tutorado,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
