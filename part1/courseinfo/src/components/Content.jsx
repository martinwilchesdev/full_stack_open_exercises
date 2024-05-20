import Part from './Part'

const Content = ({parts}) => {
    return (
        <div>
            <Part 
                part={parts.parts[0].name}
                exercise={parts.parts[0].exercises}
            />
            <Part 
                part={parts.parts[1].name}
                exercise={parts.parts[1].exercises}
            />
            <Part 
                part={parts.parts[2].name}
                exercise={parts.parts[2].exercises}
            />
        </div>
    )
}

export default Content
