var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.set('port', (process.env.PORT || 5000));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
  
app.listen(app.get('port'), function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Node app is running on port', app.get('port'));
});
