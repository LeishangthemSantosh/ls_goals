import { Row, Col, Form, Input, Button, message, Flex } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import "../../styles/login.css";
import loginImg from "../../assets/signin.png";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success("Successfully logged in");
      navigate("/");
    } catch (err) {
      message.error(err || "Login failed");
    }
  };

  return (
    <div className="sign-in">
      <Row
        gutter={[24, 24]}
        justify="space-around"
        align="middle"
        style={{ height: "100vh" }}
      >
        <Col
          xs={24}
          md={12}
          lg={12}
          xl={{ span: 6, offset: 2 }}
          className="col-form"
          style={{ paddingTop: "100px" }}
        >
          <h1 className="mb-15">Sign In</h1>
          <h5 className="font-regular text-muted">
            Enter your email and password to sign in
          </h5>

          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please provide a valid email" },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 digits" },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>

          <p className="font-semibold text-muted">
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-bold text-dark">
              Sign Up
            </Link>
          </p>
        </Col>

        <Col xs={24} md={12} lg={12} xl={12} className="col-img">
          <img src={loginImg} alt="Sign In" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
