package controllers

import (
	"blog/models"
	"fmt"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/liudng/godump"
)

type PhotoController struct {
	beego.Controller
}

func (this *PhotoController) Get() {

	var photo models.Photo
	photo.Albumid = 23123
	photo.Des = "山东省地方水电费"
	photo.Posttime = time.Now()
	photo.Url = "http://www.baidu.com"

	id, err := photo.Insert()
	fmt.Printf("NUM: %d, ERR: %v\n", id, err)
}

/**
*修改
 */
func (this *PhotoController) ToUpdate() {
	//	this.Ctx.WriteString("123123")
	o := orm.NewOrm()
	num, err := o.QueryTable("photo").Filter("id", "1").Update(orm.Params{
		"des": "111", "albumid": 3,
	})
	fmt.Printf("Affected Num: %s, %s", num, err)
	return
}

func (this *PhotoController) TOSelect() {
	photo, err := models.GetAllPhoto()
	//	photo, err := models.GetOnePhoto()
	if err != nil {
		beego.Error(err)
	} else {
		godump.Dump(photo)
		this.Data["Photo"] = photo

	}

}

func (this *PhotoController) ToOne() {
	//		this.Ctx.WriteString("123123")
	photo, err := models.GetOnePhoto()
	if err != nil {
		beego.Error(err)
	}
	//	var a = photo[1:2]
	//	fmt.Println(photo)
	this.Ctx.WriteString(fmt.Sprint(photo))
	return
	//	this.Ctx.WriteString(photo[0])
	//	beego.Debug(photo)
	//	this.TplName = "aa/1.html"

	//	godump.Dump(photo)
}

func (this *PhotoController) ToUpdates() {
	//	this.Ctx.WriteString("123123")
	models.UpdatePhone()
}
