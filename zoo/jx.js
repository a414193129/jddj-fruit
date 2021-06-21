// 助力码位置
const shareCode = ['B7Ne8vBF8bJQdP5NAFcr0bb-8eSuV0A-2g3z2xXqCzM','B7Ne8vBF8bJQdP5NAFcr0WgL6S-S79Oee0XjTyGoW_NT1NtBRofNlG2FIheJsW6I','B7Ne8vBF8bJQdP5NAFcr0QmKGK8Kj2tiZSofnb0lNHsx7_oVZJuoRBpJ1rujeMmR'];
// cookie 位置
const cookiesArr = [];

const request = require('request');
function isNode() {
  return 'undefined' != typeof module && !!module.exports;
}
const jdCookieNode = isNode() ? require('./jdCookie.js') : '';
if (Object.keys(jdCookieNode).length > 0) {
  Object.keys(jdCookieNode).forEach((item) => {
    if (jdCookieNode[item]) {
      cookiesArr.push(jdCookieNode[item]);
    }
  });
}

function getJDNameByCookie(cookie) {
  return decodeURI(cookie.split(';')[1].split('=')[1]);
}

async function getUserInfo(cookie) {
  const postUrl = new URL(
    'https://wq.jd.com/cubeactive/steprewardv3/GetUserInfo?activeId=489177&publishFlag=1&channel=7&_stk=activeId,channel,joinDate,phoneid,publishFlag,timestamp&_ste=1&sceneval=2&g_login_type=1'
  );
  const joinDate = '20210526';
  const phoneId =
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10);
  postUrl.searchParams.set('timestamp', new Date().getTime());
  postUrl.searchParams.set('_', new Date().getTime());
  postUrl.searchParams.set('phoneid', phoneId);
  postUrl.searchParams.set('joinDate', joinDate);
  postUrl.searchParams.set(
    'stepreward_jstoken',
    Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10)
  );
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url: postUrl.toString(),
        headers: {
          Host: 'wq.jd.com',
          Cookie: cookie,
          accept: '*/*',
          'user-agent': `jdpingou;iPhone;4.8.2;14.5.1;${phoneId};network/wifi;model/iPhone13,4;appBuild/100546;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/318;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
          'accept-language': 'zh-cn',
          referer: `https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177&join=${joinDate}&ptag=139022.1.2&srv=jinshusongjin_https://wq.jd.com/cube/front/activePublish/step_reward/489177.html_jing`,
        },
      },
      async function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const body = JSON.parse(response.body);
          resolve(body);
        }
        reject(error);
      }
    );
  });
}

async function enrollFriend(cookie, strPin) {
  const postUrl = new URL(
    'https://wq.jd.com/cubeactive/steprewardv3/EnrollFriend?activeId=489177&publishFlag=1&channel=7&_stk=activeId,channel,joinDate,phoneid,publishFlag,strPin,timestamp&_ste=1&sceneval=2&g_login_type=1'
  );
  const joinDate = '20210526';
  const phoneId =
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10);
  postUrl.searchParams.set('timestamp', new Date().getTime());
  postUrl.searchParams.set('_', new Date().getTime());
  postUrl.searchParams.set('phoneid', phoneId);
  postUrl.searchParams.set('joinDate', joinDate);
  postUrl.searchParams.set('strPin', strPin);
  postUrl.searchParams.set(
    'stepreward_jstoken',
    Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10)
  );
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url: postUrl.toString(),
        headers: {
          Host: 'wq.jd.com',
          Cookie: cookie,
          accept: '*/*',
          'user-agent': `jdpingou;iPhone;4.8.2;14.5.1;${phoneId};network/wifi;model/iPhone13,4;appBuild/100546;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/318;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
          'accept-language': 'zh-cn',
          referer: `https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177&userid=${strPin}&join=${joinDate}&ptag=139022.1.2&srv=jinshusongjin_https://wq.jd.com/cube/front/activePublish/step_reward/489177.html_jing`,
        },
      },
      async function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const body = JSON.parse(response.body);

          resolve(body);
        }
        reject(error);
      }
	  
    );
  });
}
const sleep =(ms) =>{
		  return new Promise((resolve) => {
			  setTimeout(resolve, ms);
			  
		  });
	  };

async function main() {
  if (shareCode.length < 1) {
    for await (const ck of cookiesArr) {
      const res = await getUserInfo(ck);
      const strUserPin = res.Data.strUserPin;
      const pt_pin = getJDNameByCookie(ck);
      shareCode.push(strUserPin);
      console.log(`京东用户： ${pt_pin} 天天领红包助力码：${strUserPin}`);
    }
    console.log(`\n\n复制以下代码，替换文件头部，再执行一次脚本就是助力\n`);
    console.log(`const shareCode = ${JSON.stringify(shareCode)}`);
  } else {
    for await (const code of shareCode) {
      for await (const ck of cookiesArr) {
		await sleep(1000);
        const res = await enrollFriend(ck, code);
        const { sErrMsg, iRet } = res;
        console.log(`助力 ${code} 结果：${sErrMsg}`);
        if (iRet == 2013) {
          console.log(`助力 ${code} 完成`);
          break;
        }
      }
    }
  }
}
main();
