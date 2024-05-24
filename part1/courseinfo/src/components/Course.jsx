import Total from './Total'
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
    return (
        <>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header course={course} key={course.id} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            ))}
        </>
    )
}

export default Course
