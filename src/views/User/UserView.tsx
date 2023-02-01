import { useCallback, useMemo, useState } from 'react';
import { Box, Card, CardContent, CardHeader, FormControl, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AppButton, AppForm, AppAlert } from '../../components';
import { useAppStore } from '../../store';
import { UserUpdateRequest } from '../../utils';
import FileService, { FileUploadResponse } from '../../services/file.service';
import UserService from '../../services/user.service';
import { Action_Types } from '../../store/AppActions';
import AppAvatar from '../../components/AppAvatar';

/**
 * Renders "User" view
 * url: /user
 */

const Profile_Update_Schema = yup.object({
  firstName: yup.string().trim().required('FirstName required'),
  lastName: yup.string().trim().required('LastName required'),
  password: yup
    .string()
    .optional()
    .test('len', 'Password must be between 8 and 32 characters', (val) => {
      return val ? val.length > 7 && val.length < 33 : true;
    }),
});

const UserView = () => {
  const [state, dispatch] = useAppStore();
  const user = useMemo(() => state?.currentUser, [state]);
  const [photo, setPhoto] = useState<FileUploadResponse | undefined>(undefined);

  const profileForm = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: Profile_Update_Schema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const { firstName, lastName, password } = values;
      if (Boolean(password) || firstName !== user?.firstName || lastName !== user.lastName || Boolean(photo)) {
        const updatedProfile: UserUpdateRequest = {
          password: Boolean(password) ? password : undefined,
        };
        if (firstName !== user?.firstName) updatedProfile.firstName = firstName;
        if (lastName !== user?.lastName) updatedProfile.lastName = lastName;
        if (Boolean(photo)) updatedProfile.photo = photo;

        if (user?.id) {
          await UserService.updateUser(user.id, updatedProfile)
            .then(() => dispatch({ type: Action_Types.CURRENT_USER, currentUser: { ...user, ...updatedProfile } }))
            .catch((error) => {
              setError(`Failed to update profile`);
            });
        }
      }
      actions.setSubmitting(false);
    },
  });

  const { isValid, errors, values, touched, handleChange, handleSubmit } = profileForm;

  const [error, setError] = useState<string>();

  const handleCloseError = useCallback(() => setError(undefined), [setError]);
  const handleChangePhoto = useCallback(
    (file: File | null) => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        FileService.upload(formData)
          .then((res) => setPhoto(res))
          .catch((error) => {
            setError(`Failed to upload image`);
          });
      }
    },
    [setPhoto]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader>Profile</CardHeader>
          <CardContent>
            <AppForm onSubmit={handleSubmit}>
              <Grid container direction="row" alignItems="cen" justifyContent={'center'} mb={4}>
                <AppAvatar
                  onChange={handleChangePhoto}
                  src={photo ? photo.path : user?.photo.path || ''}
                  sx={{ width: 128, height: 128 }}
                  editable
                />
              </Grid>
              <FormControl fullWidth margin="dense">
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                  }}
                >
                  <TextField
                    id="firstname-input"
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                  <TextField
                    id="lastname-input"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Box>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField fullWidth value={user?.email || ''} disabled placeholder="user@email.com" />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  fullWidth
                  type="password"
                  value={values.password}
                  placeholder="Password"
                  name="password"
                  id="password-input"
                  label="New Password"
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormControl>
              {error ? (
                <AppAlert severity="error" onClose={handleCloseError}>
                  {error}
                </AppAlert>
              ) : null}
              <Grid container justifyContent="center" alignItems="center">
                <AppButton type="submit" disabled={!isValid} color="primary">
                  Save Change
                </AppButton>
              </Grid>
            </AppForm>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserView;
