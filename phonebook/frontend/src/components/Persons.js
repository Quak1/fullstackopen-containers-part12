const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </div>
);

const Persons = ({ persons, deletePerson }) =>
  persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      deletePerson={deletePerson(person)}
    />
  ));

export default Persons;
