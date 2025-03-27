import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Only alphabets are allowed")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be a number")
    .required("Age is required"),
});

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Validated Form</h1>
      <Formik
        initialValues={{ name: "", email: "", age: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ handleSubmit, values }) => {
          // Log values if they contain different characters
          if (values.name && !/^[A-Za-z ]*$/.test(values.name)) {
            console.log("Invalid Characters in Name:", values.name);
          }

          return (
            <Form onSubmit={handleSubmit} style={styles.form}>
              {/* Name Field */}
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name:</label>
                <Field type="text" id="name" name="name" style={styles.input} />
                <ErrorMessage name="name" component="div" style={styles.error} />
              </div>

              {/* Email Field */}
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email:</label>
                <Field type="email" id="email" name="email" style={styles.input} />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>

              {/* Age Field */}
              <div style={styles.formGroup}>
                <label htmlFor="age" style={styles.label}>Age:</label>
                <Field type="number" id="age" name="age" style={styles.input} />
                <ErrorMessage name="age" component="div" style={styles.error} />
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.button}>Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  fullPage: {
    height: "100vh",
    width: "100vw",
    backgroundColor:"yellow",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "400px",
    margin: "500px",
    padding: "100px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
