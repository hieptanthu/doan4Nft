import page from "../pages"

var routerAdmin=[
    {
        path:"home",
        element:page.admin.Home,
        sate:""
    }
]
var routerUser =[
    {
        path:"home",
        element:page.user.Home,
        sate:""
    }
]



var router= {
    admin:routerAdmin,
    user:routerUser
}

export default router