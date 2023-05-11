const model = require('../../models/index');

const getAll = async () => {
    const users = await model.User.findAll({
        attributes: {
            exclude: ['password', 'name'],
        }
    });
    return users;
}

const createOrUpdateNickname = async (id, nickname) => {
    const result = await model.User.update(
        nickname
        , {
            where: { id },
        })
    return result;
}
module.exports = { getAll, createOrUpdateNickname }