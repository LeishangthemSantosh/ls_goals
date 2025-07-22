import { useState } from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/register.css";
import signupBg from "../../assets/bg-signup.jpg";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_API_BASE_URL + "auth/register";

      const res = await axios.post(url, {
        name: values.name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });

      if (res.data.status === 200) {
        message.success("User registration successful");
        navigate("/login");
      } else {
        message.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Failed to register");
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  return (
    <div className="sign-up">
      {/* Header with background image */}
      <div
        className="sign-up-header"
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className="content">
          <h1 className="mb-1">Sign Up</h1>
          <h5 className="mt-0 font-regular">
            Enter your email and password to sign in
          </h5>
        </div>
      </div>

      {/* Floating Card Form */}
      <div className="card-container">
        <Card bordered={false} className="card-signup">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name cannot be empty" }]}
            >
              <Input size="large" placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please provide a valid email" },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("You must accept the terms")),
                },
              ]}
            >
              <Checkbox>
                I agree to the{" "}
                <a href="#" className="font-bold text-dark">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>

          <p className="font-semibold text-muted text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-bold text-dark">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
