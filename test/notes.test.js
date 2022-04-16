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

  //parallel
  /*  const notesObjects = initialNotes.map(notes => new Note(notes));
  const promises = notesObjects.map(note => note.save());
  await Promise.all(promises); */

  //sequencial
  for (const notes of initialNotes) {
    const notesObject = new Note(notes);
    await notesObject.save();
  }
});

describe('GET test notes', () => {
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
});

describe('POST test notes', () => {
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

    const { contents, response } = await getAllContentFromNotes();

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
});

describe('DELETE test notes', () => {
  test('note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNotes();
    const { body: notes } = firstResponse;
    const noteToDelete = notes[0];
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const { contents, response: secondResponse } =
      await getAllContentFromNotes();
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
    expect(contents).not.toContain(noteToDelete.content);
  });

  test('note cannot be deleted if doesnt exists', async () => {
    await api.delete('/api/notes/1234');
    expect(400);

    const { response } = await getAllContentFromNotes();
    expect(response.body.length).toEqual(initialNotes.length);
  });
});

afterAll(async () => {
  mongoose.connection.close();
  server.close();
});
