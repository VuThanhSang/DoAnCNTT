import classNames from 'classnames/bind';
import styles from './student.module.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Badge, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getListStudent } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';

const cx = classNames.bind(styles);
const years = [];
for (let index = 9; index < 22; index++) {
    years.push({ year: index });
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
        id: 'cnpm',
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

const columns = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'avt', label: 'Ảnh đại diện', minWidth: 100, align: 'center' },
    {
        id: 'mssv',
        label: 'MSSV',
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

function createData(id, stt, avt, mssv, fullName, phoneNumber, majors) {
    return { id, stt, avt, mssv, fullName, phoneNumber, majors };
}

function Students() {
    const [stateMajorsFilter, setStateMajorsFilter] = useState('Tất cả chuyên ngành');
    const [stateYearsFilter, setStateYearsFilter] = useState('Tất cả niên khóa');
    const user = useSelector((state) => state.auth.login?.currentLogin);
    const listStudent = useSelector((state) => state.users.students?.listStudent);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (user?.accessToken) {
            getListStudent(axiosJWT, user?.accessToken, dispatch);
        }
    }, []);
    const rows = [];
    listStudent?.forEach((element) => {
        rows.push(
            createData(element._id, 1, 'AVT', element.MSSV, element.FullName, element.PhoneNumber, element.Majors),
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
    const yearsFilter = (e) => {
        if (e === 'all') {
            setStateYearsFilter('Tất cả niên khóa');
        } else {
            setStateYearsFilter(e);
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
                    <h3> Danh sách Sinh viên</h3>
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
                    <div className={cx('dropdown-years')}>
                        <Dropdown onSelect={yearsFilter}>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="light">
                                {stateYearsFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="">
                                {years.map(({ year }) => (
                                    <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="all">Tất cả niên khóa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <InputGroup className={cx('mb-3', 'search-bar')}>
                        <Form.Control placeholder="Search" aria-label="Text input with checkbox" />
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
                        <Badge bg="secondary">Tổng số lượng sinh viên : {rows.length}</Badge>
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

export default Students;
