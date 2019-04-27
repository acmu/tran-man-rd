exports.errMsg = (msg = '操作失败') => ({
  code: 0,
  msg,
});

exports.sucMsg = (...args) => {
  const defaultMsg = '操作成功';
  let msg;
  let data = {};
  if (typeof args[0] === 'string') {
    msg = args[0];
  } else if (typeof args[0] === 'object' && args[0] != null) {
    data = args[0];
    msg = args[1] || defaultMsg;
  } else if (args.length === 0) {
    msg = defaultMsg;
  } else {
    throw new TypeError('You can not put this type (except `string` and `object`) in sugMsg');
  }
  return {
    code: 1,
    msg,
    data,
  };
};

exports.ignoreParams = (...v) =>
  v.reduce(
    (acc, cur) => {
      acc[cur] = 0;
      return acc;
    },
    { _id: 0 },
  );

exports.includeParams = (...v) =>
  v.reduce(
    (acc, cur) => {
      acc[cur] = 1;
      return acc;
    },
    { _id: 0 },
  );
