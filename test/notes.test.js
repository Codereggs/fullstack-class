const mongoose = require('mongoose');
const { server } = require('../index');
const {
  initialNotes,
  api,
  getAllContentFromNotes,
} = require('../test/helpers/helpers');
const Note = require('../models/Note');

beforeEach(async () => {
  await Note.deleteMany({});

  const note1 = new Note(initialNotes[0]);
  await note1.save();

  const note2 = new Note(initialNotes[1]);
  await note2.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const { response } = await getAllContentFromNotes();
  expect(response.body).toHaveLength(initialNotes.length);
});

test('the first note is about midudev', async () => {
  const { contents } = await getAllContentFromNotes();
  expect(contents).toContain('Aprendiendo Fullstack JS con midudev');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Proximamente async/await',
    important: true,
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const { contents } = await getAllContentFromNotes();

  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain(newNote.content);
});

test('note without content is not valid', async () => {
  const newNote = {
    important: true,
  };
  await api.post('/api/notes').send(newNote).expect(400);

  const { response } = await getAllContentFromNotes();

  expect(response.body).toHaveLength(initialNotes.length);
});

afterAll(async () => {
  mongoose.connection.close();
  server.close();
});
