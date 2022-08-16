import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from "../services/axiosInstance";
import { Endpoints } from "../services/endpoints";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("Password is required"),
});
function AddProject() {
  const { handleClose, openType } = useAppContext();
  const navigate = useNavigate();

  const handleProjectSubmit = async (title: string, description: string) => {
    try {
      const res = await axiosInstance.post(`${Endpoints.createProject}`, {
        projectName: title,
        projectDescription: description,
      });
      navigate(`/project/${res.data._id}`);
      handleClose();
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProjectSubmit(values.title, values.description);
    },
  });

  return (
    <Dialog open={openType.openProject} onClose={handleClose}>
      <DialogTitle>Create project</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                autoFocus
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProject;
