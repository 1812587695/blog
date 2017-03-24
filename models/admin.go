package models

import (
	"github.com/astaxie/beego/orm"
)

//admin表
type Admin struct {
	Id       int
	Name     string
	Password string
}

func (u *Admin) TableName() string {
	//	return "bbs_admin"
	return "admin"
}

func GetOneAdmin(name, pwd string) (*Admin, error) {

	o := orm.NewOrm()
	admin := new(Admin)
	//	qs := o.QueryTable("bbs_admin") 等于 qs := o.QueryTable(admin)
	qs := o.QueryTable(admin)
	err := qs.Filter("name", name).Filter("password", pwd).One(admin)
	if err != nil {
		return nil, err
	}
	return admin, err
}
func init() {
	// 需要在 init 中注册定义的 model
	//	orm.RegisterModel(new(Admin))
	orm.RegisterModelWithPrefix("bbs_", new(Admin))
}
