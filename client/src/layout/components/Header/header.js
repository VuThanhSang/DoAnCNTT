import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Button from '../Button';
//icon

//component
import { ConfigRouter } from '~/config';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}></div>
            <div className={cx('login')}>
                <Button to={ConfigRouter.Login} className={cx('btn')}>
                    Đăng nhập
                </Button>
            </div>
            <div className={cx('signup')}>
                <Button to={ConfigRouter.Login} className={cx('btn')}>
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default Header;
