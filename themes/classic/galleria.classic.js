/*
 Galleria Classic Theme 2011-02-14
 http://galleria.aino.se

 Copyright (c) 2011, Aino
 Licensed under the MIT license.
*/
/*
 * Galleria Fullscreen Theme v. 2.2 2010-10-28
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function (b) {
    Galleria.addTheme({
        name: "classic",
        author: "Galleria",
        css: "galleria.classic.css",
        defaults: {
            transition: "slide",
            thumbCrop: "height"
            //_toggleInfo: true
        },
        init: function (e) {
            this.addElement("fullscreen-button");
            this.append({
                info: ["fullscreen-button","counter"],
				container: ["info-title"]
            });
            var c = this.$("info-link,info-close,info-text"),
                d = Galleria.TOUCH,
				g = this.$("fullscreen-button"),
                f = d ? "touchstart" : "click";
            this.$("loader").show().css("opacity", 0.4);
            if (!d) {
                this.addIdleState(this.get("image-nav-left"), {
                    left: -50
                });
                this.addIdleState(this.get("image-nav-right"), {
                    right: -50
                });
            }
            if (e._toggleInfo === true) c.bind(f, function () {
                c.toggle()
            });
            else {
                c.show();
                this.$("info-link, info-close").hide()
            }
			g.bind(f, this.proxy(function (e) {
				if(this._fullscreen.active) {
					this.exitFullscreen();
				} else {
					this.enterFullscreen();
				}
			}));
            this.bind("thumbnail", function (a) {
                if (!d) {
                    b(a.thumbTarget).css("opacity", 0.6).parent().hover(function () {
                        b(this).not(".active").children().stop().fadeTo(100, 1)
                    }, function () {
                        b(this).not(".active").children().stop().fadeTo(400, 0.6)
                    });
                    a.index === e.show && b(a.thumbTarget).css("opacity", 1)
                }
            });
            this.bind("loadstart", function (a) {
                a.cached || this.$("loader").show().fadeTo(200, 0.4);
                this.$("info").toggle(this.hasInfo());
                b(a.thumbTarget).css("opacity", 1).parent().siblings().children().css("opacity", 0.6)
            });
            this.bind("loadfinish", function () {
                this.$("loader").fadeOut(200)
            })
        }
    })
})(jQuery);