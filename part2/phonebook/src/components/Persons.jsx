const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}{' '}
          <button onClick={() => handleDelete(person.id)}>delete </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
