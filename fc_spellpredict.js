// @name         Cookie Clicker Predict Spell
// @version      0.1
// @author       Random Reddit Guy (SamNosliw, 3pLm1zf1rMD_Xkeo6XHl)
// @match        http://orteil.dashnet.org/cookieclicker/
// @source       https://www.reddit.com/r/CookieClicker/comments/6v2lz3/predict_next_hands_of_faith/

var suppressNextGC = false;
// const predictedCookie = {
//     "Frenzy": {color: '<b style="color:#FFDE5F">', minimum: ["Frenzy"], comboWith: ["Frenzy", "Building Special"], next: ""},
//     "Lucky": {color: '<b style="color:#FFDE5F">', comboWith: ["Frenzy"], next: ""},
//     "Click Frenzy": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Cookie Chain": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Cookie Storm": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Building Special": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Cookie Storm (Drop)": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Sugar Lump": {color: '<b style="color:#FFDE5F">', comboWith: "anytime", next: ""},
//     "Clot": {color: '<b style="color:#FFDE5F">', comboWith: "none", next: ""},
//     "Ruin Cookies": {color: '<b style="color:#FFDE5F">', comboWith: "none", next: ""},
//     "Cursed Finger": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Elder Frenzy": {color: '<b style="color:#FFDE5F">', comboWith: "mult", next: ""},
//     "Blab": {color: '<b style="color:#FFDE5F">', comboWith: "none", next: ""}
// };

(function () {   // tooltip display
    if (Game.ObjectsById[7].minigameLoaded) {
        var lookup = setInterval(function () {
            if (typeof Game.ready !== 'undefined' && Game.ready) {
                var CastSpell = document.getElementById("grimoireSpell1");
                CastSpell.onmouseover = function () {
                    Game.tooltip.dynamic = 1;
                    Game.tooltip.draw(this, Game.ObjectsById[7].minigame.spellTooltip(1)()
                        + '<div class="line"></div><div class="description">'
                        + '<b>First Spell:</b> ' + spellDisplay(0) + '<br />'
                        + '<b>Second Spell:</b> ' + spellDisplay(1) + '<br />'
                        + '<b>Third Spell:</b> ' + spellDisplay(2) + '<br />'
                        + '<b>Fourth Spell:</b> ' + spellDisplay(3) + '</div>', 'this');
                    Game.tooltip.wobble();
                };
                clearInterval(lookup);
            }
        }, 1000);
    }
})();


function spellDisplay(i) {  //format HTML for display
    var color = {
        "Frenzy": '<b style="color:#FFDE5F">',
        "Lucky": '<b style="color:#FFDE5F">',
        "Click Frenzy": '<b style="color:#FFD700">',
        "Cookie Chain": '<b style="color:#FFDE5F">',
        "Cookie Storm": '<b style="color:#FFDE5F">',
        "Building Special": '<b style="color:#DAA520">',
        "Cookie Storm (Drop)": '',
        "Sugar Lump": '<b style="color:#5FFFFC">',
        "Clot": '<b style="color:#FF3605">',
        "Ruin Cookies": '<b style="color:#FF3605">',
        "Cursed Finger": '<b style="color:#DAA520">',
        "Elder Frenzy": '<b style="color:#DAA520">',
        "Blab": ''
    };
    return '<small>' + color[predictNextSpell(i)] + predictNextSpell(i) + '</b></small>';
}

function predictNextSpell(i) {   // calculate next spell
    season = Game.season;
    var obj = obj || {};
    M = Game.ObjectsById[7].minigame;
    spell = M.spellsById[1];
    var failChance = M.getFailChance(spell);
    if (typeof obj.failChanceSet !== 'undefined') failChance = obj.failChanceSet;
    if (typeof obj.failChanceAdd !== 'undefined') failChance += obj.failChanceAdd;
    if (typeof obj.failChanceMult !== 'undefined') failChance *= obj.failChanceMult;
    if (typeof obj.failChanceMax !== 'undefined') failChance = Math.max(failChance, obj.failChanceMax);
    Math.seedrandom(Game.seed + '/' + (M.spellsCastTotal + i));
    var choices = [];
    if (!spell.fail || Math.random() < (1 - failChance)) {
        Math.random(); Math.random();
        if (Game.season == 'valentines' || Game.season == 'easter') { Math.random(); }
        choices.push('Frenzy', 'Lucky');
        if (!Game.hasBuff('Dragonflight')) choices.push('Click Frenzy');
        if (Math.random() < 0.1) choices.push('Cookie Chain', 'Cookie Storm', 'Blab');
        if (Game.BuildingsOwned >= 10 && Math.random() < 0.25) choices.push('Building Special');
        if (Math.random() < 0.15) choices = ['Cookie Storm (Drop)'];
        if (Math.random() < 0.0001) choices.push('Sugar Lump');
    } else {
        Math.random(); Math.random();
        if (Game.season == 'valentines' || Game.season == 'easter') { Math.random(); }
        choices.push('Clot', 'Ruin Cookies');
        if (Math.random() < 0.1) choices.push('Cursed Finger', 'Elder Frenzy');
        if (Math.random() < 0.003) choices.push('Sugar Lump');
        if (Math.random() < 0.1) choices = ['Blab'];
    }
    ret = choose(choices);
    Math.seedrandom();
    return ret;
}