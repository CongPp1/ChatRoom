const chatServices = require('./chat-service')
const model = require('../../models/index')

const getAll = async (req, res, next) => {
    try {
        const chats = await chatServices.getAll();
        if (!chats) {
            return res.status(404).send({ message: 'Data is empty' });
        }
        return res.status(200).send({ message: 'Success', data: chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message });
    }
}

const getOne = async (req, res, next) => {
    try {
        const chat = await chatServices.getOne(Number(req.params.id));
        if (!chat) {
            return res.status(404).send({ message: 'Data is empty' })
        }
        return res.status(200).send({ message: 'Success', chat });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

const addChat = async (req, res, next) => {
    try {
        const addChat = await chatServices.addNewChat(req.body);
        const addUserForChat = async (userId) => {
            const findUser = await model.User.findOne({
                where: { id: userId }
            });
            await addChat.addUsers(findUser);
        }
        if (req.body.userId) {
            req.body.userId.forEach((userId) => {
                addUserForChat(userId)
            })
        }
        return res.status(200).send({ message: 'Success', addChat })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

const updateChattingContext = async (req, res, next) => {
    try {
      const roomId = Number(req.params.id);
      const chatRoom = await model.Chat.findOne({ where: { id: roomId } });
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
      }
      const updateResult = await chatRoom.update(req.body);
      if (req.body.userId !== null) {
        const user = await model.User.findByPk(req.body.userId);
        if (user) {
          await chatRoom.addUser(user);
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      }
      if (updateResult) {
        const updatedChatRoom = await model.Chat.findOne({
          where: { id: chatRoom.id },
          include: [{ model: model.User, attributes: ['username'] }],
        });
        return res.status(200).json({ message: 'Success', chat: updatedChatRoom });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error', error: error.message });
    }
  };

const removeUserFromChat = async (req, res, next) => {
    try {
        const userId = Number(req.params.userId);
        const roomId = Number(req.params.roomId);
        await chatServices.removeUserFromChat(userId, roomId);
        return res.status(200).send({ message: 'Success' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

const removeChattingContext = async (req, res, next) => {
    try {
        const roomId = Number(req.params.id);
        const chat = await chatServices.getOne(roomId);
        if (!chat) {
            return res.status(404).send({ message: 'Room not found' })
        }
        await chatServices.removeChat(chat);
        return res.status(200).send({ message: 'Success' });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error', error: error.message });
    }
}

module.exports = {
    getAll,
    getOne,
    addChat,
    updateChattingContext,
    removeUserFromChat,
    removeChattingContext
}