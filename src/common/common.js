window.className = function () {
    let className = [];
    [...arguments].forEach( name => {
        className = className.concat(name);
    });
    return className.filter(v=>!!v).join(" ");
};