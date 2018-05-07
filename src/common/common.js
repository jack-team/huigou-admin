window.className = function () {
    let className = [];
    [...arguments].forEach( name => {
        className = className.concat(name);
    });
    return className.filter(v=>!!v).join(" ");
};

window.getUrlArgument= function(search=window.location.search,name){
    let result = search.match(new RegExp("[\?\&]" + name + "=([^\&]+)","i"));
    if(result === null || result.length < 1) return null;
    return decodeURI(result[1]);
};

import moment from 'moment';

moment.locale('zh-cn');