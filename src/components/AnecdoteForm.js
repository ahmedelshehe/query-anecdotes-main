import {useMutation ,useQueryClient } from "react-query"
import { addAnecdote } from "../services/anecdotes"
import { useNotificationDispatch } from './../NotificationContext';
const AnecdoteForm = () => {
  const queryClient =useQueryClient()
  const dispatch =useNotificationDispatch()
  const newAnecdoteMutation =useMutation(addAnecdote,{
    onSuccess : (newAnecdote) =>{
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError :  (error)=> {
      dispatch({type : "NEW" ,payload : error.response.data.error})
      setTimeout(()=>{
        dispatch({type : "RESET"})
      },5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate({content ,votes : 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
