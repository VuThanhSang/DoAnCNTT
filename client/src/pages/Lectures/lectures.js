import classNames from 'classnames/bind';
import styles from './lectures.module.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Badge, Dropdown, Form, InputGroup } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { getListLecture, searchLecture } from '~/redux/apiRequest';

const cx = classNames.bind(styles);
const columns = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'avt', label: 'Ảnh đại diện', minWidth: 100, align: 'center' },
    {
        id: 'email',
        label: 'Email',
        minWidth: 200,
        align: 'center',
    },
    {
        id: 'fullName',
        label: 'Họ Tên',
        minWidth: 200,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phoneNumber',
        label: 'SĐT',
        minWidth: 200,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'majors',
        label: 'Chuyên ngành',
        minWidth: 200,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

function createData(id, stt, avt, email, fullName, phoneNumber, majors) {
    return { id, stt, avt, email, fullName, phoneNumber, majors };
}

const majors = [
    {
        name: 'Công nghệ phần mềm',
        id: 'cnpm',
    },
    {
        name: 'Hệ thống thông tin',
        id: 'httt',
    },
    {
        name: 'Mạng máy tính',
        id: 'mmt',
    },
    {
        name: 'Kỹ thuật dữ liệu',
        id: 'ktdl',
    },
    {
        name: 'Trí tuệ nhân tạo',
        id: 'ttnt',
    },
    {
        name: 'An toàn thông tin ',
        id: 'attt',
    },
];
function Lectures() {
    const [stateMajorsFilter, setStateMajorsFilter] = useState('Tất cả chuyên ngành');
    const user = useSelector((state) => state.auth.login?.currentLogin);
    const [listLecture, setStateListLecture] = useState(null);
    const [stateSearchValue, setStateSearchValue] = useState(null);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (user?.accessToken) {
            getListLecture(axiosJWT, user?.accessToken, dispatch).then((data) => {
                setStateListLecture(data.lecture);
            });
        }
    }, []);
    useEffect(() => {
        searchLecture(stateSearchValue).then((data) => {
            setStateListLecture(data);
        });
    }, [stateSearchValue]);
    console.log(listLecture);
    const rows = [];
    listLecture?.forEach((element) => {
        rows.push(
            createData(element._id, 1, 'AVT', element.Email, element.FullName, element.PhoneNumber, element.Majors),
        );
    });
    const MajorsFilter = (e) => {
        if (e === 'all') {
            setStateMajorsFilter('Tất cả chuyên ngành');
        } else {
            const major = majors.find((data) => data.id === e);
            setStateMajorsFilter(major.name);
        }
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('des')}>
                <div className={cx('page-title')}>
                    <h3> Danh sách giảng viên</h3>
                    <div className={cx('dropdown-majors')}>
                        <Dropdown onSelect={MajorsFilter}>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="light">
                                {stateMajorsFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="">
                                {majors.map(({ name, id }) => (
                                    <Dropdown.Item eventKey={id}>{name}</Dropdown.Item>
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="all">Tất cả chuyên ngành </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <InputGroup className={cx('mb-3', 'search-bar')}>
                        <Form.Control
                            onChange={(e) => {
                                setStateSearchValue(e.target.value);
                            }}
                            placeholder="Search"
                            aria-label="Text input with checkbox"
                        />
                    </InputGroup>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 430 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <h6 className={cx('student-total')}>
                        <Badge bg="secondary">Tổng số lượng giảng viên : {rows.length}</Badge>
                    </h6>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default Lectures;
