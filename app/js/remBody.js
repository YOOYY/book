(function (doc, win, htmlSize) {
    var docEl = doc.documentElement,

        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

        recalc = function () {

            var clientWidth = docEl.clientWidth;

            if (!clientWidth) {
                return;
            }

            docEl.style.fontSize = 100 * (clientWidth / htmlSize) + 'px';
        };

    if (doc.addEventListener) {
        win.addEventListener(resizeEvt, recalc, false);

        doc.addEventListener('DOMContentLoaded', recalc, false);
    } else if (win.attachEvent) {
        recalc();
    }

    return;

})(document, window, 750);