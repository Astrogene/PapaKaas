import User from './User'
import { Sequelize, DataTypes } from 'sequelize'


var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../data/users.db'
});
/*
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}*/
var dbUser = User(sequelize, DataTypes);
sequelize.sync()
export var Users = dbUser.schema