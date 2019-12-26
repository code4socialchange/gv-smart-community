const logger = require('./../../logger');
const db = require('./../../models/index');
const bcrypt = require('bcrypt');
const Op = require('sequelize').Op;
const fs = require('fs');
const { promisify } = require("util");
const formidable = require('formidable');

const path = require('path');

/**
 * What to sync ?
 *  - Only Messages
 * 
 */

const syncFromLocal = async(req, res, next) => {

    try {

        const unsyncedData = req.body.unsyncedData;

        if (unsyncedData) { // patch unsynced data to local server

            await Promise.all(
                Object.keys(unsyncedData).map(async model => {
                    if (Array.isArray(unsyncedData[model]) && unsyncedData[model].length > 0) {
                        return await db[model].bulkCreate(unsyncedData[model]);
                    }
                })
            )

            return res.json({
                success: true,
                message: 'Data has been successfully synced to server.'
            })

        } else { // run sync procedure to download the list

            const lastMessageSync = await db.Sync.findOne({ where: { tableName: 'Message' } });
    
            console.log('Last sync time ', lastMessageSync.updatedAt);
    
            const unSyncedMessagesList = await db.Message.findAll({ where: { updatedAt: { [Op.gt]: new Date(lastMessageSync.updatedAt) } } });
    
            const fileData = {
                syncData: await db.Sync.findAll(),
                messages: unSyncedMessagesList
            }
    
            await promisify(fs.writeFile)('sync.txt', (Buffer.from(JSON.stringify(fileData)).toString('base64')));
    
            const fileStream = fs.createReadStream('sync.txt');
            fileStream.pipe(res);
    
            fileStream.on('close', async() => {
                res.end();
                fs.unlinkSync('sync.txt');
                await db.Sync.update({ updatedAt: new Date() }, { where: {} });
            });

        }
        

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: 'Error fetching unsynced records'
        })

    }
    
}

/**
 * 
 * What all to sync ?
 *  - Blogs
 *  - Messages
 *  - Users
 *  - Villages
 * 
 * Sync Table will contain the sync time of each table in rows with the last updated time.
 * 
 */
const syncFromServer = async(req, res, next) => {

    try {
        
        const fileData = JSON.parse((Buffer.from(req.body.fileData, 'base64')).toString('ascii'));
        
        console.log(fileData);
        await saveMessages(fileData.messages)
        
        res.status(200).json({
            dataToSync: await fetchUnSyncDataForTransitUser(fileData.syncData)
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: 'Error syncing from server'
        })

    }

}

const fistRunSync = async() => {

    try {

        const hasSyncList = await db.Sync.findAll();

        if (Array.isArray(hasSyncList) && hasSyncList.length > 0) {
            return 'SYNCLIST_AVAILABLE';
        }

        let syncList = Object.keys(db).filter(key => !['Sync', 'sequelize', 'Sequelize'].includes(key));

        syncList = syncList.map(key => {
            return {
                tableName: key,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        
        const newSyncList = await db.Sync.bulkCreate(syncList);
        
        if (Array.isArray(newSyncList) && newSyncList.length > 0) {
            return 'SYNCLIST_CREATED';
        }

    } catch (error) {
        
        return 'SYNCLIST_ERROR';

    }

}

const fetchUnSyncDataForTransitUser = async(lastSyncList) => {

    return Promise.all(lastSyncList.map(async table => {
        return { 
            [table.tableName]: await db[table.tableName]
                                    .findAll(
                                        {   
                                            attributes: { exclude: ['id'] },
                                            where: { createdAt: 
                                                { 
                                                    [Op.gt]: new Date(table.updatedAt) 
                                                }
                                            } 
                                        }
                                    )
        }
    }))

}

const saveMessages = async(messageList) => {

    try {

        if (messageList.length === 0) Promise.resolve([]);
        
        messageList.map(message => delete message.id);

        const bulkCreateTransaction = await db.sequelize.transaction(async t => {
            return await db.Message.bulkCreate(messageList, { transaction: t })
        })
    
        return Promise.resolve(bulkCreateTransaction);

    } catch (error) {
        return Promise.reject(error);
    }

}

module.exports = { syncFromLocal, fistRunSync, syncFromServer }