const Express = require('express');
const { sequelize } = require('../db/connention');
const Album = require('../models/Album');
const app = Express();

/**
 * Get all the albums
 */
app.get('/api/get_albums', async (request, response) => {

    try {

        const dbResponse = await Album.findAll({
            attributes: [
                'album_id', 'album_name', 'album_artist', 'album_year', 'album_image'
            ],
            where: {
                album_inactive: false
            }
        });

        if (!dbResponse || dbResponse.length <= 0) {
            throw new Error('No albums found');
        }

        response.json({
            ok: true,
            code: 200,
            data: dbResponse
        });

    } catch (error) {
        response.json({
            ok: false,
            code: 500,
            message: error
        });
    }

});

/**
 * Creates a new Album
 */
app.post('/api/create_album', async (request, response) => {

    let body = request.body;
    console.log(body);

    let album = Album.build({
        album_name: body.name,
        album_artist: body.artist,
        album_year: body.year,
        album_image: body.image,
    });

    try {

        const dbResponse = await Album.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('album_id')), 'counter']
            ]
        });

        const { dataValues } = dbResponse[0];
        let { counter } = dataValues;

        if (counter >= 20) {
            throw Error('The number of albums have exceed 20. If you want to add a new album, you have to delete an existing one');
        }

        const data = await album.save();
        response.json({
            ok: true,
            code: 200,
            message: data
        });

    } catch (error) {
        response.json({
            ok: false,
            code: 500,
            message: error
        });
    }

});

/**
 * Update an existing album
 */
app.put('/api/update_album/:id', async (request, response) => {

    try {

        let id = request.params.id;
        let body = request.body;

        await Album.update({
            album_name: body.name,
            album_artist: body.artist,
            album_year: body.year,
            album_image: body.image
        }, {
            where: {
                album_id: id
            }
        });

        response.json({
            ok: true,
            code: 200,
            message: 'Successfully updated album'
        });

    } catch (error) {
        response.json({
            ok: false,
            code: 500,
            message: error
        });
    }

});

app.delete('/api/delete_album/:id', async (request, response) => {

    try {

        let id = request.params.id;

        await Album.update({
            album_inactive: true
        }, {
            where: {
                album_id: id
            }
        });

        response.json({
            ok: true,
            code: 200,
            message: 'Successfully deleted album'
        });

    } catch (error) {
        response.json({
            ok: false,
            code: 500,
            message: error
        });
    }

})

module.exports = app;
