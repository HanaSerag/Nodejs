const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const getToken = req.session.token; 
    if (!getToken) {
        return res.redirect('/login'); 
    }

    jwt.verify(getToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/login');  
        }
        req.user = decoded;
        next();
    });
};

module.exports = { checkAuth };
