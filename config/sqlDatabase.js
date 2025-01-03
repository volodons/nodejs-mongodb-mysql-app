const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tododb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const initMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
        await sequelize.sync();
    } catch (err) {
        console.error('MySQL connection error:', err.message);
        process.exit(1);
    }
};

module.exports = { sequelize, initMySQL };
