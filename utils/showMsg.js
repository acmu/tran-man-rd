const errMsg = (msg = '操作失败') => ({
  code: 0,
  msg,
});

const sucMsg = (data = {}, msg = '操作成功') => ({
  code: 1,
  msg,
  data,
});

module.exports = {
  errMsg,
  sucMsg,
};
