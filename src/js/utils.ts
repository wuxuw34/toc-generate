// 定义一个节流函数
export function throttle(fn: (pre:number,now:number) => void, delay: number = 500) {
  let timer: any = null;
  return function (this:any,pre:number,now:number) {
    if (!timer) {
      fn.apply(this , [pre,now]);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

