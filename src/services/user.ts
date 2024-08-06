import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

export const getCurrentUser = async ()=>{
    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //     return currentUser;
    // }
    // 用户登录状态不存在，从远程获取
    const res =await myAxios.get('/user/current');
    if (res.code === 0){
        // setCurrentUserState(res.data);
    }
    // 无论成不成功都要返回一个res，这样才能在调用的时候统一判断我们后端封装的响应体的code的值
    return res;
}

export const updateUser =async (updateData:API.CurrentUser)=>{
    return await myAxios.post('/user/update',updateData);
}