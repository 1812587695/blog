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

func (this *HomeController) Json() {
	var countryCapitalMap map[string]string
	/* 创建集合 */
	countryCapitalMap = make(map[string]string)

	/* map 插入 key-value 对，各个国家对应的首都 */
	countryCapitalMap["France"] = "Paris"
	countryCapitalMap["Italy"] = "Rome"
	countryCapitalMap["Japan"] = "Tokyo"
	countryCapitalMap["India"] = "New Delhi"

	this.Data["json"] = &countryCapitalMap
	this.ServeJSON()
	//	this.ServeXML()
	//	this.ServeJSONP()
	return
}
