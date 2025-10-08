import { Button, Input } from "@heroui/react";
import { Formik } from "formik";
import { useNavigate } from "react-router";

export default function SearchInput({ isHome, setSearchParams }) {
  const nav = useNavigate();
  return (
    <div>

      <Formik
        initialValues={{
          search: ''
        }}

        onSubmit={(val) => {
          if (isHome) {
            nav(`/product/search?q=${val.search}`);
          } else {
            setSearchParams({ q: val.search });
          }

        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit} className="flex max-w-[400px] mb-5 gap-5">
            <Input
              name="search"
              value={values.search}
              onChange={handleChange}

              placeholder="Search" />
            <Button type="submit">Submit</Button>


          </form>
        )}
      </Formik>

    </div>
  )
}
