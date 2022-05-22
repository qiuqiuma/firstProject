import { Loading } from 'element-ui';
import { myAxios } from '@/util/request'
export default {
    install(Vue) {
        // 请求
        Vue.prototype.http = {
            loadingOption:{
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            },
            load(){
                this.loadingFlag = Loading.service(this.loadingOption)
            },
            loadingFlag:null,
            get(obj) {
                return new Promise((resolve, reject) => {
                   this.load();
                    myAxios({
                        url: obj.url,
                        method: "get",
                        params: obj.params,
                        headers:obj.headers
                    }).then(val => {
                        resolve(val);
                        this.loadingFlag.close()
                    })
                })
            },
            post(obj) {
                return new Promise((resolve, reject) => {
                    this.load();
                    myAxios({
                        url: obj.url,
                        method: "post",
                        data: obj.params,
                        headers:obj.headers
                    }).then(val => {
                        resolve(val);
                        this.loadingFlag.close()
                    })
                })
            }

        }
    }
}
