import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import Select from 'react-select';
import firebase from 'firebase';

import { db } from '../firebase';

const statusOptions = [
    { value:'Todo', label:'Todo' },
    { value:'Doing', label:'Doing' },
    { value:'Done', label:'Done' },
  ];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  close: {
      position: 'absolute',
      left: '1rem',
  }
}));

export default function TaskModal({ name, task, id, status, userList }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [currentStatus, setStatus] = useState({ value:status, label:status });
  const [currentTask, setTask] = useState(task);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const addTask = (e) => {
    e.preventDefault();
    db.collection('task-man').add({
      task: currentTask,
      status: currentStatus.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    handleClose();
  }

  const editTask = (e) => {
    e.preventDefault();  
      db.collection('task-man').doc(id).set({
        task: currentTask,
        status: currentStatus.value,
    }, {merge: true});
    handleClose();
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Task Details</h2>
      <div className='task-add'>
      <TextField 
        placeholder="Add Task.."
        value={currentTask}
        onChange={(e) => setTask(e.target.value)}
      />
      <hr />
      <Select
        className='react-select'
        isSearchable={true}
        isMulti={false}
        options={statusOptions}
        value={currentStatus}
        onChange={(option, _action) => {
        setStatus(option); 
        }}
      />
      <br />
    </div>
      <Button
        variant="contained"
        color="primary"
        onClick={(name === "Add Task") ? addTask : editTask}>
          Add
      </Button>
      <Button
        style={{ margin: '10px' }} 
        onClick={handleClose}
        variant="contained"
        color="secondary">
          Close Modal
      </Button>
    </div>
  );

  return (
    <div>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleOpen}>
        {name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

