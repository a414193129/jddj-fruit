# jddj-fruit
不是我写的 白嫖的 
人家原版https://gitee.com/passerby-b/javascript/tree/master/JD 

//用抓包抓 https://daojia.jd.com/html/index.html 页面cookie填写到下面,暂时不知cookie有效期
//抓多账号直接清除浏览器缓存再登录新账号,千万别点退出登录,否则cookie失效
//cookie只要里面的deviceid_pdj_jd=xxx-xxx-xxx;o2o_m_h5_sid=xxx-xxx-xxx关键信息
//京东到家鲜豆任务脚本,支持qx,loon,shadowrocket,surge,nodejs 
 //用抓包抓 https://daojia.jd.com/html/index.html 页面cookie填写到下面,暂时不知cookie有效期 
 //抓多账号直接清除浏览器缓存再登录新账号,千万别点退出登录,否则cookie失效 
 //cookie只要里面的deviceid_pdj_jd=xxx-xxx-xxx;o2o_m_h5_sid=xxx-xxx-xxx关键信息 
 //一天运行一次 
 //boxjs订阅地址:https://gitee.com/passerby-b/javascript/raw/master/JD/passerby-b.boxjs.json 
 
 boxjs订阅好，然后cookies抓一下  放圈x跑

0 8,11,16 * * * https://gitee.com/passerby-b/javascript/raw/master/JD/jddj_fruit.js , tag=京东到家果园任务, enabled=true
0 6 * * * https://gitee.com/passerby-b/javascript/raw/master/JD/jddj_bean.js , tag=京东到家鲜豆任务, enabled=true
*/5 * * * * https://gitee.com/passerby-b/javascript/raw/master/JD/jddj_getPoints.js , tag=京东到家鲜豆庄园收水滴, enabled=true
0 6 * * * https://gitee.com/passerby-b/javascript/raw/master/JD/jddj_plantBeans.js , tag=京东到家鲜豆庄园, enabled=true
