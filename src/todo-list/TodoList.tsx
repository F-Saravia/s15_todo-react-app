import React, { useState } from "react";
import * as UI from "../shared/ui";

/**
 * Ce fichier contient le composant de l'écran
 * de la liste des todos
 *
 * Exercices:
 *
 * 1. Afficher le contenu de l'état (state) « taskList »
 *    dans le JSX du composant en utilisant la méthode « map »
 *    dans les enfant du composant « UI.TodoListContainer »
 *
 *     ° Bonus : Afficher « Il n'y pas encore de taches » si la liste est vide
 *
 * 2. Lors du clique (onClick) sur le bouton + (« UI.InputIcon »),
 *    lancer une fonction "addTaskToList" qui :
 *    1. Ajoute l'état « task » à l'intérieur de notre tableaux « taskList »
 *    2. Vider l'état « task » (le rendre égale à une chaine de caractère vide)
 *
 */
export type Todo = {
  id: string;
  label: string;
  done: boolean;
};

export type Task = string;
export type TaskList = Array<Todo>;
function taskListToString(taskList: Array<Todo>): string {
  let retour = "";
  taskList.forEach(
    (todo) =>
      (retour += `\n\tId: ${todo.id} | Label: ${todo.label} | Done: ${todo.done}\n`)
  );
  return retour;
}

export default function TodoList() {
  const [task, setTask] = useState<Task>("");
  const [taskList, setTaskList] = useState<TaskList>([]);

  const onTaskChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTask(event.currentTarget.value);
  };

  const addToDo_onPlusClick = () => {
    if (!task) return;

    // if (task != undefined && task != null && task.trim() != "") {
    taskList.push({
      id: String(taskList.length + 1),
      label: task,
      done: false,
    });
    setTaskList(taskList);
    setTask("");
    // }
  };

  const addToDo_onEnter = () => {};

  const toggleDone = (event: React.SyntheticEvent<HTMLParagraphElement>) => {
    console.log(
      `onDoneClick() :\n TaskList Before: ${taskListToString(taskList)}`
    );
    setTaskList(
      taskList.map((todo, index) => {
        if (todo.label === event.currentTarget.textContent)
          return {
            id: todo.id,
            label: todo.label,
            done: !todo.done,
          };
        return todo;
      })
    );
    console.log(
      `onDoneClick() :\n TaskList After: ${taskListToString(taskList)}`
    );
  };

  const deleteTodoFromTaskList = (event: React.SyntheticEvent<HTMLElement>) => {
    console.log(
      `onDeleteClick() :\n TaskList Before: ${taskListToString(taskList)}`
    );
    setTaskList(
      taskList.filter(
        (todo) =>
          todo.label !== event.currentTarget.previousSibling?.textContent
      )
    );
    console.log(
      `onDeleteClick() :\n TaskList After: ${taskListToString(taskList)}`
    );
  };

  return (
    <UI.AppContainer>
      <UI.TopNav>
        <UI.TopNavIcon className="fa-solid fa-circle-chevron-left"></UI.TopNavIcon>
        <UI.TopNavTitle>Petites Courses</UI.TopNavTitle>
      </UI.TopNav>

      <UI.CenteredFlexContainer>
        <UI.Tag>
          <UI.TagIcon className="fa-solid fa-user"></UI.TagIcon>
          <UI.TagLabelContainer>
            <UI.TagLabelEntitled>Par</UI.TagLabelEntitled>
            <UI.TagLabel>John</UI.TagLabel>
          </UI.TagLabelContainer>
        </UI.Tag>
      </UI.CenteredFlexContainer>

      <UI.StretchFlexContainer>
        <UI.InputContainer>
          <UI.Input placeholder="votre todo ..." onChange={onTaskChange} />
          <UI.InputIcon
            className="fa-solid fa-circle-plus"
            onClick={addToDo_onPlusClick}
          />
        </UI.InputContainer>
      </UI.StretchFlexContainer>

      <UI.TodoListContainer>
        {taskList.length === 0
          ? ""
          : taskList.map((todo) => (
              <UI.Todo key={`${todo.id}`} done={todo.done}>
                <UI.TodoLabel onClick={toggleDone}>{todo.label}</UI.TodoLabel>
                <UI.TodoIcon
                  className="fa-solid fa-trash"
                  onClick={deleteTodoFromTaskList}
                ></UI.TodoIcon>
              </UI.Todo>
            ))}
        ;
      </UI.TodoListContainer>

      <UI.BottomNav>
        <UI.BottomNavAction>
          <UI.BottomNavShare>
            <i className="fa-solid fa-share"></i>
          </UI.BottomNavShare>
          <UI.BottomNavDelete>
            <i className="fa-solid fa-trash"></i>
          </UI.BottomNavDelete>
        </UI.BottomNavAction>

        <UI.BottomNavMenu>
          <UI.BottomNavItem className="fa-solid fa-bars"></UI.BottomNavItem>
          <UI.BottomNavItem className="fa-solid fa-user"></UI.BottomNavItem>
        </UI.BottomNavMenu>
      </UI.BottomNav>
    </UI.AppContainer>
  );
}
