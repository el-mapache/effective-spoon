export default function createAccidentModel (sequelize, DataTypes) {
  const accident = sequelize.define('accident', {
    incidentDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    victims: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inspectionNumber: {
      type: DataTypes.STRING,
      length: 20
    },
    accidentType: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING,
      length: 4,
      allowNull: false
    }
  }, {
   timestampes: false
  });

  return accident;
};
