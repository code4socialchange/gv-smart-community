const db = require('./../../models/index');
const logger = require('./../../logger');

const getVillages = async(req, res, next) => {

    try {
    
        await db.Village.findAll().then(villages => {
            return res.status(200).json({
                success: true,
                villages: villages
            });
        })
        
    } catch (error) {

        logger.error('Error getting villages', error);
        
        return res.status(500).json({
            success: false,
            message: 'Error finding villages'
        });

    }

}

const addVillage = async(req, res, next) => {

    const village = req.body.village;

    try {
        
        await db.Village.create(village).then(response => {
            return res.status(200).json({
                success: true,
                village: response
            })
        })

    } catch (error) {
        
        logger.error('Error creating village', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating village'
        })

    }

}

const updateVillage = async(req, res, next) => {
    
    const villageId = req.body.id;
    const updatedVillage = req.body.village;

    try {
        
        db.Village.update(updatedVillage, { where: { id: villageId } }).then(village => {

            logger.info('Village updated ', village);
            return res.status(200).json({
                success: true,
                message: 'Village updated'
            });

        })

    } catch (error) {
        
        logger.error('Error updating village ', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating village'
        })

    }
    
}

const deleteVillage = async(req, res, next) => {

    const villageId = req.params.villageId;

    try {
        
        await db.Village.destroy({ where: { id: villageId } }).then(response => {

            logger.info('Village deleted ', response);

            return res.status(200).json({
                success: true,
                message: 'Village deleted successfully'
            });

        })

    } catch (error) {
        
        logger.error('Error deleting village ', error);

        return res.status(500).json({
            success: false,
            message: 'Error deleting village'
        })

    }

}

module.exports = { getVillages, addVillage, updateVillage, deleteVillage }