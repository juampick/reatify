import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from './webpack.config.dev';

/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);

app.use(express.static('./app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
}).listen(port, (err) => {
  if (err) return console.log(err);
  open(`http://localhost:${port}`);
});
