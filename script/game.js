/*
不要看这里啊，很乱的啊，真的很丑啊。
BEJ是开发的时候的名字。。
code by zythum
*/
DeleteGame = []; //name spacing
DeleteGame.bgUl;
DeleteGame.bgLi;
DeleteGame.bejUl;
DeleteGame.box;
DeleteGame.innerBox;
DeleteGame.clickFlag = true;
DeleteGame.showMenuFlag = true;
DeleteGame.audio = [];
DeleteGame.audioCount; //= 0;
DeleteGame.coboCount; //= 0;
DeleteGame.Count; //-64;
DeleteGame.timeBtn;
DeleteGame.timelmt; // = 5*10;
DeleteGame.Timer;
DeleteGame.scoreBox;
DeleteGame.menu;
DeleteGame.hard; //= 6;
DeleteGame.checkBEJ = function(node, n) {
    return (node.innerHTML == n ? true : false);
}
DeleteGame.goDown = function(index) {
    var S = KISSY,
        DOM = S.DOM;
    var line = index % 8,
        row = (index - line) / 8;
    var _offset = DOM.offset(DeleteGame.bgLi[line].bej);
    //DOM.remove(DeleteGame.bgLi[index].bej);
    DeleteGame.throwLi(DeleteGame.bgLi[index].bej);
    for (var i = row; i; i--) {
        DeleteGame.bgLi[i * 8 + line].innerHTML = DeleteGame.bgLi[(i - 1) * 8 + line].innerHTML;
        DeleteGame.bgLi[i * 8 + line].bej = DeleteGame.bgLi[(i - 1) * 8 + line].bej;
        //var Anim = S.Anim(nodeList[i*8+line].bej,{
        //DOM.css(nodeList[i*8+line].bej,{
        //	'top': DOM.offset(nodeList[i*8+line]).top - DOM.offset(DeleteGame.box).top + 'px',
        //	'left': DOM.offset(nodeList[i*8+line]).left - DOM.offset(DeleteGame.box).left + 'px'
        //});
        //},0.5,S.Easing.easeOut);
        //Anim.run();
    }
    var randomNum = 1 + parseInt(Math.random() * DeleteGame.hard);
    DeleteGame.bgLi[line].innerHTML = randomNum;
    var node_b = DOM.create('<li class="b-' + randomNum + '"></li>');
    DeleteGame.bgLi[line].bej = node_b;
    DOM.append(node_b, DeleteGame.bejUl);
    DOM.offset(node_b, {
        top: _offset.top - 70,
        left: _offset.left
    });
}
DeleteGame.loopGoDown = function() {
    var S = KISSY,
        DOM = S.DOM;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (DeleteGame.checkBEJ(DeleteGame.bgLi[8 * j + i], 0)) {
                DeleteGame.goDown(8 * j + i);
                //DeleteGame.bgLi[(8*j+i)].style.backgroundColor = '#333';
                //alert('check');
            }
        }
    }
    for (i = 0; i < DeleteGame.bgLi.length; i++) {
        var Anim = S.Anim(DeleteGame.bgLi[i].bej, {
            'top': DOM.offset(DeleteGame.bgLi[i]).top - DOM.offset(DeleteGame.box).top + 'px',
            'left': DOM.offset(DeleteGame.bgLi[i]).left - DOM.offset(DeleteGame.box).left + 'px'
        }, 0.8, S.Easing.easeOut);
        Anim.run();
    }
    //if(DeleteGame.Count>0&&++DeleteGame.audioCount>0&&DeleteGame.audioCount<12){
    //	DeleteGame.audio[DeleteGame.audioCount].play();
    //}
    ++DeleteGame.audioCount;
    var AudioH = 0;
    var superstr = '';
    if (DeleteGame.Count >= DeleteGame.coboCount) {
        if (DeleteGame.audioCount == 2) {
            superstr = '<br />GREAT';
            DeleteGame.timelmt += 10;
            AudioH = 4;
        }
        if (DeleteGame.audioCount == 3) {
            superstr = '<br />FANTASTIC';
            DeleteGame.timelmt += 20;
            AudioH = 5;
        }
        if (DeleteGame.audioCount == 4) {
            superstr = '<br />UNBELIEVABLE';
            DeleteGame.timelmt += 50;
            AudioH = 6;
        }
        if (DeleteGame.audioCount > 4) {
            superstr = '<br />RAMPAGE';
            DeleteGame.timelmt += 100;
            AudioH = 7;
        }
        AudioH == 0 ? AudioH = parseInt(Math.random() * 4) : 0;
        try {
            DeleteGame.audio[AudioH].play();
        } catch (e) {;
        }
        if (DeleteGame.audioCount > 2) DeleteGame.ntc('Combo<br />' + DeleteGame.coboCount + superstr);
    }
    setTimeout(function() {
        DeleteGame.loopBEJedAndAction();
    }, 1000);
}
DeleteGame.Choose2switch = function(index1, index2) {
    var S = KISSY,
        DOM = S.DOM;
    DeleteGame.clickFlag = false;
    var temp;
    var n1 = DeleteGame.bgLi[index1].innerHTML;
    var n2 = DeleteGame.bgLi[index2].innerHTML;
    DeleteGame.bgLi[index1].innerHTML = n2;
    DeleteGame.bgLi[index2].innerHTML = n1;
    temp = DeleteGame.bgLi[index1].bej;
    DeleteGame.bgLi[index1].bej = DeleteGame.bgLi[index2].bej
    DeleteGame.bgLi[index2].bej = temp;
    var Anim1 = S.Anim(DeleteGame.bgLi[index1].bej, {
        'top': DOM.offset(DeleteGame.bgLi[index1]).top - DOM.offset(DeleteGame.box).top + 'px',
        'left': DOM.offset(DeleteGame.bgLi[index1]).left - DOM.offset(DeleteGame.box).left + 'px'
    }, 0.5, S.Easing.easeOut);
    var Anim2 = S.Anim(DeleteGame.bgLi[index2].bej, {
        'top': DOM.offset(DeleteGame.bgLi[index2]).top - DOM.offset(DeleteGame.box).top + 'px',
        'left': DOM.offset(DeleteGame.bgLi[index2]).left - DOM.offset(DeleteGame.box).left + 'px'
    }, 0.5, S.Easing.easeOut);
    Anim1.run();
    Anim2.run();
    setTimeout(function() {
        if (!DeleteGame.loopBEJedAndAction()) {
            DeleteGame.bgLi[index1].innerHTML = n1;
            DeleteGame.bgLi[index2].innerHTML = n2;
            temp = DeleteGame.bgLi[index1].bej;
            DeleteGame.bgLi[index1].bej = DeleteGame.bgLi[index2].bej
            DeleteGame.bgLi[index2].bej = temp;
            var Anim1 = S.Anim(DeleteGame.bgLi[index1].bej, {
                'top': DOM.offset(DeleteGame.bgLi[index1]).top - DOM.offset(DeleteGame.box).top + 'px',
                'left': DOM.offset(DeleteGame.bgLi[index1]).left - DOM.offset(DeleteGame.box).left + 'px'
            }, 0.5, S.Easing.easeOut);
            var Anim2 = S.Anim(DeleteGame.bgLi[index2].bej, {
                'top': DOM.offset(DeleteGame.bgLi[index2]).top - DOM.offset(DeleteGame.box).top + 'px',
                'left': DOM.offset(DeleteGame.bgLi[index2]).left - DOM.offset(DeleteGame.box).left + 'px'
            }, 0.5, S.Easing.easeOut);
            Anim1.run();
            Anim2.run();
        }
    }, 600);

}
DeleteGame.BEJed = function(index) {
    if (DeleteGame.bgLi[index].innerHTML == 0)
        return false;
    var line = index % 8,
        row = (index - line) / 8,
        arr = [];
    arr.push(DeleteGame.bgLi[index]);
    //这个有问题。晚上解决好了
    /*
    if(line != 0 && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index-1].innerHTML){
    	arr.push(DeleteGame.bgLi[index-1])
    };
    if(line != 7 && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index+1].innerHTML){
    	arr.push(DeleteGame.bgLi[index+1])
    };
    if(row  != 0 && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index-8].innerHTML){
    	arr.push(DeleteGame.bgLi[index-8])
    };
    if(row  != 7 && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index+8].innerHTML){
    	arr.push(DeleteGame.bgLi[index+8])
    };*/
    if (line != 0 && line != 7) {
        if (DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index - 1].innerHTML && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index + 1].innerHTML) {
            arr.push(DeleteGame.bgLi[index - 1]);
            arr.push(DeleteGame.bgLi[index + 1]);
        }
    }
    if (row != 0 && row != 7) {
        if (DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index - 8].innerHTML && DeleteGame.bgLi[index].innerHTML == DeleteGame.bgLi[index + 8].innerHTML) {
            arr.push(DeleteGame.bgLi[index - 8]);
            arr.push(DeleteGame.bgLi[index + 8]);
        }
    }
    if (arr.length >= 3)
        return arr;
    else return false;
}
DeleteGame.loopBEJedAndAction = function() {
    var arr = [];
    var temp = [];
    for (var i = 0; i < DeleteGame.bgLi.length; i++) {
        if (temp = DeleteGame.BEJed(i)) {
            arr = arr.concat(temp);
            //for(var j=0;j<temp.length;j++){
            //	temp[j].style.backgroundColor = 'red';
            //}
        }
    }
    if (arr.length < 3) {
        DeleteGame.clickFlag = true;
        DeleteGame.Count += DeleteGame.audioCount * 5;
        if (DeleteGame.Count > 200)
            DeleteGame.hard = 6;
        if (DeleteGame.Count > 500)
            DeleteGame.hard = 7;
        DeleteGame.showFlash();
        DeleteGame.audioCount = 0;
        DeleteGame.coboCount = 0;
        return false;
    }
    for (i = 0; i < arr.length; i++) {
        arr[i].innerHTML = 0;
        //arr[i].style.backgroundColor = 'red';
    }
    DeleteGame.loopGoDown();
    return true;
};
DeleteGame.throwLi = function(node) {
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
    DeleteGame.coboCount++;
    DeleteGame.timelmt += 6;
    DeleteGame.timelmt > 560 ? DeleteGame.timelmt = 560 : 0;
    DeleteGame.Count++;
    DeleteGame.showFlash();
}
DeleteGame.timeLmtFn = function() {
    DeleteGame.Timer = setInterval(function() {
        DeleteGame.timeBtn.style.width = DeleteGame.timelmt + 'px';
        DeleteGame.timelmt--;
        if (DeleteGame.timelmt < 0) {
            clearInterval(DeleteGame.Timer);
            DeleteGame.timeover();
        }
    }, 80);
}
DeleteGame.showFlash = function() {
    DeleteGame.scoreBox.innerHTML = DeleteGame.Count;
}
DeleteGame.timeover = function() {
    //alert('timeover');
    var S = KISSY,
        DOM = S.DOM;
    DOM.get('#say span').innerHTML = '妈妈说不要放弃!!<br />TRY AGAIN!!';
    //DOM.show(DeleteGame.menu);
    DeleteGame.showMenu(1);
    setTimeout(function() {
        for (var i = 0, node_b; i < 64; i++) {
            DeleteGame.bgLi[i].innerHTML = 0;
            DOM.remove(DeleteGame.bgLi[i].bej);
            node_b = DOM.create('<li class="b-0"></li>');
            DeleteGame.bgLi[i].bej = node_b;
            DOM.append(node_b, DeleteGame.bejUl);
            DOM.offset(DeleteGame.bgLi[i].bej, DOM.offset(DeleteGame.bgLi[i]));
        }
    }, 1000);
}
DeleteGame.ntc = function(str) {
    var S = KISSY,
        DOM = S.DOM;
    var ntc = DOM.create('<div class="ntc">' + str + '</div>');
    DOM.append(ntc, DeleteGame.innerBox);
    var anim = S.Anim(ntc, {
        'opacity': '0'
    }, 2.5, S.Easing.easeOut, function() {
        DOM.remove(ntc);
    });
    anim.run();
}
DeleteGame.showMenu = function(num) {
    DeleteGame.showMenuFlag = false;
    var S = KISSY;
    var anim2 = S.Anim(DeleteGame.menu, {
        'left': '0px'
    }, 0.5, S.Easing.easeOut, function() {
        DeleteGame.showMenuFlag = true;
    });
    var anim1 = S.Anim(DeleteGame.menu, {
        'left': '580px'
    }, 0.5, S.Easing.easeOut, function() {
        DeleteGame.menu.style.zIndex = 2 + num;
        anim2.run();
    });
    anim1.run();
}
KISSY.ready(function(S) {
    var DOM = S.DOM,
        Event = S.Event;
    DeleteGame.bgUl = DOM.get('#background');
    DeleteGame.bejUl = DOM.get('#bej');
    DeleteGame.box = DOM.get('#box');
    DeleteGame.innerBox = DOM.get('#inner-box');
    DeleteGame.timeBtn = DOM.get('#lmt-line');
    DeleteGame.scoreBox = DOM.get('#score');
    DeleteGame.menu = DOM.get('#menu');
    DeleteGame.bgLi = [];
    //var count = 0;
    // var audioTpye = '.ogg';
    // var testAudio = document.createElement('audio');
    // if (testAudio.canPlayType) {
    // !!testAudio.canPlayType('audio/mp3;').replace(/no/, '') ? audioTpye = '.mp3' : 0;
    // !!testAudio.canPlayType('audio/mpeg;').replace(/no/, '') ? audioTpye = '.mp3' : 0;
    // !!testAudio.canPlayType('audio/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
    // !!testAudio.canPlayType('video/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
    // !!testAudio.canPlayType('application/ogg;').replace(/no/, '') ? audioTpye = '.ogg' : 0;
    //     for (var i = 0; i < 8; i++) {
    //         DeleteGame.audio[i] = document.createElement('audio');
    //         DeleteGame.audio[i].src = DeleteGame.audio.src = 'audio/' + i + audioTpye;
    //     }
    // }
    for (var i = 0, node, node_b; i < 64; i++) { //background HTML builder
        node = DOM.create('<li>' + '0' + '</li>');
        node.index = i;
        DOM.append(node, DeleteGame.bgUl);
        DeleteGame.bgLi.push(node);
        node_b = DOM.create('<li class="b-0"></li>');
        node.bej = node_b;
        DOM.append(node_b, DeleteGame.bejUl);
        DOM.offset(node.bej, DOM.offset(node));
    }
    Event.on(DeleteGame.menu, 'click', function() {
        //DOM.hide(DeleteGame.menu);
        if (!DeleteGame.showMenuFlag)
            return false;
        DeleteGame.clickFlag = false;
        DeleteGame.showMenu(0);
        DeleteGame.audioCount = 0;
        DeleteGame.coboCount = 0;
        DeleteGame.Count = -64;
        DeleteGame.timelmt = 55 * 10;
        DeleteGame.hard = 5;
        DeleteGame.loopGoDown();
        DeleteGame.timeLmtFn();
    })
    var firstChoose = -1;
    Event.on(DeleteGame.bgLi, 'mousedown', function() {
        if (!DeleteGame.clickFlag) return false;
        if (firstChoose == -1) {
            firstChoose = this.index;
            //this.style.backgroundColor = 'red';
            DOM.addClass(this, 'first-choose');
        } else {
            var thisChoose = this.index;
            if (firstChoose - 8 == thisChoose || firstChoose + 8 == thisChoose || (firstChoose - 1 == thisChoose && firstChoose % 8 - 1 == thisChoose % 8) || (firstChoose + 1 == thisChoose && firstChoose % 8 + 1 == thisChoose % 8)) {
                DeleteGame.Choose2switch(firstChoose, thisChoose);
                firstChoose = -1;
                //DOM.css(DeleteGame.bgLi,'background-color','transparent');
                DOM.removeClass(DeleteGame.bgLi, 'first-choose');
            } else {
                firstChoose = -1;
                //DOM.css(DeleteGame.bgLi,'background-color','transparent');
                DOM.removeClass(DeleteGame.bgLi, 'first-choose');
            }
        }
    })

})
