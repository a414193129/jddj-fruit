//助力码目前只支持一个
let shareCode = '193bc68203602cdf225de461165669b5';


let cookiesArr = []
const request = require('request');

function isNode() {
  return 'undefined' != typeof module && !!module.exports;
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
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

// 助力
async function helpFriend(cookie, launchId) {
  const helpUrl = new URL(
    'https://wq.jd.com/kjactive/jxhlk/jxhlk_queryhelp?_stk=clicktype,launchid,nomoving&clicktype=0&nomoving=0&_ste=1&sceneval=2&g_login_type=1&g_ty=ls&callback=jsonpCBKC'
  );
  helpUrl.searchParams.set('launchid', launchId);
  const phoneId =
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10);
  helpUrl.searchParams.set('t', new Date().getTime());
  helpUrl.searchParams.set('_', new Date().getTime());
  helpUrl.searchParams.set(
    'h5st',
    '20210614223148504;9460704368531162;10029;tk01wa0d41c28a8naHNJT3VDMU1uNzNvtvQO8E0Yq53XI3PrHyW/zrKlXDIkGyIdAmuINqp7+MmmT2bBVBxzKvx6WYPF;b7c00f98d3da0d3d163c8ed82da1b2b8cd5f4ef612877f7cc411eb5f2f5b26f6'
  );
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url: helpUrl.toString(),
        headers: {
          Host: 'wq.jd.com',
          Cookie: cookie,
          accept: '*/*',
          'user-agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.5(0x18000528) NetType/WIFI Language/zh_CN`,
          
          referer:
            `https://st.jingxi.com/sns/202103/20/jxhlk/list.html?launchid=${launchId}&ptag=139022.1.2&srv=jx_cxyw_https://wq.jd.com/cube/front/activePublish/jxhlkv2/486449.html?ptag=139022.1.2_jing`,
        },
      },
      async function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let bodyNoJSON = response.body.replace('jsonpCBKC(', '');
          bodyNoJSON = bodyNoJSON.substr(0, bodyNoJSON.length - 1);
          // console.log(bodyNoJSON);
          const body = JSON.parse(bodyNoJSON);

          resolve(body);
        }
        reject(error);
      }
    );
  });
}

async function main() {
  for await (const u of cookiesArr) {
    try {
      let enrollFriendRes = await helpFriend(u, shareCode);
      enrollFriendRes = await helpFriend(u, shareCode);
      console.log(
        `助力结果：${JSON.stringify(
          enrollFriendRes.data.guestinfo.contenttips
        )}`
      );
    } catch (err) {
      console.error('请求错误', err);
    }
    await sleep(200);
  }
}

main();
