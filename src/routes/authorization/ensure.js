const jwt = require("jsonwebtoken");
const pw=process.env.TOKEN_SECRET;

function ensureSign(email, nickname, type, time){
  if(time){
    // console.log('Con tiempo de expiracion de 2 horas')
    return jwt.sign({'email':email, 'nickname':nickname,'type':type}, pw, { expiresIn: '1h' });
  }
  else{
    // console.log('Sin tiempo de expiracion')
    return jwt.sign({'email':email, 'nickname':nickname,'type':type}, pw);
  }
}

//Middleware para autenticacion de rutas seguras
function ensureAuthorized(req, res, next) {
    const token = req.headers["access-token"];
    if (token) {
        jwt.verify(token, pw, (err, decoded) => {      
          if (err) {
            return res.status(403).json({status : 'unauthorized', msj: "Error al autenticar"});
          } else {
            req.data = decoded;  
            // console.log(decoded);  
            next();
          }
        });
  
    } else {
        res.status(403).json({status : 'unauthorized', msj: "Error al autenticar"});
    }
}

exports.authorization=ensureAuthorized;
exports.sign=ensureSign;