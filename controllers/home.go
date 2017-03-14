package controllers

import (
	"blog/models"
	"fmt"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type HomeController struct {
	beego.Controller
}

func (this *HomeController) Get() {
	//	this.Ctx.WriteString("12123123112312233123123")

	//	a := beego.AppConfig.String("httpport")
	//	this.Ctx.WriteString(a)

	// 创建一个 ormer 对象
	o := orm.NewOrm()
	o.Using("default")
	perfile := new(models.Profile)
	perfile.Age = 11

	num, err := o.Insert(perfile)
	//	this.Ctx.
	fmt.Printf("NUM: %d, ERR: %v\n", num, err)

	return
}
