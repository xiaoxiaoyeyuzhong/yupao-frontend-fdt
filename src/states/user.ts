let currentUser: API.CurrentUser;

//定义参数的类型是API.CurrentUser
const setCurrentUserState=(user:API.CurrentUser) => {
    currentUser = user;
}
// API.CurrentUser的位置是定义返回值的类型
const getCurrentUserState = ():API.CurrentUser => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}