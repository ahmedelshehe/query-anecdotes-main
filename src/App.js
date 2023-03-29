import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes ,updateAnecdote } from './services/anecdotes' 
import { useQuery ,useMutation } from 'react-query'
import { useQueryClient } from 'react-query';
import { useNotificationDispatch } from './NotificationContext';
const App = () => {
  const queryClient =useQueryClient()
  const dispatch =useNotificationDispatch()
  const voteAnecdoteMutation=useMutation(updateAnecdote,{
    onSuccess : (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map((anecdote) =>anecdote.id === updatedAnecdote.id ? updatedAnecdote :anecdote))
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote , votes : anecdote.votes+1})
    dispatch({type : "NEW", payload : `anecdote ${anecdote.content} voted`})
    setTimeout(()=>{
      dispatch({type : "RESET"})
    },5000)
  }
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry :1,

  })
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if(result.isError) {
    return <div>anecdote server not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
