const model = require('../../models/index');

const getAll = async () => {
    const chats = await model.Chat.findAll({
        include: [
            { model: model.User }
        ]
    });
    return chats;
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

const updateChat = async (id, data) => {
    const result = await model.Chat.update(
        data,
        {
            where: { id: id }
        })
}

module.exports = {
    getAll,
    addNewChat,
    removeChat,
    updateChat
}