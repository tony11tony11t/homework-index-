
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
                        
                        if(!(event.data.SecondBarIsWhat=="other"&&event.data.IsSecondBarVisible==true)){
                            $(".bar-div-second_bar").animate({
                                top:(event.data.IsSecondBarVisible)?"100%":"85.5%"
                            },300);
                        }
                        else{event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;}
                        event.data.SecondBarIsWhat="mission";
						
						 event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                    }
                    else if(bar_item.data("item")=="other"){
                        $(".second_bar_item_other").css({
                           display:"inline-block"
                       });
                        $(".second_bar_item_mission").css({
                           display:"none"
                       });
                        
                        if(!(event.data.SecondBarIsWhat=="mission"&&event.data.IsSecondBarVisible==true)){
                            $(".bar-div-second_bar").animate({
                                top:(event.data.IsSecondBarVisible)?"100%":"85.5%"
                            },300);
                        }
                        else{event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;}
                        event.data.SecondBarIsWhat="other";
						
						 event.data.IsSecondBarVisible=!event.data.IsSecondBarVisible;
                    }
					
                   
				}	//Second_bar的動畫		
				
								

				
											
         