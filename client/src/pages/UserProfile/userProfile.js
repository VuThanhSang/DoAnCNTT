import classNameNames from 'classnames/bind';
import styles from './userProfile.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import Button from '~/layout/components/Button';
import { Avatar, CardContent, CardHeader, CardMedia, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { updateStudentProfile } from '~/redux/apiRequest';

const cx = classNameNames.bind(styles);
function UserProfile() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const [emailState, setEmailState] = useState(user.user.data.Email);
    const [fullNameState, setFullNameState] = useState(user.user.data.FullName);
    const [phoneNumberState, setPhoneNumberState] = useState(user.user.data.PhoneNumber);
    const [majorsState, setMajorsState] = useState(user.user.data.Majors);
    const [avatarState, setAvatarState] = useState(user.user.data.Avatar);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    //getAvatar
    let base64String = '';
    if (user?.user?.data.Avatar) {
        const imgData = Buffer.from(user?.user?.data.Avatar?.img, 'base64');
        base64String = btoa(String.fromCharCode(...new Uint8Array(imgData)));
    }
    const fileSelectedHandler = (event) => {
        // const data = new FormData();
        // data.append('file', event.target.files[0]);
        // data.append('email', '20110555@student');
        setAvatarState(event.target.files[0]);
    };
    const btnSubmitHandler = (e) => {
        const data = new FormData();
        data.append('Email', emailState);
        data.append('FullName', fullNameState);
        data.append('Majors', majorsState);
        data.append('PhoneNumber', phoneNumberState);
        data.append('Image', avatarState);
        const id = user.user.data._id;
        const accessToken = user.user.accessToken;
        updateStudentProfile(axiosJWT, accessToken, id, data, dispatch);
    };
    return (
        <div>
            {' '}
            <div className={cx('wrapper')}>
                <div style={{ width: 200, margin: 20 }}>
                    <Card sx={{ width: 200 }}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500], width: 100, height: 100, marginLeft: 4 }}
                                    aria-label="recipe"
                                    src={`data:image/png;base64,${base64String}`}
                                >
                                    R
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {user.user.data.FullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.user.data.Email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.user.data.PhoneNumber}
                            </Typography>
                        </CardContent>
                    </Card>

                    <input type="file" accept=".png" onChange={fileSelectedHandler} />
                </div>
                <div className={cx('form-signup')}>
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="Họ Và Tên"
                        variant="outlined"
                        defaultValue={fullNameState}
                        onChange={(e) => {
                            setFullNameState(e.target.value);
                        }}
                    />
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        defaultValue={emailState}
                        onChange={(e) => {
                            setEmailState(e.target.value);
                        }}
                    />
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="Chuyên Ngành"
                        variant="outlined"
                        defaultValue={majorsState}
                        onChange={(e) => {
                            setMajorsState(e.target.value);
                        }}
                    />
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="Số Điện Thoại"
                        variant="outlined"
                        defaultValue={phoneNumberState}
                        onChange={(e) => {
                            setPhoneNumberState(e.target.value);
                        }}
                    />

                    <Button onClick={btnSubmitHandler} className={cx('btn-signup')}>
                        Cập Nhật Thông tin
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;
