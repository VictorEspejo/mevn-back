import jwt from "jsonwebtoken";


export const requireToken = (req, res, next) => {
    try {
        //OBTIENE EL TOKEN DESDE EL HEADER POR BEARER
        let auth = req.headers?.authorization;
        if(!auth) throw new Error("No existe el token");
        auth = auth.split("Bearer ")[1];
        const { uid } = jwt.verify(auth, process.env.JWT);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
}




// export const requireAuth = (req, res, next) => {
//     try {
//         //SE OBTIENE DE LA COOKIE SEGURA DE LA PETICION
//         let auth = req.cookies.token;
//         console.log('TOKEN:', auth);
//         if(!auth) throw new Error("No existe el token");
//         const { uid } = jwt.verify(auth, process.env.JWT);
//         req.uid = uid;
//         next();
//     } catch (error) {
//         return res.status(401).json({error: error.message});
//     }
// }