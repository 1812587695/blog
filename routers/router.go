package routers

import (
	"blog/controllers"
	"blog/controllers/admins"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/home", &controllers.HomeController{})
	beego.Router("/home/json", &controllers.HomeController{}, "GET:Json")
	beego.Router("/photo", &controllers.PhotoController{})
	beego.Router("/photo/update", &controllers.PhotoController{}, "GET:ToUpdate")
	beego.Router("/photo/select", &controllers.PhotoController{}, "GET:TOSelect")
	beego.Router("/photo/one", &controllers.PhotoController{}, "GET:ToOne")
	beego.Router("/photo/updates", &controllers.PhotoController{}, "GET:ToUpdates")

	beego.Router("/admin", &admins.IndexController{}, "GET:Get")
	beego.Router("/admin/login", &admins.LoginController{}, "GET:Get")
	beego.Router("/admin/login/post", &admins.LoginController{}, "POST:Post")
	beego.Router("/admin/login/loginOut", &admins.LoginController{}, "get:LoginOut")

	beego.Router("/admin/rbac/user", &admins.RbacController{}, "get:User")
	beego.Router("/admin/rbac/userAdd", &admins.RbacController{}, "get:UserAdd")
	beego.Router("/admin/rbac/userSave", &admins.RbacController{}, "post:UserSave")

}
