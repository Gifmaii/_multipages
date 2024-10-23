import { useEffect, useRef } from "react";
import { useState } from "react";

import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import { fetchTodos } from "../../Data/Todos";

import "./Todo.css";
function Todo() {
  // todosRaw -> filter -> todos
  const [todosRaw, setTodosRaw] = useState([]);

  // filter
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // todo
  const [todos, setTodos] = useState([]);
  // display
  const [numPage, setNumPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    // setCurPage((prev) => (prev > numPage ? numPage : prev))
    setCurPage(1);
  }, [numPage]);

  useEffect(() => {}, [curPage]);

  useEffect(() => {
    console.log(itemsPerPage);
    setNumPage(Math.ceil(todosRaw.length / itemsPerPage));
  }, [itemsPerPage, todosRaw]);

  useEffect(() => {
    console.log(onlyWaiting);
  }, [onlyWaiting]);

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  useEffect(() => {
    // console.log(todosRaw);
    if (onlyWaiting) {
      // มาสามรถใส่ !todo.completed ได้เหมือนกัน
      setTodos(
        todosRaw.filter((todo) => {
          return todo.completed === false;
        })
      );
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting, itemsPerPage]); //

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id);

    todoSelected.completed = true;
    // setTodosRaw(todosRaw)// state does not change

    setTodosRaw([...todosRaw]);
  }
  function addClick(id, title) {
    //
    const newitems = {
      id,
      title,
      completed: false,
      userId: 1,
    };
    // setTodosRaw(todosRaw.push(newitems)) // dose work

    setTodosRaw([...todosRaw, newitems]); // work
  }
  // modal

  const [show, setShow] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg">&nbsp; Add Todo</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={
                  Number(
                    todosRaw.reduce((prev, todo) => {
                      return todo.id > prev ? todo.id : prev;
                    }, 0)
                  ) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp;Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title cannot be empty");
                newIdRef.current.value = "";
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <span className="bi bi-plus-lg">&nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todos-filters-container">
        <div class="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <button className="btn btn-warning">
              waiting &nbsp;
              <span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5} selected>
            5 items per page
          </option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>
      {/* todolist */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "10%" }} valing="middle">ID</th>
            <th valing="middle">Title</th>
            <th style={{ textAlign: "right" }} valing="middle">
              Completed&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // itemsPerPage = 5
            // curPage = 1, 2
            // items (human) = [1...    5], [6...    10]
            // items (js)    = [0....   4], [5....  9]
            // items (js)    = [min...max]
            // min = (curPage - 1) * itemsPerPage
            // max = min * itemsPerPage -1
            todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = min + itemsPerPage - 1;
                return index >= min && index <= max;
              })
              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td>
                      <span
                        className="badge bg-secondary"
                        style={{ width: "3rem" }}
                      >
                        {todo.id}
                      </span>
                    </td>
                    <td style={{ textAlign: "left" }}>{todo.title}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className={
                          "badge " +
                          (todo.completed ? "bg-success" : "bg-warning")
                        }
                        onClick={() => waitingClick(todo.id)}
                      >
                        {todo.completed ? "done" : "waiting"}
                        &nbsp;
                        <span
                          className={
                            "bi " + (todo.completed ? "bi-check" : "bi-clock")
                          }
                        ></span>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClick(todo.id)}
                      >
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
      {/* pagecontrol */}
      <div>
        <button
          className="btn 
          btn-outline-primary  
          todo-space"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </button>
        <button
          className="btn 
          btn-outline-primary 
          todo-space"
          onClick={() => (curPage > 1 ? setCurPage(curPage - 1) : null)}
          disabled={curPage === 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPage}{" "}
        </span>
        <button
          className="btn 
          btn-outline-primary 
          todo-space"
          onClick={() => (curPage < numPage ? setCurPage(curPage + 1) : null)}
          disabled={curPage === numPage}
        >
          Next
        </button>
        <button
          className="btn 
          btn-outline-primary 
          todo-space"
          onClick={() => setCurPage(numPage)}
          disabled={curPage === numPage}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
