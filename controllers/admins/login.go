package admins

import (
	"blog/models"
	//	"crypto/md5"
	//	"fmt"
	//	"strconv"

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

	//	byte_pwd := []byte(pwd)
	//	has_pwd := md5.Sum(byte_pwd)
	//	pwd = fmt.Sprintf("%x", has_pwd) //将[]byte转成16进制
	//	this.Ctx.WriteString(pwd)
	//	return
	if name == "" && len(pwd) == 0 {
		//		this.Abort("401")
		//		this.Ctx.WriteString("名称或者密码不能为空")
		this.Redirect("/admin/login", 301)
	}

	admin, err := models.GetOneAdmin(name, pwd)
	if err != nil {
		this.Redirect("/admin/login", 301)
	}
	//	fmt.Println("aaaaaaaaaaaaaaaaaaaaaa", admin.Id)
	//	this.Ctx.WriteString(fmt.Sprint(admin.Id))

	//	this.SetSession("adminId", admin.Id)

		//fmt.Println("aaaaaaaaaaaaaaaaaaaaaa", admin)
	this.SetSession("admin", admin)

	this.Redirect("/admin", 301)

	return
}

func (this *LoginController) LoginOut() {
	this.DelSession("admin")
	this.Redirect("/admin/login", 301)
}
