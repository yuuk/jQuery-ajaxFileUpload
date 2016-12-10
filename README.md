# jQuery-ajaxFileUpload
ajaxFileUpload的jQuery版，向下兼容了IE浏览器（7、8、9），简单的实现了一下，主要用来了解文件上传原理。
# 用法
```javascript
<script type="text/javascript">
    $('.pic').ajaxFileUpload({
        isMultiple: true,
        autoUpload: true,
        uploadSuccess:function(obj,data){
            var html = '';
            for(var i = 0;i<data.files.length;i++){
                html+='<img src="'+data.files[i]+'"/>';
            }
            $(obj).parent('div').next('div').html(html);
        }
    });
</script>
```
#参数
| 参数名        | 说明               | 默认值   |
| ------------- | ------------------ | -------- |
| url           | 上传接口地址       | null     |
| formData      | 上传时的附加参数   | Object   |
| isMultiple    | 是否开启多文件上传 | false    |
| autoUpload    | 是否支持自动上传   | false    |
| uploadSuccess | 上传完毕的回调     | Function |
| uploadFail | 上传失败的回调     | Function |
