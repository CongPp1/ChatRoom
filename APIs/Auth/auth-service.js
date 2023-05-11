const model = require('../../models/index');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

const register = ({ username, password, }) => new Promise(async (resolve, reject) => {
    try {
        const user = await model.User.findOrCreate({
            where: { username: username },
            defaults: {
                username,
                password: hashPassword(password),
            }
        })
        const token = user[1] ? jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '5m' }) : null;
        console.log(process.env.JWT_SECRET)
        resolve({
            err: user[1] ? 0 : 1,
            message: user[1] ? 'Registration complete' : 'username already registered. Please try again',
            token
        })

        if (token) {
            console.log(token)
            await model.User.update({
                accessToken: token
            }, {
                where: { id: user[0].id }
            })
        }
    } catch (error) {
        reject(error)
    }
})

const login = ({ username, password }) => new Promise(async (resolve, reject) => {
    try {
        const user = await model.User.findOne({
            where: { username },
            raw: true
        })
        const isChecked = user && bcryptjs.compareSync(password, user.password)
        const token = isChecked ? jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '5m' }) : null;
        resolve({
            err: token ? 0 : 1,
            message: token ? 'Login successfully' : 'Login failed, please try again',
            'accessToken': token ? `${token}` : token,
            'user': {
                ...user,
                password: undefined
            }
        })
        // if (token) {
        //     await model.User.update({
        //         accessToken: token
        //     }, {
        //         where: { id: user.id }
        //     })
        // }
    } catch (error) {
        reject(error)
    }
})

module.exports = { register, login }