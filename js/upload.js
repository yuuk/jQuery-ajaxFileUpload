/**
 * [jQuery ajaxFileUpload 图片上传]
 * @data: 2016-12-10
 * @author: yuuk
 */

(function($) {
    $.fn.ajaxFileUpload = function(options) {
        var defaults = {
            url: './upload.php',
            formData: {},
            isMultiple: false,
            autoUpload: false,
            uploadSuccess: $.noop,
            uploadFail: $.noop
        },
        settings = $.extend({},defaults, options);

        //iframe模拟上传
        function uploadByIframe(element){
            var iframe = '<iframe src="javascript:false;" name="my_upload_form_target" style="display:none;width:0;height:0;"></iframe>';
                form = '<form action="'+defaults.url+'" method="post" enctype="multipart/form-data" target="my_upload_form_target" style="display:none;width:0;height:0;"></form>',
                $iframe = $(iframe).appendTo(document.body),
                $form = $(form).appendTo(document.body),
                $file = $(element).appendTo($form);

            if(settings.formData){
                for(var key in settings.formData){
                    $form.append('<input type="hidden" name="'+key+'" value="settings.formData[key]">');
                }
            }

            $form.on('submit',function(){
                $iframe.on('load',function(){
                    var data = $iframe.contents().find('body').text();
                    var json = eval('json='+data);
                    settings.uploadSuccess(element,json);
                    $iframe.remove();
                    $form.remove();
                });
            });

            $form.trigger('submit');
        }

        //ajax+FormData上传
        function uploadByAjax(element){
            var formData = new FormData(),
                fileArr = element.files,
                fileIptName = element.name; //获取name名
            if(fileIptName && fileArr.length){
                for(var i = 0; i < fileArr.length; i++){
                    formData.append(fileIptName,fileArr[i]);
                }
            }
            //append额外参数
            if(settings.formData){
                for(var key in settings.formData){
                    formData.append(key, settings.formData[key]);
                }
            }
            $.ajax({
                url: settings.url,
                type: "post",
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,  
                processData: false
            }).done(function(data){
                settings.uploadSuccess(element,data);
            }).fail(function(){
                settings.uploadFail(data);
            })
        }

        function upload(element){
            //支持FormData
            if(window.FormData){
                uploadByAjax(element)
            }
            //不支持FormData
            else{
                uploadByIframe(element);
            }
        }

        //判断是否多文件上传
        function isMsMultiple(element){
            if(settings.isMultiple == true){
                $(element).attr('multiple',true);
            }
            else{
                $(element).removeAttr('multiple');
            }
        }

        //是否自动上传
        function isAutoUpload(element){
            if(settings.autoUpload == true){
                upload(element);
            }
        }

        return this.each(function(i,v){
            //是否多选上传
            isMsMultiple(this);
            $(this).on('change',function(){
                //是否自动上传
                isAutoUpload(this);
            });
        })
    };
})(jQuery);