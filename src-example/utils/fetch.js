import { ajax } from './ajax'

const CONST = window.CONST
function errorFunc (res) {
  this.$toast({
    propsData: {
      type: 'negetive',
      message: res.msg || "服务器偷懒了，请稍后再试"
    },
    methods: {
      callback () {
        if ((res.data && res.data.code == '9999') || (res.errCode == 10001)) {
          window.location.href = CONST.center
        }
      }
    }
  })
}

export function fetch (params = {}) {
  const that = this;
  return new Promise((resolve, reject) => {
    const loading = that.$loading();
    params.method = params.method || 'post'
    params.isShowErrToast = Object.prototype.hasOwnProperty.call(params, "isShowErrToast") ? params.isShowErrToast : true
    params.success = (result) => {
      loading.remove();
      if (result.status == 1 || result.error == 0) {
        resolve(result)
      } else {
        params.isShowErrToast && errorFunc.call(that, result)
        reject(result)
      }
    }
    params.error = (result) => {
      loading.remove();
      errorFunc.call(that, result)
      reject(result)
    }
    ajax(params)
  })
}
