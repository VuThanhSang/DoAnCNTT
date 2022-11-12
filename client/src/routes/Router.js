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
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
