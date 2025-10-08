import { Formik } from "formik";
import { Form, Input, Button } from "@heroui/react";
import * as Yup from "yup";
import { useRegisterMutation } from "./authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
  image: Yup.mixed().required().test('fileType', 'Unsupported file type', (val) => {
    return val && supportedTypes.includes(val.type);
  })
});


export default function Register() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();
  return (
    <div className="p-5">

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          image: '',
          imageReview: ''
        }}

        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('username', val.username);
          formData.append('email', val.email);
          formData.append('password', val.password);
          formData.append('image', val.image);
          try {
            await registerUser(formData).unwrap();
            toast.success('User registered successfully');
            nav(-1);
          } catch (err) {
            toast.error(err.data.message);

          }
        }}

        validationSchema={loginSchema}

      >

        {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full max-w-xs flex flex-col gap-4">

            <Input
              onChange={handleChange}
              value={values.username}
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
            />

            {errors.username && touched.username && <p className="text-red-500">{errors.username}</p>}

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

            <Input
              onChange={(e) => {
                const file = e.target.files[0];

                setFieldValue('imageReview', URL.createObjectURL(file));
                setFieldValue('image', file);
              }}

              label="Image"
              labelPlacement="outside"
              name="image"
              placeholder="Enter your password"
              type="file"
            />
            {!errors.image && values.imageReview && <img src={values.imageReview} alt="" />}
            {errors.image && touched.image && <p className="text-red-500">{errors.image}</p>}



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
