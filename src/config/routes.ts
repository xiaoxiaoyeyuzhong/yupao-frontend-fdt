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
    { path: '/TeamPage',title:'找队伍', component: TeamPage },
    {path: '/TeamPage/TeamAddPage',title:'创建队伍',component: TeamAddPage},
    {path: '/TeamPage/TeamUpdatePage',title:'更新队伍',component: TeamUpdatePage},
    {path:'/SearchPage',title:'找伙伴',component: SearchPage},
    {path:'/UserPage',title:'个人信息',component: UserPage},
    {path: '/UserPage/EditUserPage',title:'编辑个人信息',component: EditUserPage},
    {path: '/UserPage/SearchResultPage',title:'搜索结果页',component: SearchResultPage},
    {path: '/UserPage/UserLoginPage',title:'用户登录',component: UserLoginPage},
    {path: '/UserPage/UserUpdatePage',title:'更新个人信息',component: UserUpdatePage},
    {path: '/UserPage/TeamPage/UserTeamJoinPage',title:'我加入的队伍',component: UserTeamJoinPage},
    {path: '/UserPage/TeamPage/UserTeamCreatePage',title:'我创建的队伍',component: UserTeamCreatePage},


]

export default routes