import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mydb', 'root', 'Visual@123#000', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;