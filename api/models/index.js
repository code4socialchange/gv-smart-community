const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

let sequelize;
let db = {};

if (process.env.SERVERTYPE == 'OFFLINE') {

    sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASS, {
        host: 'localhost',
        dialect: 'postgres',
        logging: true,
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    });

    // sequelize = new Sequelize(process.env.OFFLINE_DBSTRING, {
    //     pool: {
    //         max: 5,
    //         idle: 30000,
    //         acquire: 60000,
    //     }
    // });

} else {
    if (process.env.DBSTRING) {
        sequelize = new Sequelize(process.env.DBSTRING, {
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 5,
                idle: 30000,
                acquire: 60000,
            }
        });
    } else {
        sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASS, {
            host: 'localhost',
            dialect: 'postgres',
            logging: true,
            pool: {
                max: 5,
                idle: 30000,
                acquire: 60000,
            }
        });
    }
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;