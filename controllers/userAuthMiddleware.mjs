import jwt from "jsonwebtoken";

export const userAuthMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("We need a token, please give it to us next time");
    } 
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.userId = decoded.id;
                req.userRole = decoded.role;
                console.log("User ID: " + req.userId + " Role: " + req.userRole);
                
                next();
            }
        });
    }
};