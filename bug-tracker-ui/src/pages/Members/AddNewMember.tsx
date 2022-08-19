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
import * as yup from "yup";
import { useFormik } from "formik";
import { useAuthContext } from "../../context/AuthContext";
import { createMember } from "../../services/api";
import { useMutation } from "@tanstack/react-query";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
function AddNewMember({ refetch }: { refetch: () => void }) {
  const { handleClose, openType, setError, setSuccess, setMessage } =
    useAppContext();
  const { refetchMembers } = useAuthContext();

  const { mutate } = useMutation(createMember, {
    onSuccess: () => {
      refetch();
      refetchMembers();
      handleClose();
      setSuccess(true);
      setMessage("Member created successfully");
    },
    onError: (error) => {
      setError(true);
      setMessage("Something went wrong. Please try again");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.confirmPassword,
        role: "user",
      };
      mutate(payload);
    },
  });
  return (
    <Dialog open={openType.openUser} onClose={handleClose}>
      <DialogTitle>Create member</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                autoFocus
                id="name"
                name="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddNewMember;
