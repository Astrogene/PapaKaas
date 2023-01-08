import User from './User'
import { Sequelize, DataTypes } from 'sequelize'

export async function Users(){
    var sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../data/users.db'
    });
    var dbUser = User(sequelize, DataTypes);
    sequelize.sync()
    await dbUser.schema.update({
        username: "admin_secure",
        password: "secure",
        role: "ADMIN"
    }, { where: {
        id: 0
    }})
    return dbUser.schema
}
