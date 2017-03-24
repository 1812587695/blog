package admins

import (
	//	"blog/models"

	"github.com/astaxie/beego"
	//	"github.com/astaxie/beego/orm"
)

type IndexController struct {
	beego.Controller
}

func (this *IndexController) Getww() {
	this.Data["name"] = "admin"
	this.TplName = "admin/index/index.html"
}
