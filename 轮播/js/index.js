window.onload = function () {
    var box = document.querySelector('.box');
    var width = box.offsetWidth;
    var imageBox = box.querySelector('ul:first-child');
    var pointBox = box.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    }
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    }
    var setTranslateX = function (x) {
        imageBox.style.webkitTransform = "translateX(" + x + "px)";
        imageBox.style.transform = "translateX(" + x + "px)";
    }

    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 2000);

    itcast.transitionEnd(imageBox, function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();
    });

    var setPoint = function (i) {
        for (var i = 0; i < points.length; i++) {
            points[i].className = " ";
        }
        points[index - 1].className = "current";
    }

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-index * width + distanceX);
    });
    window.addEventListener('touchend', function (e) {
        if (Math.abs(distanceX) > (width / 3) && isMove) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        } else {
            addTransition();
            setTranslateX(-index * width);
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 2000);
    });
}
window.itcast = {};
itcast.transitionEnd = function (dom, callback) {
    if (dom && typeof  dom == 'object') {
        dom.addEventListener('webkitTransitionEnd', function () {
            callback && callback();
        });
        dom.addEventListener('transitionEnd', function () {
            callback && callback();
        });
    }
}