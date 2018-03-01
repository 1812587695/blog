package admins

import (
	"blog/models"
)

type IndexController struct {
	//	beego.Controller
	BaseController
}

func (this *IndexController) Get() {

	//	adminId := this.GetSession("adminId")
	//	this.Data["name"] = adminId

	admin := this.GetSession("admin")
	admin_info := admin.(*models.Admin)
	this.Data["name"] = admin_info.Name

	this.TplName = "admin/index/index.html"
}
