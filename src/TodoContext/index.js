import React from 'react';
import { useLocalStorage } from './useLocalStorage';
//Por la forma en que esta hecho no hacia falta usar React Context, pero lo uso para practicar y ver como funciona
const TodoContext = React.createContext();

const defaultStates = [
    {text:"All", selected: true}, 
    {text:"Active", selected: false}, 
    {text:"Completed", selected: false}
  ];

const TodoProvider = (props) => {
    const [states, setStates] = React.useState(defaultStates);
    const {
      item: todos, 
      saveItem: saveTodos, 
      loading, 
      error} = useLocalStorage('TODOS', []);
    const [searchValue, setSearchValue] = React.useState('');
  
    let todosFiltered = todos;
    let searchedTodos = [];
    
    const stateSelectedIndex = states.findIndex( state => state.selected === true);
    if( stateSelectedIndex === 1)
      todosFiltered = todos.filter( TODO => TODO.completed === false);
    else if( stateSelectedIndex === 2)
      todosFiltered = todos.filter( TODO => TODO.completed === true);
  
    if(searchValue.length >= 1) {
      searchedTodos = todosFiltered.filter( TODO => {
      const todoText = TODO.text.toLowerCase();
      const searchText = searchValue.toLocaleLowerCase();
      return todoText.includes(searchText);
      })
    } else {
      searchedTodos = todosFiltered;
    }
  
    const select = (text) => {
      const stateIndex = states.findIndex((state) => state.text === text)
      const prevSelected = states.findIndex((state) => state.selected === true)
      const newStates = [...defaultStates];
      newStates[prevSelected].selected = false;
      newStates[stateIndex].selected = true;
      setStates(newStates);
    }
  
    const completeTodo = (text) => {
      const todoIndex = todos.findIndex((todo) => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
      saveTodos(newTodos);
    }
  
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    }
  
    const searchTodo = (e) => {
      let searchText = e.target.value;
      setSearchValue(searchText);
    }
  
    const addTodo = (todoText) => {
      const newTodos = [...todos];
      newTodos.push( {text: todoText, completed: false});
      saveTodos(newTodos);
    }

    const completedTodos = [...todos].filter(TODO => TODO.completed === true);

    const deleteAllTodos = () => {
        const newTodos = [...todos].filter(TODO => TODO.completed === false);
        saveTodos(newTodos);
    };

    return (
        <TodoContext.Provider value={{            
            loading,
            error,
            todos,
            searchValue,
            searchTodo,
            searchedTodos,
            completeTodo,
            deleteTodo,
            addTodo,
            states,
            select,
            deleteAllTodos,
            stateSelectedIndex,
            completedTodos
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider };