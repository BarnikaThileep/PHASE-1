import React from "react";
import { Formik, Form, Field } from "formik";

const MultiFieldForm = () => {
  return (
    <div>
      <style>
        {`
          form {
            display: flex;
            flex-direction: column;
            width: 300px;
            margin: 550px;
            margin-top:20px;
            margin-bottom:20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
          }

          label {
            margin-top: 10px;
            font-weight: bold;
          }

          input {
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          button {
            margin-top: 15px;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }

          button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <Formik
        initialValues={{ name: "", email: "", age: "", phone: "" }}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Name:</label>
            <Field type="text" name="name" placeholder="Enter your name" />
            
            <label>Email:</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            
            <label>Age:</label>
            <Field type="number" name="age" placeholder="Enter your age" />
            
            <label>Phone:</label>
            <Field type="tel" name="phone" placeholder="Enter your phone number" />
            
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiFieldForm;
