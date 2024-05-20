import Button from './components/Button'
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [mostVoted, setMostVoted] = useState(null)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleChangeAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const handleVote = () => {
    let tempVotes = votes
    tempVotes[selected] = tempVotes[selected]
      ? tempVotes[selected] += 1
      : tempVotes[selected] = 1

    setVotes(tempVotes)
    setVotes({ ...tempVotes })
    mostVotedAnecdote()
  }

  const mostVotedAnecdote = () => {
    let counterVotes = 0
    let index = 0

    for (let vote in votes) {
      if (votes[vote] > counterVotes) {
        counterVotes = votes[vote]
        index = vote
      }
    }
    setMostVoted(index)
  }

  return(
    <div>
      <div>
        {anecdotes[selected]}
        <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      </div>
      <Button text="vote" onHandleButton={handleVote} />
      <Button text="next anecdote" onHandleButton={handleChangeAnecdote} />
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVoted]}</p>
        <p>has {votes[mostVoted] || 0} votes</p>
      </div>
    </div>
  ) 
}

export default App
