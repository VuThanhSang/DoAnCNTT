import classNames from 'classnames/bind';
import styles from './footer.module.scss';
//icon

//component

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <p>Khoa Công nghệ Thông tin - Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh</p>
            <p>Số 1, Võ Văn Ngân, Thủ Đức, TP. Hồ Chí Minh</p>
        </div>
    );
}

export default Footer;
