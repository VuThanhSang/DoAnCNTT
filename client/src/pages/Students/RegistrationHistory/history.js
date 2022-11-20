import classNames from 'classnames/bind';
import styles from './history.module.scss';

// or less ideally
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

//component
// import Button from '~/layout/components/Button';
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useEffect, useState } from 'react';
import { registrationHistory } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function History() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    const [histories, setHistories] = useState([]);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        registrationHistory(axiosJWT, user?.accessToken, user?.user?.data?._id).then((data) => {
            setHistories(data);
        });
    }, []);
    console.log(histories);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('page-title')}>
                    <h3> Lịch sử đăng ký</h3>
                    <InputGroup className={cx('mb-3', 'search-bar')}>
                        <Form.Control placeholder="Search" aria-label="Text input with checkbox" />
                    </InputGroup>
                </div>
                <ListGroup as="ol" className={cx('list-items')} numbered>
                    {histories &&
                        histories.map((item) => (
                            <ListGroup.Item
                                action
                                as="li"
                                className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"> {item.ProjectDetails[0].Name}</div>
                                    {item.ProjectDetails[0].Instructor}
                                </div>
                                <Badge bg="primary" pill>
                                    {new Date(item.registeredDate).toDateString()}
                                </Badge>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </div>
        </div>
    );
}

export default History;
