import jwt from 'jsonwebtoken';

const generateJWT = (uid: string = '') => {
    return new Promise( (resolve, reject) => {
        
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY!, {
            expiresIn: '1h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Error jwt generate')
            }else {
                resolve( token )
            }
        })
    })
}

export default generateJWT;