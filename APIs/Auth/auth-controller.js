const authServices = require('../Auth/auth-service')

const register = async (req, res) => {
    console.log('register') 
    try {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: ' username or password is required' })
        }
        if(password !== confirmPassword){
            return res.status(400).json({ message: ' Those passwords didn’t match. Try again.'})
        }
        const auth = await authServices.register(req.body)
        return res.status(200).json(auth)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error registering', error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            console.log('error: username or password is required')
            return res.status(404).json({ message: ' username or password is not correct' })
        }
        const login = await authServices.login(req.body);
        return res.status(200).json(login)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error', error: error.message })
    }
}
module.exports = { register, login }