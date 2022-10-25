import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginGoogleUser } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        window.open('http://localhost:3240/v1/auth/google/', '_self');
        // await loginGoogleUser(dispatch);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h2>Login</h2>
                    <form className={cx('form')}>
                        <FaUser />
                        <input placeholder="Tài khoản hoặc email" name="user" /> <br></br>
                        <FaLock />
                        <input placeholder="Mật khẩu" name="pass" />
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nhớ mật khẩu</span>
                        </div>
                        <a href="http://localhost:3000/resetpass" className={cx('forgetpass')}>
                            Quên mật khẩu?
                        </a>
                    </div>
                    <Button className={cx('btn-login')} to={ConfigRouter.Chat}>
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')}>
                                <FaFacebook />
                            </Button>
                            <Button onClick={handleLoginWithGoogle} className={cx('goog')}>
                                <FaGoogle />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('con-signup')}>
                        <span>Nếu chưa có tài khoản?</span>
                        <a href="http://localhost:3000/signup" className={cx('signup')}>
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
