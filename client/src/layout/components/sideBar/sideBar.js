import React, { useEffect, useState } from 'react';
import styles from './sideBar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ConfigRouter } from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogleUser } from '~/redux/apiRequest';

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
            route: ConfigRouter.Project,
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
            route: ConfigRouter.GuideLogin,
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
    const studentMenu = [
        {
            text: 'Đăng ký đề tài',
            icon: require('../../../asset/icon/RP.png'),
            route: ConfigRouter.RegisterProject,
        },
        {
            text: 'Quản lý nhóm',
            icon: require('../../../asset/icon/group.png'),
            route: ConfigRouter.GroupManager,
        },
        {
            text: 'Đăng ký chuyên ngành',
            icon: require('../../../asset/icon/register.png'),
            route: ConfigRouter.RegisterMajors,
        },
        {
            text: 'Quản lý báo cáo',
            icon: require('../../../asset/icon/icons8-guide-24.png'),
            route: ConfigRouter.StudentReport,
        },
        {
            text: 'tìm kiếm file',
            icon: require('../../../asset/icon/fileSearch.png'),
            route: ConfigRouter.Students,
        },
        {
            text: 'Lịch sử đăng ký',
            icon: require('../../../asset/icon/history.png'),

            route: ConfigRouter.History,
        },
    ];
    const lectureMenu = [
        {
            text: 'Tạo đề tài',
            icon: require('../../../asset/icon/RP.png'),
            route: ConfigRouter.CreateProject,
        },
        {
            text: 'Nhận xét kết quả nhóm hướng dẫn',
            icon: require('../../../asset/icon/group.png'),
            route: ConfigRouter.Scoring,
        },
        {
            text: 'Phản biện đề tài',
            icon: require('../../../asset/icon/register.png'),
            route: ConfigRouter.RegisterMajors,
        },
    ];
    const dispatch = useDispatch();
    let user = useSelector((state) => state.auth.login?.currentLogin);
    //logout
    return (
        <div>
            <div className={cx('side-nav-container')}>
                <div className={cx('nav-upper')}>
                    <div className={cx('nav-menu')}>
                        {menuItems.map(({ text, icon, route }) => (
                            <Link to={route} className={cx('nav-items')} key={icon}>
                                <img className="nav-item-icon" src={icon} alt="icon" />
                                <div className={cx('item-content')}>{text}</div>
                            </Link>
                        ))}
                    </div>

                    {user?.user?.authType === 'student' && (
                        <div className={cx('nav-menu')}>
                            <div style={{ fontSize: 17, margin: 10 }}>Sinh viên</div>
                            {studentMenu.map(({ text, icon, route }) => (
                                <Link to={route} className={cx('nav-items')} key={icon}>
                                    <img className="nav-item-icon" src={icon} alt="icon" />
                                    <div className={cx('item-content')}>{text}</div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {user?.user?.authType === 'lecture' && (
                        <div className={cx('nav-menu')}>
                            <div style={{ fontSize: 17, margin: 10 }}>Giảng viên</div>
                            {lectureMenu.map(({ text, icon, route }) => (
                                <Link to={route} className={cx('nav-items')} key={icon}>
                                    <img className="nav-item-icon" src={icon} alt="icon" />
                                    <div className={cx('item-content')}>{text}</div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
