var NOW_HASH="#loading-page-loading";
	//Second_bar的動畫		
	function animate_bar(event){
					event.preventDefault();
					var bar_item=$(this);
                    
                    if(bar_item.data("item")=="mission"){
                       $(".second_bar_item_mission").css({
                           display:"inline-block"
                       });
                        $(".second_bar_item_other").css({
                           display:"none"
                       });
						event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                        
                        if(event.data.SecondBarIsWhat=="other"&&event.data.IsSecondBarVisible==false){
                            event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                        }
                        else{
							$(".bar-div-second_bar").stop().animate({
                                top:(event.data.IsSecondBarVisible)?"-15%":"0%"
                            },300);
						}
                        event.data.SecondBarIsWhat="mission";
						
						 
                    }
                    else if(bar_item.data("item")=="other"){
                        $(".second_bar_item_other").css({
                           display:"inline-block"
                       });
                        $(".second_bar_item_mission").css({
                           display:"none"
                       });
						
						 event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                        
                        if(event.data.SecondBarIsWhat=="mission"&&event.data.IsSecondBarVisible==false){
							event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                        }
                        else{
							$(".bar-div-second_bar").stop().animate({
                                top:(event.data.IsSecondBarVisible)?"-15%":"0%"
                            },300);
						}
                        event.data.SecondBarIsWhat="other";
						
						
                    }
					
                   
				}	
	//loading動畫
	function loading_animation(){
		
		$this=$("#loading-p-txt");
		var now_string_loading=$this.html();		
		if(now_string_loading!="Loading...")
		$this.html(now_string_loading+".");
		else
		$this.html("Loading");
	}			
	//開頭動畫							
	function start_animation(){
		var span_dash="<span id='loading-span-dash'>_</span>"
		$("#loading-p-txt").html(span_dash);
					
		//打字機動畫(4秒結束)
		setTimeout(function(){$("#loading-p-txt").html("M"+span_dash);},1500);
		setTimeout(function(){$("#loading-p-txt").html("Mo"+span_dash);},1650);
		setTimeout(function(){$("#loading-p-txt").html("Moc"+span_dash);},1800);
		setTimeout(function(){$("#loading-p-txt").html("Moch"+span_dash);},1950);
		setTimeout(function(){$("#loading-p-txt").html("Mochi"+span_dash);},2100);
		setTimeout(function(){
			$("#loading-img-icon").css({animation:"shake 0.1s infinite alternate"});
		},2300);
		setTimeout(function(){
			$("#loading-img-icon").css({animation:"null"});
		},3000);
		setTimeout(function(){
			if(window.localStorage.getItem("Isfirst")=="yes"){
			$.mobile.navigate("#instruction-page-instruction",{transition: "pop"});	
			window.localStorage.setItem("Isfirst","no");	
			}
			else
			$.mobile.navigate("#index-page-index",{transition: "pop"});
			setInformation();
		},4000);
		//---------END
	}	
	//檢查登入是否正確
	function check_and_login(){
					var IsLogin_WhatUsername = window.localStorage.getItem("username");
					var loading=setInterval(loading_animation,200);
					setTimeout(function(){
						clearInterval(loading);
					if(IsLogin_WhatUsername!=null){
						console.log(loading);
						start_animation();
					}
					else{
						
						$.mobile.navigate("#login-page-login",{transition: "pop"});
					}
				},2000)
				}
	//檢查登入資訊是否正確								
    function login_click(){
					var username=$("#username").val();
					var password=$("#password").val();
					var loading=null;
					if(username==""||password==""){
						 $(".result").html("請檢查是否有空白");
					}
					else{
					var check=$.ajax({
                        url:"http://114.32.130.29/mochi/Check_LoginData.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":username,"password":password},
						beforeSend: function(){		
							$.mobile.navigate("#loading-page-loading",{transition: "pop"});
							loading=setInterval(loading_animation,200);
						},
                        success(msg){
							clearInterval(loading);
                            var result=JSON.parse(msg);
							console.log(result.result);
                            if(result.result=="SUCCESS"){
								window.localStorage.setItem("username",username);
                                $.mobile.navigate("#loading-page-loading",{transition: "pop"});
								//Loading動畫
								check_and_login();
							}
                            else{
							$(".result").html("帳號或密碼錯誤");
							loading=setInterval(loading_animation,200);
							setTimeout(function(){
								clearInterval(loading);
								$.mobile.navigate("#login-page-login",{transition: "pop"});
							},2000);
							
							}
                                
                        },
                        error(msg){
							$(".result").html("連線中斷，請檢查網路是否順暢");
							clearInterval(loading);
                           $.mobile.navigate("#login-page-login",{transition: "pop"});
                        }
                    });
					IfLoadingStop(check,NOW_HASH);
					}
	}
	//檢查註冊資訊是否正確
	function registered_click() {
					var username=$("#rgt_username").val();
					var password=$("#rgt_password").val();
					var name=$("#rgt_name").val();
					if(username==""||password==""||name==""){
						 $(".result").html("請檢查是否有空白");
					}
					else{
					var check=$.ajax({
                        url:"http://114.32.130.29/mochi/memberdata/Insert_Member.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":username,"password":password,"nickname":name},
						beforeSend: function(){		
							$.mobile.navigate("#loading-page-loading",{transition: "pop"});
							loading=setInterval(loading_animation,200);		
						},
                        success(msg){
							clearInterval(loading);
                            var result=JSON.parse(msg);
							console.log(result.result);
                            if(result.result=="SUCCESS"){
                                window.localStorage.setItem("username",username);
								window.localStorage.setItem("Isfirst","yes");
                                $.mobile.navigate("#loading-page-loading",{transition: "pop"});
								//Loading動畫
								check_and_login();
							} 
							else{
								$(".result").html("此信箱已經申請過囉");
								loading=setInterval(loading_animation,200);
								setTimeout(function(){
								clearInterval(loading);
								$.mobile.navigate("#login-page-registered",{transition: "pop"});
								},2000);
							}
								
                        }, 
                        error(msg){
							$(".result").html("連線中斷，請檢查網路是否順暢");
							clearInterval(loading);
                            $.mobile.navigate("#login-page-registered",{transition: "pop"});
                        }
                    });
					IfLoadingStop(check,NOW_HASH);
					}
				}
	//檢查再登入畫面的時候是否有按返回鍵(必須要停止Loading動畫)
	function IfLoadingStop(check,NOW_HASH){
		
		$(window).on("hashchange",function(hash){
			var new_hash=location.hash;
			if((new_hash=="#login-page-login"||new_hash=="#login-page-registered")&&NOW_HASH=="#loading-page-loading"){
				console.log(check);
				if(check){
					check.abort();
				}
		}
					 
				
				
			
		});
		
	}
	//登入畫面中，當鍵盤打開的時候，視窗需要往上
	function login_resize_window(wh){
					$("#login-page-login").css({
						height:wh				
					});
					$("#login-page-registered").css({
						height:wh
					});
					var now_wh=$(window).height();
					if(wh-now_wh>50){
					$(".login-div-window").css({
						top:"5%"
					});
						
					}
					else if(now_wh==wh){
					$(".login-div-window").css({
						top:"25%"
					});	
					}
				}
	//設定遊戲背景
	function setbackground(background_style){
		switch(background_style){
			case "background_000":
				$("#index-page-index").css({backgroundImage:"url('images/index/background_000/bg01-02.png')"});
				$(".index-img-bg_star").css({display:"block"});
			break;
			default:break;
		}
	}
	//遊戲簡介頁面所有的按鍵事件
	function introduce_page(){
		$(".instruction-img-instruction").each(function(n){
					var position=100*n
					$(this).css({
						left:position+"%"
					});
				});

				$(".instruction-div-page_dot").on("click",function(){
					
						$("#btn_back").css({visibility:"visible"});
						$("#btn_next").html("NEXT");
					if($(this).data("page")==1)
						$("#btn_back").css({visibility:"hidden"});
					else if($(this).data("page")==6)
						$("#btn_next").html("FINISH");
					
					
					$(".instruction-div-img_content").stop().animate({
						left:(-100*($(this).data("page")-1))+"%"
					},500);
					
					$(".now_page").html("<image src='images/bar_icon/page_circle.png'/>");
					$(".now_page").removeClass("now_page");
					$(this).addClass("now_page");
					$(".now_page").html("<image src='images/bar_icon/page_circle_now.png'/>");
				});
				
				$("#btn_back").on("click",function(){
					$("#btn_next").html("NEXT");
					var now_page=$(".now_page").data("page");
					
					if(now_page==2)
						$("#btn_back").css({visibility:"hidden"});
						
					$(".instruction-div-img_content").stop().animate({
						left:(-100*(now_page-2))+"%"
					},500);
					
					$(".now_page").html("<image src='images/bar_icon/page_circle.png'/>");
					var back_page=$(".instruction-div-page_dot:nth-child("+(now_page-1)+")");
					$(".now_page").removeClass("now_page");
					back_page.addClass("now_page");
					$(".now_page").html("<image src='images/bar_icon/page_circle_now.png'/>");
				});
		
				$(".instruction-img-instruction").on("swiperight",function(){
					$("#btn_next").html("NEXT");
					var now_page=$(".now_page").data("page");
					
					if(now_page==2)
						$("#btn_back").css({visibility:"hidden"});
						
					$(".instruction-div-img_content").stop().animate({
						left:(-100*(now_page-2))+"%"
					},500);
					
					$(".now_page").html("<image src='images/bar_icon/page_circle.png'/>");
					var back_page=$(".instruction-div-page_dot:nth-child("+(now_page-1)+")");
					$(".now_page").removeClass("now_page");
					back_page.addClass("now_page");
					$(".now_page").html("<image src='images/bar_icon/page_circle_now.png'/>");
				});
		
		
				
				$("#btn_next").on("click",function(){
					$("#btn_back").css({visibility:"visible"});
					var now_page=$(".now_page").data("page");
					
					if($("#btn_next").html()=="FINISH"){
						$.mobile.navigate("#index-page-index",{transition: "pop"});
						now_page=0;
						$("#btn_next").html("NEXT");
						$("#btn_back").css({visibility:"hidden"});
						
					
					}
						
					
					
					if(now_page==5)
						$("#btn_next").html("FINISH");
						
					$(".instruction-div-img_content").stop().animate({
						left:(-100*(now_page))+"%"
					},500);
					
					$(".now_page").html("<image src='images/bar_icon/page_circle.png'/>");
					var next_page=$(".instruction-div-page_dot:nth-child("+(now_page+1)+")");
					$(".now_page").removeClass("now_page");
					next_page.addClass("now_page");
					$(".now_page").html("<image src='images/bar_icon/page_circle_now.png'/>");
						
				});
				$(".instruction-img-instruction").on("swipeleft",function(){
					$("#btn_back").css({visibility:"visible"});
					var now_page=$(".now_page").data("page");
					
					if($("#btn_next").html()=="FINISH"){
						$.mobile.navigate("#index-page-index",{transition: "pop"});
						now_page=0;
						$("#btn_next").html("NEXT");
						$("#btn_back").css({visibility:"hidden"});
						
						
					}
						
					
					
					if(now_page==5)
						$("#btn_next").html("FINISH");
						
					$(".instruction-div-img_content").stop().animate({
						left:(-100*(now_page))+"%"
					},500);
					
					$(".now_page").html("<image src='images/bar_icon/page_circle.png'/>");
					var next_page=$(".instruction-div-page_dot:nth-child("+(now_page+1)+")");
					$(".now_page").removeClass("now_page");
					next_page.addClass("now_page");
					$(".now_page").html("<image src='images/bar_icon/page_circle_now.png'/>");
				});
				
				
	}
	//設定中所有事件
	function setting_event(){
		var dialog=$(".setting-div-page");
				$(".bar-img-setting").on("click",function(){
					if(dialog.css("display")=="none"){
						dialog.css({display:"block"});
						$(".all-div-mask").css({display:"block"});
					}	
					else{
						dialog.css({display:"none"});
						$(".all-div-mask").css({display:"none"});
					}			
				});
				
				$(".setting-div-title>img").on("click",function(){
					dialog.css({display:"none"});
					$(".all-div-mask").css({display:"none"});
				})
				$("#Sound").on("click",function(){
					if($(this).data("switch")=="on"){
						$(this).attr("src","images/emial_setting/email_setting05.png");
						$(this).data("switch","off");
					}
					else{
						$(this).attr("src","images/emial_setting/email_setting04.png");
						$(this).data("switch","on");
					}
					
				});
				
				$("#Music").on("click",function(){
					if($(this).data("switch")=="on"){
						$(this).attr("src","images/emial_setting/email_setting05.png");
						$(this).data("switch","off");
					}
					else{
						$(this).attr("src","images/emial_setting/email_setting04.png");
						$(this).data("switch","on");
					}
					
				});
				
				$(".setting-img-btn_enter").on("click",function(){
					dialog.css({display:"none"});
					$(".all-div-mask").css({display:"none"});
				});

	}
	//任務中所有事件
	function mission_event(){
					//儲存按鈕
				$(".btn_save").on("click",function(){
					
					var capsule_ID=$(".mission-div-infro_page").data("id");
					
					var answer=$("#answer").val();
					if(window.localStorage.getItem('username')!=$(".mission-div-from>p").html())
					var message=$("#message_text_finish").val();
					else{
						if($("#mission_type").attr("src")=="images/mission/missionC-09.png")
							var message=$("#message_text").val();
						else
							var message=$("#message_action").val();
					}
					
					console.log(answer);
					console.log(message);
					saveanswer(capsule_ID,answer);
					savemessage(capsule_ID,message);
					
				});
				
				//提交按鈕
				$(".btn_enter").on("click",function(){
					$(".mission-div-dialog_checkscore").css("display","block");
					$(".all-div-mask").css({display:"block"});
				});
				
				//提交視窗取消按鈕
				$("#dia-btn_cancle").on("click",function(){
					$(".mission-div-dialog_checkscore").css("display","none");
					$(".all-div-mask").css({display:"none"});
				});
				
				//提交確定按鈕
				$("#dia-btn_enter").on("click",function(){
					var capsule_ID=$(".mission-div-infro_page").data("id");
					if(window.localStorage.getItem('username')!=$(".mission-div-from>p").html()){
						var executor_suggest=$("#message_text_finish").val();
						var executor_score=window.localStorage.getItem(capsule_ID+"_score");
						finishscore(capsule_ID,executor_suggest,executor_score);
						capsule_information(capsule_ID);
						$(".mission-div-dialog_checkscore").css("display","none");
						$(".mission-div-dialog_getscore").css("display","block");
					}
					else{
						if($("#mission_type").attr("src")=="images/mission/missionC-09.png"){
							var answer=$("#answer").val();
							var announcer_suggest=$("#message_text").val();
						}
						else{
							var answer="OK";
							var announcer_suggest=$("#message_action").val();
						}
						
						var announcer_score=window.localStorage.getItem(capsule_ID+"_score");
						finishmission(capsule_ID,answer,announcer_suggest,announcer_score);
						$(".mission-div-dialog_checkscore").css("display","none");
						$(".mission-div-dialog_ok").css("display","block");
					}
					
					
				});
				//提交成功確認紐
				$("#dia-btn_ok").on("click",function(){
					$(".mission-div-dialog_ok").css("display","none");
					$(".all-div-mask").css({display:"none"});
					showannounce();
				});
				$("#dia-btn_getok").on("click",function(){
					var now_money=parseInt($(".bar-span-game_money").html());
					var getscore=parseInt($(".mission-div-infro_page").data("getscore"));
					console.log(now_money+getscore);
					$(".bar-span-game_mony").html(now_money+getscore);
					update_money(now_money+getscore);
					$(".mission-div-dialog_getscore").css("display","none");
					$(".all-div-mask").css({display:"none"});
				});
				
				
				//照相功能
				$("#take_pic").on("click",accessCamera);
				
				function Success(imgData){
					 var options = new FileUploadOptions();
                     options.fileKey = "file"; 
					 options.fileName=$(".mission-div-infro_page").data("id");
                     options.mimeType = "image/jpeg"; 
                     var params = new Object();
                     params.value1 = "capsule";
                     params.value2 = $(".mission-div-infro_page").data("id");
                     options.params = params;
                     options.chunkedMode = false;
                     
                     var ft = new FileTransfer();
                     
                     ft.upload(imgData, "http://114.32.130.29/mochi/Upload_img.php", function(result){
                     $("#see_pic").attr("src",imgData);
                     }, function(error){
                     $("#see_pic").attr("src","images/mission/missionC-21.png");
                     }, options);
                }
                function Error(error){
                    Console.log(error);
                }   
                function accessCamera(){
                    var option={
                        destinationType:Camera.DestinationType.FILE_URI,
                        sourceType:Camera.PictureSourceType.CAMERA
                    };
					 navigator.camera.getPicture(Success,Error,option);
				}
               
				//小視窗看答案
				$(".mission-btn-dia_answer").on("click",function(){
					$(".all-div-mask").css({display:"block"});
					if($("#mission_type").attr("src")=="images/mission/missionC-09.png")
					$(".mission-div-dialog_seeanswer").css({display:"block"});
					else
					$(".mission-div-dialog_seepic").css({display:"block"});
					
					
						
				})
				//小視窗關閉
				$(".dialog_cancle").on("click",function(){
					$(".all-div-mask").css({display:"none"});
					$(".mission-div-dialog_seepic").css({display:"none"});
					$(".mission-div-dialog_seeanswer").css({display:"none"});
				})
				
				//小視窗看圖片
				$(".mission-img-dia_seepic").on("click",function(){
					$("#answer_pic").attr("src","http://114.32.130.29/mochi/Capsule_Answer_image/"+$('.mission-div-infro_page').data('id'));
					$(".mission-div-dialog_seepic").css({display:"block"});
					$(".all-div-mask").css({display:"block"});
				})
				}
	//好友中所有事件
	function friend_event(){
				$("#myfriendlist").on("click",".friend_infor",function(){		
					var username=$(this).parent();
					var nickname=$(this).parent().find("p").html();
					$(".nickname").html(nickname);
					$(".friend-div-dialog_infor").css({display:"block"});
				});
				
				
				$("#myinvitefriendlist").on("click",".friend_ok",function(){		
					var username=$(this).parent().data("id");
					var email_ID=$(this).parent().data("email_id");
					var nickname=$(this).parent().find("p").html();
					$(".friend-dialog-content>p").html("你和"+nickname+"成為好友");
					$(".friend-div-dialog_check").css({display:"block"});
					
					insertfriend(username);
					deleteemail(email_ID);
					showemail();
				});
				
				$("#myinvitefriendlist").on("click",".friend_cancle",function(){		
					var username=$(this).parent().data("id");
					var email_ID=$(this).parent().data("email_id");
					var nickname=$(this).parent().find("p").html();
					$(".friend-dialog-content>p").html("你拒絕了"+nickname+"的好友邀請");
					$(".friend-div-dialog_check").css({display:"block"});
					deleteemail(email_ID);
					showemail();
				});
				
				
				
				$(".friend-dialog_cancle").on("click",function(){
					$(".friend-div-dialog_infor").css({display:"none"});
					$(".friend-div-dialog_blackinfor").css({display:"none"});
				})
				$(".friend-dialog_select_cancle").on("click",function(){
					$(".friend-div-dialog_select").css({display:"none"});
					
				})
				$(".friend-dialog-btn_submit>img").on("click",function(){
					$(".friend-div-dialog_check").css({display:"none"});
					$(".friend-div-dialog_select").css({display:"none"});
					$(".friend-div-dialog_blackinfor").css({display:"none"});
				})
				
				$(".friend-img-addall").on("click",function(){
					$(".friend-dialog-content>p").html("你和全部人成為好友");
					$(".friend-div-dialog_check").css({display:"block"});
					$("#myinvitefriendlist .friend-div-list_item").each(function(){
					var username=$(this).data("id");
					var email_ID=$(this).data("email_id");
						insertfriend(username);
						deleteemail(email_ID);
						showemail();
					})
					
				})
				$("#invite_cancle").on("click",function(){
					$.mobile.navigate("#friend-page-friend");
				})
				
				$("#btn-select").on("click",function(){
					var username=$("#username-text").val();
					selectfriend(username);
				})
				
				$("#btn-add_friend").on("click",function(){
					$(".friend-div-dialog_select").css({display:"block"});
				})
				
				$("#select_to_add").on("click",function(){
					$(".friend-dialog-content>p").html("已發送邀請囉!");
					$(".friend-div-dialog_check").css({display:"block"});
					var username=$("#username-text").val();
					sendemail(username,"好友邀請","好友邀請","好友");
					
				})
				$(".friend-img-invite").on("click",function(){
					showemail();
				})
	}
	//收藏中所有事件
	function collection_event(){
				$(".collection-div-back").on("click",function(){
					collection_page-=1;
					if(collection_page<=1){
						collection_page=1;
						$(".collection-div-back").attr("src","images/collection/collect-05.png");
					}
					else{
						$(".collection-div-back").attr("src","images/collection/collect-06.png");
					}	
					showcollection(collection_page);
				});
				$(".collection-div-next").on("click",function(){
					collection_page+=1;
					if(collection_page>=Math.ceil(showcollection_num()/9)){
						collection_page=Math.ceil(showcollection_num()/9);
						$(".collection-div-next").attr("src","images/collection/collect-08.png");
					}
					else{
						$(".collection-div-next").attr("src","images/collection/collect-07.png");
					}
					showcollection(collection_page);
				})
				if(Math.ceil(showcollection_num()/9)>1){
					$(".collection-div-next").attr("src","images/collection/collect-07.png")
				}
	}
	//扭蛋廣場所有事件
	function eggground_event(){
				$(".bar-div-start").on("click",function(){
					$(".egg-div-dialog_checkscore").css({display:"block"})
					
				});
				$("#eggdia-btn_cancle").on("click",function(){
					$(".egg-div-dialog_checkscore").css({display:"none"})
					
				});
				$("#eggdia-btn_enter").on("click",function(){
					$(".egg-div-dialog_checkscore").css({display:"none"})
					capsule_information(getcapsule(),"eggground");
				});
	}

