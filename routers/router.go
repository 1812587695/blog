package routers

import (
	"blog/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/home", &controllers.HomeController{})
	beego.Router("/photo", &controllers.PhotoController{})
	beego.Router("/photo/update", &controllers.PhotoController{}, "GET:ToUpdate")
	beego.Router("/photo/select", &controllers.PhotoController{}, "GET:TOSelect")
	beego.Router("/photo/one", &controllers.PhotoController{}, "GET:ToOne")
	beego.Router("/photo/updates", &controllers.PhotoController{}, "GET:ToUpdates")
}
