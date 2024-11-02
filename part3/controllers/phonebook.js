const personsRouter = require('express').Router();
const Phonebook = require('../models/phonebook');

personsRouter.get('/', (request, response) => {
  Phonebook.find({}).then((result) => {
    response.json(result);
  });
});

personsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Phonebook.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

personsRouter.delete('/:id', (request, response) => {
  const id = request.params.id;

  Phonebook.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

personsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' });
  }

  try {
    const existingPerson = await Phonebook.findOne({ name: body.name });

    if (existingPerson) {
      const updatedNote = await Phonebook.findOneAndUpdate(
        { name: body.name },
        { number: body.number },
        { new: true }
      );
      return response.json(updatedNote);
    } else {
      const note = new Phonebook({
        name: body.name,
        number: body.number,
      });

      const savedNote = await note.save();
      response.json(savedNote);
    }
  } catch (error) {
    next(error);
  }
});

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  const note = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
