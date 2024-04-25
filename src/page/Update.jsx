import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import path from "../utils/path";
import { apiCreateUser, apiGetDetailUser } from "../apis/user";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const navigate = useNavigate();
  const params = useParams();
  const uid = Object.values(params);
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState(null);
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [form] = Form.useForm();
  useEffect(() => {
    fetchApiGetDetailUser();
  }, [reset]);
  const fetchApiGetDetailUser = async () => {
    const response = await apiGetDetailUser(uid);
    if (response.success) {
      setUser(response.data[0]);
    }
  };
  console.log(user);
  const handleCreateUser = async (values) => {
    const date = new Date(values.date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const birth = day + "-" + (month + 1) + "-" + year;
    birth.toString();
    values.birth = birth;
    delete values.date;
    console.log(values);
    const response = await apiCreateUser(values);
    if (response.success) {
      toast.success("Create user is successfully!");
      form.resetFields();
    }
  };
  return (
    <div className="">
      <ToastContainer />
      <Form
        form={form}
        onFinish={handleCreateUser}
        className="m-auto mt-7"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 30,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size={"default"}
        style={{
          maxWidth: 500,
        }}
      >
        <Form.Item
          name="type"
          label="Type"
          labelAlign="left"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select defaultValue={user?.TYPE}>
            <Select.Option value="ca nhan">Cá nhân</Select.Option>
            <Select.Option value="to chuc">Tổ chức</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"name"}
          label="Name"
          labelAlign="left"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input defaultValue={user?.NAME} />
        </Form.Item>
        <Form.Item
          name={"date"}
          label="birth"
          labelAlign="left"
          rules={[{ required: true, message: "Please enter your birth!" }]}
        >
          <DatePicker
            defaultValue={user?.BIRTH}
            format={dateFormatList}
            placeholder="dd-mm-yyyy"
          />
        </Form.Item>
        <Form.Item
          name={"identifier"}
          label="Identifier"
          labelAlign="left"
          rules={[{ required: true, message: "Please enter your identifier!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Address"
          labelAlign="left"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          labelAlign="left"
          rules={[
            { required: true, message: "Please enter your email!" },
            {
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email invalid",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"phone"}
          label="Phone"
          labelAlign="left"
          rules={[
            { required: true, message: "Please enter your phone!" },
            {
              pattern: /^\d+$/,
              message: "Phone invalid",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center gap-3">
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button onClick={() => navigate(path.HOME)}>CANCLE</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Update;
