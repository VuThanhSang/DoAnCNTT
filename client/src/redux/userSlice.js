import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        students: {
            listStudent: null,
            isFetching: false,
            error: false,
        },
        lectures: {
            listLecture: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getListStudentStart: (state) => {
            state.students.isFetching = true;
        },
        getListStudentSuccess: (state, action) => {
            state.students.isFetching = false;

            state.students.listStudent = action.payload.data.student;
            state.students.error = false;
        },
        getListStudentFailed: (state) => {
            state.students.isFetching = false;
            state.students.listStudent = null;
            state.students.error = true;
        },
        getListLectureStart: (state) => {
            state.lectures.isFetching = true;
        },
        getListLectureSuccess: (state, action) => {
            state.lectures.isFetching = false;
            state.lectures.listLecture = action.payload.data.lecture;
            state.lectures.error = false;
        },
        getListLectureFailed: (state) => {
            state.lectures.isFetching = false;
            state.lectures.error = true;
            state.lectures.listLecture = null;
        },
    },
});

export const {
    getListStudentStart,
    getListStudentSuccess,
    getListStudentFailed,
    getListLectureStart,
    getListLectureSuccess,
    getListLectureFailed,
} = userSlice.actions;
export default userSlice.reducer;
