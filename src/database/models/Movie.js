module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.INTEGER,

    };
    let config = {
        paranoid:true,//esto sirve para hacer un softdelete
        deletedAt:'softdelete',//fila en donde se almacenara
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        
    }
    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function (models) {
        Movie.belongsTo(models.Genre, {
            as: 'genero',
            foreignKey: 'genre_id'
        });

        Movie.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })

    }



    return Movie
};