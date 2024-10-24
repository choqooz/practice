import Course from './components/Course.jsx';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const total1 = courses[0].parts.reduce((acc, part) => acc + part.exercises,0);
  const total2 = courses[1].parts.reduce((acc, part) => acc + part.exercises,0);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{courses[0].name}</h2>
      {courses[0].parts.map((course) => (
        <Course key={course.id} course={course} />
      ))}
      <p>
        <strong>total of {total1} exercises</strong>
      </p>

      <h2>{courses[1].name}</h2>
      {courses[1].parts.map((course) => (
        <Course key={course.id} course={course} />
      ))}
      <p>
        <strong>total of {total2} exercises</strong>
      </p>
    </div>
  );
};

export default App;
