import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";
import uniqid from "uniqid";

import * as UI from "../shared/ui";
import BottomNav from "../shared/BottomNav";

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
  const [username, setUsername] = useState<string>("");
  const [task, setTask] = useState<Task>("");
  const [taskList, setTaskList] = useState<TaskList>([]);

  useEffect(() => {
    const localStoredUser = localStorage.getItem("user");
    if (localStoredUser) setUsername(JSON.parse(localStoredUser).displayName);
  }, []);

  useEffect(() => {
    console.log(
      "Inside l'effet pour souscrire la todolist au topic changeusername"
    );
    const onUsernameChange = (topic: string, newUsername: string) => {
      console.log(
        `on utilise le param newUsername qui vient lui même de la souscription, newUsername=${username}`
      );
      setUsername(newUsername);
    };
    PubSub.subscribe("updatedUsername", onUsernameChange);
  }, []);

  const onTaskChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTask(event.currentTarget.value);
  };

  // !!!!!!!!!!!!!!!!! TODO !!!!!!!!!!!!!!!!!!!!
  // const addToDo_onEnter = (event: React.SyntheticEvent<HTMLInputElement>) => {
  // if (!task) return;
  // if (event.currentTarget.key === "Enter") {
  //   // if (task != undefined && task != null && task.trim() != "") {
  //   taskList.push({
  //     id: String(taskList.length + 1),
  //     label: task,
  //     done: false,
  //   });
  //   setTaskList(taskList);
  //   setTask("");
  //   // }
  // }
  // };

  const addToDo_onPlusClick = () => {
    if (!task) return;
    setTaskList([
      {
        id: uniqid(),
        label: task,
        done: false,
      },
      ...taskList,
    ]);
    setTask("");

    // if (task != undefined && task != null && task.trim() != "") {
    // taskList.push({
    //   id: uniqid(),
    //   label: task,
    //   done: false,
    // });
    // setTaskList(taskList);
    // setTask("");
    // }
  };

  /*
   * idem que de faire:
   * const toggleDone = (id:string) =>{ return fonction() { set...} }
   *
   */
  const toggleDone = (todo: Todo) => () => {
    setTaskList(
      taskList.map((t, index) => {
        if (t.id === todo.id)
          return {
            ...t,
            done: !t.done,
          };
        return t;
      })
    );
  };

  // const toggleDone = (event: React.SyntheticEvent<HTMLParagraphElement>) => {
  //   console.log(
  //     `onDoneClick() :\n TaskList Before: ${taskListToString(taskList)}`
  //   );
  //   setTaskList(
  //     taskList.map((todo, index) => {
  //       if (todo.label === event.currentTarget.textContent)
  //         return {
  //           id: todo.id,
  //           label: todo.label,
  //           done: !todo.done,
  //         };
  //       return todo;
  //     })
  //   );
  //   console.log(
  //     `onDoneClick() :\n TaskList After: ${taskListToString(taskList)}`
  //   );
  // };

  const deleteTodoFromTaskList =
    (todo: Todo) => (e: React.SyntheticEvent<HTMLElement>) => {
      e.stopPropagation();
      setTaskList(taskList.filter((t) => t.id !== todo.id));
    };

  // const deleteTodoFromTaskList = (event: React.SyntheticEvent<HTMLElement>) => {
  //   console.log(
  //     `onDeleteClick() :\n TaskList Before: ${taskListToString(taskList)}`
  //   );
  //   setTaskList(
  //     taskList.filter(
  //       (todo) =>
  //         todo.label !== event.currentTarget.previousSibling?.textContent
  //     )
  //   );
  //   console.log(
  //     `onDeleteClick() :\n TaskList After: ${taskListToString(taskList)}`
  //   );
  // };

  const deleteTaskList = (event: React.SyntheticEvent<HTMLElement>) => {
    setTaskList([]);
  };

  const shareTaskList = (event: React.SyntheticEvent<HTMLElement>) => {
    /**Mystère, mystère */
  };

  return (
    <UI.AppContainer>
      <UI.TopNav>
        <Link to="/">
          <UI.TopNavIcon className="fa-solid fa-circle-chevron-left"></UI.TopNavIcon>
        </Link>
        <UI.TopNavTitle>Petites Courses</UI.TopNavTitle>
      </UI.TopNav>

      <UI.CenteredFlexContainer>
        <UI.Tag>
          <UI.TagIcon className="fa-solid fa-user"></UI.TagIcon>
          <UI.TagLabelContainer>
            <UI.TagLabelEntitled>Par</UI.TagLabelEntitled>
            <UI.TagLabel>{username}</UI.TagLabel>
          </UI.TagLabelContainer>
        </UI.Tag>
      </UI.CenteredFlexContainer>

      <UI.StretchFlexContainer>
        <UI.InputContainer>
          <UI.Input
            placeholder="votre todo ..."
            onChange={onTaskChange}
            // onKeyUp={addToDo_onEnter}
          />
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
                <UI.TodoLabel onClick={toggleDone(todo)}>
                  {todo.label}
                </UI.TodoLabel>
                <UI.TodoIcon
                  className="fa-solid fa-trash"
                  onClick={deleteTodoFromTaskList(todo)}
                ></UI.TodoIcon>
              </UI.Todo>
            ))}
        ;
      </UI.TodoListContainer>

      <BottomNav topBar={BottomTopBar()} />
    </UI.AppContainer>
  );

  function BottomTopBar(): JSX.Element {
    return (
      <UI.BottomNavAction>
        <UI.BottomNavShare onClick={shareTaskList}>
          <i className="fa-solid fa-share"></i>
        </UI.BottomNavShare>
        <UI.BottomNavDelete onClick={deleteTaskList}>
          <i className="fa-solid fa-trash"></i>
        </UI.BottomNavDelete>
      </UI.BottomNavAction>
    );
  }
}
