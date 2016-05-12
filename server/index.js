import express from 'express';
import path from 'path';
import database from 'sequelize-connect';

async function connect () {
  database.discover = path.join(__dirname, 'models');
  database.matcher = function importAllFiles (modelFileName) {
    return true;
  };

  await database.connect('accidents_schema', 'root', '');
}

(async function () {
  try {
    await connect();
  } catch (err) {
    console.log(`An error occured when connecting: ${err}`);
  }

  const app = express();
  const port = process.env.PORT || 3001;

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  app.get('/api/:year', (req, res) => {
    const year = req.params.year;

    // database.models.accident.findAll({
    //   attributes: [
    //     'victims',
    //     'description',
    //     'accidentType',
    //     'address',
    //     'state',
    //     'zipcode',
    //     'year'
    //   ],
    //   where: {
    //     year: year
    //   }
    // }).then((rows) => {

    database.sequelize.query("SELECT `accidents`.state, count(*) as _count FROM `accidents` WHERE `accidents`.year = ? GROUP BY `accidents`.state ORDER BY `accidents`.state ASC",
    {replacements: [year], type: database.sequelize.QueryTypes.SELECT}).then((rows) => {
      res.send(rows);
    }).catch(err => console.log(`Error: ${err}`));
  });
})();

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }

  console.log('Webpack server listening at http://localhost:3000/');
});
