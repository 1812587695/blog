package controllers

import (
	"blog/models"
	"fmt"
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

	id, err := photo.Insert()
	fmt.Printf("NUM: %d, ERR: %v\n", id, err)
}
