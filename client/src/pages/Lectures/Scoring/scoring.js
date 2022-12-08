import classNameNames from 'classnames/bind';
import styles from './scoring.module.scss';
import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { Badge, ListGroup } from 'react-bootstrap';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import {
    Alert,
    Box,
    Button,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Stack,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { ProjectOfLecture, ScoringProject } from '~/redux/apiRequest';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
const cx = classNameNames.bind(styles);
function Scoring() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const [Projects, setProjects] = useState();
    const [CurrentProject, setCurrentProject] = useState();
    const [OpenDetails, setOpenDetails] = useState(false);
    const [Score, setScore] = useState(0);
    const [Comment, setComment] = useState('');
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        console.log(user?.user?.data?._id);
        ProjectOfLecture(user?.user?.data?._id).then((data) => {
            setProjects(data);
        });
    }, []);
    const [openNX, setOpenNX] = useState(false);

    const handleClick = () => {
        setOpenNX(!openNX);
    };
    const [openS, setOpenS] = useState(false);

    const handleClickScore = () => {
        setOpenS(!openS);
    };
    const submitHandler = () => {
        ScoringProject(CurrentProject._id, Comment, Score).then((data) => {
            console.log(data);
        });
    };
    const [success, setSuccess] = useState(false);
    const TBhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };
    return (
        <div className={cx('wrapper')}>
            {!OpenDetails ? (
                <div className={cx('des')}>
                    <div className={cx('title')}>
                        <h3> Những đề tài đang hướng dẫn</h3>
                    </div>
                    <ListGroup as="ol" className={cx('list-items')} numbered>
                        {Projects &&
                            Projects.map((item) => {
                                console.log(item);
                                return (
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
                                            setOpenDetails(true);
                                            setCurrentProject(item);
                                            setScore(CurrentProject.Score);
                                            setComment(CurrentProject.Note);
                                        }}
                                    >
                                        {/* <p>{atob(item.report[0].files[0].file)}</p> */}

                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"> {item.Name}</div>
                                            {user?.user?.data?.FullName}
                                        </div>
                                        <Badge bg="primary" pill>
                                            Trạng thái bài nộp : {item.Status ? 'Đã nộp' : 'Chưa nộp'}
                                        </Badge>
                                    </ListGroup.Item>
                                );
                            })}
                    </ListGroup>
                </div>
            ) : (
                <div>
                    <ReplyAllIcon
                        className={cx('icon')}
                        onClick={(e) => {
                            setOpenDetails(false);
                        }}
                    />{' '}
                    Quay Lại
                    <Box padding={1}>Trạng thái đề tài {CurrentProject.Name}</Box>
                    <Stack direction={'column'} p={1}>
                        <Stack direction={'row'} alignItems={'center'} sx={{ border: '1px solid gray' }}>
                            <Stack
                                direction={'column'}
                                padding={1}
                                width={'200px'}
                                sx={{ borderRight: '1px solid gray' }}
                            >
                                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                                    Trạng thái nộp
                                </Typography>
                            </Stack>
                            <Stack direction={'column'} padding={1}>
                                <Typography variant="body1">{CurrentProject.Status ? 'Đã nộp' : 'chưa nộp'}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} sx={{ border: '1px solid gray' }}>
                            <Stack
                                direction={'column'}
                                padding={1}
                                width={'200px'}
                                sx={{ borderRight: '1px solid gray' }}
                            >
                                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                                    Trạng thái chấm điểm
                                </Typography>
                            </Stack>
                            <Stack direction={'column'} padding={1}>
                                <Stack onClick={handleClickScore} direction={'row'}>
                                    <p style={{ userSelect: 'none' }}> Chấm điểm</p>
                                    {openS ? <ExpandLess /> : <ExpandMore />}
                                </Stack>
                                <Collapse in={openS} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <input
                                            value={Score}
                                            onChange={(e) => {
                                                setScore(e.target.value);
                                            }}
                                        />
                                    </List>
                                </Collapse>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} sx={{ border: '1px solid gray' }}>
                            <Stack
                                direction={'column'}
                                padding={1}
                                width={'200px'}
                                sx={{ borderRight: '1px solid gray' }}
                            >
                                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                                    Đăng tải nhận xét
                                </Typography>
                            </Stack>
                            <Stack direction={'column'} padding={1}>
                                <Stack onClick={handleClick} direction={'row'}>
                                    <p style={{ userSelect: 'none' }}> Thêm nhận xét</p>
                                    {openNX ? <ExpandLess /> : <ExpandMore />}
                                </Stack>
                                <Collapse in={openNX} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            value={Comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                            style={{ width: 200 }}
                                        />
                                    </List>
                                </Collapse>
                            </Stack>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'} sx={{ border: '1px solid gray' }}>
                            <Stack
                                direction={'column'}
                                padding={1}
                                width={'200px'}
                                sx={{ borderRight: '1px solid gray' }}
                            >
                                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                                    File báo cáo
                                </Typography>
                            </Stack>
                            <Stack direction={'column'} className={cx('files')} padding={1}>
                                {CurrentProject.report.map((element) => {
                                    return element?.files.map((item) => {
                                        return (
                                            <li key={item.file} className={cx('file-item')}>
                                                <i>
                                                    <FileCopyIcon />
                                                </i>
                                                <p>{item.file}</p>
                                                <div className={cx('actions')}>
                                                    <div className={cx('loading')}></div>
                                                    <button
                                                        className={cx('btn')}
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            axios({
                                                                url: `http://localhost:3240/v1/files/downloadFile/${item.file}`,
                                                                method: 'GET',
                                                                responseType: 'blob',
                                                            }).then((data) => {
                                                                fileDownload(data.data, item.file);
                                                            });
                                                        }}
                                                    >
                                                        <DownloadIcon />
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    });
                                })}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Button
                        className={cx('submit-btn')}
                        onClick={submitHandler}
                        variant="contained"
                        endIcon={<ReplyAllIcon />}
                    >
                        Lưu
                    </Button>
                </div>
            )}
            {success && (
                <Snackbar open={success} autoHideDuration={6000} onClose={TBhandleClose}>
                    <Alert onClose={TBhandleClose} severity="success" sx={{ width: '100%' }}>
                        Đã nhận xét và chấm điểm đề tài
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
export default Scoring;
