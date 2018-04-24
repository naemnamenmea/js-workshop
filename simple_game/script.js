var _info = document.querySelector('div.info');
var _limits = document.querySelectorAll('input.limits');
var _input = document.querySelector('input.input');
var _score = document.querySelector('div.score');

function initLimits () {
    _limits[0].value = '';
    _limits[0].focus();
    _limits[1].value = 1;
}

window.onload = function () {
    initLimits();
};

document.querySelectorAll('input').forEach(function(e) {
    e.addEventListener('keydown', function(e) {
        if (e.which == 13 || e.keyCode == 13) {
            var btn = document.querySelector('button.btn');
            var event = new Event('click');
            btn.dispatchEvent(event);
        }
    });
});

document.querySelector('button.btn').addEventListener("click", function() {
    var _this = this;
    var _classes = _this.className;

    _info.textContent = '';
    _info.classList.replace('info-help','hide'); // replace if 'info-help' exists

    if(_classes.indexOf('btn-start') != -1) {
        for(var i = _limits.length-1; i >= 0; i--) {
            if(_limits[i].value == '') {
                _info.textContent = 'EMPTY';
                _info.classList.replace('hide','info-help');
                _limits[i].focus();
                return;
            }
        }

        a = _limits[0].value;
        b = _limits[1].value;
        attemptCount = Math.floor(Math.log(Math.abs(b - a) + 1) / Math.log(2)) + 1;
        hiddenNumber = Math.floor(Math.random() * (Math.max(a,b) - Math.min(a,b) + 1)) + Math.min(a,b);
        //console.log('hiddenNumber: '+hiddenNumber);

        _this.textContent = 'TRY';
        _this.classList.replace('btn-start','btn-try');

        for(var i = _limits.length-1; i >= 0; i--) {
            _limits[i].classList.add('hide');
        }

        _score.textContent = 'attempts left: ' + attemptCount;
        _score.classList.remove('hide');

        _input.value = '';
        _input.classList.remove('hide');
        _input.focus();
    }
    else if(_classes.indexOf('btn-try') != -1) {
        if(_input.value == '') {
            _info.textContent = 'EMPTY';
            _info.classList.replace('hide','info-help');
            _input.focus();
            return;
        }

        attemptCount--;

        if(_input.value == hiddenNumber || attemptCount <= 0) {
            _this.textContent = 'Continue';
            _this.classList.replace('btn-try','btn-continue');
            _input.classList.add('hide');
            _score.classList.add('hide');
            _input.blur();
        } else {
            _score.textContent = 'attempts left: ' + attemptCount; 
            if(_input.value < hiddenNumber) {
                _info.textContent = 'the correct answer is greater than yours';
                _info.classList.replace('hide','info-help');
            }
            else {
                _info.textContent = 'The correct answer is less than yours';
                _info.classList.replace('hide','info-help');
            }
            _input.value = '';
            _input.focus();
        }

        if(_input.value == hiddenNumber) {
            _info.textContent = 'WIN';
            _info.classList.replace('hide','info-win');
        } else if(attemptCount <= 0) {
            _info.textContent = "LOSE\r\nThe hidden number is\r\n" + hiddenNumber;
            _info.classList.replace('hide','info-lose');
        }
    }
    else if(_classes.indexOf('btn-continue') != -1) {
        _this.textContent = 'Start game';
        _this.classList.replace('btn-continue','btn-start');
        for(var i = _limits.length-1; i >= 0; i--) {
            _limits[i].classList.remove('hide');
        }
        _info.classList.remove('info-lose','info-win');
        _info.classList.add('hide');
        initLimits();
    }
});