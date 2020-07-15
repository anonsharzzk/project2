/*!
 * jQuery Smooth Scroll Plugin v1.4.1
 *
 * Date: Tue Nov 15 14:24:14 2011 EST
 * Requires: jQuery v1.3+
 *
 * Copyright 2010, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 *
 *
 *
*/
(function(b){function l(c){return c.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")}function m(c){return c.replace(/(:|\.)/g,"\\$1")}var n=l(location.pathname),o=function(c){var e=[],a=false,d=c.dir&&c.dir=="left"?"scrollLeft":"scrollTop";this.each(function(){if(!(this==document||this==window)){var g=b(this);if(g[d]()>0)e.push(this);else{g[d](1);a=g[d]()>0;g[d](0);a&&e.push(this)}}});if(c.el==="first"&&e.length)e=[e.shift()];return e};b.fn.extend({scrollable:function(c){return this.pushStack(o.call(this,
{dir:c}))},firstScrollable:function(c){return this.pushStack(o.call(this,{el:"first",dir:c}))},smoothScroll:function(c){c=c||{};var e=b.extend({},b.fn.smoothScroll.defaults,c);this.die("click.smoothscroll").live("click.smoothscroll",function(a){var d={},g=b(this),h=location.hostname===this.hostname||!this.hostname,f=e.scrollTarget||(l(this.pathname)||n)===n,j=m(this.hash),i=true;if(!e.scrollTarget&&(!h||!f||!j))i=false;else{h=e.exclude;f=0;for(var k=h.length;i&&f<k;)if(g.is(m(h[f++])))i=false;h=e.excludeWithin;
f=0;for(k=h.length;i&&f<k;)if(g.closest(h[f++]).length)i=false}if(i){a.preventDefault();b.extend(d,e,{scrollTarget:e.scrollTarget||j,link:this});b.smoothScroll(d)}});return this}});b.smoothScroll=function(c,e){var a,d,g,h=0;d="offset";var f="scrollTop",j={};if(typeof c==="number"){a=b.fn.smoothScroll.defaults;g=c}else{a=b.extend({},b.fn.smoothScroll.defaults,c||{});if(a.scrollElement){d="position";a.scrollElement.css("position")=="static"&&a.scrollElement.css("position","relative")}g=e||b(a.scrollTarget)[d]()&&
b(a.scrollTarget)[d]()[a.direction]||0}a=b.extend({link:null},a);f=a.direction=="left"?"scrollLeft":f;if(a.scrollElement){d=a.scrollElement;h=d[f]()}else d=b("html, body").firstScrollable();j[f]=g+h+a.offset;b.isFunction(a.beforeScroll)&&a.beforeScroll.call(d,a);d.animate(j,{duration:a.speed,easing:a.easing,complete:function(){a.afterScroll&&b.isFunction(a.afterScroll)&&a.afterScroll.call(a.link,a)}})};b.smoothScroll.version="1.4.1";b.fn.smoothScroll.defaults={exclude:[],excludeWithin:[],offset:0,
direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:null,afterScroll:null,easing:"swing",speed:400}})(jQuery);


jQuery(document).ready(function($){
	$('a').smoothScroll({
		speed: 800,
		exclude: ['#portfolio-nav a']
	});
								
})





  
  
  
  
/***************************************************
	  PINNED NAVIGATION
***************************************************/
function element_positions(section){
	var element_y = new Array();
	$(section).each(function(i){
		element_y[i] = parseInt($(this).position().top);
		//alert(i + " " + element_y[i]);
	})
	element_y[element_y.length] = parseInt($("#footer").position().top);
	return element_y;
}

function where(section){
	var offset_y = f_scrollTop();
	var element_y = new Array();
	element_y = element_positions(section);
	var h_prev = 0;
	for(i = 1 ; i <= element_y.length ; i++ ){
		var j = i + 1;
		var h = element_y[i];
	
		if (offset_y > h_prev && offset_y < h){
			var section_id = $(".content-wrapper:nth-child(" + j + ")").attr("id");
			var is_animated = $(":not('.slide'):animated").length;
			if (!is_animated){
				$("#menu ul li a, .menu ul li a").removeClass("current");
				$("#menu ul li a[href=#" + section_id + "], .menu ul li a[href=#" + section_id + "]").addClass("current");
			}
		}
		h_prev = h;	
	}
}

