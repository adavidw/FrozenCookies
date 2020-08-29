// ==UserScript==
// @name           Frozen Cookies
// @version        github-latest
// @description    Userscript to load Frozen Cookies written by Icehawk78, forked by adavidw
// @author         Lordshinjo
// @homepage       https://github.com/adavidw/FrozenCookies
// @include        http://orteil.dashnet.org/cookieclicker/
// @updateURL      https://adavidw.github.io/FrozenCookies/fc_userscript_loader.user.js
// @downloadURL    https://adavidw.github.io/FrozenCookies/fc_userscript_loader.user.js
// @run-at         document-start
// ==/UserScript==

// Dev:       https://github.com/adavidw/FrozenCookies/development/
// Master:    https://github.com/adavidw/FrozenCookies/master/
// Github.io: http://adavidw.github.io/FrozenCookies/

function LoadFrozenCookies() {
    Game.LoadMod('https://adavidw.github.io/FrozenCookies/frozen_cookies.js');
}

window.addEventListener("load", LoadFrozenCookies, false);
// It's not the best way but Chrome doesn't work with addEventListener... :(
// Delay load by 5 seconds to allow the site to load itself first.)
window.setTimeout(LoadFrozenCookies, 5000);
