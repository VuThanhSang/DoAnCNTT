import classNames from 'classnames/bind';
import styles from './guideLogin.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login, loginGoogleUser } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
//component
import images from '~/asset/images';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
const cx = classNames.bind(styles);
function GuideLogin() {
    return (
        <div className={cx('wrapper')}>
            <h3>
                <strong>Hướng dẫn đăng nhập :</strong>
            </h3>
            <img src="login.png" alt="BigCo Inc. logo" />
            <p>Ở đây sẽ có 2 loại login</p>
            <p>
                Đầu tiên sẽ là login của Giảng viên :
                <strong> ở đây sẽ sử dụng tài khoản mật khẩu để đăng ký vô hệ thống </strong>
            </p>
            <p>
                <strong>
                    tài khoản mật khẩu này có thể được tạo bằng cách bấm vào nút đăng ký tài khoản ở bển dưới
                </strong>
            </p>
            <hr />
            <p>
                Sau khi đăng nhập thành công cho <strong> Giảng viên :</strong>
            </p>
            <img src="lecture.png" alt="BigCo Inc. logo" />

            <p>
                Tiếp đến sẽ là phần login của sinh viên :
                <strong>
                    Sinh viên sẽ login qua tài khoản email Sinh viên và chỉ có tài khoản sinh viên của trường DHSPKT mới
                    có thể đăng nhập vào hệ thống với role sinh viên
                </strong>
            </p>
        </div>
    );
}

export default GuideLogin;
