'use strict';
// firstName: DataTypes.STRING,
//     password: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     address: DataTypes.STRING,
//     gender: DataTypes.BOOLEAN,
//     roleId: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING,
//     positionId: DataTypes.STRING,
//     image: DataTypes.STRING
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@gmail.com',
      password:'123456',
      address:'Ha Noi',
      gender:'1',
      roleId:'hello',
      phoneNumber: 'r1',
      positionId: 'DataTypes.STRING',
      image: 'DataTypes.STRING',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
