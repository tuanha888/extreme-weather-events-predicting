import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/features/loadingSlice";
import { getPredictions } from "../../redux/actions/image-action";
import FolderSelector from "../FolderSelector";

const MyForm = () => {
  // Initial form values
  const initialValues = {
    model: "", // 'jc' or 'ce'
    inputPath: "", // Folder name input
  };
  const dispatch: AppDispatch = useDispatch();
  // Form validation function

  // Form submission function
  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    dispatch(setLoading(true));
    await dispatch(getPredictions(values));
    dispatch(setLoading(false));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="form">
        <div>
          <label>Select Model:</label>
          <Field as="select" name="model">
            <option value="" disabled>
              Select a model
            </option>
            <option value="jc">CGNet + Weighted Jaccard loss</option>
            <option value="ce">CGNet + Weighted Cross-entropy loss</option>
          </Field>
          <ErrorMessage name="model" component="div" className="error" />
        </div>

        <div>
          <FolderSelector field={{ name: "inputPath" }} />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default MyForm;
