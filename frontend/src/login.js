import React from "react";
import { Form, Input, Button } from "antd";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: values.username,
        password: values.password,
      });
      // Autenticação bem sucedida, redireciona para a página principal
      console.log(response.data);
      history("/todos");
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const history = useNavigate();
  const handleCadastroClick = () => {
    history("/cadastro"); // redirecionando para a página de cadastro
  };
  return (
    <div className="login-form-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: "400px", margin: "0 auto" }}
        {...layout}
      >
        <Form.Item
          label="Usuário"
          name="username"
          rules={[
            { required: true, message: "Nome do usuário é obrigatório!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Digite sua senha" }]}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ height: "40px", width: "100px" }}
            >
              Entrar
            </Button>
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="default"
              style={{
                height: "40px",
                width: "100px",
                textAlign: "center",
                color: "white",
                backgroundColor: "black",
              }}
              onClick={handleCadastroClick} // adicionando o onClick para redirecionar
            >
              Cadastrar
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
