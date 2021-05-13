function testMissing (req, res, next) {
    const {username, password, name, phone, mail, dob, gender, state, 
        city, area, street} = req.body;
    if (req.path === "/register") {
        if (![username, password, name, phone, mail, dob, gender, state, 
            city, area, street].every(Boolean)) {
          return res.json("Missing Credentials");
        } 
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } 
    }
    next();
};

module.exports = testMissing;