const userServices = require('../User/user-service')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAll();
        if (users.length <= 0) {
            return res.status(404).send({ message: 'Data is empty' });
        }
        return res.status(200).send({ message: 'Success', data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message });
    }
}

const getUsersByChatId = async (req, res, next) => {
    try {
        const users = await userServices.getAllByChatId(Number(req.params.id));
        return res.status(200).send({ message: 'Success', data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

const createOrUpdateNickname = async (req, res, next) => {
    try {
        const { nickname } = req.body;
        if (!nickname) {
            return res.status(400).send({ message: 'Nickname is required' });
        }
        const { id } = req.params;
        await userServices.createOrUpdateNickname(parseInt(id), req.body);
        return res.status(200).send({ message: 'Success' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Failed to update nickname', error: error.message })
    }
}

const saveGeoLocation = async (req, res, next) => {
    try {
        const { geoLocation } = req.body;
        if (!geoLocation) {
            console.log('geoLocation', geoLocation)
            return res.status(400).send({ message: 'geoLocation is required' });
        }
        const { id } = req.params;
        console.log(id)
        const result = await userServices.saveGeoLocation(Number(id), req.body)
        console.log('result', result)
        return res.status(200).send({ message: 'Success' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

const out = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).send({ message: 'UserID is required' })
        }
        await userServices.out(req.body);
        return res.status(200).send({ message: 'Success' });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error', error: error.message })
    }
}

module.exports = { getAllUsers, createOrUpdateNickname, getUsersByChatId, saveGeoLocation, out };