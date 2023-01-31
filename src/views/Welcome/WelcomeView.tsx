import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { AppLink } from '../../components';

/**
 * Renders "Welcome" view
 * url: /
 */
const WelcomeView = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">Home Screen</Typography>
    </Stack>
  );
};

export default WelcomeView;
