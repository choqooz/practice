const Course = ({ course }) => {
  return (
    <li>
      {course.name} {course.exercises}
    </li>
  );
};

export default Course;
