/**
 *	nav.html, nav.css, nav.js
 *	by Roger(drwn4078@outlook.com) 2011-11-01
 */
$(document).ready(function() {
	setTitle();
	setNav();
	setTree();
	setPopup();
});

function setTitle() {
	document.title = $(document).attr("title") + "(" + document.domain + ")";
}

function setNav() {
	$(".nav").each(function() {
		var $nav = $(this);
		var $uls = $("ul", $nav);
		var $lis = $("li", $nav);
		var $anchors = $("a", $nav);
		$anchors.wrapInner("<span class=\"label\"></span>");
		function setUl() {
			var $uls = $("ul", $nav);
			var depth;
			for (var i = 0; i < $uls.length; i++) {
				var $ul = $uls.eq(i);
				depth = $ul.parents("ul").length;
				$ul.addClass("a" + (depth + 2));
				var $lis = $("> li", $ul);
				for (var j = 0; j < $lis.length; j++) {
					var $li = $lis.eq(j);
					var $anchor = $("> a", $li);
					$li.prepend("<span class=\"node\"></span>");
					$anchor.append("<span class=\"status\"></span>");
					var $node = $(".node", $li);
					var $status = $(".status", $li);

					if ($("ul", $li).length < 1) $li.addClass("terminal");

					$node.css({"left": ((depth * 1.4) - 1.0) + "em"});
					$anchor.css({"padding-left": ((depth * 1.4) + 0.8) + "em"});

					if ($anchor.attr("href") == "#") $anchor.addClass("disabled");
				}
			}
		}
		// SET <.node> AND <UL> MARKED AS COLLAPSED (* DEFAULT = EXPANDED)
		function setLi() {
			$("li.collapsed", $nav).find("ul:first").hide();
		}
		function setEvent() {
			// RUN <.node:NOT(.FIXED)>
			$nav.on("click", ".node:not(.fixed)", function(e) {
				e.preventDefault();
				setNode($(this));
			});
			// RUN <.btn.expand-all>
			$nav.on("click", ".btn.expand-all", function() {
				if ($(this).hasClass("pressed")) return false;
				$(this).parents("ul.a2").find(".node:not(.fixed)").parent("li").find("ul:first").show();
				setTree($(this));
			});
			// RUN <.btn.collapse-all>
			$nav.on("click", ".btn.collapse-all", function() {
				if ($(this).hasClass("pressed")) return false;
				$(this).parents("ul.a2").find(".node:not(.fixed)").parent("li").find("ul:first").hide();
				setTree($(this));
			});
			// PREVENT 404
			$nav.on("click", "a", function(e) {
//				if ($(this).hasClass("disabled")) {
				if (!$(this).hasClass("done")) {
					e.preventDefault();
					return false;
				}
			});
		}
		function init() {
			setUl();
		}
		function activate() {
			setLi();
			setEvent();
		}
		init();
		activate();
	});
}

function setNode(o) {
	var $nav = $(".nav");
	var $ul = $("ul.a2", $nav);
	var $thisLi = o.parent("li");
	var $thisUl = $thisLi.parents("ul.a2");
	var i = $ul.index($thisUl);
	var j = ($("li:not(.terminal)",$thisUl).index($thisLi));
	var status = {};
	status[0] = $.cookie("node[" + document.location.href + "][" + i + "][" + j + "]");
	status[1] = ($thisLi.hasClass("collapsed")) ? 2 : 1; 
	if (status[0] != status[1]) {
		if (status[1] == 1) {
			$thisLi.addClass("collapsed");
		} else {
			$thisLi.removeClass("collapsed");
		}
		$("> ul:first", $thisLi).slideToggle(function() {
			$.cookie("node[" + document.location.href + "][" + i + "][" + j + "]", status[1], {expires:7});
		});
	}
}

function setTree() {
	var $nav = $(".nav");
	var $ul = $("ul.a2", $nav);
	for (var i = 0; i < $ul.length; i++) {
		var $thisUl = $ul.eq(i);
		var $li = $("li:not(.terminal)", $thisUl);
		for (var j = 0; j < $li.length; j++) {
			var $thisLi = $li.eq(j);
			var status = $.cookie("node[" + document.location.href + "][" + i + "][" + j + "]");
			if (status) {
				switch (status) {
					case "1" :
						$thisLi.addClass("collapsed");
						$("ul:first", $thisLi).hide();
						break;
					case "2" :
						$thisLi.removeClass("collapsed");
						$("ul:first", $thisLi).show();
						break;
					default :
						break;
				}
			}
		}
	}
}

function setPopup() {
	$("body").on("click", ".run-popup:not(.disabled)", function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.parent().hasClass("disabled")) return false;
		var href = $this.attr("href");
		if (!href) return false;
		var name = href.match(/.*\/(.*)$/)[1];
		name = name.replace(/\W/g, "");
		var data = $this.attr("data-json");
		var width = $this.runPopup.defaults.width;
		var height = $this.runPopup.defaults.height;
		var left = $this.runPopup.defaults.left;
		var top = $this.runPopup.defaults.top;
		var scrollbars = $this.runPopup.defaults.scrollbars;
		if (data) {
			data = $.parseJSON(data);
			if (data.width) width = data.width;
			if (data.height) height = data.height;
			if (data.scrollbars) scrollbars = data.scrollbars;
		}
		if (width != $this.runPopup.defaults.width) left = (screen.availWidth - width) / 2;
		if (height != $this.runPopup.defaults.height) top = (screen.availHeight - height) / 2;
		$this.runPopup({
			name: name,
			url: href,
			left: left,
			top: top,
			width: width,
			height: height,
			scrollbars: scrollbars
		});
	});
}

// PLUGIN : POPUP
(function($) {
	$.fn.extend({
		runPopup: function(options) {
			var options = $.extend({}, $.fn.runPopup.defaults, options);
			return this.each(function() {
				var features =
					"modal"
					+ ",left=" + options.left
					+ ",top=" + options.top
					+ ",width=" + options.width
					+ ",height=" + options.height
					+ ",directories=" + options.directories
					+ ",location=" + options.location
					+ ",menubar=" + options.menubar
					+ ",toolbar=" + options.toolbar
					+ ",scrollbars=" + options.scrollbars
					+ ",status=" + options.status
					+ ",resizable=" + options.resizable
					;
				var popupWindow = window.open(options.url, options.name, features);
			});
		}
	});
	$.fn.runPopup.defaults = {
		name: "",
		url: "",
		left: "auto",
		top: "auto",
		width: "auto",
		height: "auto",
		directories: "no",
		location: "no",
		menubar: "no",
		scrollbars: "no",
		status: "no",
		resizable: "no",
		toolbar: "no"
	};
})(jQuery);
