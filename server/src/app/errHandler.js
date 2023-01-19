module.exports = (err, ctx) => {
  const status = 200
  // switch (err.status) {
  //   case 10006:
  //     status = 998
  //     break
  //   case 10007 :
  //     status = 997
  //     break
  //   default:
  //     status = 999
  // }
  ctx.status = status
  ctx.body = err
}
