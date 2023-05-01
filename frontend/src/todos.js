import React, { useState, useEffect } from "react";
import { Input, Button, List, DatePicker, Modal } from "antd";
import "./todos.css";
import axios from "axios";
import queryString from "query-string";
import moment from "moment";

const Todos = () => {
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskdeadLine, setTaskdeadLine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [editTaskTitle, setEditedTaskTitle] = useState("");
  const [editTaskDescription, setEditedTaskDescription] = useState("");
  const [editTaskdeadLine, setEditedTaskdeadLine] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const queryParams = queryString.parse(window.location.search);
      const user = queryParams.userId;
      console.log(user);
      try {
        const response = await axios.get(
          `http://localhost:3001/tasks/user/${user}`
        );
        console.log(response);
        console.log(response.data);
        if (response.data) {
          const formattedTasks = response.data.map((task) => {
            return {
              ...task,
              deadLine: moment(task.deadLine).format("DD-MM-YYYY"),
            };
          });
          setTasks(formattedTasks);
          console.log(formattedTasks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/delete/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const formattedDeadLine = moment(
        updatedTask.deadLine,
        "DD/MM/YYYY"
      ).format(); // formata a data como ISO8601

      const response = await axios.put(
        `http://localhost:3001/tasks/update/${id}`,
        { ...updatedTask, deadLine: formattedDeadLine }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update task");
    }
  };

  // função para criar nova tarefa
  const createTask = () => {
    const queryParams = queryString.parse(window.location.search);
    const userId = queryParams.userId;
    const formatteddeadLine = moment(taskdeadLine, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    axios
      .post("http://localhost:3001/create/task", {
        title: taskTitle,
        description: taskDescription,
        deadLine: formatteddeadLine,
        user: userId, // adiciona o ID do cliente
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskTitle("");
        setTaskDescription("");
        setTaskdeadLine(null);
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showEditModal = (task) => {
    setSelectedTask(task);
    setEditedTaskTitle(task.title);
    setEditedTaskDescription(task.description);
    setEditedTaskdeadLine(task.deadLine);
    setEditModalVisible(true);
  };

  // função para fechar o modal de edição
  const hideEditModal = () => {
    setEditedTask({});
    setEditedTaskTitle("");
    setEditedTaskDescription("");
    setEditedTaskdeadLine(null);
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
          createTask();
        }}
        onCancel={() => {
          setTaskTitle("");
          setTaskDescription("");
          setTaskdeadLine(null);
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
          onChange={(date, dateString) => {
            if (dateString) setTaskdeadLine(dateString);
          }}
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
                  deleteTask(task._id);
                }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={`${task.description} - ${String(task.deadLine)}`}
            />
            <Modal
              title="Edit Task"
              visible={editModalVisible}
              onOk={() => {
                const updatedTask = {
                  title: editTaskTitle,
                  description: editTaskDescription,
                  deadLine: editTaskdeadLine,
                };

                updateTask(selectedTask._id, updatedTask)
                  .then(() => {
                    const updatedTasks = tasks.map((task) =>
                      task._id === selectedTask._id
                        ? { ...task, ...updatedTask }
                        : task
                    );
                    setTasks(updatedTasks);
                    hideEditModal();
                  })
                  .catch((error) => {
                    console.error(error);
                    // Exibir uma mensagem de erro ao usuário
                  });
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
                  setEditedTaskdeadLine(dateString)
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
