const mongoose = require('mongoose');

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI;
//Conexión a mongo db

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error(err);
  });

/* 
Note.find({}).then(result => {
  console.log(result);
  mongoose.connection.close();
});

const note = new Note({
  content: 'mongo db es increible',
  date: new Date(),
  important: true,
});

note
  .save()
  .then(result => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  }); */
