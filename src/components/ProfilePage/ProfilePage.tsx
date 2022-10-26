import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, ButtonGroup, Grid, IconButton, Paper, Popover, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import LoaderCheckAuth from '../../auth/LoadingAuth';
import { API_LOCAL } from '../../config';
import { ColorModeContext } from '../../context/themeContext';
import { userContext } from '../../context/userContext';
import { useHttp } from '../../hooks/http.auth.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from '../../interfaces';
import { links } from '../../router/routerConfig';
import { getTime } from '../helper/convertTime';
import CustomSnackBar from '../helper/CustomSnack';
import './ButtonsProfileStyle.css';
import InfoItemProfile from './InfoItemProfile';

const ProfilePage: React.FC = () => {
  const [currentUserPage, setCurrentUserPage] = useState<UserInterface>();
  const params = useParams();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const { user } = useContext(userContext);
  const isYourProfile = params.profileId === user?._id ? true : false;

  const localTheme = localStorage.getItem('theme');

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  const { data, loading } = useHttp<UserInterface>(
    `${API_LOCAL}/api/auth/user/${params.profileId ? params.profileId : ''}`,
  );

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

  const buttonsMenuProfile = [
    {
      to: links.profileLinks.liked,
      text: 'Liked',
    },
    {
      to: links.profileLinks.subscribers,
      text: 'Subscriptions',
    },
    {
      to: links.profileLinks.followers,
      text: 'Followers',
    },
  ];

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
                  Copied
                </CustomSnackBar>
              </Grid>
              <Grid>
                <InfoItemProfile info="Date of create" data={getTime(currentUserPage?.createdAt)!} />
                {/* <InfoItemProfile info="Number of notes" data={quantityNotes} /> */}
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
          {isYourProfile ? (
            <Grid justifyContent="center" container>
              <Grid
                item
                style={{
                  background: '#8b8b8b21',
                  display: 'inline-block',
                  padding: '4px 0px',
                  borderRadius: '10px 10px 0px 0px',
                }}
              >
                {buttonsMenuProfile.map(button => {
                  return (
                    <NavLink
                      key={button.to}
                      to={button.to}
                      style={{
                        textDecoration: 'none',
                        color: localTheme === 'dark' ? '#888' : '#000',
                        padding: 6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      className={({ isActive }): string => {
                        return isActive ? 'link-active-profile' : 'link-profile';
                      }}
                    >
                      {button.text}
                    </NavLink>
                  );
                })}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
      <Outlet />
    </Grid>
  );
};

export default ProfilePage;
