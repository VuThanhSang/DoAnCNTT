import SideBar from '~/layout/components/sideBar';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
            <SideBar className={cx('side-bar')} />
            <div className={cx('layout')}>
                <Header className={cx('header')} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
