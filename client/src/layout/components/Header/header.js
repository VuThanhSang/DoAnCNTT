import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Button from '../Button';
import { FaBars, FaTimes } from 'react-icons';
//icon
import { Avatar } from '@mui/material';
//component
import { ConfigRouter } from '~/config';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { logOutUser } from '~/redux/apiRequest';
const cx = classNames.bind(styles);

function Header() {
    const user = useSelector((state) => state.auth.login?.currentLogin);
    const navRef = useRef();
    const accessToken = user?.accessToken;
    const id = user?.user.data._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleLogOutUser = (e) => {
        logOutUser(id, dispatch, navigate, accessToken, axiosJWT);
    };
    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={require('../../../asset/images/logo-cntt2021.png')} alt=""></img>
            </div>
            {user ? (
                <div className={cx('login')}>
                    <span className={cx('nameSpan')}>{user.user.data.FullName}</span>
                    <Button to="/" onClick={handleLogOutUser} className={cx('btn')}>
                        Đăng Xuất
                    </Button>
                </div>
            ) : (
                <div className={cx('login')}>
                    <Button to={ConfigRouter.Login} onClick={showNavBar} className={cx('btn')}>
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Header;
