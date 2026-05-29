(function() {
    var els = document.querySelectorAll('[data-include]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', el.getAttribute('data-include'), false);
        xhr.send();
        if (xhr.status === 200 || xhr.status === 0) {
            el.outerHTML = xhr.responseText;
        }
    }
})();
