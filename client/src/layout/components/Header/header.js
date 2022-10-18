import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Button from '../Button';
import { FaBars, FaTimes } from 'react-icons';
//icon
import { Avatar } from '@mui/material';
//component
import { ConfigRouter } from '~/config';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const navRef = useRef();
    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={require('../../../asset/images/logo-cntt2021.png')} alt=""></img>
            </div>
            <div className={cx('login')}>
                <Button to={ConfigRouter.Login} onClick={showNavBar} className={cx('btn')}>
                    Đăng nhập
                </Button>
            </div>
            <div className={cx('signup')}>
                <Button to={ConfigRouter.Signup} onClick={showNavBar} className={cx('btn')}>
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default Header;
