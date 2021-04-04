// 封装了一个防抖函数
export function debounce(func, delay) {  //  传进来要执行的函数，和延迟的时间。
  // 定义一个防抖函数
  // 解释： 调用这个函数会传进来一个要执行的function和延迟的时间，这个时间是给定时器使用的，用一个内存指针来调用这个防抖函数的，都会有一个定时器开始做延迟，
  // 结果每次调用防抖函数的时候，定时器的时间还没到，就被clearTimeout取消了，直到最后一次进来后，没有后续的clearTimeout来取消，它才会正常结束定时，执行传进来的那个方法
  let timer = null;  // 定义一个参数来记载函数setTimeout执行id
  return function (...args) {
    if (timer) clearTimeout(timer)  // clearTimeout 是用来取消一个定时器函数的执行的。其实这里可以不用判断，直接clearTimeout来取消执行。
    timer = setTimeout(() => {  // timer接收 这个定时器的id
      func.apply(this, args)
    }, delay)
  }
}
