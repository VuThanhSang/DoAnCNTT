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
                <h4>Hiện không có thông báo</h4>
            </div>
        </div>
    );
}

export default Home;
