// database.js
import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');

export default sequelize;
