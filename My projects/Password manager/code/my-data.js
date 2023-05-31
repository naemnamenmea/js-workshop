'use strict'
var category = [];
var data = {};


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}

function loadJSON(request, headers, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', request);
    for (key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            callback(xhr.responseText);
        } else {
            console.log('xhr.readyState: ' + xhr.readyState
                + ' xhr.status: ' + xhr.status);
        }
    };
    xhr.send(null);
}

function isObject(item) {
    return item === Object(item) && !Array.isArray(item);
}

function getKeyCode(e) {
    return e.which || e.keyCode || 0;
}

function formatedOutput(id, obj) {
    $(id).html('<pre>' + JSON.stringify(obj, null, 4) + '</pre>');
}

chooseItem({
    id: '#rs-CategoryInput',
    arr: category,
    func: refreshItemList,
    error: 'invalid category'
});

function chooseItem(obj) {
    $(obj.id).keyup(function (e) {
        if (getKeyCode(e) === 13) {
            var val = $(obj.id).val();
            if (~obj.arr.indexOf(val)) {
                if (!!obj.func) {
                    obj.func(val);
                } else {
                    console.log('Функция для для генерации списка не передана');
                }
            } else {
                console.log(obj.error);
            }
        }
    });
    $(obj.id).focus("click", function (event) {
        this.select();
    });
    $('#rs-ItemInput').focus("click", function (event) {
        this.select();
    });
}

function createItemList(category) {

}

function refreshItemList(category) {
    var propList = '';
    var listID = '#rs-ItemInput';
    var items = Object.keys(data[category]);
    items.forEach(function (el) {
        propList += '<option value="' + el + '"/>';
    });

    $('#rs-ItemList').html(propList);

    $(listID).unbind();
    $(listID).val('');

    chooseItem({
        id: listID,
        arr: items,
        func: function (item) {
            formatedOutput('#data', data[category][item]);
        },
        error: 'invalid item'
    });
}

function refreshPropertyList(item) {

}

function deleteItemList() {

}

function printData() {

}

var http = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
var key = 'trnsl.1.1.20180809T083041Z.6b8274f9e10c6471.67eb5eeab7c092ecd97da7fcdc2645e3378b0dca';
var text = encodeURI('Переведи меня!');
var lang = 'ru-en';
var format = 'plain';
var callback = function (el) {
    console.log(el);
};

var YTranslReq = http + '?' + 'key=' + key +
    '&' + 'text=' + text +
    '&' + 'lang=' + lang +
    '&' + 'format=' + format;// +
//'&' + 'callback=' + callback;

var $data = document.getElementById('data');
/*
loadJSON(YTranslReq, {}, function(res) {
    //$data.innerHTML += '<br>' + xhr.responseText;   
    console.log( JSON.parse(res).text );                     
});
*/
/*
var client_id = 'b6tsz50ptl2k5mduhu0smx814h5rbq';
var redirect_uri = 'http://localhost';
var client_secret = 'utmzp98i5b6t33jxl2wt4352jeuwir';
var scope = 'channel_subscriptions,user_read';
var grant_type = 'client_credentials';

loadJSON('https://api.twitch.tv/kraken/users?login=stray228&api_version=5', {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': client_id
},
function(res) {
    let userID =  JSON.parse(res).users[0]._id;
    
    var OAuth;
    loadJSON('https://id.twitch.tv/oauth2/authorize?client_id=' + client_id +
    '&client_secret=' + client_secret + 
    '&grant_type=' + grant_type +
    '&scope=' + scope, {}, function(ee) {
        console.log(ee);
    });
    
    loadJSON('https://api.twitch.tv/kraken/channels/' + userID + '/subscriptions', {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Authorization': 'OAuth virpwb0u4zw2blialegdmfk9jszu0t',
        'Client-ID': 'b6tsz50ptl2k5mduhu0smx814h5rbq'
    }, function(sub) {
        console.log( sub );
    });
});
*/

$('#field').on('mouseenter', function () {
    $(this).hide({
        'duration': 500,
        'complete': function () {
            $(this).show({
                'duration': 500

            });
        }
    });
});

// ---- Init

(
    () => {
        loadJSON('my-data.json', {}, function (response) {
            data = JSON.parse(response);
            var arr = '';
            for (var key in data) {
                arr += '<option value="' + key + '"/>';
                category.push(key);
            }
            $('#rs-CategoryList').html(arr);
        });

        document.getElementsByClassName('c')[0].style.color = 'green';
        document.getElementsByClassName('c')[0].style.cssText = 'color: green';
        document.querySelector('#t').classList.add('a');
        document.querySelectorAll('#t')[0].classList.add('a');
        $('#t').addClass('a');
        $('.c').css('color', 'green');

        $.getJSON('my-data.json', (json) => {
            console.log(json.websites);
        });
    }
)();