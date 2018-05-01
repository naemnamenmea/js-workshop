var info = document.querySelector('div.info');
var limits = document.querySelectorAll('input.limits');
var input = document.querySelector('input.input');
var score = document.querySelector('div.score');
var btn = document.querySelector('button.btn');

function initLimits () {
    limits[0].value = '';
    limits[0].focus();
    limits[1].value = 1;
}

window.onload = function () {
    initLimits();
};

Array.prototype.slice.call(document.querySelectorAll('input')).forEach(function(el) {
    el.addEventListener('keydown', function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            btn.focus();
        }
    });
});

btn.addEventListener('click', function() {
    var _this = this;
    var _classes = _this.className;

    info.textContent = '';
    info.classList.replace('info-help','hide');

    if(_classes.indexOf('btn-start') != -1) {
        for(var i = limits.length-1; i >= 0; i--) {
            if(limits[i].value == '') {
                info.textContent = 'EMPTY';
                info.classList.replace('hide','info-help');
                limits[i].focus();
                return;
            }
        }

        a = limits[0].value;
        b = limits[1].value;
        startTime = Date.now();
        attemptCount = Math.floor(Math.log(Math.abs(b - a) + 1) / Math.log(2)) + 1;
        attemptTotal = attemptCount;
        hiddenNumber = Math.floor(Math.random() * (Math.max(a,b) - Math.min(a,b) + 1)) + Math.min(a,b);

        _this.textContent = 'TRY';
        _this.classList.replace('btn-start','btn-try');

        for(var i = limits.length-1; i >= 0; i--) {
            limits[i].classList.add('hide');
        }

        score.textContent = 'attempts remaining: ' + attemptCount;
        score.classList.remove('hide');

        input.value = '';
        input.classList.remove('hide');
        input.focus();
    }
    else if(_classes.indexOf('btn-try') != -1) {
        if(input.value == '') {
            info.textContent = 'EMPTY';
            info.classList.replace('hide','info-help');
            input.focus();
            return;
        }

        attemptCount--;

        if(input.value == hiddenNumber || attemptCount <= 0) {
            _this.textContent = 'Continue';
            _this.classList.replace('btn-try','btn-continue');
            input.classList.add('hide');
            score.classList.add('hide');
            endTime = Date.now();

            if(input.value == hiddenNumber) {
                info.textContent = 'WIN';
                info.classList.replace('hide','info-win');
            } else {
                info.textContent = 'LOSE';
                info.classList.replace('hide','info-lose');
            }
            info.textContent += '\r\nRange: from ' + Math.min(a,b) + ' to ' + Math.max(a,b) + '\r\nThe number: ' + hiddenNumber +
                                    '\r\nAttempts: ' + (attemptTotal - attemptCount) + '/' + attemptTotal + 
                                    '\r\nTime: ' + (endTime - startTime) / 1000 + ' sec.';
        } else {
            score.textContent = 'attempts remaining: ' + attemptCount; 
            if(input.value < hiddenNumber) {
                info.textContent = 'The correct answer is greater than yours';
                info.classList.replace('hide','info-help');
            }
            else {
                info.textContent = 'The correct answer is less than yours';
                info.classList.replace('hide','info-help');
            }
            input.value = '';
            input.focus();
        }
    }
    else if(_classes.indexOf('btn-continue') != -1) {
        _this.textContent = 'Start game';
        _this.classList.replace('btn-continue','btn-start');
        for(var i = limits.length-1; i >= 0; i--) {
            limits[i].classList.remove('hide');
        }
        info.classList.remove('info-lose');
        info.classList.remove('info-win');
        info.classList.add('hide');
        initLimits();
    }
});