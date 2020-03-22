import debounce from "lodash/debounce";
import React from "react";
import { withFormik } from "formik";
import DisplayFormikState from "../../components/DisplayFormState";
import { resetMessage, setMessage } from "../../actions/message";
import store from "../../store";
import * as Yup from "yup";
import DisplayMessage from "../DisplayMessage";

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button
} from "@material-ui/core";
import "./styles.css";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password")
  }),
  mapPropsToValues: props => ({
    email: "",
    password: ""
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };

    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const handleFormReset = handleReset => {
  store.dispatch(resetMessage());
  handleReset();
};

const validateField = debounce(
  ({ errors, value }) =>
    !errors && value
      ? store.dispatch(setMessage())
      : store.dispatch(resetMessage()),
  500
);

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <>
      <DisplayMessage />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Card className="card">
            <CardContent>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                margin="dense"
                variant="outlined"
                fullWidth
                validateField={validateField}
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                margin="dense"
                variant="outlined"
                fullWidth
                validateField={validateField}
              />
            </CardContent>
            <CardActions className="actions">
              <Button type="submit" color="primary" disabled={isSubmitting}>
                SUBMIT
              </Button>
              <Button
                color="secondary"
                onClick={() => handleFormReset(handleReset)}
                disabled={!dirty || isSubmitting}
              >
                CLEAR
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>

      <hr />
      <DisplayFormikState {...props} />
    </>
  );
};

export default formikEnhancer(MyForm);
