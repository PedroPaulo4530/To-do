import React, { useState } from "react";
import { Input, Button, List, DatePicker, Modal } from "antd";
import "./todos.css";

const Todos = () => {
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [editTaskTitle, setEditedTaskTitle] = useState("");
  const [editTaskDescription, setEditedTaskDescription] = useState("");
  const [editTaskDeadline, setEditedTaskDeadline] = useState(null);

  const showEditModal = (task) => {
    setSelectedTask(task);
    setEditedTaskTitle(task.title);
    setEditedTaskDescription(task.description);
    setEditedTaskDeadline(task.deadline);
    setEditModalVisible(true);
  };

  // função para fechar o modal de edição
  const hideEditModal = () => {
    setEditedTask({});
    setEditedTaskTitle("");
    setEditedTaskDescription("");
    setEditedTaskDeadline(null);
    setEditModalVisible(false);
  };

  return (
    <div className="container">
      <Input.Search
        placeholder="Search tasks"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <br />
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onOk={() => {
          setTasks([
            ...tasks,
            {
              title: taskTitle,
              description: taskDescription,
              deadline: taskDeadline,
            },
          ]);
          setTaskTitle("");
          setTaskDescription("");
          setTaskDeadline(null);
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setTaskTitle("");
          setTaskDescription("");
          setTaskDeadline(null);
          setIsModalVisible(false);
        }}
      >
        <Input
          placeholder="Task Title"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />
        <br />
        <br />
        <Input.TextArea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
        />
        <br />
        <br />
        <DatePicker
          format="DD-MM-YYYY"
          onChange={(date, dateString) => setTaskDeadline(dateString)}
        />
      </Modal>
      <br />
      <br />
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Task
      </Button>
      <br />
      <br />
      <List
        dataSource={tasks.filter((task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        renderItem={(task, index) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => {
                  showEditModal(task);
                }}
              >
                Edit
              </Button>,
              <Button
                type="danger"
                onClick={() => {
                  setTasks([
                    ...tasks.slice(0, index),
                    ...tasks.slice(index + 1),
                  ]);
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={`${task.description} - ${task.deadline}`}
            />
            <Modal
              title="Edit Task"
              visible={editModalVisible}
              onOk={() => {
                const updatedTasks = tasks.map((task) =>
                  task === selectedTask
                    ? {
                        ...task,
                        title: editTaskTitle,
                        description: editTaskDescription,
                        deadline: editTaskDeadline,
                      }
                    : task
                );
                setTasks(updatedTasks);
                hideEditModal();
              }}
              onCancel={() => {
                hideEditModal();
              }}
            >
              <Input
                placeholder="Task Title"
                value={editTaskTitle}
                onChange={(event) => setEditedTaskTitle(event.target.value)}
              />
              <br />
              <br />
              <Input.TextArea
                placeholder="Task Description"
                value={editTaskDescription}
                onChange={(event) =>
                  setEditedTaskDescription(event.target.value)
                }
              />
              <br />
              <br />
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(date, dateString) =>
                  setEditedTaskDeadline(dateString)
                }
              />
            </Modal>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todos;
