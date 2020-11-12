var windowWidth = window.innerWidth;
var widthAllElements = 0;
var visibleEl = [];
var elInMore = [];
var visibleElMemory = [];
var elInMoreMemory = [];

function getElements() {
    Array.from(document.getElementsByClassName("navbar-item")).forEach(function (el) {

        widthAllElements += el.offsetWidth;
        if (windowWidth > widthAllElements) {
            visibleElMemory.push({el: el, width: el.offsetWidth})
        } else {
            elInMoreMemory.push({el: el, width: el.offsetWidth})
        }
    });

    widthAllElements = 0;
    visibleEl = visibleElMemory;
    elInMore = elInMoreMemory;
}

function resetElements() {
    visibleEl = [];
    elInMore = [];
}

function getElementsAfterResize() {
    resetElements();
    visibleElMemory.concat(elInMoreMemory).forEach(function (elFromObject) {

        widthAllElements += elFromObject.width;
        if (window.innerWidth > widthAllElements) {
            visibleEl.push({el: elFromObject.el, width: elFromObject.width})
        } else {
            elInMore.push({el: elFromObject.el, width: elFromObject.width})
        }
    });
    visibleElMemory = visibleEl;
    elInMoreMemory = elInMore;
    widthAllElements = 0;
}

function getMore() {
    var more = document.createElement("a");
    more.setAttribute("class", "navbar-item");
    more.innerHTML = "Show More";
    var dropDown = document.createElement("div");
    dropDown.setAttribute("class", "navbar-dropdown");

    more.appendChild(dropDown);
    more.onclick = function () {
      this.childNodes[1].classList.toggle("is-block");
    };
    return {more: more, dropDown: dropDown};
}

function displayElementsInMenu(elementsToDisplay) {
    var navStart = document.querySelector(".navbar-start");
    navStart.innerHTML = '';
    elementsToDisplay.forEach(function (elFromObject) {
        navStart.appendChild(elFromObject.el);
    });
}

function moveLastPosition(visibleEl, elInMore) {
    if (visibleEl.length > 0) {
        var lastElFromVisible = visibleEl[visibleEl.length - 1];
        elInMore.unshift(lastElFromVisible);
        visibleEl.pop();
    }
}

function displayElementsInMenuWithMore(visibleEl, elInMore) {
    moveLastPosition(visibleEl, elInMore);

    var more = getMore();

    elInMore.forEach(function (e) {
        more.dropDown.appendChild(e.el);
    });

    displayElementsInMenu(visibleEl.concat([{el: more.more, width: more.more.offsetWidth}]));
}

function displayMenu() {
    if (elInMore.length > 0) {
        displayElementsInMenuWithMore(visibleEl, elInMore);
    } else {
        displayElementsInMenu(visibleEl.concat(elInMore));
    }
}

getElements();
displayMenu();
window.onresize = function() {
    getElementsAfterResize();
    displayMenu();
};