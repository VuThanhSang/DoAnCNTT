import classNames from 'classnames/bind';
import styles from './student.module.scss';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { filterMajors, getListStudent, searchStudent } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { Buffer } from 'buffer';
import Avatar from '@mui/material/Avatar';
const cx = classNames.bind(styles);
const years = [];
for (let index = 9; index < 22; index++) {
    years.push({ year: index });
}
const majors = [
    {
        name: 'Công nghệ phần mềm',
        id: 'CNPM',
    },
    {
        name: 'Hệ thống thông tin',
        id: 'HTTT',
    },
    {
        name: 'An toàn thông tin',
        id: 'ATTT',
    },
];

function Students() {
    const [stateMajorsFilter, setStateMajorsFilter] = useState('Tất cả chuyên ngành');
    const [stateYearsFilter, setStateYearsFilter] = useState('Tất cả niên khóa');
    const [stateSearchValue, setStateSearchValue] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [listStudent, setStateListStudent] = useState(null);
    const user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (user?.accessToken) {
            getListStudent(axiosJWT, user?.accessToken, dispatch).then((data) => {
                setStateListStudent(data.student);
            });
        }
    }, []);
    useEffect(() => {
        const accessToken = user?.accessToken;
        searchStudent(axiosJWT, accessToken, stateSearchValue).then((data) => {
            // console.log(data);
            // console.log(stateSearchValue);
            setStateListStudent(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateSearchValue]);
    const rows = [];
    let count = 1;
    listStudent?.forEach((element) => {
        let base64String = '';
        if (element?.Avatar?.img) {
            const imgData = Buffer.from(element?.Avatar?.img, 'base64');
            base64String = btoa(String.fromCharCode(...new Uint8Array(imgData)));
        }
        rows.push({
            id: count,
            col1: count++,
            col2: element.MSSV,
            col3: base64String,
            col4: element.FullName,
            col5: element.Email,
            col6: element.phoneNumber,
            col7: element.Majors,
        });
    });
    const columns = [
        { field: 'col1', headerName: 'Stt', width: 50 },
        { field: 'col2', headerName: 'MSSV', width: 150 },
        {
            field: 'col3',
            headerName: 'Ảnh Đại Diện',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Avatar sx={{ width: 50, height: 50 }} src={`data:image/png;base64,${params.value}`} />
                        {/* {params.value.username} */}
                    </>
                );
            },
        },
        { field: 'col4', headerName: 'Họ Và Tên', width: 150 },
        { field: 'col5', headerName: 'Email', width: 250 },
        { field: 'col6', headerName: 'Số Điện Thoại', width: 150 },
        { field: 'col7', headerName: 'Chuyên Ngành', width: 150 },
    ];

    const MajorsFilter = (e) => {
        if (e === 'all') {
            setStateMajorsFilter('Tất cả chuyên ngành');
            searchStudent(axiosJWT, user?.accessToken, '').then((data) => {
                // console.log(data);
                // console.log(stateSearchValue);
                setStateListStudent(data);
            });
        } else {
            const major = majors.find((data) => data.id === e);
            setStateMajorsFilter(major.name);
            filterMajors(axiosJWT, user?.accessToken, e).then((data) => {
                setStateListStudent(data);
            });
        }
    };
    const yearsFilter = (e) => {
        if (e === 'all') {
            setStateYearsFilter('Tất cả niên khóa');
        } else {
            setStateYearsFilter(e);
        }
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
                    <div style={{ height: 520, width: '100%' }}>
                        <DataGrid
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            rows={rows}
                            columns={columns}
                            rowHeight={100}
                        />
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default Students;
