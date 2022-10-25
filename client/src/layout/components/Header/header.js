import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Button from '../Button';
import { FaBars, FaTimes } from 'react-icons';
//icon
import { Avatar } from '@mui/material';
//component
import { ConfigRouter } from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { loginGoogleUser, logOutUser } from '~/redux/apiRequest';
import React, { useEffect, useState, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
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
    }, [user]);

    const accessToken = user?.accessToken;
    const id = user?.user?.data._id;
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleLogOutUser = (e) => {
        logOutUser(id, dispatch, navigate, accessToken, axiosJWT);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoginStatusState(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={require('../../../asset/images/logo-cntt2021.png')} alt=""></img>
            </div>
            {user?.success === true ? (
                <div className={cx('login')}>
                    <span className={cx('nameSpan')}>{user?.user?.data.FullName}</span>
                    <Button to="/" onClick={handleLogOutUser} className={cx('btn')}>
                        Đăng Xuất
                    </Button>
                </div>
            ) : (
                <div className={cx('login')}>
                    {loginStatusState && (
                        <Snackbar open={loginStatusState} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
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
