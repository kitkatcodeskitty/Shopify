import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateProductMutation } from "../products/productApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";



const valSchema = Yup.object({
  title: Yup.string().min(5).required(),
  description: Yup.string().min(5).required(),
  price: Yup.number().required(),
  stock: Yup.number().required(),
  category: Yup.string().required(),
  brand: Yup.string().required(),
  image: Yup.mixed().required().test('fileType', 'Unsupported file type', (val) => {
    return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(val.type);
  }),
});




export const brands = [
  { key: "apple", label: "apple" },
  { key: "samsung", label: "samsung" },
  { key: "sony", label: "sony" },
  { key: "dolce", label: "dolce" },
  { key: "gucci", label: "gucci" },
  { key: "nike", label: "nike" },
  { key: "amazon", label: "amazon" },
  { key: "other", label: "other" },

];

export const categories = [
  { key: "electronics", label: "electronics" },
  { key: "fashion", label: "fashion" },
  { key: "jewelery", label: "jewelery" },
  { key: "books", label: "books" },

];


export default function AddForm() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  return (
    <div className="p-5">
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          brand: '',
          image: '',
          imageReview: ''
        }}

        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('description', val.description);
          formData.append('price', val.price);
          formData.append('stock', val.stock);
          formData.append('category', val.category);
          formData.append('brand', val.brand);
          formData.append('image', val.image);

          try {
            await createProduct({
              data: formData,
              token: user.token
            }).unwrap();
            toast.success('Product added successfully');
            nav(-1);

          } catch (err) {
            toast.error(err.data.message);
          }

        }}

        validationSchema={valSchema}

      >
        {({ handleChange, handleSubmit, errors, values, setFieldValue, touched }) => (
          <form onSubmit={handleSubmit} action="" className="max-w-[400px] space-y-6">

            <div>
              <Input
                onChange={handleChange}
                value={values.title}
                name="title"
                label="Title" placeholder="Enter your title" type="title" />
              {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div>
              <Textarea
                onChange={handleChange}
                value={values.description}
                name="description"
                label="Description" placeholder="Enter your description" />
              {touched.description && errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            <div>
              <Input
                onChange={handleChange}
                value={values.price}
                name="price"
                label="Price" placeholder="Enter price" type="number" />
              {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            <div>
              <Input
                onChange={handleChange}
                value={values.stock}
                name="stock"
                label="Stock" placeholder="Enter stock" type="number" />
              {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>}
            </div>

            <div>
              <Select
                onChange={handleChange}
                value={values.category}
                name="category"

                label="Select Category">
                {categories.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>


            <div>
              <Select

                onChange={handleChange}
                value={values.brand}
                name="brand"
                label="Select Brand">
                {brands.map((brand) => (
                  <SelectItem key={brand.key}>{brand.label}</SelectItem>
                ))}
              </Select>
              {touched.brand && errors.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>

            <div>
              <Input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imageReview', URL.createObjectURL(file));
                  setFieldValue('image', file);
                }}
                name="image"
                label="Image" placeholder="Select an Image" type="file" />
              {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
              <div className="mt-4">
                {!errors.image && values.imageReview && (
                  <img src={values.imageReview} alt="" />
                )}

              </div>


            </div>

            <Button isLoading={isLoading} type="submit">Submit</Button>

          </form>
        )}
      </Formik>

    </div>
  )
}
