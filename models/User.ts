import jwt from 'jsonwebtoken'
import { Sequelize } from 'sequelize'
import bcrypt from 'bcryptjs'

export default (sequelize: Sequelize, DataTypes: any) => {
    let User:any = sequelize.define("user",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate email https://sequelize.org/master/manual/models-definition.html#validations
              /*  validate: {
                    isEmail: true
                }*/
            },
            role: {
                type: DataTypes.ENUM('ADMIN', 'USER'),
                defaultValue: 'USER'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                // setter https://sequelize.org/master/manual/models-definition.html#getters--amp--setters
                set(val: string) {
                    const runtimeConfig = useRuntimeConfig()
                    return this.setDataValue("password", bcrypt.hashSync(val, bcrypt.genSaltSync(10)));
                }
            }
        });
    User.prototype.isValidPassword = function (password: string) {
        const match = bcrypt.compareSync(password, this.password);
        if (match) {
            return true
        }
        else {
            return false
        }
    }

    return { name: 'User', schema: User };
}