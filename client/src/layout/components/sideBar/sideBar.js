import React, { useState } from 'react';
import styles from './sideBar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function App(props) {
    const [isExpanded, setExpendState] = useState(false);
    const menuItems = [
        {
            text: 'Trang Chủ',
            icon: require('../../../asset/icon/icons8-home-24.png'),
        },
        {
            text: 'Danh Sách Đề Tài',
            icon: require('../../../asset/icon/icons8-list-24.png'),
        },
        {
            text: 'Thông Tin Giảng Viên',
            icon: require('../../../asset/icon/icons8-teacher-24.png'),
        },
        {
            text: 'Thông tin Sinh Viên',
            icon: require('../../../asset/icon/icons8-student-24.png'),
        },
        {
            text: 'Hướng Dẫn Đăng ký',
            icon: require('../../../asset/icon/icons8-guide-24.png'),
        },
        {
            text: 'Thống Kê',
            icon: require('../../../asset/icon/icons8-chart-24.png'),
        },
        {
            text: 'Tìm Kiếm',
            icon: require('../../../asset/icon/icons8-search-24.png'),
        },
    ];
    return (
        <div>
            <div className={isExpanded ? cx('side-nav-container') : cx('side-nav-container-NX', 'side-nav-container')}>
                <div className={cx('nav-upper')}>
                    <div className={cx('nav-heading')}>
                        {isExpanded && (
                            <div className={cx('nav-brand')}>
                                <img
                                    src={require('../../../asset/images/logo-cntt2021.png')}
                                    className={cx('logo-side-bar')}
                                    alt="icon"
                                ></img>
                                <h2>ShowKart</h2>
                            </div>
                        )}
                        <button
                            className={isExpanded ? cx('hamburger', 'hamburger-in') : cx('hamburger', 'hamburger-out')}
                            onClick={() => setExpendState(!isExpanded)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className={cx('nav-menu')}>
                        {menuItems.map(({ text, icon }) => (
                            <Link
                                className={isExpanded ? cx('nav-items') : cx('nav-items', 'nav-item-nx')}
                                key={icon}
                                to="#"
                            >
                                <img className="nav-item-icon" src={icon} alt="icon" />
                                {isExpanded && <p>{text}</p>}
                                {!isExpanded && <div className={cx('tooltip')}>{text}</div>}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={cx('nav-footer')}>
                    {isExpanded && (
                        <div className={cx('nav-details')}>
                            <img src={require('../../../asset/icon/icons8-info-24.png')} alt="zzz"></img>
                            <div className={cx('nav-footer-info')}>
                                <p className={cx('nav-footer-user-name')}>M ShowKart</p>
                                <p className={cx('nav-footer-user-position')}>Sinh Viên</p>
                            </div>
                        </div>
                    )}
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
