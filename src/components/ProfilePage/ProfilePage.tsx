import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Grid, IconButton, Paper, Popover, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderCheckAuth from '../../auth/LoadingAuth';
import { API_LOCAL } from '../../config';
import { ColorModeContext } from '../../context/themeContext';
import { userContext } from '../../context/userContext';
import { useHttp } from '../../hooks/http.auth.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from '../../interfaces';
import { getTime } from '../helper/convertTime';
import CustomSnackBar from '../helper/CustomSnack';
import PageWithNotes from '../Notes/PageWithNotes';
import InfoItemProfile from './InfoItemProfile';

const ProfilePage: React.FC = () => {
  const [currentUserPage, setCurrentUserPage] = useState<UserInterface>();
  const params = useParams();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [quantityNotes, setQuantityNotes] = useState<number>(0);
  const changeQuantityNotes = (newNumber: number): void => setQuantityNotes(newNumber);
  const { user } = useContext(userContext);

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  const { data, loading } = useHttp<UserInterface>(
    `${API_LOCAL}/api/auth/user/${params.profileId ? params.profileId : ''}`,
  );

  const isYourAccount = user?._id === params.profileId;

  useEffect(() => {
    if (data && !loading) {
      setCurrentUserPage(data);
    }
  }, [data, loading]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const handleClickCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(document.location.href).then(() => {
      setOpenSnack(true);
    });
  };

  const open = Boolean(anchorEl);

  if (loading) return <LoaderCheckAuth />;

  if (!currentUserPage) return <h1>User not exist</h1>;
  return (
    <Grid>
      <Paper style={{ borderRadius: 0, padding: 20 }}>
        <Grid>
          <Grid justifyContent="center" container item>
            <Grid>
              <Grid alignItems="center" container>
                <Typography style={{ cursor: 'pointer' }} variant="h5">
                  {currentUserPage?.firstname} {currentUserPage?.lastname}
                </Typography>
                <Grid
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  onClick={handleClickCopy}
                  style={{ marginLeft: 10, cursor: 'pointer' }}
                  item
                  alignContent="center"
                >
                  <ContentCopyIcon style={{ fontSize: 18 }} />
                </Grid>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>Copy and share your profile</Typography>
                </Popover>
                <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
                  Copied!
                </CustomSnackBar>
              </Grid>
              <Grid>
                <InfoItemProfile info="Date of create" data={getTime(currentUserPage?.createdAt)!} />
                <InfoItemProfile info="Number of notes" data={quantityNotes} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid style={{ marginTop: 30 }} container justifyContent="flex-end" alignItems="center">
              <Typography>Change theme to dark mode?</Typography>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {isYourAccount && <PageWithNotes changeQuantityNotes={changeQuantityNotes} />}
    </Grid>
  );
};

export default ProfilePage;
