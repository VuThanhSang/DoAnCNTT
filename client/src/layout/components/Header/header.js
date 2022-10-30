import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Button from '../Button';
import { FaBars, FaTimes } from 'react-icons';
//icon
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
//component
import { ConfigRouter } from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { loginGoogleUser, logOutUser } from '~/redux/apiRequest';
import React, { useEffect, useState, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { Logout, Settings } from '@mui/icons-material';
import { Buffer } from 'buffer';
import { Stack } from 'react-bootstrap';

const cx = classNames.bind(styles);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Header() {
    const dispatch = useDispatch();
    const [loginStatusState, setLoginStatusState] = useState(false);
    let user = useSelector((state) => state.auth.login?.currentLogin);
    useEffect(() => {
        async function fetchData() {
            await loginGoogleUser(dispatch);
            if (user) {
                if (user.success === false) {
                    console.log('ho');
                    setLoginStatusState(true);
                }
            }
        }
        fetchData();
    }, [user?.success]);
    //logout
    const accessToken = user?.accessToken;
    const id = user?.user?.data._id;
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleLogOutUser = (e) => {
        logOutUser(id, dispatch, navigate, accessToken, axiosJWT);
    };
    //ui
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoginStatusState(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //getAvatar
    let base64String = '';
    if (user?.user?.data.Avatar) {
        const imgData = Buffer.from(user?.user?.data.Avatar?.img, 'base64');
        base64String = btoa(String.fromCharCode(...new Uint8Array(imgData)));
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={require('../../../asset/images/logo-cntt2021.png')} alt=""></img>
            </div>
            {user?.success === true ? (
                <div className={cx('login')}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Stack spacing={0.2}>
                            <Typography sx={{ minWidth: 170 }} fontWeight={300}>
                                SV: {user.user.data.FullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.user.data.MSSV}
                            </Typography>
                        </Stack>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 42, height: 42 }} src={`data:image/png;base64,${base64String}`}>
                                    M
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Link to="/userProfile">
                                <Avatar /> Profile
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem to="/" onClick={handleLogOutUser}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Đăng Xuất
                        </MenuItem>
                    </Menu>
                    {/* */}
                </div>
            ) : (
                <div className={cx('login')}>
                    {loginStatusState && (
                        <Snackbar open={loginStatusState} autoHideDuration={6000} onClose={TBhandleClose}>
                            <Alert onClose={TBhandleClose} severity="error" sx={{ width: '100%' }}>
                                Email này không thuộc Trường Sưu Phạm Kỹ Thuật
                            </Alert>
                        </Snackbar>
                    )}
                    <Button to={ConfigRouter.Login} className={cx('btn')}>
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Header;