jQuery(document).ready(function($){
		
	$("#menu ul li a, .menu ul li a").click(function(){
		$("#menu ul li a, .menu ul li a").removeClass("current");
		$(this).addClass("current");
	})
	

	
	var win_width = parseInt($("html, body").width());
	var offset_y = f_scrollTop();
	
	if (offset_y > 100 && ($("#menu").hasClass("")) && (win_width > 960) && !is_tablet() ){
		$("#menu").addClass("pinned");
	}
	
	if (win_width <= 960 || is_tablet() ){
		$menu = $("#menu").clone();
		$(".content-wrapper:gt(0)").prepend("<div class='menu'>" + $menu.html() + "</div>");
		$(".content-wrapper:gt(0) .menu ul").prepend("<li><a href='#top'>home</a></li>");
		$(".menu li a.logo").closest("li").remove();
		
		
		
		

		$(".menu ul li a, #menu ul li a").click(function(){	  
			$(".menu ul li a, #menu ul li a").removeClass("current");
			var href = $(this).attr("href");
			$(".menu ul li a[href='" + href + "']").addClass("current");
			$(".menu ul li a[href='#top']").removeClass("current");
		})
		
		
	}
	
	
						   
	$(window).scroll(function () {  
		where(".content-wrapper");
		
		var nav_h = parseInt($("#menu").outerHeight());
    	var offset_y = f_scrollTop();
		
		var win_width = parseInt($("html, body").width());
		
		if (win_width > 960 && !is_tablet()){
			$(".menu").remove();
			if (offset_y > 100){
			  
				if (!$("#menu").hasClass("pinned")){
					$("#menu").fadeOut(function(){
						$("#menu").addClass("pinned").slideDown("slow");
					})
				}	  
			}
			else{
				if ($("#menu").hasClass("pinned")){
					$("#menu").slideUp(function(){
						$("#menu").removeClass("pinned").fadeIn();
					});
				}
			}
		}
		else{
			$(".menu").remove();
			$menu = $("#menu").clone();
			$(".content-wrapper:gt(0)").prepend("<div class='menu'>" + $menu.html() + "</div>");
			$(".content-wrapper:gt(0) .menu ul").prepend("<li><a href='#top'>home</a></li>");
			$(".menu li a.logo").closest("li").remove();
			
			//if (is_tablet()){
				$(".menu ul li a, #menu ul li a").click(function(){	  
					$(".menu ul li a, #menu ul li a").removeClass("current");
					var href = $(this).attr("href");
					$(".menu ul li a[href='" + href + "']").addClass("current");
					$(".menu ul li a[href='#top']").removeClass("current");
				})
			//}
		}
    });

	


});



/***************************************************
	 ADDITIONAL FUNCTIONS FOR PINNED NAVIGATION
***************************************************/
function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function is_tablet(){
		if (navigator.userAgent.match(/Android/i) ||
	    navigator.userAgent.match(/webOS/i) ||
	    navigator.userAgent.match(/iPhone/i) ||
	    navigator.userAgent.match(/iPod/i) ||
	    navigator.userAgent.match(/iPad/i)) return true; else return false;
}


/***************************************************
	  			SLIDING GRAPH
***************************************************/
jQuery(document).ready(function($){
								
	function isScrolledIntoView(id)
	{
		var elem = "#" + id;
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
	
		if ($(elem).length > 0){
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
		}

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	}

	
	
	function sliding_horizontal_graph(id, speed){
		//alert(id);
		$("#" + id + " li span").each(function(i){
			var j = i + 1; 										  
			var cur_li = $("#" + id + " li:nth-child(" + j + ") span");
			var w = cur_li.attr("title");
			cur_li.animate({width: w + "%"}, speed);
		})
	}
	
	function graph_init(id, speed){
		$(window).scroll(function(){
			if (isScrolledIntoView(id)){
				sliding_horizontal_graph(id, speed);
			}
			else{
				//$("#" + id + " li span").css("width", "0");
			}
		})
		
		if (isScrolledIntoView(id)){
			sliding_horizontal_graph(id, speed);
		}
	}
	
	graph_init("services-graph", 1000);
	

});




