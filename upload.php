<?php
	/*
		* [fileFileUpload 图片上传]
		* @data: 2016-12-09
		* @author: yuuk
	*/
	class upload {
		public function upload(){
			//如果有上传文件
			if($_FILES || $_POST){
				// 上传的路径，建议写物理路径
				$uploadDir = 'upload';
				// 文件数组
				$totalFile = array('status'=>1,'files'=>array());

				//formData上传
				if($_FILES['pic']){
					$fileCount = count($_FILES['pic']['name']);
				}
				//post上传
				else{
					$fileCount = count($_POST['pic']['name']);
				}

				//判断文件是否存在
				if($fileCount){
					for ($i = 0; $i < $fileCount; $i++) {
						//formData上传
						if($_FILES['pic']){
							$tempFiles = $_FILES['pic']['tmp_name'][$i]; //临时文件
							$files = $_FILES['pic']['name'][$i]; //真实文件
						}
						//post上传
						else{
							$tempFiles = $_POST['pic']['tmp_name'][$i]; //临时文件
							$files = $_POST['pic']['name'][$i]; //真实文件
						}						
						// 如果不存在文件夹则创建文件夹  
						if(!file_exists($uploadDir)){        
						    mkdir($uploadDir, 0777);    
						}    
						// 用时间戳来保存图片，防止重复
						$targetFile = $uploadDir . '/' . time() . '_' . $files;    
						// 将临时文件 移动到我们指定的路径
						move_uploaded_file($tempFiles, $targetFile);
						// 将文件地址返放入数组		
						array_push($totalFile['files'],$targetFile);
					}
				}

			    return json_encode($totalFile);;
			    exit;
		    }
		    else{
		    	die('Unable to connect');
		    	exit;
		    }
		}
	}
	$uploader = new upload();
	echo $uploader->upload();
?>