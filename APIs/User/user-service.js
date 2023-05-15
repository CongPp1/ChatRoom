const model = require('../../models/index');

const getAll = async () => {
    const users = await model.User.findAll({
        attributes: {
            exclude: ['password', 'name'],
        }
    });
    return users;
}

// const getAllByChatId = async (roomId) => {
//     const users = await model.User.findAll({
//         attributes: ['username'],
//         include: [{
//             model: model.Chat,
//             through: {
//                 model: model.chatusermapping,
//                 where: {
//                     roomId: roomId
//                 }
//             },
//             required: true
//         }]        
//     });
//     return users;
// }

const createOrUpdateNickname = async (id, nickname) => {
    const result = await model.User.update(
        nickname
        , {
            where: { id },
        })
    return result;
}

const saveGeoLocation = async (id, geoLocation) => {
    const result = await model.User.update(
        geoLocation,
        { where: { id } }
    )
}

module.exports = { getAll, createOrUpdateNickname, saveGeoLocation }