import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProject } from "../../hooks/useCreateProject";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("Password is required"),
});

function AddProject({ cacheKey }: { cacheKey: string }) {
  const { handleClose, openType, setSuccess, setMessage } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createProject } = useCreateProject();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        projectName: values.title,
        projectDescription: values.description,
      };

      createProject(payload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries([cacheKey]);
          setSuccess(true);
          setMessage("Project created successfully");
          navigate(`/project/${data._id}`);
          handleClose();
        },
      });
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
