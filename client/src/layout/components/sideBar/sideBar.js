import React, { useState } from 'react';
import styles from './sideBar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ConfigRouter } from '~/config';

const cx = classNames.bind(styles);
function App(props) {
    const menuItems = [
        {
            text: 'Trang Chủ',
            icon: require('../../../asset/icon/icons8-home-24.png'),
            route: ConfigRouter.Home,
        },
        {
            text: 'Danh Sách Đề Tài',
            icon: require('../../../asset/icon/icons8-list-24.png'),
            route: ConfigRouter.Students,
        },
        {
            text: 'Thông Tin Giảng Viên',
            icon: require('../../../asset/icon/icons8-teacher-24.png'),
            route: ConfigRouter.Lectures,
        },
        {
            text: 'Thông tin Sinh Viên',
            icon: require('../../../asset/icon/icons8-student-24.png'),
            route: ConfigRouter.Students,
        },
        {
            text: 'Hướng Dẫn Đăng ký',
            icon: require('../../../asset/icon/icons8-guide-24.png'),
            route: ConfigRouter.Students,
        },
        {
            text: 'Thống Kê',
            icon: require('../../../asset/icon/icons8-chart-24.png'),

            route: ConfigRouter.Students,
        },
        {
            text: 'Tìm Kiếm',
            icon: require('../../../asset/icon/icons8-search-24.png'),
            route: ConfigRouter.Students,
        },
    ];
    return (
        <div>
            <div className={cx('side-nav-container')}>
                <div className={cx('nav-upper')}>
                    <div className={cx('nav-menu')}>
                        {menuItems.map(({ text, icon, route }) => (
                            <Link to={route} className={cx('nav-items')} key={icon}>
                                <img className="nav-item-icon" src={icon} alt="icon" />
                                <div className={cx('tooltip')}>{text}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={cx('nav-footer')}>
                    <img
                        alt="logout-icon"
                        src={require('../../../asset/icon/icons8-logout-24.png')}
                        className={cx('logout-icon')}
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default App;
