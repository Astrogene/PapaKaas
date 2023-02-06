import { Sequelize } from 'sequelize-cockroachdb';

var sequelize = new Sequelize(process.env.DATABASE_URL, {});
sequelize.sync();
export default sequelize;
