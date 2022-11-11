const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connention');

const Album = sequelize.define('Album', {

    album_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

    album_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    album_artist: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    album_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    album_image: {
        type: DataTypes.STRING
    },

    album_inactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

module.exports = Album;
