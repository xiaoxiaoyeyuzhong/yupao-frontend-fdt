import Index from "../pages/Index.vue"
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/TeamPage', component: TeamPage },
    {path:'/UserPage',component: UserPage},
    {path:'/SearchPage',component: SearchPage},
    {path: '/UserPage/EditUserPage',component: EditUserPage},
    {path: '/UserPage/SearchResultPage',component: SearchResultPage},
    {path: '/UserPage/UserLoginPage',component: UserLoginPage},
]

export default routes