import SideBar from '~/layout/components/sideBar';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
            <Header className={cx('header')} />
            <div className={cx('layout')}>
                <SideBar className={cx('side-bar')} />
                <div className={cx('content-container')}>
                    <div className={cx('content')}>{children}</div>
                    <Footer className={cx('footer')} />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
