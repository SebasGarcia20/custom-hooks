import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const initialState = [
    {
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false,
    },
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    

    const handleNewTodo = (todo: any) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatchTodo(action)
    }

    const handleDeleteTodo = (id: any) => {
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const onToggleTodo = (id: any) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    const pendingTodosCount = todos.filter((todo : any) => !todo.done).length
    
    const todosCount = todos.length

  return {
    todosCount,
    pendingTodosCount,
    todos,
    handleDeleteTodo,
    handleNewTodo,
    onToggleTodo
  }
}
