package admins

import (
	"blog/models"

	"github.com/astaxie/beego"
)

type RbacController struct {
	BaseController
}

func (this *RbacController) User() {

	admin, err := models.GetAllAdmin()

	if err != nil {
		beego.Error(err)
	} else {
		this.Data["Admin"] = admin

	}

	this.TplName = "admin/rbac/user.html"
}

func (this *RbacController) UserAdd() {

	this.TplName = "admin/rbac/userAdd.html"
}

func (this *RbacController) UserSave() {
	name := this.Input().Get("name")
	pwd := this.Input().Get("password")

	if name == "" && len(pwd) == 0 {
		this.Redirect("/admin/rbac/userAdd", 301)
	}
	_, err := models.Add(name, pwd)
	if err != nil {
		this.Redirect("/admin/rbac/userAdd", 301)
	}
	this.Redirect("/admin/rbac/user", 301)
	return
}
