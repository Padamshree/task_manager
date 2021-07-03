import React, { useState } from 'react';
import { db } from '../firebase';
import { TextField, Button } from '@material-ui/core';
import Select from 'react-select';
import TaskModal from './TaskModal';

const Tasks = ({ task, id, status, userList }) => {
    const taskProps = {
        task,
        id,
        status,
        userList
    }

    return (
        <div className="task-container">
            <div>
                <p><strong>{task}</strong></p>
                <p>Status: {status}</p>
                <TaskModal name={"Edit Details"} {...taskProps} />
            </div>
        </div>
    );
}

export default Tasks;