/***************************************************
	    PORTFOLIO ITEM IMAGE HOVER
***************************************************/
$(document).ready(function(){
						   
	$(".portfolio-grid ul li .item-info-overlay").hide();
	
	if( is_tablet() ){
		$(".portfolio-grid ul li").click(function(){
												  
			var count_before = $(this).closest("li").prevAll("li").length;
			
			var this_opacity = $(this).find(".item-info-overlay").css("opacity");
			var this_display = $(this).find(".item-info-overlay").css("display");
			
			
			if ((this_opacity == 0) || (this_display == "none")) {
				$(this).find(".item-info-overlay").fadeTo(250, 1.0);
			} else {
				$(this).find(".item-info-overlay").fadeTo(250, 0);
			}
			
			$(this).closest("ul").find("li:lt(" + count_before + ") .item-info-overlay").fadeTo(250, 0);
			$(this).closest("ul").find("li:gt(" + count_before + ") .item-info-overlay").fadeTo(250, 0);	

		});	

	}
	else{	
			$(".portfolio-grid ul li").hover(function(){
				$(this).find(".item-info-overlay").fadeTo(250, 1.0);
				}, function() {
					$(this).find(".item-info-overlay").fadeTo(250, 0);		
			});
		
		}

	
	
	
});




/***************************************************
	  DUPLICATE H3 & H4 IN PORTFOLIO
***************************************************/
$(document).ready(function($){
						  
	$(".item-info").each(function(i){
		$(this).next().prepend($(this).html())
	});
});









/***************************************************
	     TOGGLE STYLE
***************************************************/
jQuery(document).ready(function($) {
								
	$(".toggle-container").hide(); 
	$(".trigger").toggle(function(){
		$(this).addClass("active");
		}, function () {
		$(this).removeClass("active");
	});
	$(".trigger").click(function(){
		$(this).next(".toggle-container").slideToggle();
	});
});




/***************************************************
	     ACCORDION
***************************************************/
$(document).ready(function(){	
	$('.trigger-button').click(function() {
		$(".trigger-button").removeClass("active")
	 	$('.accordion').slideUp('normal');
		if($(this).next().is(':hidden') == true) {
			$(this).next().slideDown('normal');
			$(this).addClass("active");
		 } 
	 });
	$('.accordion').hide();
});




/***************************************************
	    FLICKR AND SOCIALIZE ICON IMAGE HOVER
***************************************************/
$(function() {
$('.flickr_badge_image img').animate({ opacity: 0.7}, 0) ;
$('.flickr_badge_image img').each(function() {
$(this).hover(
function() {
$(this).stop().animate({ opacity: 1.0 }, 200);
},
function() {
$(this).stop().animate({ opacity: 0.7 }, 200);
})
});
});	


$(function() {
$('.social-bookmarks img').animate({ opacity: 0.5}, 0) ;
$('.social-bookmarks img').each(function() {
$(this).hover(
function() {
$(this).stop().animate({ opacity: 1.0 }, 200);
},
function() {
$(this).stop().animate({ opacity: 0.5 }, 200);
})
});
});	




/***************************************************
	   HIDDEN FOOTER CONTENT ADDITIONAL CODE
***************************************************/
jQuery(document).ready(function($){

	$(".trigger-footer a").click(function(){
		if ($(".trigger-footer a").html() == "View more stuff"){
			$(".trigger-footer a").html("View less stuff");
		}
		else{
			$(".trigger-footer a").html("View more stuff");
		}
		var bottom_h = parseInt($("#footer-bottom").height() + 30);
		$(".footer-content-wrapper").css("bottom", bottom_h)
		$(".footer-content-wrapper").slideToggle("fast");
		$(this).toggleClass("active");
		return false;
	});
});


/***************************************************
	  ARCHIVE PAGE TABS
***************************************************/
$(document).ready(function($){

	$('.archive-list > div').slideUp();
	$('#archive-nav li a').click(function(){
		var li_ord = $(this).parent().prevAll().length;
		var li_ord_plus = li_ord + 1;		
		if ($('.archive-list div:nth-child(' + li_ord_plus + ')').css("display") == "none"){			
			$('.archive-list div:visible').slideUp();
			$('.archive-list div:nth-child(' + li_ord_plus + ')').slideDown();
		}
		else{
			$('.archive-list div:visible').slideUp();
		}				
		return false;
	})

});