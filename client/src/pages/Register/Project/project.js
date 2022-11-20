import classNames from 'classnames/bind';
import styles from './project.module.scss';

// or less ideally
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import PageviewIcon from '@mui/icons-material/Pageview';
//component
// import Button from '~/layout/components/Button';
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { getProjectTypeList, getProjectList, searchProject, getListOfMajors } from '~/redux/apiRequest';
import { useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function RProject() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const [stateProjectList, setStateProjectList] = useState(null);
    const [stateSearchValue, setStateSearchValue] = useState('');
    useEffect(() => {
        getListOfMajors(user?.user?.data?.Majors).then((data) => {
            console.log(data);
            setStateProjectList(data);
        });
    }, []);
    const searchChange = async (e) => {
        searchProject(e.target.value).then((data) => {
            setStateProjectList(data.project);
        });
    };

    // console.log(stateTypeList);
    // const projectTypeList = getProjectTypeList();
    // console.log(projectTypeList);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    console.log(stateProjectList);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('page-title')}>
                    <h3> Danh sách loại đề tài</h3>
                    <InputGroup className={cx('mb-3', 'search-bar')}>
                        <>
                            <Form.Control
                                placeholder="Search"
                                className={cx('search-box')}
                                onChange={searchChange}
                                aria-label="Text input with checkbox"
                            />
                        </>
                    </InputGroup>
                </div>
                <ListGroup as="ol" className={cx('list-items')} numbered>
                    {stateProjectList &&
                        stateProjectList?.map((item) => {
                            if (item.Majors === user?.user?.data?.Majors) {
                                return (
                                    <ListGroup.Item
                                        key={item._id}
                                        action
                                        as="li"
                                        // onClick={() => selectTypeHandle(item._id.ProjectType.TypeId)}
                                        className={cx('justify-content-flexStart', 'align-items-center', 'item')}
                                    >
                                        <Accordion
                                            className={cx('item-content')}
                                            expanded={expanded === item._id}
                                            onChange={handleChange(item._id)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography sx={{ color: 'black' }}>{item.Name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography className={cx('dropdown-content')}>
                                                    <Divider />
                                                    <p>Chuyên Ngành: {item?.Majors}</p>
                                                    <p>
                                                        Tình Trạng:{' '}
                                                        {item?.Status ? 'Đã Được Đăng Ký' : 'Chưa Được Đăng ký'}
                                                    </p>
                                                    Số Lượng: <Badge bg="primary">{item?.TotalStudents}</Badge>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Link to={`/projects/${item._id}`} params={{ id: item._id }}>
                                            <PageviewIcon className={cx('icon')} />
                                        </Link>
                                    </ListGroup.Item>
                                );
                            }
                        })}
                </ListGroup>
            </div>
        </div>
    );
}

export default RProject;
