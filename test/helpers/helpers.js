const { app } = require('../../index');
const supertest = require('supertest');
const api = supertest(app);

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack JS con midudev',
    important: true,
    date: new Date(),
  },
  {
    content: 'Está Guay',
    important: false,
    date: new Date(),
  },
  {
    content: 'Mañana la aventura comienza',
    important: true,
    date: new Date(),
  },
];

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes');
  return {
    contents: response.body.map(note => note.content),
    response,
  };
};

module.exports = { initialNotes, api, getAllContentFromNotes };
