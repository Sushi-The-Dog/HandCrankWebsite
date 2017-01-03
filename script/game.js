/*
不要看这里啊，很乱的啊，真的很丑啊。
BEJ是开发的时候的名字。。
code by zythum
*/
_BEJ = []; //name spacing
_BEJ.bgUl;
_BEJ.bgLi;
_BEJ.bejUl;
_BEJ.box;
_BEJ.innerBox;
_BEJ.clickFlag = true;
_BEJ.showMenuFlag = true;
_BEJ.audio = [];
_BEJ.audioCount; //= 0;
_BEJ.coboCount; //= 0;
_BEJ.Count; //-64;
_BEJ.timeBtn;
_BEJ.timelmt; // = 5*10;
_BEJ.Timer;
_BEJ.scoreBox;
_BEJ.menu;
_BEJ.hard; //= 6;
_BEJ.checkBEJ = function(node, n) {
    return (node.innerHTML == n ? true : false);
}
_BEJ.goDown = function(index) {
    var S = KISSY,
        DOM = S.DOM;
    var line = index % 8,
        row = (index - line) / 8;
    var _offset = DOM.offset(_BEJ.bgLi[line].bej);
    //DOM.remove(_BEJ.bgLi[index].bej);
    _BEJ.throwLi(_BEJ.bgLi[index].bej);
    for (var i = row; i; i--) {
        _BEJ.bgLi[i * 8 + line].innerHTML = _BEJ.bgLi[(i - 1) * 8 + line].innerHTML;
        _BEJ.bgLi[i * 8 + line].bej = _BEJ.bgLi[(i - 1) * 8 + line].bej;
        //var Anim = S.Anim(nodeList[i*8+line].bej,{
        //DOM.css(nodeList[i*8+line].bej,{
        //	'top': DOM.offset(nodeList[i*8+line]).top - DOM.offset(_BEJ.box).top + 'px',
        //	'left': DOM.offset(nodeList[i*8+line]).left - DOM.offset(_BEJ.box).left + 'px'
        //});
        //},0.5,S.Easing.easeOut);
        //Anim.run();
    }
    var randomNum = 1 + parseInt(Math.random() * _BEJ.hard);
    _BEJ.bgLi[line].innerHTML = randomNum;
    var node_b = DOM.create('<li class="b-' + randomNum + '"></li>');
    _BEJ.bgLi[line].bej = node_b;
    DOM.append(node_b, _BEJ.bejUl);
    DOM.offset(node_b, {
        top: _offset.top - 70,
        left: _offset.left
    });
}
_BEJ.loopGoDown = function() {
    var S = KISSY,
        DOM = S.DOM;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (_BEJ.checkBEJ(_BEJ.bgLi[8 * j + i], 0)) {
                _BEJ.goDown(8 * j + i);
                //_BEJ.bgLi[(8*j+i)].style.backgroundColor = '#333';
                //alert('check');
            }
        }
    }
    for (i = 0; i < _BEJ.bgLi.length; i++) {
        var Anim = S.Anim(_BEJ.bgLi[i].bej, {
            'top': DOM.offset(_BEJ.bgLi[i]).top - DOM.offset(_BEJ.box).top + 'px',
            'left': DOM.offset(_BEJ.bgLi[i]).left - DOM.offset(_BEJ.box).left + 'px'
        }, 0.8, S.Easing.easeOut);
        Anim.run();
    }
    //if(_BEJ.Count>0&&++_BEJ.audioCount>0&&_BEJ.audioCount<12){
    //	_BEJ.audio[_BEJ.audioCount].play();
    //}
    ++_BEJ.audioCount;
    var AudioH = 0;
    var superstr = '';
    if (_BEJ.Count >= _BEJ.coboCount) {
        if (_BEJ.audioCount == 2) {
            superstr = '<br />GREAT';
            _BEJ.timelmt += 10;
            AudioH = 4;
        }
        if (_BEJ.audioCount == 3) {
            superstr = '<br />FANTASTIC';
            _BEJ.timelmt += 20;
            AudioH = 5;
        }
        if (_BEJ.audioCount == 4) {
            superstr = '<br />UNBELIEVABLE';
            _BEJ.timelmt += 50;
            AudioH = 6;
        }
        if (_BEJ.audioCount > 4) {
            superstr = '<br />RAMPAGE';
            _BEJ.timelmt += 100;
            AudioH = 7;
        }
        AudioH == 0 ? AudioH = parseInt(Math.random() * 4) : 0;
        try {
            _BEJ.audio[AudioH].play();
        } catch (e) {;
        }
        if (_BEJ.audioCount > 2) _BEJ.ntc('Combo<br />' + _BEJ.coboCount + superstr);
    }
    setTimeout(function() {
        _BEJ.loopBEJedAndAction();
    }, 1000);
}
_BEJ.Choose2switch = function(index1, index2) {
    var S = KISSY,
        DOM = S.DOM;
    _BEJ.clickFlag = false;
    var temp;
    var n1 = _BEJ.bgLi[index1].innerHTML;
    var n2 = _BEJ.bgLi[index2].innerHTML;
    _BEJ.bgLi[index1].innerHTML = n2;
    _BEJ.bgLi[index2].innerHTML = n1;
    temp = _BEJ.bgLi[index1].bej;
    _BEJ.bgLi[index1].bej = _BEJ.bgLi[index2].bej
    _BEJ.bgLi[index2].bej = temp;
    var Anim1 = S.Anim(_BEJ.bgLi[index1].bej, {
        'top': DOM.offset(_BEJ.bgLi[index1]).top - DOM.offset(_BEJ.box).top + 'px',
        'left': DOM.offset(_BEJ.bgLi[index1]).left - DOM.offset(_BEJ.box).left + 'px'
    }, 0.5, S.Easing.easeOut);
    var Anim2 = S.Anim(_BEJ.bgLi[index2].bej, {
        'top': DOM.offset(_BEJ.bgLi[index2]).top - DOM.offset(_BEJ.box).top + 'px',
        'left': DOM.offset(_BEJ.bgLi[index2]).left - DOM.offset(_BEJ.box).left + 'px'
    }, 0.5, S.Easing.easeOut);
    Anim1.run();
    Anim2.run();
    setTimeout(function() {
        if (!_BEJ.loopBEJedAndAction()) {
            _BEJ.bgLi[index1].innerHTML = n1;
            _BEJ.bgLi[index2].innerHTML = n2;
            temp = _BEJ.bgLi[index1].bej;
            _BEJ.bgLi[index1].bej = _BEJ.bgLi[index2].bej
            _BEJ.bgLi[index2].bej = temp;
            var Anim1 = S.Anim(_BEJ.bgLi[index1].bej, {
                'top': DOM.offset(_BEJ.bgLi[index1]).top - DOM.offset(_BEJ.box).top + 'px',
                'left': DOM.offset(_BEJ.bgLi[index1]).left - DOM.offset(_BEJ.box).left + 'px'
            }, 0.5, S.Easing.easeOut);
            var Anim2 = S.Anim(_BEJ.bgLi[index2].bej, {
                'top': DOM.offset(_BEJ.bgLi[index2]).top - DOM.offset(_BEJ.box).top + 'px',
                'left': DOM.offset(_BEJ.bgLi[index2]).left - DOM.offset(_BEJ.box).left + 'px'
            }, 0.5, S.Easing.easeOut);
            Anim1.run();
            Anim2.run();
        }
    }, 600);

}
_BEJ.BEJed = function(index) {
    if (_BEJ.bgLi[index].innerHTML == 0)
        return false;
    var line = index % 8,
        row = (index - line) / 8,
        arr = [];
    arr.push(_BEJ.bgLi[index]);
    //这个有问题。晚上解决好了
    /*
    if(line != 0 && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index-1].innerHTML){
    	arr.push(_BEJ.bgLi[index-1])
    };
    if(line != 7 && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index+1].innerHTML){
    	arr.push(_BEJ.bgLi[index+1])
    };
    if(row  != 0 && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index-8].innerHTML){
    	arr.push(_BEJ.bgLi[index-8])
    };
    if(row  != 7 && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index+8].innerHTML){
    	arr.push(_BEJ.bgLi[index+8])
    };*/
    if (line != 0 && line != 7) {
        if (_BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index - 1].innerHTML && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index + 1].innerHTML) {
            arr.push(_BEJ.bgLi[index - 1]);
            arr.push(_BEJ.bgLi[index + 1]);
        }
    }
    if (row != 0 && row != 7) {
        if (_BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index - 8].innerHTML && _BEJ.bgLi[index].innerHTML == _BEJ.bgLi[index + 8].innerHTML) {
            arr.push(_BEJ.bgLi[index - 8]);
            arr.push(_BEJ.bgLi[index + 8]);
        }
    }
    if (arr.length >= 3)
        return arr;
    else return false;
}
_BEJ.loopBEJedAndAction = function() {
    var arr = [];
    var temp = [];
    for (var i = 0; i < _BEJ.bgLi.length; i++) {
        if (temp = _BEJ.BEJed(i)) {
            arr = arr.concat(temp);
            //for(var j=0;j<temp.length;j++){
            //	temp[j].style.backgroundColor = 'red';
            //}
        }
    }
    if (arr.length < 3) {
        _BEJ.clickFlag = true;
        _BEJ.Count += _BEJ.audioCount * 5;
        if (_BEJ.Count > 200)
            _BEJ.hard = 6;
        if (_BEJ.Count > 500)
            _BEJ.hard = 7;
        _BEJ.showFlash();
        _BEJ.audioCount = 0;
        _BEJ.coboCount = 0;
        return false;
    }
    for (i = 0; i < arr.length; i++) {
        arr[i].innerHTML = 0;
        //arr[i].style.backgroundColor = 'red';
    }
    _BEJ.loopGoDown();
    return true;
};
_BEJ.throwLi = function(node) {
    var S = KISSY,
        DOM = S.DOM;
    node.style.zIndex = 100;
    var anim = S.Anim(node, {
        top: '430px',
        left: '-100px'
    }, 0.5, S.Easing.easeOut, function() {
        DOM.remove(node);
    })
    anim.run();
    _BEJ.coboCount++;
    _BEJ.timelmt += 6;
    _BEJ.timelmt > 560 ? _BEJ.timelmt = 560 : 0;
    _BEJ.Count++;
    _BEJ.showFlash();
}
_BEJ.timeLmtFn = function() {
    _BEJ.Timer = setInterval(function() {
        _BEJ.timeBtn.style.width = _BEJ.timelmt + 'px';
        _BEJ.timelmt--;
        if (_BEJ.timelmt < 0) {
            clearInterval(_BEJ.Timer);
            _BEJ.timeover();
        }
    }, 80);
}
_BEJ.showFlash = function() {
    _BEJ.scoreBox.innerHTML = _BEJ.Count;
}
_BEJ.timeover = function() {
    //alert('timeover');
    var S = KISSY,
        DOM = S.DOM;
    DOM.get('#say span').innerHTML = '妈妈说不要放弃!!<br />TRY AGAIN!!';
    //DOM.show(_BEJ.menu);
    _BEJ.showMenu(1);
    setTimeout(function() {
        for (var i = 0, node_b; i < 64; i++) {
            _BEJ.bgLi[i].innerHTML = 0;
            DOM.remove(_BEJ.bgLi[i].bej);
            node_b = DOM.create('<li class="b-0"></li>');
            _BEJ.bgLi[i].bej = node_b;
            DOM.append(node_b, _BEJ.bejUl);
            DOM.offset(_BEJ.bgLi[i].bej, DOM.offset(_BEJ.bgLi[i]));
        }
    }, 1000);
}
_BEJ.ntc = function(str) {
    var S = KISSY,
        DOM = S.DOM;
    var ntc = DOM.create('<div class="ntc">' + str + '</div>');
    DOM.append(ntc, _BEJ.innerBox);
    var anim = S.Anim(ntc, {
        'opacity': '0'
    }, 2.5, S.Easing.easeOut, function() {
        DOM.remove(ntc);
    });
    anim.run();
}
_BEJ.showMenu = function(num) {
    _BEJ.showMenuFlag = false;
    var S = KISSY;
    var anim2 = S.Anim(_BEJ.menu, {
        'left': '0px'
    }, 0.5, S.Easing.easeOut, function() {
        _BEJ.showMenuFlag = true;
    });
    var anim1 = S.Anim(_BEJ.menu, {
        'left': '580px'
    }, 0.5, S.Easing.easeOut, function() {
        _BEJ.menu.style.zIndex = 2 + num;
        anim2.run();
    });
    anim1.run();
}
KISSY.ready(function(S) {
    var DOM = S.DOM,
        Event = S.Event;
    _BEJ.bgUl = DOM.get('#background');
    _BEJ.bejUl = DOM.get('#bej');
    _BEJ.box = DOM.get('#box');
    _BEJ.innerBox = DOM.get('#inner-box');
    _BEJ.timeBtn = DOM.get('#lmt-line');
    _BEJ.scoreBox = DOM.get('#score');
    _BEJ.menu = DOM.get('#menu');
    _BEJ.bgLi = [];
    //var count = 0;
    var audioTpye = '.ogg';
    var testAudio = document.createElement('audio');
    if (testAudio.canPlayType) {
        !!testAudio.canPlayType('audio/mp3;').replace(/no/, '') ? audioTpye = '.mp3' : 0;
        !!testAudio.canPlayType('audio/mpeg;').replace(/no/, '') ? audioTpye = '.mp3' : 0;
        !!testAudio.canPlayType('audio/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
        !!testAudio.canPlayType('video/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
        !!testAudio.canPlayType('application/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
        for (var i = 0; i < 8; i++) {
            _BEJ.audio[i] = document.createElement('audio');
            _BEJ.audio[i].src = _BEJ.audio.src = 'audio/' + i + audioTpye;
        }
    }
    for (var i = 0, node, node_b; i < 64; i++) { //background HTML builder
        node = DOM.create('<li>' + '0' + '</li>');
        node.index = i;
        DOM.append(node, _BEJ.bgUl);
        _BEJ.bgLi.push(node);
        node_b = DOM.create('<li class="b-0"></li>');
        node.bej = node_b;
        DOM.append(node_b, _BEJ.bejUl);
        DOM.offset(node.bej, DOM.offset(node));
    }
    Event.on(_BEJ.menu, 'click', function() {
        //DOM.hide(_BEJ.menu);
        if (!_BEJ.showMenuFlag)
            return false;
        _BEJ.clickFlag = false;
        _BEJ.showMenu(0);
        _BEJ.audioCount = 0;
        _BEJ.coboCount = 0;
        _BEJ.Count = -64;
        _BEJ.timelmt = 55 * 10;
        _BEJ.hard = 5;
        _BEJ.loopGoDown();
        _BEJ.timeLmtFn();
    })
    var firstChoose = -1;
    Event.on(_BEJ.bgLi, 'mousedown', function() {
        if (!_BEJ.clickFlag) return false;
        if (firstChoose == -1) {
            firstChoose = this.index;
            //this.style.backgroundColor = 'red';
            DOM.addClass(this, 'first-choose');
        } else {
            var thisChoose = this.index;
            if (firstChoose - 8 == thisChoose || firstChoose + 8 == thisChoose || (firstChoose - 1 == thisChoose && firstChoose % 8 - 1 == thisChoose % 8) || (firstChoose + 1 == thisChoose && firstChoose % 8 + 1 == thisChoose % 8)) {
                _BEJ.Choose2switch(firstChoose, thisChoose);
                firstChoose = -1;
                //DOM.css(_BEJ.bgLi,'background-color','transparent');
                DOM.removeClass(_BEJ.bgLi, 'first-choose');
            } else {
                firstChoose = -1;
                //DOM.css(_BEJ.bgLi,'background-color','transparent');
                DOM.removeClass(_BEJ.bgLi, 'first-choose');
            }
        }
    })

})
