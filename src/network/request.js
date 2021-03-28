import axios from "axios";

export function request(config) {

  // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2. axios的拦截器
    // 1) request拦截请求
  instance.interceptors.request.use(config => {
   // console.log('下面是已经进入请求成功的拦截器中, 并且是成功的');
    // 1. 请求拦截后一般会做什么事情么？
      // 1) 比如说请求的config中有些信息不符合服务器要求
      // 2) 比如每次发送网络请求时，都希望在界面中显示一个请求的图标
      // 3) 某些网络请求(比如登录的(token))，是必须携带一些特殊的信息的
    return config // 拦截器拦截后，一定要return 出去，不然请求会失败
  }, error => {
    //console.log('下面是已经进入请求成功的拦截器中, 并且是失败的');
    console.log(error);
  });
    // 2) response拦截响应
  instance.interceptors.response.use(res => {
   // console.log('下面是已经进入响应成功的拦截器中, 并且是成功的');
    return res.data // 拦截器拦截后，一定要return 出去，不然外面拿不到东西。比如我们这在拦截后，只给响应data，那么前端就只拿到了data
  }, error => {
    //console.log('下面是已经进入响应成功的拦截器中, 并且是失败的');
    console.log(error);
  });

  // 3. 发送真正的网络请求
  return instance(config)  // axios的源码中，本身return的就是Promise的，所以我们不需要多此一举去new一个Promise，直接return就行了
}
