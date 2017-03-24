package admins

import (
	"blog/models"
	"fmt"

	"github.com/astaxie/beego"
)

type LoginController struct {
	beego.Controller
}

func (this *LoginController) Get() {

	this.TplName = "admin/login/index.html"
}

func (this *LoginController) Post() {
	//已字符串格式输出内容
	//	this.Ctx.WriteString(fmt.Sprint(this.Input()))

	name := this.Input().Get("username")
	pwd := this.Input().Get("password")
	if name == "" && len(pwd) == 0 {
		this.Abort("401")
		this.Ctx.WriteString("名称或者密码不能为空")
		this.Redirect("/admin/login", 301)
	}
	admin, err := models.GetOneAdmin(name, pwd)
	if err != nil {
		beego.Error(err)
	}
	fmt.Println("aaaaaaaaaaaaaaaaaaaaaa", admin.Id)
	this.Ctx.WriteString(fmt.Sprint(admin.Id))

	return
}
