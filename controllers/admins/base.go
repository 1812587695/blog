package admins

import (
	//	"blog/models"
	"fmt"

	"github.com/astaxie/beego"
)

type BaseController struct {
	beego.Controller
}

// 初始化会运行这个方法
func (this *BaseController) Prepare() {
	// 检查登录功
	this.CheckLogin()
}

// 检查登录功能
func (this *BaseController) CheckLogin() {
	admin := this.GetSession("admin")
	fmt.Println(this.CruSession.SessionID())
	//	admin_info := admin.(models.Admin)
	if admin == nil {
		this.Redirect("/admin/login", 302)
	}

}
