import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { useState } from 'react';
import { register } from '~/redux/apiRequest';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Register, setRegister] = useState(true);
    const [Message, setMessage] = useState('');
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setRegister(true);
    };
    const navigate = useNavigate();

    const handleRegister = () => {
        if (Password === RePassword) {
            register(Email, Name, Phone, Password).then((data) => {
                if (data) {
                    setRegister(true);
                    navigate(ConfigRouter.Home);
                } else {
                    setRegister(false);
                }
            });
        } else {
            setMessage('Mật Khẩu không trùng khớp');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1>Sign up</h1>
            <form className={cx('form-signup')}>
                <input
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    name="email"
                />{' '}
                <br></br>
                <input
                    placeholder="Tên người dùng"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    name="username"
                />{' '}
                <br></br>
                <input
                    placeholder="Số điện thoại"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    name="phone"
                />{' '}
                <br></br>
                <input
                    placeholder="Mật khẩu"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    name="pass"
                />{' '}
                <br></br>
                <input
                    placeholder="Xác nhận mật khẩu"
                    onChange={(e) => {
                        setRePassword(e.target.value);
                    }}
                    name="re-pass"
                />
                <p>
                    Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của
                    chúng tôi.
                </p>
            </form>
            <Button className={cx('btn-signup')} onClick={handleRegister}>
                Đăng ký
            </Button>
            <div className={cx('con-signin')}>
                <span>Nếu bạn đã có tài khoản?</span>
                <a href="http://localhost:3000/login" className={cx('signin')}>
                    Đăng nhập
                </a>
            </div>
            {!Register && (
                <Snackbar open={!Register} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="error" sx={{ width: '100%' }}>
                        {Message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default Home;
