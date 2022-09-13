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
