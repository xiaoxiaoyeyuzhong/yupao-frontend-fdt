import Index from "../pages/Index.vue"
import TeamPage from "../pages/TeamPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpatePage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/TeamPage', component: TeamPage },
    {path: '/TeamPage/TeamAddPage',component: TeamAddPage},
    {path: '/TeamPage/TeamUpdatePage',component: TeamUpdatePage},
    {path:'/SearchPage',component: SearchPage},
    {path:'/UserPage',component: UserPage},
    {path: '/UserPage/EditUserPage',component: EditUserPage},
    {path: '/UserPage/SearchResultPage',component: SearchResultPage},
    {path: '/UserPage/UserLoginPage',component: UserLoginPage},
    {path: '/UserPage/UserUpdatePage',component: UserUpdatePage},
    {path: '/UserPage/TeamPage/UserTeamJoinPage',component: UserTeamJoinPage},
    {path: '/UserPage/TeamPage/UserTeamCreatePage',component: UserTeamCreatePage},


]

export default routes