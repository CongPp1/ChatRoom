const chatServices = require('./chat-service')

const getAll = async (req, res, next) => {
    try {
        const chats = await chatServices.getAll();
        if(!chats) {
            return res.status(404).send({ message: 'Data is empty' });
        }
        return res.status(200).send({ message: 'Success', data: chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message });
    }
}

const addChat = async (req, res, next) => {
    try {
        const addChat = await chatServices.addNewChat(req.body);
        const addUserForChat = async (userId) => {
            const findUser = await model.User.findOne({
                where: {id: userId}
            });
            await addChat.addUsers(findUser);
        }
        if(req.body.userId){
            req.body.userId.forEach((userId) => {
                addUserForChat(userId)
            })
        }   
        return res.status(200).send({ message: 'Success', addChat})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message})
    }
}

module.exports = {
    getAll,
    addChat
}