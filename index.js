const {
  transform
} = require('@babel/core');

// https://github.com/raxjs/rax-app/issues/1000
// https://github.com/babel/minify/issues/1035 仍能复现
// https://github.com/babel/minify/issues/1028
// const code = `let isWeb = true;
// {
//   if (isWeb) {
//     console.log('xyz');
//   } else {
//     console.log('abcd');
//   }
// }
// `;

// https://github.com/babel/minify/issues/981 https://github.com/babel/minify/pull/982 已修复
// const code = `function getElementTransforms(el) {
//   if (!is.dom(el)) return;
//   const str = el.style.transform || '';
//   const reg = /(\w+)\(([^)]*)\)/g;
//   const transforms = new Map();
//   let m; while (m = reg.exec(str)) transforms.set(m[1], m[2]);
//   return transforms;
// }
// `

// https://github.com/babel/minify/issues/999 不再复现
// const code = `function foo() {
//   let varName = [];
//   while (false) {}
//   varName;
// }
// `;

// https://github.com/babel/minify/issues/904 不再复现
// const code = `const hasValue = value => Boolean(value) || value === 0
// export default hasValue`;

// _universalEnv.isWeex ObjectProperty 的用法目前仍然不能 dce
const code = `var _requireEsm = require("../../../require-esm/index.js");

var _rxpiEnv = {
  isWeb: false,
  isMiniApp: true,
  isWechat: false,
  isWechatMiniProgram: false,
  // ...
};
var exp = _rxpiEnv.isMiniApp
  ? (0, _requireEsm["default"])(require("./miniapp/index"))
  : _rxpiEnv.isWeChatMiniProgram && !_rxpiEnv.isWeChatMiniProgramH5
  ? (0, _requireEsm["default"])(require("./wechat-miniprogram/index"))
  : (0, _requireEsm["default"])(require("./weex/index"));

exports["default"]  = exp;`;

console.log(`> babel/minify`);
console.log(
  transform(code, {
    plugins: ['babel-plugin-minify-dead-code-elimination'],
  })
);

console.log(`\n> hy + rax`);
console.log(
  transform(
    code, {
      plugins: ['babel-plugin-minify-dead-code-elimination-while-loop-fixed'],
    }
  )
);
