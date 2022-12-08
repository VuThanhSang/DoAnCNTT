import classNameNames from 'classnames/bind';
import styles from './report.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { createNewProject, registrationHistory, updateStudentProfile, uploadFile } from '~/redux/apiRequest';
import { Badge, ListGroup } from 'react-bootstrap';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Alert, Snackbar } from '@mui/material';

const cx = classNameNames.bind(styles);
function StudentReport() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    const [Info, setInfo] = useState({});
    const [OpenDetails, setOpenDetails] = useState(false);
    const [Registered, setRegistered] = useState([]);
    const [files, setFiles] = useState([]);
    const [success, setSuccess] = useState(null);
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };
    console.log(Registered);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        registrationHistory(axiosJWT, user?.accessToken, user?.user?.data?._id).then((data) => {
            setRegistered(data);
        });
    }, []);
    const removeFile = (filename) => {
        setFiles(files.filter((file) => file.name !== filename));
    };
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        file.isUploading = true;
        setFiles((old) => [...old, file]);
        // upload file
    };
    const submitHandler = () => {
        const formData = new FormData();
        files.forEach((element) => {
            formData.append('files', element, element.name);
        });
        formData.append('studentId', Info.studentId);
        formData.append('projectId', Info.projectId);
        uploadFile(axiosJWT, formData, user?.accessToken).then((res) => {
            console.log(res);
            setOpenDetails(false);
            setSuccess(true);
        });
    };
    const deleteFileHandler = (_name) => {
        // axios
        //     .delete(`http://localhost:8080/upload?name=${_name}`)
        //     .then((res) => removeFile(_name))
        //     .catch((err) => console.error(err));
    };
    return (
        <div className={cx('wrapper')}>
            {OpenDetails ? (
                <div>
                    <ReplyAllIcon
                        className={cx('icon')}
                        onClick={(e) => {
                            setOpenDetails(false);
                        }}
                    />
                    <div className={cx('title')}>Thêm báo cáo cho đề tài {Info.name} </div>
                    <div className={cx('upload')}>
                        <div className={cx('file-card')}>
                            <div className={cx('file-inputs')}>
                                <input type="file" onChange={uploadHandler} />
                                <button>
                                    <i>
                                        <AddIcon />
                                    </i>
                                    Upload
                                </button>
                            </div>

                            <p className={cx('main')}>Supported files</p>
                            <p className={cx('info')}>PDF, JPG, PNG</p>
                        </div>
                    </div>
                    <div>
                        <ul className={cx('file-list')}>
                            {files?.map((f) => (
                                <li key={f.name} className={cx('file-item')}>
                                    <i>
                                        <FileCopyIcon />
                                    </i>
                                    <p>{f.name}</p>
                                    <div className={cx('actions')}>
                                        <div className={cx('loading')}></div>
                                        {f.isUploading === true && (
                                            <button className={cx('btn')} onClick={() => removeFile(f.name)}>
                                                <DeleteForeverIcon />
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className={cx('submit-btn')} onClick={submitHandler}>
                        Nộp báo cáo
                    </button>
                    <button
                        className={cx('submit-btn')}
                        onClick={(e) => {
                            setOpenDetails(false);
                        }}
                    >
                        Hủy
                    </button>
                </div>
            ) : (
                <div className={cx('des')}>
                    <div className={cx('title')}>
                        <h3> Các dự án đã đăng ký</h3>
                    </div>
                    <ListGroup as="ol" className={cx('list-items')} numbered>
                        {Registered &&
                            Registered.map((item) => (
                                <ListGroup.Item
                                    action
                                    as="li"
                                    className={cx(
                                        'd-flex',
                                        'justify-content-between',
                                        'align-items-start',
                                        'list-item',
                                    )}
                                    onClick={() => {
                                        setInfo({
                                            studentId: item.idStudent,
                                            projectId: item.idProject,
                                            name: item.ProjectDetails[0].Name,
                                        });
                                        setOpenDetails(true);
                                    }}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold"> {item.ProjectDetails[0].Name}</div>
                                        {item.ProjectDetails[0].Instructor}
                                    </div>
                                    <Badge bg="primary" pill>
                                        Trạng thái bài nộp : {item.ProjectDetails[0].Status ? 'Đã nộp' : 'Chưa nộp'}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            )}
            {success && (
                <Snackbar open={success} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="success" sx={{ width: '100%' }}>
                        Nộp báo cáo thành công
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
export default StudentReport;
