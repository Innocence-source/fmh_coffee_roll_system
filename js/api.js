/**
 * 该 JS 的作用
 *   1. 用来 管理 项目 用到的所有接口
 *   2. 设置 接口 统一前缀
 *   3. 对 接口的 请求 和 响应 进行统一拦截
 */

const sysAPI = axios.create({
    baseURL: 'http://43.108.11.236:8082',
    timeout: 3000, // 默认接口 3 秒超时
});


sysAPI.interceptors.request.use(function(config){
    // config 中存储了 所有的 异步任务 需要的 配置信息
    if (config.loading) {
        // 开启 Loading 效果
        let index = layer.load() ;
        // 将 index 放到 config 中、当异步请求结束后、再关闭
        config.loading = index ;
    }
    // 检查接口是否需要认证
    if (config.permission) {
        // 获取令牌信息
        let tokern = await getAccessToken();
        // 检查 是否令牌为空
        if (tokern == null) {
            // 跳转到登录页面
            location.href = "./login.html";

        }else {
            config.headers["Authorization"] = "Bearer" + token;
        }
    }
    return config ;
}, (error)=> {
    return Promise.reject(error);
})


sysAPI.interceptors.response.use(
    function (response) {
        // response 代表 异步请求返回的响应对象
        if(response.config?.loading) {
            // 关闭 Loading
            layer.close(response.config.loading) ;
            response.config.loading = true;
        }
        return response.data;
    },
    function (error) {
        if (error.response?.config?.loading) {
            // 关闭 Loading
            layer.close(response.config?.loading) ;
            response.config.loading = true;
        }

        return Promise.reject(error);
    }
);


// 定义一个对象， 用来管理所有的接口信息
const API = {
    register({name, tel, password, className, role}) {
        return sysAPI.post("./register", {name, tel, password, className, role}, {loading:true});
    },
    // ...
}