import { Formik } from "formik";
import { Form, Input, Button } from "@heroui/react";
import * as Yup from "yup";
import { useLoginMutation } from "./authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice";

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
});


export default function Login() {
  const [loginUser, { isLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="p-5">

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}

        onSubmit={async (val) => {
          try {
            const response = await loginUser(val).unwrap();
            dispatch(setUser(response));
            toast.success('User logged in successfully');
            nav(-1);

          } catch (err) {
            toast.error(err.data.message);

          }
        }}

        validationSchema={loginSchema}

      >

        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full max-w-xs flex flex-col gap-4">
            <Input
              onChange={handleChange}
              value={values.email}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />

            {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}

            <Input
              onChange={handleChange}
              value={values.password}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}



            <div className="flex gap-2">
              <Button isLoading={isLoading} color="primary" type="submit">
                Submit
              </Button>

            </div>

          </Form>
        )}


      </Formik>

    </div>
  )
}
