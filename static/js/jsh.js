refreshEnd= false;
	times=0;//加载次数
	oriSpeed=300;
	var shopId = $('#shopId').attr('src');
    var swiper = new Swiper('.swiper-container',{
		speed: oriSpeed,
		slidesPerView: 'auto',
		freeMode: true,
        direction: 'vertical',
		setWrapperSize: true,
		scrollbar: {
            el: '.swiper-scrollbar',
        },
		on:{ 
			//手动滑动中触发
			touchMove: function() {
				$(".refresh").show();
				swiper=this
				refreshText=swiper.$el.find('.text-pu');
				var moveY = this.translate/2 + 'px';
				$('.text-pu').css('transform', 'translateY('+ moveY+')');
				if (this.translate<70 && this.translate>10) {
					this.$el.find('.text-pu').html('下拉刷新');
				}
				if (this.translate>=70) {
					this.$el.find('.text-pu').html('释放刷新');
				}
			},
			//下拉释放刷新
			touchEnd: function(){
				swiper=this
				refreshText=swiper.$el.find('.text-pu')
				if (this.translate<=100) {
					this.$el.find('.text-pu').html('');
					$(".refresh").hide();
					refreshEnd=true;
				}
                if(this.translate>100){
	                swiper.setTransition(this.params.speed);
                    swiper.setTranslate(100);
		            swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
		            refreshText.html("<img  src="+ shopId + " >");
		            swiper.allowTouchMove=false;
		            $('.text-pu').css('transform', 'translateY(0px)');
					setTimeout(function(){//模仿AJAX
						$(".refresh").hide();
						// swiper.removeAllSlides();
						// for(i=0;i<20;i++){
						// swiper.appendSlide('<div class="swiper-slide">New Slide'+(i+1)+'</div>');
						// }
						refreshText.html('');
						// $('html,body').animate({scrollTop: '0px'}, 800);
						refreshEnd=true;
						swiper.allowTouchMove=true;
						// 重新计算高度
						swiper.update();
					},1000)
					
                }
				 
            },
		}
	});
