import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { db } from '../firebase';

import TaskModal from './TaskModal';
import Tasks from './Tasks';

export default function TaskList() {
  let history = useHistory();
  const { logout } = useAuth();

  const [taskList, setTaskList] = useState();
  const [userList, setUserList] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  };

  const getTasks = () => {
    db.collection('task-man').orderBy('createdAt', "desc").onSnapshot((snapshot) => {
      setTaskList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
          status: doc.data().status,
        }))
      );
    })
  }

  const getUsers = () => {
    db.collection('users').onSnapshot((snapshot) => {
      setUserList(
        snapshot.docs.map((doc) => ({
          value: doc.data().name,
          label: doc.data().name,
        }))
      );
    });
  }

  const handleLogout = async () =>  {
      await logout()
      .then(() => {
          history.push('/login');
      })
      .catch(() => null)
  }

  return (
  <div>
    <Button 
      variant="contained"
      color="secondary"
      onClick={handleLogout}>
        Logout
    </Button>
    <br />
    <h1>Task List</h1>
    <TaskModal name={"Add Task"}/>
    <br />
    <div className='task-list'>
      {
        taskList && taskList.length > 0 &&
        taskList.map((task) => {
          return (
            <div key={task.id}>
              <Tasks 
                {...task}
                userList={userList}
              />
            </div>
          )
        })
      }
    </div>
  </div>
  )
}
