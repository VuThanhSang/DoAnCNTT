import classNames from 'classnames/bind';
import styles from './majors.module.scss';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// or less ideally

import { registerMajors } from '~/redux/apiRequest';
import { useEffect, useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';

const majorsInfo = [
    'Công nghệ phần mềm là chuyên ngành nghiên cứu về hệ thống kỹ thuật, phần mềm máy tính. Cụ thể, ngành học này tập trung nghiên cứu về các hạ tầng phần mềm, cơ sở dữ liệu cũng như sự phát triển của các ứng dụng và hệ thống. Ngành tập trung vào việc xây dựng các ứng dụng giúp nâng cao hiệu quả hoạt động của các doanh nghiệp và chất lượng đời sống con người.Cơ hội nghề nghiệpTrong thời kì chạy đua công nghệ như hiện nay, ngành Công nghệ Phần mềm đang là một trong những ngành đứng đầu về nhu cầu tuyển dụng bởi tính thực tế cao của ngành. Các bạn sinh viên tốt nghiệp chuyên ngành này sẽ có cơ hội việc làm rất lớn với mức thu nhập đáng kể.',
    'An toàn thông tin được hiểu là một hành động nhằm phòng ngừa, ngăn chặn hoặc ngăn cản sự truy cập, sử dụng, chia sẻ thông tin, tiết lộ, phát tán, phá hủy hoặc ghi lại những thông tin khi chưa được sự cho phép của chủ sở hữu. An toàn thông tin ngày nay được coi là vấn đề đáng lưu tâm hàng đầu của xã hội. Nó là một vấn đề ảnh hưởng đến các ngành kinh tế, khoa học – kỹ thuật và xã hội.',
    'Hệ thống thông tin là sự kết hợp của phần cứng, phần mềm và mạng truyền thông được xây dựng và sử dụng để thu thập, xử lý, lưu trữ và phân phối các dữ liệu, thông tin và tri thức hữu ích một cách đặc trưng trong bối cảnh của tổ chức.  ',
];

const cx = classNames.bind(styles);
function RegisterMajors() {
    const [majorsName, setMajorsName] = useState('');
    const [smajorsInfo, setMajorsInfo] = useState('');
    const [success, setSuccess] = useState(false);
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleChange = (event) => {
        setMajorsName(event.target.value);
        if (event.target.value === 'CNPM') {
            setMajorsInfo(majorsInfo[0]);
        } else if (event.target.value === 'ATTT') {
            setMajorsInfo(majorsInfo[1]);
        } else {
            setMajorsInfo(majorsInfo[2]);
        }
    };

    const submitHandler = (e) => {
        const accessToken = user?.accessToken;
        const id = user?.user?.data?._id;
        console.log(accessToken, id);
        registerMajors(axiosJWT, accessToken, id, majorsName, dispatch);
        setSuccess(true);
    };

    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('page-title')}>
                    <h3> Đăng ký chuyên ngành Công nghệ thông tin</h3>
                </div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={majorsName}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="CNPM">Công Nghệ phần mềm</MenuItem>
                        <MenuItem value="ATTT">An Toàn Thông tin </MenuItem>
                        <MenuItem value="HTTT">Hệ Thống thông tin</MenuItem>
                    </Select>
                </FormControl>
                <div>Thông tin chuyên ngành</div>
                <div>{smajorsInfo}</div>
            </div>
            <Button variant="contained" className={cx('button')} onClick={submitHandler} size="small">
                Hoàn Thành Đăng ký
            </Button>
            <Button variant="contained" className={cx('button')} size="small">
                Hủy
            </Button>
            {success && (
                <Snackbar open={success} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="success" sx={{ width: '100%' }}>
                        Đăng ký chuyên ngành thành công
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default RegisterMajors;
