import { Formik } from "formik";
import { Form, Input, Button } from "@heroui/react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { base } from "../../app/mainApi";
import { useGetUserQuery, useUpdateUserMutation } from "../auth/authApi";


const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

const userSchema = Yup.object({
  email: Yup.string().email().required(),
  username: Yup.string().min(5).required(),
  image: Yup.mixed().test('fileType', 'Unsupported file type', (val) => {
    if (!val) return true;
    return supportedTypes.includes(val.type);
  })
});


export default function UserUpdate({ user }) {
  const { isLoading: loading, data, error } = useGetUserQuery(user.token);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1 className="text-red-500">{error.message}</h1>;

  return (
    <div className="p-5">

      <Formik
        initialValues={{
          username: data.username,
          email: data.email,
          image: '',
          imageReview: data.image
        }}

        onSubmit={async (val) => {

          const formData = new FormData();

          formData.append('username', val.username);
          formData.append('email', val.email);
          if (val.image) {
            formData.append('image', val.image);
          }

          try {
            await updateUser({
              data: formData,
              token: user.token
            }).unwrap();
            toast.success('User  updatedd successfully');

          } catch (err) {
            toast.error(err.data.message);

          }
        }}

        validationSchema={userSchema}

      >

        {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full  flex flex-col gap-4">

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

            <h1>{errors.image}</h1>

            {errors.image && touched.image && <p className="text-red-500">{errors.image}</p>}
            <div className="mt-4">
              {!errors.image && values.imageReview && (
                <img className="w-[200px] h-[200px] object-cover rounded-full" src={`${!values.image ? base + '/' + values.imageReview : values.imageReview}`} alt="" />
              )}

            </div>



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
