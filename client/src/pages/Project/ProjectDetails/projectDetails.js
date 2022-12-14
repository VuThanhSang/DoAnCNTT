import classNames from 'classnames/bind';
import styles from './projectDetails.module.scss';

// or less ideally
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import LoginIcon from '@mui/icons-material/Login';
//component
// import Button from '~/layout/components/Button';
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import { Link, useParams } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import {
    getProjectTypeList,
    getProjectList,
    findOneProjectById,
    registerProject,
    FollowProject,
} from '~/redux/apiRequest';
import { useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Button, Divider, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';

const cx = classNames.bind(styles);
function ProjectDetails() {
    const user = useSelector((state) => state.auth.login?.currentLogin);
    const [stateProject, setStateProject] = useState(null);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        findOneProjectById(id).then((data) => {
            setStateProject(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };
    const submitButton = (e) => {
        registerProject(axiosJWT, user?.accessToken, user?.user?.data?._id, stateProject._id).then((data) => {
            console.log(data);
        });
        setSuccess(true);
    };
    const followButton = (e) => {
        FollowProject(user?.user?.data?._id, stateProject._id).then();
        setSuccess(true);
    };
    console.log(stateProject);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <Link to={ConfigRouter.Project}>
                    <ReplyAllIcon className={cx('icon')} />
                </Link>
                {stateProject && (
                    <ListGroup as="ol" className={cx('list-items')}>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">T??n ????? T??i</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Name}</div>
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">M???c Ti??u</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Goal}</div>
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Y??u C???u</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Require}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">S???n ph???m</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Product}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Ch?? Th??ch</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Note}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">SL sinh vi??n</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.TotalStudents}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">??K kh??c chuy??n ng??nh</div>
                            </div>
                            <div className="me-auto">
                                <div className="fw-bold">
                                    {stateProject?.OtherMajorsRegister ? ' ???????c B???o V???' : 'Kh??ng ???????c ????ng k??'}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Chuy??n ng??nh</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Majors}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">CLo???i ????? t??i</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.ProjectType.TypeName}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Tr???ng th??i</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {stateProject?.Status ? '???? ???????c ????ng K??' : 'Ch??a ???????c ????ng k??'}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Nh??m Tr?????ng</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Leader}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Th??nh vi??n</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Member}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">GV H?????ng D???n</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Instructor}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">GV ph???n bi???n</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.LectureCounterArgument}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as="li"
                            className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">??i???m ????? t??i</div>
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{stateProject.Score}</div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                )}
            </div>
            {(user?.user?.data?.Majors === stateProject?.Majors || stateProject?.OtherMajorsRegister === true) &&
                !stateProject?.Leader &&
                stateProject.TotalStudents < 2 && (
                    <Button className={cx('btn')} onClick={submitButton} endIcon={<LoginIcon />} variant="contained">
                        ????ng k?? ????? t??i
                    </Button>
                )}
            {stateProject?.Leader &&
                !stateProject.Member.includes(user?.user?.data?._id) &&
                !(stateProject?.Follow.filter((e) => e.studentId === user?.user?.data?._id).length > 0) &&
                stateProject.TotalStudents < 2 && (
                    <Button className={cx('btn')} onClick={followButton} endIcon={<LoginIcon />} variant="contained">
                        Xin v??o nh??m
                    </Button>
                )}
            {stateProject?.Member.includes(user?.user?.data?._id) && stateProject.TotalStudents < 2 && (
                <Button
                    className={cx('btn')}
                    onClick={submitButton}
                    endIcon={<LoginIcon />}
                    variant="contained"
                    disabled
                >
                    B???n ???? ????ng k?? ????? t??i n??y
                </Button>
            )}
            {stateProject?.Follow.filter((e) => e.studentId === user?.user?.data?._id).length > 0 &&
                stateProject.TotalStudents < 2 &&
                stateProject?.Leader && (
                    <Button
                        className={cx('btn')}
                        onClick={submitButton}
                        endIcon={<LoginIcon />}
                        variant="contained"
                        disabled
                    >
                        ???? xin v??o nh??m v?? ??ang ?????i nh??m tr?????ng duy???t
                    </Button>
                )}

            {success && (
                <Snackbar open={success} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="success" sx={{ width: '100%' }}>
                        ????ng k?? ????? t??i th??nh c??ng
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default ProjectDetails;
