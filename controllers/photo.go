package controllers

import (
	"blog/models"

	"time"

	"github.com/astaxie/beego"
	//	"github.com/astaxie/beego/orm"
)

type PhotoController struct {
	beego.Controller
}

func (this *PhotoController) Get() {

	var photo models.Photo
	photo.Albumid = 123
	photo.Des = "山东省地方水电费"
	photo.Posttime = time.Now()
	photo.Url = "http://www.baidu.com"
	photo.Insert()
	//	if err := photo.Insert(); err != nil {
	//		this.showmsg(err.Error())
	//	}
}
