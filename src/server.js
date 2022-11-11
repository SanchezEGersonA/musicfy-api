const Express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/connention');
const AlbumController = require('./controller/AlbumController');
const bodyParser = require('body-parser');
require('./models/Album');

const app = Express();
const port = 3000;

const init = async () => {

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(cors());

    app.use(AlbumController);

    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log('Database connected!');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

}

init();
