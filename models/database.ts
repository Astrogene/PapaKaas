import { Sequelize } from 'sequelize';

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/users.db',
});
sequelize.sync();
export default sequelize;
