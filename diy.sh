#!/usr/bin/env bash
dir_backup=/jd/config/backup/
dir_scripts=/jd/scripts
dir_own=/jd/own

echo -e '\n############################## 解除Cookie数量限制 ##############################'
sed -i 's/${SUM.*}/999/' ${dir_root}/jshare.sh
sed -i '/rm -rf/d' ${dir_root}/jtask.sh
sed -i '/user_sum -ge/d' ${dir_root}/jcode.sh
sed -i '/user_sum -ge/d' ${dir_root}/jcsv.sh
sed -i '/user_sum -ge/d' ${dir_root}/jlog.sh
sed -i '/user_sum -ge/d' ${dir_root}/jshare.sh
sed -i '/user_sum -ge/d' ${dir_root}/jtask.sh
sed -i '/user_sum -ge/d' ${dir_root}/jup.sh
if [ $? -eq 0 ]; then
  echo '解除成功'
fi

#增加环境变量，按个人需要开启启动项,true开启，false关闭
export ENABLE_WEB_PANEL=true  #开启网页控制面板
export ENABLE_TTYD=true       #开启网页TTYD终端
export ENABLE_HANGUP=false     #开启Joy挂载服务

#定义目录
PanelBackupPath=$JD_DIR/config/panel
PanelPath=$JD_DIR/panel
Serverfile=$PanelPath/server.js
Authfile=$JD_DIR/config/auth.json

#清空pm2日志
rm -rf /root/.pm2/logs/* 2>/dev/null  

#判断panel文件夹是否存在，若不存在，复制/jd目录内
if [[ ! -d $PanelPath ]]; then
 echo "控制面板已和谐，重新拷贝面板目录..."
 cp -r $PanelBackupPath $JD_DIR/
else
 echo "控制面板还存在."
fi

#判断auth.json文件是否存在
if [ ! -f "$Authfile" ];then
echo "auth.json文件缺失，创建auth.json文件..."
touch $Authfile
echo '{"user":"admin","password":"adminadmin"}' > $Authfile
echo "auth.json文件创建成功！"
fi

#判断是否存在ttydz终端,没有则复制ttyd
if [[ $is_termux -eq 1 ]] && type ! ttyd >/dev/null 2>&1; then
    pkg update
    pkg install ttyd
elif [ ! -f /usr/local/bin/ttyd ]; then
    cp -f "$PanelPath/ttyd/ttyd.$(uname -m)" /usr/local/bin/ttyd
    ttyd_status=$?
    [ ! -x /usr/local/bin/ttyd ] && chmod +x /usr/local/bin/ttyd
    [[ $ttyd_status -ne 0 ]] && echo -e "CPU架构暂不支持，无法正常使用网页终端！\n"
fi

#启动网页终端
if [[ $ENABLE_WEB_PANEL == true ]]; then
    if [[ $ENABLE_TTYD == true ]]; then
    echo -e "======================== 启动网页终端 ========================\n"
        pm2 id ttyd
        ttyd_check_results=$(pm2 id ttyd)
        if [[ $ttyd_check_results == "[]" ]]; then
            ## 增加环境变量
            export PS1="\u@\h:\w $ "
            pm2 start ttyd --name="ttyd" -- -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash

            if [[ $? -eq 0 ]]; then
                echo -e "网页终端启动成功...\n"
            else
                echo -e "网页终端启动失败，但容器将继续启动...\n"
            fi
        else
        echo -e "网页终端已经启动了.\n"
        fi
    elif [[ $ENABLE_TTYD == false ]]; then
        echo -e "已设置为不自动启动网页终端，跳过...\n"
    fi
else
    echo -e "已设置为不自动启动控制面板，因此也不启动网页终端...\n"
fi

#启动控制面板
echo -e "======================== 启动控制面板 ========================\n"
if [[ $ENABLE_WEB_PANEL == true ]]; then
    pm2 id server
    server_check_results=$(pm2 id server)
    if [[ $server_check_results == "[]" ]]; then
        pm2 start $Serverfile
        if [[ $? -eq 0 ]]; then
            echo -e "控制面板启动成功...\n"
            echo -e "如未修改用户名密码，则初始用户名为：admin，初始密码为：adminadmin\n"
            echo -e "请访问 http://<ip>:5678 登陆并修改配置...\n"
        else
            echo -e "控制面板启动失败或控制面板已经启动了，容器将继续启动...\n"
        fi
    else
    echo -e "控制面板已经启动了.\n"
    fi
elif [[ $ENABLE_WEB_PANEL == false ]]; then
    echo -e "已设置为不自动启动控制面板，跳过...\n"
fi

#启动挂机程序
if [[ $ENABLE_HANGUP == true ]]; then
    echo -e "======================== 启动挂机程序 ========================\n"
    pm2 id jd_crazy_joy_coin
    hangup_check_results=$(pm2 id jd_crazy_joy_coin)
    if [[ $hangup_check_results == "[]" ]]; then
        . $JD_DIR/config/config.sh
        if [[ $Cookie1 ]]; then
            jtask hangup 2>/dev/null
            echo -e "挂机程序启动成功...\n"
        else
            echo -e "config.sh中还未填入有效的Cookie，可能是首次部署容器，因此不启动挂机程序...\n"
        fi
    else
    echo -e "挂机程序已经启动了.\n"
    fi
elif [[ ${ENABLE_HANGUP} == false ]]; then
    echo -e "已设置为不自动启动挂机程序，跳过...\n"
fi