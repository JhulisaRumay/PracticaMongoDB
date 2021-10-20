const jwt = require('jsonwebtoken');

//función que genera un JWT
const generarJWT = (uid) =>{
    return new Promise((resolve, reject) =>{
        const payload ={
            uid,
            //se puede agregar información adicional
        };

        //JWT_SECRET es la firma que utilizará el servidor para generar jwt
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '24h'
        },(err, token) =>{ //callback
            if (err){
                console.log(err);
                reject('No se puede generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
}
module.exports = {
    generarJWT,
}