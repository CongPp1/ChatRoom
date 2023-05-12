const model = require('../../models/index');

const getAll = async () => {
    const chats = await model.Chat.findAll()
    return chats;
}

const getOne = async (roomId) => {
    const chat = await model.chatusermapping.findAll({
        where: { roomId: roomId },
        attributes: ['userId']
    });
    return chat
}

const addNewChat = async (data) => {
    const chat = await model.Chat.create(data)
    return chat;
}

const removeChat = async (id) => {
    const result = await model.Chat.destroy({
        where: { id: id },
    })
    return result;
}

const removeUserFromChat = async (roomId, userId) => {
    const result = await model.chatusermapping.destroy({
        where: { roomId: roomId, userId: userId},
    })
    return result;
}

const updateChat = async (id, data) => {
    const result = await model.Chat.update(
        data,
        {
            where: { id: id }
        })
}

module.exports = {
    getAll,
    getOne,
    addNewChat,
    removeChat,
    removeUserFromChat,
    updateChat
}