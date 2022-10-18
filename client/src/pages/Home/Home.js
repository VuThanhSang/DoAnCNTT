import classNames from 'classnames/bind';
import styles from './Home.module.scss';

// or less ideally
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

//component
// import Button from '~/layout/components/Button';
import { ConfigRouter } from '~/config';
import images from '~/asset/images';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('page-title')}>
                    <h3> Thông Báo</h3>
                    <InputGroup className={cx('mb-3', 'search-bar')}>
                        <Form.Control placeholder="Search" aria-label="Text input with checkbox" />
                    </InputGroup>
                </div>
                <ListGroup as="ol" className={cx('list-items')} numbered>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        as="li"
                        className={cx('d-flex', 'justify-content-between', 'align-items-start', 'item')}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
                {/* <div className={cx('dex-text')}>
                    <h1>Cuộc gọi và tin nhắn miễn phí và bảo mật đến mọi người, ở bất kỳ đâu</h1>
                    <h3>Duy trì các trò chuyện của bạn dù bạn ở bất kỳ đâu.</h3>
                    <Button to={ConfigRouter.Login} className={cx('btn-login')}>
                        Đăng nhập ngay
                    </Button>
                </div>
                <div className={cx('des-img')}>
                    <img src={images.connect} alt="img"></img>
                </div> */}
            </div>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
        </div>
    );
}

export default Home;
