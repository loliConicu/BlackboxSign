// BlackBoxSign.js
// ———————————————————————————
// 自动签到脚本 + Server酱 推送集成
// ———————————————————————————

const axios = require('axios');
// dotenv 仅在本地测试时才加载 .env，CI 环境会从 GitHub Secrets 注入
require('dotenv').config();

// ———— Server酱 推送封装 ————
const SCKEY = process.env.SCKEY;
async function sendServerChan(title, desp) {
  if (!SCKEY) {
    console.warn('⚠️ 未配置 SCKEY，请检查 GitHub Secrets');
    return;
  }
  try {
    const url = `https://sctapi.ftqq.com/${SCKEY}.send`;
    const payload = { title, desp };
    const res = await axios.post(url, payload);
    console.log('✅ Server酱 推送成功：', res.data);
  } catch (err) {
    console.error('❌ Server酱 推送失败：', err.message);
  }
}
// ———————————————————————————

/*
小黑盒签到 v2.3

小黑盒签到及日常任务，日收益180H币左右（可抵0.18元）

自行捉包
*/
var cookie = process.env.BLACKBOX_COOKIE;
// ... (中间是你原来的所有逻辑，无需改动) ...

/*
  原脚本最后通常是：
    main();
    var version_ = 'jsjiami.com.v7';
  我们需要把它替换成下面的包装调用，以便捕获执行结果并推送通知
*/

// ———— 将原有的 `main();`、`version_` 部分替换为以下内容 ————
;(async () => {
  try {
    // 调用原来的主函数
    await main();
    console.log('✅ BlackBoxSign 执行完成');
    // 推送：成功
    await sendServerChan(
      'BlackBoxSign 执行成功 🎉',
      `- 时间：${new Date().toLocaleString()}\n- 账号数量：${cookie.split(/&|\n/).length}`
    );
  } catch (err) {
    console.error('❌ BlackBoxSign 执行失败：', err.message);
    // 推送：失败
    await sendServerChan(
      'BlackBoxSign 执行失败 ⚠️',
      `- 错误信息：${err.message}\n- 时间：${new Date().toLocaleString()}`
    );
    process.exit(1);
  }
})();
var version_ = 'jsjiami.com.v7';
