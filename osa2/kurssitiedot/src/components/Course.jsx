const Header = ({course}) => {
    return <h1>{course.name}</h1>
  }


  const Content = ({course}) => {
    return (
      <div >
      
        
          {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
            </p>
          )}
          <p style={{ fontWeight: 'bold' }}>
            total of exercises {course.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
          </div>
    )
  }

  const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      
        
      
    </div>
  )
}

export default Course