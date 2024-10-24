import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bancoDB', 'vini', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: (msg) => console.log(`[Sequelize] ${msg}`), // Personaliza os logs SQL
});

export default sequelize;