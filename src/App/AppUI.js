import './App.css';
import React from 'react';
import { Header } from '../Header/Header';
import { StatesList } from '../StatesList/StatesList';
import { StateItem } from '../StatesList/components/StateItem';
import { TodoButton } from '../TodoButton/TodoButton';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoList/components/TodoItem';
import { TodoContext } from '../TodoContext';

const AppUI = () => {
  const {
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
  } = React.useContext(TodoContext);

  return (
      <React.Fragment>
        <Header />
        <main className="main">
          <StatesList>
            {states.map(state => (
              <StateItem
              onSelect={() => select(state.text)}
              selected={state.selected ? "--selected" : ""}
              key={state.text}
              state={state.text}
              />
              ))}
          </StatesList>
          <section className="TODOS">
            <div className="search-items">
              <input className="todo-search" onChange={searchTodo} placeholder="Add details"/>
              <TodoButton action="add" onAction={() => addTodo(searchValue)}>Add</TodoButton>
            </div>
            <TodoList>
              {loading && <p>Cargando...</p>}
              {error && <p>Hubo un error</p>}
              {(!loading && !todos.length) && <p>Crea tu primer TODO!</p>}
              {searchedTodos.map(todo => (
                  <TodoItem
                  className={"todo-list__todo-item " + (todo.completed ? "completed" : "")}
                  key={todo.text}
                  text={todo.text}
                  completed = {todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                  />
              ))}
            </TodoList>
            {(stateSelectedIndex === 2 && completedTodos.length >= 1) && <TodoButton action="delete" onAction={deleteAllTodos}>Delete All</TodoButton>}
          </section>
        </main>
        <footer className="footer">
          <p className="footer__copyright">created by <span className="footer__copyright--username">ArielSurco</span> - devchallenges.io</p>
        </footer>
      </React.Fragment>
  );
}

export { AppUI };