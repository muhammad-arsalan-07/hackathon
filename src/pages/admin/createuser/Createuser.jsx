import React, { useEffect } from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";

import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import Navbar from "../../../components/adminnavbar/AdminNavbar";

const Createuser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("currentuser")
    if(user) {
  
    } else {
      navigate('/login')
    }
  })
  const useruid = localStorage.getItem("currentuser");
  const id = doc(collection(db, "admins"))._key.path.segments[1];
  console.log(useruid);
  const onFinish = (values) => {
    const { rollNo, email } = values;

    setDoc(doc(db, "Student rollNo", id), {
      rollNo,
      email
    });
    message.success("Student Successfully Created")
    navigate("/usersadmin");
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <Form name="normal_signup" className="signup-form" onFinish={onFinish}>
          <h1 className="heading-signup" id="sign-heading-signup">
            {" "}
            Create Student Roll NO{" "}
          </h1>

          <Form.Item
            name="student name"
            rules={[
              {
                required: true,
                message: "Please input your student name",
              },
            ]}
          >
            <Input
              className="input-signup input-here"
              placeholder="Student Name"
            />
          </Form.Item>
          <Form.Item name="email"
               rules={[
                   {
                       type: 'email',
                       message: 'The input is not valid E-mail!',
                   },
                   {
                       required: true,
                       message: 'Please input your E-mail!',
                   },
               ]}
           >
               <Input className='input-here'  placeholder="Email" />
           </Form.Item>
          <Form.Item
            name="rollNo"
            rules={[
              {
                required: true,
                message: "Please input your roll No",
              },
            ]}
          >
            <Input
            type="number"
              className="input-signup input-here"
              placeholder="Enter Roll"
            />
          </Form.Item>
         
         

          <Form.Item>
            <Button type="danger" htmlType="submit">
              Create Roll No
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Createuser;
