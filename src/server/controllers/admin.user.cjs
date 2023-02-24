const User = require('../model/user.cjs')


module.exports.register = async (req, res, next) => {
    const { state, username, email, password } = req.body;
    // register
    console.log(req.body)

    try {
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            delete req.session.username;
            delete req.session.email;
        })
        res.status(200).send('haha')
    }
    catch (e) {

        // next(e);
        res.status(400).send("The account has existed.")
    }
}

module.exports.login = (req, res, next) => {
    console.log(req.body)
    res.send('Welcome back!')
}