//--------------------------------------------------------------
//--------------------mymochi事件------------------------------------
//--------------------------------------------------------------
	//顯示我的東西(mymochi)
	function showMyMochi(category){
				$.ajax({
                        url:"http://114.32.130.29/mochi/mymochi/Show_MemberProduct.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('username'),
							  "category":category},
						async:false,
                         success(msg){
                          var result=JSON.parse(msg);
						  var total=result.length;
						  var count=-1;
                          	$(".mochi-div-myitem_list_item").each(function(){
								$(this).html("");
								if(count==-1){
									$(this).html("<img src='images/store/store026.png' id="+category+"00 data-category="+category+">");
								}
								else if(count<total){
									$(this).html("<img src='images/index/mochi_style/"+category+"/s"+result[count]+".png' id="+result[count]+" data-category="+category+">");
								}
								count++;
							})
                        },
                        error(msg){
                            alert(msg);
                        }
                 });
		
	}
	//更換背景
	function update_bg(bg){
				$.ajax({
					url:"http://114.32.130.29/mochi/mymochi/Update_BackgroundStyle.php",
					data:{"username":window.localStorage.getItem("username"),
						 "background_style":bg},
					datatype:"JSON",
					success(msg){},
					error(msg){}
				});
	}
	//更換麻吉
	function update_bg(mochi_style){
				$.ajax({
					url:"http://114.32.130.29/mochi/mymochi/Update_MochiStyle.php",
					data:{"username":window.localStorage.getItem("username"),
						 "mochi_style":mochi_style},
					datatype:"JSON",
					success(msg){},
					error(msg){}
				});
	}
	//縣市目前mochi樣式
	//調出會員資料
	function shownowMochi(){
				$.ajax({
                        url:"http://114.32.130.29/mochi/memberdata/Show_MemberData.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem("username")},
                        success(msg){
                           var result=JSON.parse(msg);
						   var style=result.mochi_style;
						$("#mochi-img-A").attr("src","images/index/mochi_style/A/"+style.substr(0,3)+".png");
						$("#mochi-img-B").attr("src","images/index/mochi_style/B/"+style.substr(3,3)+".png");
						$("#mochi-img-C").attr("src","images/index/mochi_style/C/"+style.substr(6,3)+".png");
						$("#mochi-img-D").attr("src","images/index/mochi_style/D/"+style.substr(9,3)+".png");
						$(".mochi-div-bg").css({backgroundImage:"url(images/index/mochi_style/G/"+style.substr(12,3)+".png"});
                        },
                        error(msg){
                            
                        }
                    });
	}
