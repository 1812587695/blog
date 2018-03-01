package main

import (
	_ "blog/routers"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"

	"github.com/astaxie/beego"
	//	_ "github.com/astaxie/beego/session/mysql"
	//	_ "github.com/astaxie/beego/session/redis"
)

func init() {
	// 注册驱动
	orm.RegisterDriver("mysql", orm.DRMySQL)
	// 注册默认数据库
	// 我的mysql的root用户密码为root，打算把数据表建立在名为beego数据库里
	// 备注：此处第一个参数必须设置为“default”（因为我现在只有一个数据库），否则编译报错说：必须有一个注册DB的别名为 default
	orm.RegisterDataBase("default", "mysql", "root:root@tcp(127.0.0.1:3307)/beego_blog?charset=utf8")

	//	beego.BConfig.WebConfig.Session.SessionProvider = "file"
	//	beego.BConfig.WebConfig.Session.SessionProviderConfig = "./tmp"

	//	beego.BConfig.WebConfig.Session.SessionProvider = "mysql"
	//	beego.BConfig.WebConfig.Session.SessionProviderConfig = "root:root@/beego"

	//	beego.BConfig.WebConfig.Session.SessionProvider = "redis"
	//	beego.BConfig.WebConfig.Session.SessionProviderConfig = "192.168.0.228:6379"
}

func main() {
	// 开启 orm 调试模式：开发过程中建议打开，release时需要关闭
	orm.Debug = true
	// 自动建表
	// true 改成false，如果表存在则会给出提示，如果改成false则不会提示 ， 这句话没有会报主键不存在的错误
	//	orm.RunSyncdb("default", false, true)

	beego.Run()
}
