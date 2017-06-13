var express = require('express');
var path = require('path');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.get('*', function(request, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.use(express.static('public'));

app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});
