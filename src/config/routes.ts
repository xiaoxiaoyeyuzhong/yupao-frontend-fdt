import Index from "../pages/Index.vue"
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/TeamPage', component: TeamPage },
    {path:'/UserPage',component: UserPage},
    {path:'/SearchPage',component: SearchPage}
]

export default routes