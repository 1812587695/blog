package models

import (
	//	"fmt"
	//	"strconv"
	"time"

	"github.com/astaxie/beego/orm"
)

//相册表
type Photo struct {
	Id       int64
	Albumid  int64
	Des      string    `orm:"size(100)"`
	Posttime time.Time `orm:"type(datetime);index"`
	Url      string    `orm:"size(70)"`
	Small    string    `orm:"-"`
}

//func (m *Photo) TableName() string {
//	return TableName("photo")
//}

func (m *Photo) Insert() (int64, error) {
	id, err := orm.NewOrm().Insert(m)
	//	if err != nil {
	//		return id, err
	//	}
	return id, err
}

func GetAllPhoto() ([]*Photo, error) {
	o := orm.NewOrm()
	photo := make([]*Photo, 0)
	qs := o.QueryTable("photo")
	_, err := qs.All(&photo) // 返回总数量和错误信息
	//	fmt.Println("111111111111111111111111111111111111")
	//	fmt.Println(a)
	return photo, err
}

func GetOnePhoto() (*Photo, error) {
	//	o := orm.NewOrm()
	//	photo := make([]*Photo, 0)
	//	err := o.QueryTable("photo").Filter("id", 1).One(&photo)

	//	return photo, err

	o := orm.NewOrm()
	photo := new(Photo)
	qs := o.QueryTable("Photo")
	err := qs.Filter("id", 1).One(photo)
	if err != nil {
		return nil, err
	}
	return photo, err
}

func UpdatePhone() {

	o := orm.NewOrm()
	//id, _ := strconv.ParseInt("1", 10, 64)

	photo := &Photo{Id: 1}

	if o.Read(photo) == nil {
		photo.Des = "ddddddddd"
		o.Update(photo)
	}

}

func init() {
	// 需要在 init 中注册定义的 model
	orm.RegisterModel(new(Photo))
}
