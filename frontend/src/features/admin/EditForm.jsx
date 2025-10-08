import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { brands, categories } from "./AddForm";
import { useGetProductQuery, useUpdateProductMutation } from "../products/productApi";
import { base } from "../../app/mainApi";



const valSchema = Yup.object({
  title: Yup.string().min(5).required(),
  description: Yup.string().min(5).max(200).required(),
  price: Yup.number().required(),
  stock: Yup.number().required(),
  category: Yup.string().required(),
  brand: Yup.string().required(),
  image: Yup.mixed().test('fileType', 'Unsupported file type', (val) => {
    if (!val) return true;
    return ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(val.type);
  }),
});





export default function EditForm() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  const { isLoading, data, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1 className="text-red-500">{error.message}</h1>


  return (
    <div className="p-5">
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          brand: data.brand,
          image: '',
          imageReview: data.image
        }}

        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('description', val.description);
          formData.append('price', val.price);
          formData.append('stock', val.stock);
          formData.append('category', val.category);
          formData.append('brand', val.brand);
          if (val.image) {
            formData.append('image', val.image);
          }

          try {
            await updateProduct({
              data: formData,
              id,
              token: user.token
            }).unwrap();
            toast.success('Product updated successfully');
            nav(-1);

          } catch (err) {
            console.log(err);
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
                defaultSelectedKeys={[values.category]}

                label="Select Category">
                {categories.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>


            <div>
              <Select
                defaultSelectedKeys={[values.brand]}
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
                  <img src={`${!values.image ? base + '/' + values.imageReview : values.imageReview}`} alt="" />
                )}

              </div>


            </div>

            <Button isLoading={isUpdating} type="submit">Submit</Button>

          </form>
        )}
      </Formik>

    </div>
  )
}