//--------------------------------------------------------------
//--------------------商店事件------------------------------------
//--------------------------------------------------------------
	//顯示商店商品資料
	function showStore(){
			$.ajax({
                        url:"http://114.32.130.29/mochi/store/Show_Product.php",
                        type:"POST",
                        datatype:"JSON",
                        success(msg){
                            var result=JSON.parse(msg);
                            var result_text="";
                            for(var key in result){
                                
								//key是你擁有的商品編號，result[key]是一個陣列
                                 for(var value in result[key])
                                 {
                                     //value有name，category，img_filename,price這四種
									 //result[key][name]...
                                 }
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
					});
	}
	//買商品時的事件
	function buyProduct(productID){
			$.ajax({
                        url:"http://114.32.130.29/mochi/store/Buy_Product.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"productID":productID,
                              "username":window.localStorage.getItem('username')},
                        success(msg){
                               //結果資訊
                        },
                        error(msg){
                            alert(msg);
                        }
                 });
	}
//--------------------------------------------------------------
//--------------------收藏品事件------------------------------------
//--------------------------------------------------------------
	//回傳共有幾個商品
	function showcollection_num(){
		var result=null;
		$.ajax({
                        url:"http://114.32.130.29/mochi/collection/Show_Collection.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username')},
						async:false,
                        success(msg){
                           result=JSON.parse(msg);
                           console.log(Object.keys(result).length);
							
                        },
                        error(msg){
                            alert(msg);
                        }
				});
		return Object.keys(result).length;
	}
	//顯示收藏品
	function showcollection(page){
		$(".collection-div-position").html("");
		$.ajax({
                        url:"http://114.32.130.29/mochi/collection/Show_Collection.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username'),
							 "page":page},
                        success(msg){
                           var result=JSON.parse(msg);
                           console.log(result);
                            for(var key in result){
                                if(result[key]["type"]=="解惑")
									var str_type="collect-10";
								else
									var str_type="collect-11";
								
								//key是你擁有的編號，result[key]是一個陣列
							oneitem="<div class='collection-div-item' data-id="+key+">"+
									"<a href='#mission-page-infro'><img src='images/collection/"+ str_type+".png'></a>"+
									"<p>"+result[key]["question"]+"</p></div>";
						
                                $(".collection-div-position")
								.append(oneitem)
								.on("click",".collection-div-item img",function(){
									var capsule_ID=$(this).parent().parent().data("id");
									capsule_information(capsule_ID);
								})
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
				});
	}
	//刪除收藏品
	function deletecollection(capsule_ID){
		$.ajax({
                        url:"http://114.32.130.29/mochi/store/Delete_Collection.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username'),
							  "capsule_ID":capsule_ID,
							 },
                        success(msg){
                            var result=JSON.parse(msg);
   
                        },
                        error(msg){
                            alert(msg);
                        }
				});
	}
//--------------------------------------------------------------
//--------------------扭蛋事件------------------------------------
//--------------------------------------------------------------
	//新增一顆扭蛋球
	function insertcapsule(question,type,public_or_private,mochi_style,time){
		$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Insert_NewCapsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"question":question,
                              "username":window.localStorage.getItem('username'),
							  "type":type,
							  "public_or_private":public_or_private,
							  "mochi_style":mochi_style,
							  "time":time},
                        success(msg){
							 var result=JSON.parse(msg);
                               //結果資訊
							var capsule_ID=result.capsule_ID;
                        },
                        error(msg){
                            alert(msg);
                        }
            });
		if(public_or_private=="private"){
			$.ajax({
                        url:"http://114.32.130.29/mochi/email/Send_Email.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('login_username'),
							  "recipient":recipient,
							  "title":title,
							  "content":capsule_ID},
                        success(msg){
                               //結果資訊
                        },
                        error(msg){
                            alert(msg);
                        }
            });
		}
		
	}
	//顯示我發布的任務
	function showannounce(){
		$(".mission-div-list").html("");
		$("#mission_announce").attr("src","images/mission/missionC-03.png");
		$("#mission_execute").attr("src","images/mission/missionC-02.png");
					$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Show_AnnounceCapsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('username')},
                        success(msg){
							 var result=JSON.parse(msg);
							var one_item=null;
							console.log("success");
                               //結果資訊
							for(var key in result){
                                
								//key是你擁有的扭蛋編號，result[key]是一個陣列
                                
									 var type=result[key]["type"]=="解惑"?"missionC-46":"missionC-47";
									 var question=result[key]["question"];
										switch(result[key]["state"])
										{
											case "尚未":
												var state="missionC-12";break;
											case "執行":
												var state="missionZ-12";break;
											case "完成":
												var state="missionC-14";break;
											case "待評":
												var state="missionB-03";break;
										};									 
									 
									 var time=result[key]["time"];
									 if(time.slice(0,2)!="00"){
										 time="剩餘"+time.slice(0,2)+"小時";
									 }
									 else if(time.slice(3,5)!="00"){
										 time="剩餘"+time.slice(3,5)+"分鐘";
									 }
									 else
										 time="";
								
                                     //value有capsule_ID,state,executor,executor_suggest,answer,executor_score,
									 //question,type,public_or_private,time這10種
									 //result[key][capsule_ID]...
                                 
								 one_item="<a href='#mission-page-infro'><div class='mission-div-list_item' data-id="+key+">"+
									"<img src='images/mission/"+type+".png' class='mission-img-capsule_type'>"+
									"<div class='mission-div-infro'><p>"+question+"</p></div>"+
									"<img src='images/mission/"+state+".png' class='mission-img-state'>"+
									"<p class='mission-p-time'>"+time+"</p>"+
									"</div></a>";
									 $(".mission-div-list")
										 		.append(one_item)
												.find(".mission-div-list_item").on("click",function(){
													var capsule_ID=$(this).data("id");
													capsule_information(capsule_ID);
												});
                            }
							
                        },
                        error(msg){
                           console.log("error");
                        }
            });
	}
	//顯示我接收的任務
	function showexecute(){
		$(".mission-div-list").html("");
		$("#mission_announce").attr("src","images/mission/missionC-01.png");
		$("#mission_execute").attr("src","images/mission/missionC-04.png");
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Show_ExecuteCapsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('username')},
                        success(msg){
							 var result=JSON.parse(msg);
							var one_item=null;
							console.log("success");
                               //結果資訊
							for(var key in result){
                                
								//key是你擁有的扭蛋編號，result[key]是一個陣列
                                
									 var type=result[key]["type"]=="解惑"?"missionC-46":"missionC-47";
									 var question=result[key]["question"];
										switch(result[key]["state"])
										{
											case "尚未":
												var state="missionC-12";break;
											case "執行":
												var state="missionZ-12";break;
											case "完成":
												var state="missionC-14";break;
											case "待評":
												var state="missionB-03";break;
										};									 
									 
									 var time=result[key]["time"];
									 if(time.slice(0,2)!="00"){
										 time="剩餘"+time.slice(0,2)+"小時";
									 }
									 else if(time.slice(3,5)!="00"){
										 time="剩餘"+time.slice(3,5)+"分鐘";
									 }
									 else
										 time="";
										 
								
                                     //value有capsule_ID,state,executor,executor_suggest,answer,executor_score,
									 //question,type,public_or_private,time這10種
									 //result[key][capsule_ID]...
                                 
								 one_item="<a href='#mission-page-infro'><div class='mission-div-list_item' data-id="+key+">"+
									"<img src='images/mission/"+type+".png' class='mission-img-capsule_type'>"+
									"<div class='mission-div-infro'><p>"+question+"</p></div>"+
									"<img src='images/mission/"+state+".png' class='mission-img-state'>"+
									"<p class='mission-p-time'>"+time+"</p>"+
									"</div></a>";
									 $(".mission-div-list")
										 		.append(one_item)
												.find(".mission-div-list_item").on("click",function(){
													var capsule_ID=$(this).data("id");
													capsule_information(capsule_ID);
												});
                            }
							
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//把草稿儲存起來(capsule_ID=>answer)
	function saveanswer(capsule_ID,answer){
		window.localStorage.setItem(capsule_ID,answer);
	}
	//上傳答案
	function finishmission(capsule_ID,answer,announcer_suggest,announcer_score){
		$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Get_Answer.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"capsule_ID":capsule_ID,
                              "answer":answer,
							  "announcer_suggest":announcer_suggest,
							  "announcer_score":announcer_score},
                        success(msg){
							var result=JSON.parse(msg);
                               //結果資訊
							
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//上傳分數
	function finishscore(capsule_ID,executor_suggest,executor_score){
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Get_Score.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"capsule_ID":capsule_ID,
                              "executor_suggest":executor_suggest,
							  "executor_score":executor_score},
                        success(msg){
							var result=JSON.parse(msg);
                               //結果資訊
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//加入收藏
	function addtocollection(capsule_ID){
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Add_Collection.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"capsule_ID":capsule_ID,
                             "username":window.localStorage.getItem('username')},
                        success(msg){
							var result=JSON.parse(msg);
                               //結果資訊
							console.log(result);
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//刪除扭蛋
	function deletecapsule(capsule_ID){
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Delete_Capsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"capsule_ID":capsule_ID},
                        success(msg){
							var result=JSON.parse(msg);
                               //結果資訊
							
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//轉扭蛋機
	function getcapsule(){
		var capsule_ID=null;
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Get_NewCapsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('username')},
						async:false,
                        success(msg){
							var result=JSON.parse(msg);
							
                               //回傳time,announcer,question,type,mochi_style,capsule_ID
							capsule_ID=result.capsule_ID;
							console.log(result);
                        },
                        error(msg){
                            alert(msg);
                        }
            });
		return capsule_ID;
	}
	//指定接收者
	function updateexecute(username,capsule_ID){
			$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Update_Executor.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":username,
							 "capsule_ID":capsule_ID},
                        success(msg){
							var result=JSON.parse(msg);
                               //回傳time,announcer,question,type,mochi_style
							
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//顯示扭蛋資訊
	function capsule_information(capsule_ID,page=null){
		
		$.ajax({
                        url:"http://114.32.130.29/mochi/capsule/Show_Capsule.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"capsule_ID":capsule_ID},
                        success(msg){
							
							var result=JSON.parse(msg);
							
							//type
							if(result[capsule_ID].type=="解惑"){
								 $(".mission-img-logo").attr("src","images/mission/missionC-53.png");
								 $("#mission_type").attr("src","images/mission/missionC-09.png");
							}
                              
							else if(result[capsule_ID].type=="挑戰"){
								 $(".mission-img-logo").attr("src","images/mission/missionC-54.png");
								 $("#mission_type").attr("src","images/mission/missionC-10.png");
							}
							  
							//public_or_privatre
							if(result[capsule_ID].public_or_private=="隨機")
                               $("#mission_pub_or_pri").attr("src","images/mission/missionC-17.png");
							else if(result[capsule_ID].public_or_private=="指定")
							   $("#mission_pub_or_pri").attr("src","images/mission/missionC-18.png");
							
							//state
							switch(result[capsule_ID].state)
							{
									case "尚未":
										$("#mission_state").attr("src","images/mission/missionC-39.png");break;
									case "執行":
										$("#mission_state").attr("src","images/mission/missionZ-08.png");break;
									case "待評":
										$("#mission_state").attr("src","images/mission/missionB-02.png");break;
									case "完成":
										$("#mission_state").attr("src","images/mission/missionC-38.png");break;
									
							};
							
							//executor
							if(result[capsule_ID].executor!=null)
							$(".mission-div-from>p").html(result[capsule_ID].executor);
							//question
							$(".mission-div-question>p").html(result[capsule_ID].question);
							

							$(".mission-div").css({display:"none"});
							if(result[capsule_ID].state=="執行"
									&&result[capsule_ID].announcer!=window.localStorage.getItem('username')
							  		&&page=="eggground"){
								$(".mission-div-newegg").css({display:"block"});
							}
							else if(result[capsule_ID].state=="執行"
							   &&result[capsule_ID].announcer!=window.localStorage.getItem('username')
							   &&result[capsule_ID].type=="解惑"){
								$(".mission-div-execute_text").css({display:"block"});
							}
							else if(result[capsule_ID].state=="執行"
									&&result[capsule_ID].announcer!=window.localStorage.getItem('username')
									&&result[capsule_ID].type=="挑戰"){			
								$(".mission-div-execute_change").css({display:"block"});
							}
							else if(result[capsule_ID].state=="待評"
								   &&result[capsule_ID].announcer!=window.localStorage.getItem('username')
								   &&result[capsule_ID].type=="挑戰"){
								$(".mission-div-execute_waitscore_change").css({display:"block"});
							}
							else if(result[capsule_ID].state=="待評"
								   &&result[capsule_ID].announcer!=window.localStorage.getItem('username')
								   &&result[capsule_ID].type=="解惑"){
								$(".mission-div-execute_waitscore_text").css({display:"block"});
							}
							else if(result[capsule_ID].state=="待評"
								   &&result[capsule_ID].announcer==window.localStorage.getItem('username')){
								$(".mission-div-getanswer").css({display:"block"});
							}
							else if(result[capsule_ID].state=="完成"||result[capsule_ID].state=="收藏"){
								$(".mission-div-finish").css({display:"block"});
							}
							else{
								$(".mission-div-no").css({display:"block"});
							}
							
							$(".mission-div-infro_page").data("id",capsule_ID);
							
							//answer
							if(result[capsule_ID].state=="執行")
							$(".mission-textarea-answer").val(window.localStorage.getItem(capsule_ID));
							else if(result[capsule_ID].state=="待評")
							$(".mission-textarea-answer").val(result[capsule_ID].answer);
							
							if(result[capsule_ID].state=="執行"&&result[capsule_ID].answer=="SAVE"){
								$("#see_pic").attr("src","http://114.32.130.29/mochi/Capsule_Answer_image/"+capsule_ID);
							}
							else if(result[capsule_ID].state=="待評")
							$("#wait_see_pic").attr("src","http://114.32.130.29/mochi/Capsule_Answer_image/"+capsule_ID);
							
							
							//mseeage
							if(result[capsule_ID].executor==window.localStorage.getItem('username')){
								if(result[capsule_ID].state=="執行")
								$(".mission-textarea-message_text").val(window.localStorage.getItem(capsule_ID+"_message"));
								else if(result[capsule_ID].state=="待評")
								$(".mission-textarea-message_text").val(result[capsule_ID].announcer_suggest);	
							}
							else if(result[capsule_ID].announcer==window.localStorage.getItem('username')){
								$(".mission-textarea-message_text").val(window.localStorage.getItem(capsule_ID+"_message"));						
							}
							
							
							//score
							for(var i=1;i<=5;i++){
							$("."+i+"_points").attr("src","images/mission/missionC-20.png");
							}
							if(result[capsule_ID].state=="執行")
							for(var i=1;i<=window.localStorage.getItem(capsule_ID+"_score");i++){
							$("."+i+"_points").attr("src","images/mission/missionC-19.png");
							}
							else if(result[capsule_ID].state=="待評")
							for(var i=1;i<=result[capsule_ID].announcer_score;i++){
							$("."+i+"_points").attr("src","images/mission/missionC-19.png");
							}
							
							//評分系統
								$(".mission-div-heart>img").on("click",function(){
									if($("#mission_state").attr("src")=="images/mission/missionZ-08.png"||
									  ($("#mission_state").attr("src")=="images/mission/missionB-02.png"&&
									  window.localStorage.getItem('username')!=$(".mission-div-from>p").html())){
									var capsule_ID=$(".mission-div-infro_page").data("id");
									for(var i=1;i<=5;i++){
										$("."+i+"_points").attr("src","images/mission/missionC-20.png");
									}
									for(var i=1;i<=$(this).data("score");i++){
										$("."+i+"_points").attr("src","images/mission/missionC-19.png");
									}
									savescore(capsule_ID,$(this).data("score"));
									}
								});
						//----------------------------------------------------------------------------------------------------
							for(var i=1;i<=5;i++){
							$("."+i+"_mypoints").attr("src","images/mission/missionC-20.png");
							$("."+i+"_getpoints").attr("src","images/mission/missionC-20.png");
							}
							
							
							if(result[capsule_ID].announcer!=window.localStorage.getItem('username')){
								for(var i=1;i<=result[capsule_ID].announcer_score;i++){
								$("."+i+"_mypoints").attr("src","images/mission/missionC-19.png");
								}
								$("#myscore textarea").val(result[capsule_ID].announcer_suggest);
								for(var i=1;i<=result[capsule_ID].executor_score;i++){
								$("."+i+"_getpoints").attr("src","images/mission/missionC-19.png");
								}
								$("#getscore textarea").val(result[capsule_ID].executor_suggest);
							}
							else{
								for(var i=1;i<=result[capsule_ID].announcer_score;i++){
								$("."+i+"_getpoints").attr("src","images/mission/missionC-19.png");
								}
								$("#getscore textarea").val(result[capsule_ID].announcer_suggest);
								for(var i=1;i<=result[capsule_ID].executor_score;i++){
								$("."+i+"_mypoints").attr("src","images/mission/missionC-19.png");
								}
								$("#myscore textarea").val(result[capsule_ID].executor_suggest);
							}
						//------------------
							if(result[capsule_ID].state=="完成"
							   &&result[capsule_ID].announcer==window.localStorage.getItem('username'))
								$(".mission-div-infro_page").data("getscore",result[capsule_ID].announcer_score);
							else if(result[capsule_ID].state=="完成"
							   &&result[capsule_ID].announcer!=window.localStorage.getItem('username')){
								$(".mission-div-dialog_executorgetscore").css({display:"block"});
								$(".all-div-mask").css({display:"block"});
								var now_money=parseInt($(".bar-span-game_money").html());
								var getscore=parseInt(result[capsule_ID].executor_score);
								$(".bar-span-game_mony").html(now_money+getscore);
								update_money(now_money+getscore);
								addtocollection(capsule_ID);
								showannounce();
							}
								
							
						//dialog
							$("#dialog_answer").html(result[capsule_ID].answer);
							$("#answer_pic").attr("src","http://114.32.130.29/mochi/Capsule_Answer_image/"+$('.mission-div-infro_page').data('id'));
						//eggground
							$(".mission-div-text_answer p").html(result[capsule_ID].time);
							
                        },
                        error(msg){
                           console.log("error");
                        }
            });
	}
	//把愛心數儲存起來
	function savescore(capsule_ID,score){
		window.localStorage.setItem(capsule_ID+"_score",score);
	}
	//把留言儲存起來
	function savemessage(capsule_ID,message){
		window.localStorage.setItem(capsule_ID+"_message",message);
	}
//--------------------------------------------------------------
//--------------------信箱事件------------------------------------
//--------------------------------------------------------------
	//顯示信件
	function showemail(){
			var email=[];
			$.ajax({
                        url:"http://114.32.130.29/mochi/email/Show_Email.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username')},
						async:false,
                        success(msg){
                            var result=JSON.parse(msg);
							console.log(result);
                            $("#myinvitefriendlist").html("");
                            for(var key in result){

								//key是你擁有的信件編號，result[key]是一個陣列
                                 
                                     //value有很多東西
									 //result[key][question]...
								
								if("扭蛋"==result[key]["email_type"]){
									 if(result[key]["state"]=="未讀"){
										 //show出未讀信件
									 }
									 else if(result[key]["state"]=="已讀"){
										 //show出已讀信件
									 }
								}	
								else if("好友"==result[key]["email_type"]){
									
									email[result[key]["email_ID"]]=result[key]["sender"];
									
								}
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
				});
		
						for(var key in email){
							$.ajax({
								url:"http://114.32.130.29/mochi/memberdata/Show_MemberData.php",
								type:"POST",
								datatype:"JSON",
								data:{"username":email[key]},
								async:false,
								success(data){
									var	memberdata=JSON.parse(data);
									nickname=memberdata.nickname;
									console.log(email[key]);
									
							oneitem="<div class='friend-div-list_item' data-id="+email[key]+" data-email_id="+key+">"+
									"<div class='friend-div-list_face'><img src='images/index/mochi_style/mochi.png'></div>"+
									"<p class='friend-div-list_name'>"+nickname+"</p>"+
									"<img src='images/friend/friend-05.png' class='friend-div-list_btn friend_ok'>"+
									"<img src='images/friend/friend-06.png' class='friend-div-list_btn friend_cancle'>"+
									"</div>";
									$("#myinvitefriendlist").append(oneitem);
								},
								error(msg){}
								});
						}
	}
	//刪除信件
	function deleteemail(email_ID){
		$.ajax({
                        url:"http://114.32.130.29/mochi/email/Delete_Email.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem("username"),
							  "email_ID":email_ID},
                        success(msg){
						var result=JSON.parse(msg);
							console.log(result);
							
                        },
                        error(msg){
                            
                        }
            });
	}
	//刪除全部信件
	function deleteallemail(){
			$.ajax({
                        url:"http://114.32.130.29/mochi/email/Delete_Email.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username')},
                        success(msg){
                            var result=JSON.parse(msg);
                           
                            for(var key in result){
								deleteemail(key);		
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
				});
	}
	//信件標示為已讀
	function changestate(email_ID){
		$.ajax({
                        url:"http://114.32.130.29/mochi/email/Update_EmailState.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"email_ID":email_ID},
                        success(msg){
							var result=JSON.parse(msg);
                               //結果資訊
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//顯示信件的資訊
	function showemail_detail(email_ID){
			$.ajax({
                        url:"http://114.32.130.29/mochi/email/Show_Email.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username')},
                        success(msg){
                            var result=JSON.parse(msg);
                           
                            for(var key in result){
                                
								//key是你擁有的信件編號，result[key]是一個陣列
                                 
									 //result[key][question]...
									 if(result[key]["email_ID"]==email_ID){
										 //show出此信件
									 }
									 
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
				});
	}
	//送出信件(指定扭蛋、好友邀請)
	function sendemail(recipient,title,content,email_type){
			$.ajax({
                        url:"http://114.32.130.29/mochi/email/Send_Email.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username":window.localStorage.getItem('username'),
							  "recipient":recipient,
							  "title":title,
							  "content":content,
							  "email_type":email_type},
                        success(msg){
                            var result=JSON.parse(msg);
                           console.log(result);
                            //輸出結果
                        },
                        error(msg){
                            
                        }
				});
	}
//--------------------------------------------------------------
//--------------------好友事件------------------------------------
//--------------------------------------------------------------
	//加入好友
	function insertfriend(username){
		$.ajax({
                        url:"http://114.32.130.29/mochi/friend/Insert_Friend.php",
                        type:"POST",
                        datatype:"JSON",
			 			data:{"username_1":window.localStorage.getItem('username'),
							 "username_2":username},
                        success(msg){
                            var result=JSON.parse(msg);
                           
                        },
                        error(msg){
                            alert(msg);
                        }
				});
	}
	//顯示好友資訊
	function showfriend(){
		$("#myfriendlist").html("");
		$.ajax({
                        url:"http://114.32.130.29/mochi/friend/Show_Friend.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem('username')},
                        success(msg){
							 var result=JSON.parse(msg);
                               //結果資訊
							for(var key in result){
                                
								//key是你擁有的好友編號，result[key]是一個好友會員帳號

								$.ajax({
									url:"http://114.32.130.29/mochi/memberdata/Show_MemberData.php",
									type:"POST",
									datatype:"JSON",
									data:{"username":result[key]},
									success(msg){
										var memberdata=JSON.parse(msg);
										  //nickname,mochi_style,finish_execute_capsule,finish_announce_capsule,last_login_time
										
										
										
								oneitem="<div class='friend-div-list_item'>"+
										"<div class='friend-div-list_face'><img src='images/index/mochi_style/mochi.png'></div>"+
										"<p class='friend-div-list_name'>"+memberdata.nickname+"</p>"+
										"<img src='images/friend/friend-07.png' class='friend-div-list_infor friend_infor'>"+
										"</div>";
										
										$("#myfriendlist").append(oneitem);
										

									},
									error(msg){
										alert(msg);
									}
								});  
                            }
                        },
                        error(msg){
                            alert(msg);
                        }
            });
	}
	//搜尋會員
	function selectfriend(username){
			$.ajax({
                        url:"http://114.32.130.29/mochi/memberdata/Show_MemberData.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":username},
                        success(msg){
                            var result=JSON.parse(msg);
							if(result.nickname==null){
								//找不到此人
								$(".friend-dialog-content>p").html("很抱歉，找不到此用戶");
								$(".friend-div-dialog_check").css({display:"block"});
							}
							else{
								$(".nickname").html(result.nickname);
								$(".friend-div-dialog_blackinfor").css({display:"block"});
								
							}
                        },
                        error(msg){
                            
                        }
              });
	}
//--------------------------------------------------------------
//--------------------會員事件------------------------------------
//--------------------------------------------------------------
	//調出會員資料
	function setInformation(){
				$.ajax({
                        url:"http://114.32.130.29/mochi/memberdata/Show_MemberData.php",
                        type:"POST",
                        datatype:"JSON",
                        data:{"username":window.localStorage.getItem("username")},
                        success(msg){
                            var result=JSON.parse(msg);
							$(".bar-span-game_name").html(result.nickname);
							$(".bar-span-game_mony").html(result.money);
						$(".index-img-mochi").attr("src","images/index/mochi_style/D/"+result.mochi_style.substr(9,3)+".png");
							setbackground(result.background_style);
                        },
                        error(msg){
                            
                        }
                    });
				update_loginlasttime();
	}
	//更新最後登入時間
	function update_loginlasttime(){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Updata_MemberLastLoginTime.php",
					data:{"username":window.localStorage.getItem("username")},
					datatype:"JSON",
					type:"POST",
					success(msg){},
					error(msg){}
				});
	}
	//更新發布任務數量
	function update_MemberFinishAnnounceCapsule(){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Update_MemberFinishAnnounceCapsule.php",
					data:{"username":window.localStorage.getItem("username")},
					datatype:"JSON",
					type:"POST",
					success(msg){},
					error(msg){}
				});
	}
	//更新接收任務數量
	function update_MemberFinishExecuteCapsule(){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Update_MemberFinishExecuteCapsule.php",
					data:{"username":window.localStorage.getItem("username")},
					datatype:"JSON",
					type:"POST",
					success(msg){},
					error(msg){}
				});
	}
	//更新愛心數
	function update_money(money){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Update_MemberMoney.php",
					data:{"username":window.localStorage.getItem("username"),
						 "money":money},
					type:"POST",
					datatype:"JSON",
					success(msg){
						var result=JSON.parse(msg);
						
					},
					error(msg){
						console.log(msg);
					}
				});
	}
	//更新暱稱
	function update_nickname(nickname){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Update_MemberNickname.php",
					data:{"username":window.localStorage.getItem("username"),
						 "nickname":nickname},
					type:"POST",
					datatype:"JSON",
					success(msg){},
					error(msg){}
				});
	}
	//更新密碼
	function update_password(password){
		$.ajax({
					url:"http://114.32.130.29/mochi/memberdata/Update_MemberPassword.php",
					data:{"username":window.localStorage.getItem("username"),
						 "password":password},
					datatype:"JSON",
					type:"POST",
					success(msg){},
					error(msg){}
				});
	}
	
	
//--------------------------------------------------------------
//--------------------扭蛋廣場------------------------------------
//--------------------------------------------------------------

