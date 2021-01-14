import {
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState } from "react";
import "./Todo.css";
import { db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing[(2, 4, 3)],
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.item.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(event) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Edit:</h1>
          <Input
            placeholder={props.item.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Edit</Button>
        </div>
      </Modal>
      <List className="todo-list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.item.todo} secondary="Dealine: " />
        </ListItem>
        <EditIcon onClick={(e) => setOpen(true)} />
        <DeleteForeverIcon
          onClick={(event) => {
            db.collection("todos").doc(props.item.id).delete();
          }}
        />
      </List>
    </>
  );
}

export default Todo;
