import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo.js";
import firebase, { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the databse and fetch new todos
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        )
      );
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); // clear up the input after enter
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((item) => (
          <Todo item={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
