const app = require('./index');
const mongoose = require('mongoose');

const HOST = 'localhost';
const PORT = '8000';
const DB_NAME = 'boilagbe';

mongoose.connect(`mongodb://0.0.0.0:27017/${DB_NAME}`, {
  useNewUrlParser: true,
});

const con = mongoose.connection;
con.on('open', () => {
  console.log('Database connected');
});

app.listen(PORT, () => {
  console.log(`Server start at http://${HOST}:${PORT}`);
});

module.exports = con;
