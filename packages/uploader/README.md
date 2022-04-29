# Uploader 文件上传


<div class="r-doc-card">

### 介绍
用于将本地的图片或文件上传至服务器。
</div>




<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Uploader } from 'rong-ui2';

Vue.use(Uploader)
```
</div>



## 基本用法
<div class="r-doc-card">

```html
<r-uploader action="/test/fileUpload"></r-uploader>
```
</div>




## API
<div class="r-doc-card">

### Props
| 参数        | 说明     | 类型        | 默认值   |
| ---------- | -------- | ---------- |-------- |
| action  | 上传的地址，必填   | String   |  |
| headers  | 设置上传的请求头部   | Object   | `{}` |
| data  | 上传时附带的额外参数   | Object   | `{}` |
| name  | 上传的文件字段名   | String   | `file` |
| withCredentials  | 支持发送 cookie 凭证信息   | Boolean   | `false` |
| showUploadList  | 是否显示已上传文件列表   | Boolean   | `true` |
| disabled  | 是否禁用   | Boolean   | `false` |
| maxSize  | 文件大小限制，单位 kb   | Number   |  |
| accept  | 接受上传的文件类型   | String   |  |
| format  | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用   | Array   | [] |
| defaultFileList  | 默认已上传的文件列表,如：[{url: "http://www.xxx.com/xxx.jpg"}] | Array   |  |
| onSuccess | 文件上传成功时的钩子，返回字段为 response, file, fileList | Function | |
| onError | 文件上传失败时的钩子，返回字段为 error, file, fileList | Function | |
| onRemove | 文件列表移除文件时的钩子，返回字段为 file, fileList | Function | |
</div>



<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 触发上传组件的控件 |
</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
