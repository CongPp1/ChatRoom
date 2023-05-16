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
    console.log('user-service.js - line 39');
    console.log(id);
    const result = await model.User.update(
        geoLocation,
        { where: { id } }
    )
    // console.log(result);
    return result;
}

const out = async (id) => {
    const result = await model.User.update(
        { isActive: false},
        { where: { id }}
    )
    return result;
}

module.exports = { getAll, createOrUpdateNickname, saveGeoLocation, out }