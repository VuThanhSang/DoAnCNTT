import classNameNames from 'classnames/bind';
import styles from './groupManager.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import {
    createNewProject,
    getFollow,
    registerProject,
    registrationHistory,
    updateStudentProfile,
    uploadFile,
} from '~/redux/apiRequest';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Alert, Snackbar } from '@mui/material';

const cx = classNameNames.bind(styles);
function GroupManager() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    const [LeadProject, setLeadProject] = useState([]);
    const [success, setSuccess] = useState(null);
    const [IdAdded, setIdAdded] = useState(null);
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const addBtn = () => {
        registerProject(axiosJWT, user?.accessToken, IdAdded, LeadProject[0]._id).then((data) => {
            setSuccess(true);
        });
    };
    useEffect(() => {
        getFollow(user?.user?.data._id).then((data) => {
            setLeadProject(data);
        });
    }, []);
    console.log(LeadProject[0]?.Follow.Length);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('title')}>
                    <h3> Các dự án đã đăng ký</h3>
                </div>
                <ListGroup as="ol" className={cx('list-items')} numbered>
                    {LeadProject[0]?.Follow.Length > 0 &&
                        LeadProject[0]?.Follow?.map((item) => (
                            <ListGroup.Item
                                action
                                as="li"
                                className={cx('d-flex', 'justify-content-between', 'align-items-start', 'list-item')}
                                onMouseEnter={() => {
                                    setIdAdded(item.student[0]._id);
                                }}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"> {item.student[0]?.FullName}</div>
                                    {item.student[0]?.Email}
                                </div>
                                <Badge bg="primary" pill></Badge>
                                {LeadProject[0].total < 2 && (
                                    <Button
                                        onClick={async (e) => {
                                            addBtn();
                                        }}
                                    >
                                        Thêm vào nhóm
                                    </Button>
                                )}
                                {LeadProject[0].total === 2 && <Button disabled>Nhóm đã đủ người</Button>}
                            </ListGroup.Item>
                        ))}
                    {(LeadProject[0]?.Follow.Length === 0 || !LeadProject[0]?.Follow.Length) && (
                        <ListGroup.Item
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'list-item')}
                        >
                            Hiện tại không có ai quan tâm đến đồ án này
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>

            {success && (
                <Snackbar open={success} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="success" sx={{ width: '100%' }}>
                        Thêm vào nhóm thành công thành công
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
export default GroupManager;
