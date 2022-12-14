// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Resetpass from '~/pages/Resetpass';
import Students from '~/pages/Students';
import Lectures from '~/pages/Lectures';
import UserProfile from '~/pages/UserProfile';
import Project from '~/pages/Project';
import ProjectDetails from '~/pages/Project/ProjectDetails';
import RegisterMajors from '~/pages/Register/Majors/majors';
import RProject from '~/pages/Register/Project/project';
import History from '~/pages/Students/RegistrationHistory/history';
import CreateProject from '~/pages/Project/CreateProject';
import StudentReport from '~/pages/Students/Report/report';
import Scoring from '~/pages/Lectures/Scoring';
import GuideLogin from '~/pages/Login/guide/guideLogin';
import GroupManager from '~/pages/Students/GroupManager';
import Search from '~/pages/Search';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.Login, component: Login, layout: null },
    { path: ConfigRouter.Signup, component: Signup, layout: null },
    { path: ConfigRouter.Resetpass, component: Resetpass, layout: null },
    { path: ConfigRouter.Students, component: Students },
    { path: ConfigRouter.Lectures, component: Lectures },
    { path: ConfigRouter.UserProfile, component: UserProfile },
    { path: ConfigRouter.Project, component: Project },
    { path: ConfigRouter.ProjectDetails, component: ProjectDetails },
    { path: ConfigRouter.RegisterMajors, component: RegisterMajors },
    { path: ConfigRouter.RegisterProject, component: RProject },
    { path: ConfigRouter.History, component: History },
    { path: ConfigRouter.CreateProject, component: CreateProject },
    { path: ConfigRouter.StudentReport, component: StudentReport },
    { path: ConfigRouter.Scoring, component: Scoring },
    { path: ConfigRouter.GuideLogin, component: GuideLogin },
    { path: ConfigRouter.GroupManager, component: GroupManager },
    { path: ConfigRouter.Search, component: Search },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
