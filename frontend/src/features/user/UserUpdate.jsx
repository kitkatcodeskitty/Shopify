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

  if (loading) return <h1 className="text-center text-lg font-semibold">Loading....</h1>;
  if (error) return <h1 className="text-red-500 text-center">{error.message}</h1>;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Profile Settings</h2>
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
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
              toast.success('User updated successfully');
            } catch (err) {
              toast.error(err.data.message);
            }
          }}

          validationSchema={userSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4">

              <Input
                onChange={handleChange}
                value={values.username}
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
                className="w-full"
              />
              {errors.username && touched.username && <p className="text-red-500 text-sm">{errors.username}</p>}

              <Input
                onChange={handleChange}
                value={values.email}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full"
              />
              {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <Input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFieldValue('imageReview', URL.createObjectURL(file));
                    setFieldValue('image', file);
                  }
                }}
                label="Profile Image"
                labelPlacement="outside"
                name="image"
                placeholder="Choose file"
                type="file"
                className="w-full"
              />
              {errors.image && touched.image && <p className="text-red-500 text-sm">{errors.image}</p>}

              <div className="mt-4 flex justify-center">
                {!errors.image && values.imageReview && (
                  <img 
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-gray-200 shadow-md" 
                    src={`${!values.image ? base + '/' + values.imageReview : values.imageReview}`} 
                    alt="Profile Preview" 
                  />
                )}
              </div>

              <div className="flex justify-center mt-6">
                <Button 
                  isLoading={isLoading} 
                  color="primary" 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
