import classNameNames from 'classnames/bind';
import styles from './createProject.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import Button from '~/layout/components/Button';
import {
    Avatar,
    CardContent,
    CardHeader,
    CardMedia,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { createNewProject, updateStudentProfile } from '~/redux/apiRequest';
import { YearRangePicker } from 'react-year-range-picker';
const cx = classNameNames.bind(styles);
function CreateProject() {
    let user = useSelector((state) => state.auth.login?.currentLogin);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [yearRange, setYearRange] = useState({});
    const [radioValue, setRadioValue] = React.useState('false');
    const [Name, setName] = useState('');
    const [Goal, setGoal] = useState('');
    const [Product, setProduct] = useState('');
    const [Majors, setMajors] = useState('');
    const [TypeName, setTypeName] = useState('');
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };
    const btnSubmitHandler = (e) => {
        const data = {
            Name: Name,
            Goal: Goal,
            Product: Product,
            Instructor: user.user.data._id,
            Majors: Majors,
            ProjectType: { TypeName: TypeName, TypeId: yearRange.startYear + ' ' + yearRange.endYear },
        };
        createNewProject(axiosJWT, user.accessToken, data).then((data) => {
            console.log(data);
        });
    };
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('form-signup')}>
                    <h3>T???o ????? t??i m???i</h3>
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="T??n ????? t??i"
                        variant="outlined"
                        defaultValue=""
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="M???c Ti??u"
                        variant="outlined"
                        defaultValue=""
                        onChange={(e) => {
                            setGoal(e.target.value);
                        }}
                    />
                    <TextField
                        className={cx('form-input')}
                        id="outlined-basic"
                        label="S???n ph???m"
                        variant="outlined"
                        defaultValue=""
                        onChange={(e) => {
                            setProduct(e.target.value);
                        }}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={Majors}
                            onChange={(e) => {
                                setMajors(e.target.value);
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Ch???n Chuy??n Ng??nh</em>
                            </MenuItem>
                            <MenuItem value="CNPM">C??ng Ngh??? ph???n m???m</MenuItem>
                            <MenuItem value="ATTT">An To??n Th??ng tin </MenuItem>
                            <MenuItem value="HTTT">H??? Th???ng th??ng tin</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={TypeName}
                            onChange={(e) => {
                                setTypeName(e.target.value);
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Ch???n Lo???i ????? t??i</em>
                            </MenuItem>
                            <MenuItem value="Ti???u lu???n chuy??n ng??nh">Ti???u lu???n chuy??n ng??nh</MenuItem>
                            <MenuItem value="????? t??i t???t nghi???p">????? t??i t???t nghi???p </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-column-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className={cx('radioGroup')}
                            value={radioValue}
                            onChange={handleRadioChange}
                        >
                            <FormLabel id="demo-column-radio-buttons-group-label">
                                ???????c ph??p ????ng k?? kh??c chuy??n ng??nh
                            </FormLabel>
                            <FormControlLabel value="true" control={<Radio />} label="C??" />
                            <FormControlLabel value="false" control={<Radio />} label="Kh??ng" />
                        </RadioGroup>
                    </FormControl>
                    <div className={cx('year-picker')}>
                        <h4>Ni??n kh??a</h4>
                        <YearRangePicker
                            minYear={new Date().getFullYear() - 2}
                            maxYear={new Date().getFullYear() + 2}
                            onSelect={(startYear, endYear) => {
                                console.log(startYear, endYear);
                                setYearRange({ startYear, endYear });
                            }}
                            startYear={yearRange?.startYear}
                            endYear={yearRange?.endYear}
                            selectedColor="#0963b5"
                        />
                    </div>
                    <Button onClick={btnSubmitHandler} className={cx('btn-signup')}>
                        T???o ????? t??i
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default CreateProject;
