(function (e) {
    function r(t) {
        var n = t || window.event,
            r = [].slice.call(arguments, 1),
            i = 0,
            s = true,
            o = 0,
            u = 0;
        t = e.event.fix(n);
        t.type = "mousewheel";
        if (n.wheelDelta) {
            i = n.wheelDelta / 120
        }
        if (n.detail) {
            i = -n.detail / 3
        }
        u = i;
        if (n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS) {
            u = 0;
            o = -1 * i
        }
        if (n.wheelDeltaY !== undefined) {
            u = n.wheelDeltaY / 120
        }
        if (n.wheelDeltaX !== undefined) {
            o = -1 * n.wheelDeltaX / 120
        }
        r.unshift(t, i, o, u);
        return (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var t = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) {
        for (var n = t.length; n;) {
            e.event.fixHooks[t[--n]] = e.event.mouseHooks
        }
    }
    e.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var e = t.length; e;) {
                    this.addEventListener(t[--e], r, false)
                }
            } else {
                this.onmousewheel = r
            }
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var e = t.length; e;) {
                    this.removeEventListener(t[--e], r, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
})(jQuery);
(function ($) {
    $.fn.lofJSidernews = function (e) {
        return this.each(function () {
            new $.lofSidernews(this, e)
        })
    };
    $.lofSidernews = function (e, t) {
        this.settings = {
            direction: "",
            mainItemSelector: "li",
            navInnerSelector: "ul",
            navSelector: "li",
            navigatorEvent: "click",
            wapperSelector: ".sliders-wrap-inner",
            interval: 5e3,
            auto: false,
            maxItemDisplay: 3,
            startItem: 0,
            navPosition: "vertical",
            navigatorHeight: 100,
            navigatorWidth: 310,
            duration: 600,
            navItemsSelector: ".navigator-wrap-inner li",
            navOuterSelector: ".navigator-wrapper",
            isPreloaded: true,
            easing: "easeInOutQuad",
            onPlaySlider: function (e, t) {},
            onComplete: function (e, t) {},
            rtl: false
        };
        $.extend(this.settings, t || {});
        this.nextNo = null;
        this.previousNo = null;
        this.maxWidth = this.settings.mainWidth || 684;
        this.wrapper = $(e).find(this.settings.wapperSelector);
        var n = $('<div class="sliders-wrapper"></div>').width(this.maxWidth);
        this.wrapper.wrap(n);
        this.slides = this.wrapper.find(this.settings.mainItemSelector);
        if (!this.wrapper.length || !this.slides.length) return;
        if (this.settings.maxItemDisplay > this.slides.length) {
            this.settings.maxItemDisplay = this.slides.length
        }
        this.currentNo = isNaN(this.settings.startItem) || this.settings.startItem > this.slides.length ? 0 : this.settings.startItem;
        this.navigatorOuter = $(e).find(this.settings.navOuterSelector);
        this.navigatorItems = $(e).find(this.settings.navItemsSelector);
        this.navigatorInner = this.navigatorOuter.find(this.settings.navInnerSelector);
        if (this.settings.navigatorHeight == null || this.settings.navigatorWidth == null) {
            this.settings.navigatorHeight = this.navigatorItems.eq(0).outerWidth(true);
            this.settings.navigatorWidth = this.navigatorItems.eq(0).outerHeight(true)
        }
        if (this.settings.navPosition == "horizontal") {
            this.navigatorInner.width(this.slides.length * this.settings.navigatorWidth);
            this.navigatorOuter.width(this.settings.maxItemDisplay * this.settings.navigatorWidth);
            this.navigatorOuter.height(this.settings.navigatorHeight)
        } else {
            this.navigatorInner.height(this.slides.length * this.settings.navigatorHeight);
            this.navigatorOuter.height(this.settings.maxItemDisplay * this.settings.navigatorHeight);
            this.navigatorOuter.width(this.settings.navigatorWidth)
        }
        this.slides.width(this.settings.mainWidth);
        this.navigratorStep = this.__getPositionMode(this.settings.navPosition);
        this.directionMode = this.__getDirectionMode();
        if (this.settings.direction == "opacity") {
            this.wrapper.addClass("lof-opacity");
            $(this.slides).css({
                opacity: 0,
                "z-index": 1
            }).eq(this.currentNo).css({
                opacity: 1,
                "z-index": 3
            })
        } else {
            if (this.settings.rtl) this.wrapper.css({
                right: "-" + this.currentNo * this.maxSize + "px",
                width: this.maxWidth * this.slides.length
            });
            else this.wrapper.css({
                left: "-" + this.currentNo * this.maxSize + "px",
                width: this.maxWidth * this.slides.length
            })
        } if (this.settings.isPreloaded) {
            this.preLoadImage(this.onComplete)
        } else {
            this.onComplete()
        }
        $buttonControl = $(".button-control", e);
        if (this.settings.auto) {
            $buttonControl.addClass("action-stop")
        } else {
            $buttonControl.addClass("action-start")
        }
        var r = this;
        $(e).hover(function () {
            r.stop();
            $buttonControl.addClass("action-start").removeClass("action-stop").addClass("hover-stop")
        }, function () {
            if ($buttonControl.hasClass("hover-stop")) {
                if (r.settings.auto) {
                    $buttonControl.removeClass("action-start").removeClass("hover-stop").addClass("action-stop");
                    r.play(r.settings.interval, "next", true)
                }
            }
        });
        $buttonControl.click(function () {
            if ($buttonControl.hasClass("action-start")) {
                r.settings.auto = true;
                r.play(r.settings.interval, "next", true);
                $buttonControl.removeClass("action-start").addClass("action-stop")
            } else {
                r.settings.auto = false;
                r.stop();
                $buttonControl.addClass("action-start").removeClass("action-stop")
            }
        })
    };
    $.lofSidernews.fn = $.lofSidernews.prototype;
    $.lofSidernews.fn.extend = $.lofSidernews.extend = $.extend;
    $.lofSidernews.fn.extend({
        startUp: function (e, t) {
            seft = this;
            this.navigatorItems.each(function (e, t) {
                $(t).bind(seft.settings.navigatorEvent, function () {
                    seft.jumping(e, true);
                    seft.setNavActive(e, t)
                });
                $(t).css({
                    height: seft.settings.navigatorHeight,
                    width: seft.settings.navigatorWidth
                })
            });
            this.registerWheelHandler(this.navigatorOuter, this);
            this.setNavActive(this.currentNo);
            this.settings.onComplete(this.slides.eq(this.currentNo), this.currentNo);
            if (this.settings.buttons && typeof this.settings.buttons == "object") {
                this.registerButtonsControl("click", this.settings.buttons, this)
            }
            if (this.settings.auto) this.play(this.settings.interval, "next", true);
            return this
        },
        onComplete: function () {
            setTimeout(function () {
                $(".preload").fadeOut(900, function () {
                    $(".preload").remove()
                })
            }, 400);
            this.startUp()
        },
        preLoadImage: function (e) {
            var t = this;
            var n = this.wrapper.find("img");
            var r = 0;
            n.each(function (e, i) {
                if (!i.complete) {
                    i.onload = function () {
                        r++;
                        if (r >= n.length) {
                            t.onComplete()
                        }
                    };
                    i.onerror = function () {
                        r++;
                        if (r >= n.length) {
                            t.onComplete()
                        }
                    }
                } else {
                    r++;
                    if (r >= n.length) {
                        t.onComplete()
                    }
                }
            })
        },
        navivationAnimate: function (currentIndex) {
            if (currentIndex <= this.settings.startItem || currentIndex - this.settings.startItem >= this.settings.maxItemDisplay - 1) {
                this.settings.startItem = currentIndex - this.settings.maxItemDisplay + 2;
                if (this.settings.startItem < 0) this.settings.startItem = 0;
                if (this.settings.startItem > this.slides.length - this.settings.maxItemDisplay) {
                    this.settings.startItem = this.slides.length - this.settings.maxItemDisplay
                }
            }
            this.navigatorInner.stop().animate(eval("({" + this.navigratorStep[0] + ":-" + this.settings.startItem * this.navigratorStep[1] + "})"), {
                duration: 500,
                easing: "easeInOutQuad"
            })
        },
        setNavActive: function (e, t) {
            if (this.navigatorItems) {
                this.navigatorItems.removeClass("active");
                $(this.navigatorItems.get(e)).addClass("active");
                this.navivationAnimate(this.currentNo)
            }
        },
        __getPositionMode: function (e) {
            if (e == "horizontal") {
                if (this.settings.rtl) return ["right", this.settings.navigatorWidth];
                else return ["left", this.settings.navigatorWidth]
            }
            return ["top", this.settings.navigatorHeight]
        },
        __getDirectionMode: function () {
            switch (this.settings.direction) {
            case "opacity":
                this.maxSize = 0;
                return ["opacity", "opacity"];
            default:
                this.maxSize = this.maxWidth;
                if (this.settings.rtl) return ["right", "width"];
                else return ["left", "width"]
            }
        },
        registerWheelHandler: function (e, t) {
            e.bind("mousewheel", function (e, n) {
                var r = n > 0 ? "Up" : "Down",
                    i = Math.abs(n);
                if (n > 0) {
                    t.previous(true)
                } else {
                    t.next(true)
                }
                return false
            })
        },
        registerButtonsControl: function (e, t, n) {
            for (var r in t) {
                switch (r.toString()) {
                case "next":
                    t[r].click(function () {
                        n.next(true)
                    });
                    break;
                case "previous":
                    t[r].click(function () {
                        n.previous(true)
                    });
                    break
                }
            }
            return this
        },
        onProcessing: function (e, t, n) {
            this.previousNo = this.currentNo + (this.currentNo > 0 ? -1 : this.slides.length - 1);
            this.nextNo = this.currentNo + (this.currentNo < this.slides.length - 1 ? 1 : 1 - this.slides.length);
            return this
        },
        finishFx: function (e) {
            if (e) this.stop();
            if (e && this.settings.auto) {
                this.play(this.settings.interval, "next", true)
            }
            this.setNavActive(this.currentNo);
            this.settings.onPlaySlider(this, $(this.slides).eq(this.currentNo))
        },
        getObjectDirection: function (start, end) {
            return eval("({'" + this.directionMode[0] + "':-" + this.currentNo * start + "})")
        },
        fxStart: function (e, t, n) {
            var r = this;
            if (this.settings.direction == "opacity") {
                $(this.slides).stop().animate({
                    opacity: 0
                }, {
                    duration: this.settings.duration,
                    easing: this.settings.easing,
                    complete: function () {
                        r.slides.css("z-index", "1");
                        r.slides.eq(e).css("z-index", "3")
                    }
                });
                $(this.slides).eq(e).stop().animate({
                    opacity: 1
                }, {
                    duration: this.settings.duration,
                    easing: this.settings.easing,
                    complete: function () {
                        r.settings.onComplete($(r.slides).eq(e), e)
                    }
                })
            } else {
                this.wrapper.stop().animate(t, {
                    duration: this.settings.duration,
                    easing: this.settings.easing,
                    complete: function () {
                        r.settings.onComplete($(r.slides).eq(e), e)
                    }
                })
            }
            return this
        },
        jumping: function (no, manual) {
            this.stop();
            if (this.currentNo == no) return;
            var obj = eval("({'" + this.directionMode[0] + "':-" + this.maxSize * no + "})");
            this.onProcessing(null, manual, 0, this.maxSize).fxStart(no, obj, this).finishFx(manual);
            this.currentNo = no
        },
        next: function (e, t) {
            this.currentNo += this.currentNo < this.slides.length - 1 ? 1 : 1 - this.slides.length;
            this.onProcessing(t, e, 0, this.maxSize).fxStart(this.currentNo, this.getObjectDirection(this.maxSize), this).finishFx(e)
        },
        previous: function (e, t) {
            this.currentNo += this.currentNo > 0 ? -1 : this.slides.length - 1;
            this.onProcessing(t, e).fxStart(this.currentNo, this.getObjectDirection(this.maxSize), this).finishFx(e)
        },
        play: function (e, t, n) {
            this.stop();
            if (!n) {
                this[t](false)
            }
            var r = this;
            this.isRun = setTimeout(function () {
                r[t](true)
            }, e)
        },
        stop: function () {
            if (this.isRun == null) return;
            clearTimeout(this.isRun);
            this.isRun = null
        }
    })
})(jQuery)