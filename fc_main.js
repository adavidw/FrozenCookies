// Add polyfills:
(function (global) {
    var global_isFinite = global.isFinite;
    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);

var suppressNextGC = false;

function registerMod() {    // register with the modding API
    Game.registerMod("Frozen Cookies (mtarnuhal)", {
        init: function () {
            Game.registerHook('reincarnate', function () {  // called when the player has reincarnated after an ascension
                if (FrozenCookies.autoBulk != 0) {
                    if (FrozenCookies.autoBulk == 1) { // Buy x10
                        document.getElementById('storeBulk10').click();
                    }
                    if (FrozenCookies.autoBulk == 2) { // Buy x100
                        document.getElementById('storeBulk100').click();
                    }
                }
            });
            Game.registerHook('draw', updateTimers);    // called every draw tick
            Game.registerHook('ticker', function () {   // called when determining news ticker text (about every ten seconds); should return an array of possible choices to add
                return [
                    "News: Debate about whether using Frozen Cookies constitutes cheating continues to rage. Violence escalating.",
                    "News: Supreme Court rules Frozen Cookies not unauthorized cheating after all."
                ];
            });
            Game.registerHook('reset', function (hard) { // the parameter will be true if it's a hard reset, and false (not passed) if it's just an ascension
                if (hard) {
                    emptyCaches();
                    // if the user is starting fresh, code will likely need to be called to reinitialize some historical data here as well
                }
            });
            /*  other hooks that can be used
            Game.registerHook('logic', function () {   // called every logic tick. seems to correspond with fps
            });
            Game.registerHook('reincarnate', function () {
            });
            Game.registerHook('check', function () {   // called every few seconds when we check for upgrade/achiev unlock conditions; you can also use this for other checks that you don't need happening every logic frame. called about every five seconds?
            });
            Game.registerHook('cps', function (cps) { // called when determining the CpS; parameter is the current CpS; should return the modified CpS. called on change or about every ten seconds
                return cps;
            });
            Game.registerHook('cookiesPerClick', function (cookiesPerClick) { // called when determining the cookies per click; parameter is the current value; should return the modified value. called on change or about every ten seconds
                return cookiesPerClick;
            });
            Game.registerHook('click', function () {    // called when the big cookie is clicked
            });
            Game.registerHook('create', function () {   // called after the game declares all buildings, upgrades and achievs; use this to declare your own - note that saving/loading functionality for custom content is not explicitly implemented and may be unpredictable and broken
            });
            */
        },
        save: saveFCData,
        load: setOverrides  // called whenever a game save is loaded. If the mod has data in the game save when the mod is initially registered, this hook is also called at that time as well.
    });
    
    // If Frozen Cookes was loaded and there was previous Frozen Cookies data in the game save, the "load" hook ran so the setOverrides function was called and things got initialized.
    // However, if there wasn't previous Frozen Cookies data in the game save, the "load" hook wouldn't have been called. So, we have to manually call setOverrides here to start Frozen Cookies.
    if (!FrozenCookies.loadedData) {
        setOverrides();
    }
    logEvent("Load", "Initial Load of Frozen Cookies v " + FrozenCookies.branch + "." + FrozenCookies.version + ". (You should only ever see this once.)");
}


// // test function

// var start = performance.now();
// var logics = 0
// var log = { init: true, save: true, load: true, logic: false, draw: false, reset: true, reincarnate: true, check: false, ticker: false, cps: false, cookiesPerClick: false, click: true, create: true };
// function registerMod() {    // register with the modding API
//     Game.registerMod("Frozen Cookies (mtarnuhal)", {
//         init: function (param) {
//             if (log.init) {
//                 console.log("the init function got called");
//                 console.log(param);
//             }
//             Game.registerHook('logic', function (param) {   // seems to correspond with fps
//                 logics++;
//                 if (log.logic) {
//                     console.log("Logic hook - parameter passed:");
//                     console.log(param);
//                     console.log(logics / ((performance.now() - start) / 1000));
//                     start = performance.now();
//                     logics = 0;
//                     log.logic = false;
//                 }
//             });
//             Game.registerHook('draw', function (param) {    // about twice per second?
//                 if (log.draw) {
//                     console.log("Draw hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//             Game.registerHook('reset', function (param) {
//                 if (log.reset) {
//                     console.log("Reset hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//             Game.registerHook('reincarnate', function (param) {
//                 if (log.reincarnate) {
//                     console.log("reincarnate hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//             Game.registerHook('check', function (param) {   // about every five seconds?
//                 if (log.check) {
//                     console.log("check hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//             Game.registerHook('ticker', function (param) {  // about every ten seconds?
//                 if (log.ticker) {
//                     console.log("Ticker hook - parameter passed:");
//                     console.log(param);
//                 }
//                 return ["poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd",
//                     "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd",
//                     "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd", "poop", "turd"];
//             });
//             Game.registerHook('cps', function (param) { // called on change or about every ten seconds
//                 if (log.cps) {
//                     console.log("CPS hook - parameter passed:");
//                     console.log(param);
//                 }
//                 return param;
//             });
//             Game.registerHook('cookiesPerClick', function (param) { // called on change or about every ten seconds
//                 if (log.cookiesPerClick) {
//                     console.log("cookiesPerClick hook - parameter passed:");
//                     console.log(param);
//                 }
//                 return param;
//             });
//             Game.registerHook('click', function (param) {
//                 if (log.click) {
//                     console.log("Click hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//             Game.registerHook('create', function (param) {
//                 if (log.create) {
//                     console.log("create hook - parameter passed:");
//                     console.log(param);
//                 }
//             });
//         },
//         save: function (param) {
//             if (log.save) {
//                 console.log("the save function got called");
//                 console.log(param);
//             }
//             return "a string to be saved";
//         },
//         load: function (param) {
//             if (log.load) {
//                 console.log("the load function got called");
//                 console.log(param);
//             }
//         }
//     });
// }
// registerMod();







function setOverrides(gameSaveData) {   // load settings and initialize variables
    // If gameSaveData wasn't passed to this function, it means that there was nothing for this mod in the game save when the mod was loaded
    // In that case, set the "loadedData" var to an empty object. When the loadFCData() function runs and finds no data from the game save,
    // it pulls data from local storage or sets default values
    if (gameSaveData) {
        FrozenCookies.loadedData = JSON.parse(gameSaveData);
    } else {
        FrozenCookies.loadedData = {};
    }
    loadFCData();
    FrozenCookies.frequency = 100;
    FrozenCookies.efficiencyWeight = 1.0;

    // Becomes 0 almost immediately after user input, so default to 0
    FrozenCookies.timeTravelAmount = 0;

    // Force redraw every 10 purchases
    FrozenCookies.autobuyCount = 0;

    // Set default values for calculations
    FrozenCookies.hc_gain = 0;
    FrozenCookies.hc_gain_time = Date.now();
    FrozenCookies.last_gc_state = (Game.hasBuff('Frenzy') ? Game.buffs['Frenzy'].multCpS : 1) * clickBuffBonus();
    FrozenCookies.last_gc_time = Date.now();
    FrozenCookies.lastCPS = Game.cookiesPs;
    FrozenCookies.lastBaseCPS = Game.cookiesPs;
    FrozenCookies.lastCookieCPS = 0;
    FrozenCookies.lastUpgradeCount = 0;
    FrozenCookies.currentBank = {
        'cost': 0,
        'efficiency': 0
    };
    FrozenCookies.targetBank = {
        'cost': 0,
        'efficiency': 0
    };
    FrozenCookies.disabledPopups = true;
    FrozenCookies.trackedStats = [];
    FrozenCookies.lastGraphDraw = 0;
    FrozenCookies.calculatedCpsByType = {};

    // Allow autoCookie to run
    FrozenCookies.processing = false;
    FrozenCookies.priceReductionTest = false;

    FrozenCookies.cookieBot = 0;
    FrozenCookies.autoclickBot = 0;
    FrozenCookies.autoFrenzyBot = 0;
    FrozenCookies.frenzyClickBot = 0;

    // Smart tracking details
    FrozenCookies.smartTrackingBot = 0;
    FrozenCookies.minDelay = 1000 * 10; // 10s minimum reporting between purchases with "smart tracking" on
    FrozenCookies.delayPurchaseCount = 0;

    // Caching
    emptyCaches();

    //Whether to currently display achievement popups
    FrozenCookies.showAchievements = true;

    if (!blacklist[FrozenCookies.blacklist]) {
        FrozenCookies.blacklist = 0;
    }
    Beautify = fcBeautify;
    Game.sayTime = function (time, detail) {
        return timeDisplay(time / Game.fps);
    }
    if (typeof (Game.tooltip.oldDraw) != "function") {
        Game.tooltip.oldDraw = Game.tooltip.draw;
        Game.tooltip.draw = fcDraw;
    }
    if (typeof (Game.oldReset) != "function") {
        Game.oldReset = Game.Reset;
        Game.Reset = fcReset;
    }
    Game.Win = fcWin;
    // Remove the following when turning on tooltop code
    nextPurchase(true);
    Game.RefreshStore();
    Game.RebuildUpgrades();
    beautifyUpgradesAndAchievements();
    // Replace Game.Popup references with event logging
    eval('Game.shimmerTypes.golden.popFunc = ' + Game.shimmerTypes.golden.popFunc.toString().replace(/Game\.Popup\((.+)\)\;/g, 'logEvent("GC", $1, true);'));
    eval('Game.UpdateWrinklers = ' + Game.UpdateWrinklers.toString().replace(/Game\.Popup\((.+)\)\;/g, 'logEvent("Wrinkler", $1, true);'));
    eval('FrozenCookies.safeGainsCalc = ' + Game.CalculateGains.toString().replace(/eggMult\+=\(1.+/, 'eggMult++; // CENTURY EGGS SUCK').replace(/Game\.cookiesPs/g, 'FrozenCookies.calculatedCps').replace(/Game\.globalCpsMult/g, 'mult'));

    // Give free achievements!
    if (!Game.HasAchiev('Third-party')) {
        Game.Win('Third-party');
    }


    function loadFCData() {
        // Set all cycleable preferences
        _.keys(FrozenCookies.preferenceValues).forEach(function (preference) {
            FrozenCookies[preference] = preferenceParse(preference, FrozenCookies.preferenceValues[preference].default);
        });
        // Separate because these are user-input values
        FrozenCookies.cookieClickSpeed = preferenceParse('cookieClickSpeed', 0);
        FrozenCookies.frenzyClickSpeed = preferenceParse('frenzyClickSpeed', 0);
        FrozenCookies.HCAscendAmount = preferenceParse('HCAscendAmount', 0);
        FrozenCookies.minCpSMult = preferenceParse('minCpSMult', 1);
        FrozenCookies.maxSpecials = preferenceParse('maxSpecials', 1);

        // building max values
        FrozenCookies.cursorMax = preferenceParse('cursorMax', 500);
        // FrozenCookies.grandmaMax = preferenceParse('grandmaMax', 500);
        FrozenCookies.farmMax = preferenceParse('farmMax', 500);
        // FrozenCookies.mineMax = preferenceParse('mineMax', 500);
        // FrozenCookies.factoryMax = preferenceParse('factoryMax', 500);
        // FrozenCookies.bankMax = preferenceParse('bankMax', 500);
        // FrozenCookies.templeMax = preferenceParse('templeMax', 500);
        FrozenCookies.manaMax = preferenceParse('manaMax', 100);
        // FrozenCookies.shipmentMax = preferenceParse('shipmentMax', 500);
        // FrozenCookies.labMax = preferenceParse('labMax', 500);
        // FrozenCookies.portalMax = preferenceParse('portalMax', 500);
        // FrozenCookies.timeMachineMax = preferenceParse('timeMachineMax', 500);
        // FrozenCookies.condensorMax = preferenceParse('condensorMax', 500);
        // FrozenCookies.prismMax = preferenceParse('prismMax', 500);
        // FrozenCookies.chancemakerMax = preferenceParse('chancemakerMax', 500);
        // FrozenCookies.fractalEngineMax = preferenceParse('fractalEngineMax', 500);
        // FrozenCookies.consoleMax = preferenceParse('consoleMax', 500);

        // Get historical data
        FrozenCookies.frenzyTimes = JSON.parse(FrozenCookies.loadedData['frenzyTimes'] || localStorage.getItem('frenzyTimes')) || {};
        //  FrozenCookies.non_gc_time = Number(FrozenCookies.loadedData['nonFrenzyTime']) || Number(localStorage.getItem('nonFrenzyTime')) || 0;
        //  FrozenCookies.gc_time = Number(FrozenCookies.loadedData['frenzyTime']) || Number(localStorage.getItem('frenzyTime')) || 0;;
        FrozenCookies.lastHCAmount = preferenceParse('lastHCAmount', 0);
        FrozenCookies.lastHCTime = preferenceParse('lastHCTime', 0);
        FrozenCookies.prevLastHCTime = preferenceParse('prevLastHCTime', 0);
        FrozenCookies.maxHCPercent = preferenceParse('maxHCPercent', 0);
        if (Object.keys(FrozenCookies.loadedData).length > 0) {
            logEvent("Load", "Restored Frozen Cookies settings from previous save");
        }
    }

    function preferenceParse(setting, defaultVal) {
        var value = defaultVal;
        if (setting in FrozenCookies.loadedData) {  // first look in the data from the game save
            value = FrozenCookies.loadedData[setting];
        } else if (localStorage.getItem(setting)) { // if the setting isn't there, check localStorage
            value = localStorage.getItem(setting);
        }
        return Number(value);   // if not overridden by game save or localStorage, defaultVal is returned
    }
    FCStart();
}

function emptyCaches() {
    FrozenCookies.recalculateCaches = true;
    FrozenCookies.caches = {};
    FrozenCookies.caches.nextPurchase = {};
    FrozenCookies.caches.recommendationList = [];
    FrozenCookies.caches.buildings = [];
    FrozenCookies.caches.upgrades = [];
}

function scientificNotation(value) {
    if (value === 0 || !Number.isFinite(value) || (Math.abs(value) >= 1 && Math.abs(value) <= 1000)) {
        return rawFormatter(value);
    }
    value = parseFloat(value);
    value = value.toExponential(2);
    value = value.replace('+', '');
    return value;
}


var numberFormatters = [
    rawFormatter,
    formatEveryThirdPower([
        '',
        ' million',
        ' billion',
        ' trillion',
        ' quadrillion',
        ' quintillion',
        ' sextillion',
        ' septillion',
        ' octillion',
        ' nonillion',
        ' decillion',
        ' undecillion',
        ' duodecillion',
        ' tredecillion',
        ' quattuordecillion',
        ' quindecillion',
        ' sexdecillion',
        ' septendecillion',
        ' octodecillion',
        ' novemdecillion',
        ' vigintillion',
        ' unvigintillion',
        ' duovigintillion',
        ' trevigintillion',
        ' quattuorvigintillion',
        ' quinvigintillion',
        ' sexvigintillion',
        ' septenvigintillion',
        ' octovigintillion',
        ' novemvigintillion',
        ' trigintillion',
        ' untrigintillion',
        ' duotrigintillion',
        ' tretrigintillion',
        ' quattuortrigintillion',
        ' quintrigintillion',
        ' sextrigintillion',
        ' septentrigintillion',
        ' octotrigintillion',
        ' novemtrigintillion'
    ]),

    formatEveryThirdPower([
        '',
        ' M',
        ' B',
        ' T',
        ' Qa',
        ' Qi',
        ' Sx',
        ' Sp',
        ' Oc',
        ' No',
        ' De',
        ' UnD',
        ' DoD',
        ' TrD',
        ' QaD',
        ' QiD',
        ' SxD',
        ' SpD',
        ' OcD',
        ' NoD',
        ' Vg',
        ' UnV',
        ' DoV',
        ' TrV',
        ' QaV',
        ' QiV',
        ' SxV',
        ' SpV',
        ' OcV',
        ' NoV',
        ' Tg',
        ' UnT',
        ' DoT',
        ' TrT',
        ' QaT',
        ' QiT',
        ' SxT',
        ' SpT',
        ' OcT',
        ' NoT'
    ]),

    formatEveryThirdPower([
        '',
        ' M',
        ' G',
        ' T',
        ' P',
        ' E',
        ' Z',
        ' Y'
    ]),
    scientificNotation
];

function fcBeautify(value) {
    var negative = (value < 0);
    value = Math.abs(value);
    var formatter = numberFormatters[FrozenCookies.numberDisplay];
    var output = formatter(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return negative ? '-' + output : output;
}

// Runs numbers in upgrades and achievements through our beautify function
function beautifyUpgradesAndAchievements() {
    function beautifyFn(str) {
        return Beautify(parseInt(str.replace(/,/, ''), 10));
    }

    var numre = /\d\d?\d?(?:,\d\d\d)*/;
    Game.AchievementsById.forEach(function (ach) {
        ach.desc = ach.desc.replace(numre, beautifyFn);
    });

    // These might not have any numbers in them, but just in case...
    Game.UpgradesById.forEach(function (upg) {
        upg.desc = upg.desc.replace(numre, beautifyFn);
    });
}

function timeDisplay(seconds) {
    if (seconds === '---' || seconds === 0) {
        return 'Done!';
    } else if (seconds == Number.POSITIVE_INFINITY) {
        return 'Never!'
    }
    seconds = Math.floor(seconds);
    var days, hours, minutes;
    days = Math.floor(seconds / (24 * 60 * 60));
    days = (days > 0) ? Beautify(days) + 'd ' : '';
    seconds %= (24 * 60 * 60);
    hours = Math.floor(seconds / (60 * 60));
    hours = (hours > 0) ? hours + 'h ' : '';
    seconds %= (60 * 60);
    minutes = Math.floor(seconds / 60);
    minutes = (minutes > 0) ? minutes + 'm ' : '';
    seconds %= 60;
    seconds = (seconds > 0) ? seconds + 's' : '';
    return (days + hours + minutes + seconds).trim();
}

function fcDraw(from, text, origin) {
    if (typeof(text) == "string") {
        if (text.includes('Devastation')) {
            text = text.replace(/\+\d+\%/,"+" + Math.round((Game.hasBuff('Devastation').multClick - 1) * 100) + "%")
        }
    }
    Game.tooltip.oldDraw(from, text, origin);
}

// want to add earth shatterer here
function fcReset() {
    Game.CollectWrinklers();
    if (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg')) {
        Game.ObjectsById.forEach(function (b) {
            b.sell(-1);
        });
        Game.Upgrades['Chocolate egg'].buy();
    }
    Game.oldReset();
    FrozenCookies.frenzyTimes = {};
    FrozenCookies.last_gc_state = (Game.hasBuff('Frenzy') ? Game.buffs['Frenzy'].multCpS : 1) * clickBuffBonus();
    FrozenCookies.last_gc_time = Date.now();
    FrozenCookies.lastHCAmount = Game.HowMuchPrestige(Game.cookiesEarned + Game.cookiesReset + wrinklerValue());
    FrozenCookies.lastHCTime = Date.now();
    FrozenCookies.maxHCPercent = 0;
    FrozenCookies.prevLastHCTime = Date.now();
    FrozenCookies.lastCps = 0;
    FrozenCookies.lastBaseCps = 0;
    FrozenCookies.trackedStats = [];
    // really just for my own use. These next two don't make much sense for the general case
    FrozenCookies.blacklist = 3;
    FrozenCookies.autoBlacklistStop = 1;
    recommendationList(true);
}

function saveFCData() {
    var saveString = {};
    _.keys(FrozenCookies.preferenceValues).forEach(function (preference) {
        saveString[preference] = FrozenCookies[preference];
    });

    saveString.frenzyClickSpeed = FrozenCookies.frenzyClickSpeed;
    saveString.cookieClickSpeed = FrozenCookies.cookieClickSpeed;
    saveString.HCAscendAmount = FrozenCookies.HCAscendAmount;
    saveString.cursorMax = FrozenCookies.cursorMax;
    saveString.farmMax = FrozenCookies.farmMax;
    saveString.minCpSMult = FrozenCookies.minCpSMult;
    saveString.frenzyTimes = JSON.stringify(FrozenCookies.frenzyTimes);
    //  saveString.nonFrenzyTime = FrozenCookies.non_gc_time;
    //  saveString.frenzyTime = FrozenCookies.gc_time;
    saveString.lastHCAmount = FrozenCookies.lastHCAmount;
    saveString.maxHCPercent = FrozenCookies.maxHCPercent;
    saveString.lastHCTime = FrozenCookies.lastHCTime;
    saveString.manaMax = FrozenCookies.manaMax;
    saveString.maxSpecials = FrozenCookies.maxSpecials;
    saveString.prevLastHCTime = FrozenCookies.prevLastHCTime;
    saveString.saveVersion = FrozenCookies.version;
    return JSON.stringify(saveString);
}

function divCps(value, cps) {
    var result = 0;
    if (value) {
        if (cps) {
            result = value / cps;
        } else {
            result = Number.POSITIVE_INFINITY;
        }
    }
    return result;
}

function nextHC(tg) {
    var futureHC = Math.ceil(Game.HowMuchPrestige(Game.cookiesEarned + Game.cookiesReset));
    var nextHC = Game.HowManyCookiesReset(futureHC)
    var toGo = nextHC - (Game.cookiesEarned + Game.cookiesReset);
    return tg ? toGo : timeDisplay(divCps(toGo, Game.cookiesPs));
}

function copyToClipboard(text) {
    Game.promptOn = 1;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    Game.promptOn = 0;
}

function getBuildingSpread() {
    return Game.ObjectsById.map(function (a) {
        return a.amount;
    }).join('/')
}

// need to fix and make a preference

// todo: add bind for autoascend
// Press 'a' to toggle autobuy.
// Press 'b' to pop up a copyable window with building spread.
// Press 'c' to toggle auto-GC
// Press 'e' to pop up a copyable window with your export string
// Press 'r' to pop up the reset window
// Press 's' to do a manual save
// Press 'w' to display a wrinkler-info window

// document.addEventListener('keydown', function (event) {
//     if (!Game.promptOn) {
//         if (event.keyCode == 65) {
//             Game.Toggle('autoBuy', 'autobuyButton', 'Autobuy OFF', 'Autobuy ON');
//             toggleFrozen('autoBuy');
//         }
//         if (event.keyCode == 66) {
//             copyToClipboard(getBuildingSpread());
//         }
//         if (event.keyCode == 67) {
//             Game.Toggle('autoGC', 'autogcButton', 'Autoclick GC OFF', 'Autoclick GC ON');
//             toggleFrozen('autoGC');
//         }
//         if (event.keyCode == 69) {
//             copyToClipboard(Game.WriteSave(true));
//         }
//         if (event.keyCode == 82) {
//             Game.Reset();
//         }
//         if (event.keyCode == 83) {
//             Game.WriteSave();
//         }
//         if (event.keyCode == 87) {
//             Game.Notify('Wrinkler Info', 'Popping all wrinklers will give you ' + Beautify(wrinklerValue())
//                 + ' cookies. <input type="button" value="Click here to pop all wrinklers" onclick="Game.CollectWrinklers()"></input>', [19, 8], 7);
//         }
//     }
// });

function writeFCButton(setting) {
    var current = FrozenCookies[setting];
}

function getSpeed(current) {
    var newSpeed = prompt('How many times per second do you want to click? (Current maximum is 250 clicks per second)', current);
    if (typeof (newSpeed) == 'undefined' || newSpeed == null || isNaN(Number(newSpeed)) || Number(newSpeed) < 0 || Number(newSpeed) > 250) {
        newSpeed = current;
    }
    return Number(newSpeed);
}

function updateSpeed(base) {
    var newSpeed = getSpeed(FrozenCookies[base]);
    if (newSpeed != FrozenCookies[base]) {
        FrozenCookies[base] = newSpeed;
        FCStart();
    }
}

function getCpSMultMin(current) {
    var newMin = prompt('What CpS multiplier should trigger Auto Casting (e.g. "7" will trigger when you have full mana and a Frenzy, "1" prevents triggering during a clot, etc.)?', current);
    if (typeof (newMin) == 'undefined' || newMin == null || isNaN(Number(newMin)) || Number(newMin) < 0) {
        newMin = current;
    }
    return Number(newMin);
}

function updateCpSMultMin(base) {
    var newMin = getCpSMultMin(FrozenCookies[base]);
    if (newMin != FrozenCookies[base]) {
        FrozenCookies[base] = newMin;
        FCStart();
    }
}

function getAscendAmount(current) {
    var newAmount = prompt('How many heavenly chips do you want to auto-ascend at?', current);
    if (typeof (newAmount) == 'undefined' || newAmount == null || isNaN(Number(newAmount)) || Number(newAmount) < 0) {
        newAmount = current;
    }
    return Number(newAmount);
}

function updateAscendAmount(base) {
    var newAmount = getAscendAmount(FrozenCookies[base]);
    if (newAmount != FrozenCookies[base]) {
        FrozenCookies[base] = newAmount;
        FCStart();
    }
}

function getManaMax(current) {
    var newMax = prompt('Set maximum mana: ', current);
    if (typeof (newMax) == 'undefined' || newMax == null || isNaN(Number(newMax)) || Number(newMax < 0)) {
        newMax = current;
    }
    return Number(newMax);
}

function updateManaMax(base) {
    var newMax = getManaMax(FrozenCookies[base]);
    if (newMax != FrozenCookies[base]) {
        FrozenCookies[base] = newMax;
        FCStart();
    }
}

function getMaxSpecials(current) {
    var newSpecials = prompt('Set amount of stacked Building specials for Harvest Bank: ', current);
    if (typeof (newSpecials) == 'undefined' || newSpecials == null || isNaN(Number(newSpecials)) || Number(newSpecials < 0)) {
        newSpecials = current;
    }
    return Number(newSpecials);
}

function updateMaxSpecials(base) {
    var newSpecials = getMaxSpecials(FrozenCookies[base]);
    if (newSpecials != FrozenCookies[base]) {
        FrozenCookies[base] = newSpecials;
        FCStart();
    }
}

function getCursorMax(current) {
    var newMax = prompt('How many Cursors should AutoBuy stop at?', current);
    if (typeof (newMax) == 'undefined' || newMax == null || isNaN(Number(newMax)) || Number(newMax < 0)) {
        newMax = current;
    }
    return Number(newMax);
}

function updateCursorMax(base) {
    var newMax = getCursorMax(FrozenCookies[base]);
    if (newMax != FrozenCookies[base]) {
        FrozenCookies[base] = newMax;
        FCStart();
    }
}

function getGrandmaMax(current) {
    var newMax2 = prompt('How many Grandmas should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateGrandmaMax(base) {
    var newMax2 = getGrandmaMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getFarmMax(current) {
    var newMax2 = prompt('How many Farms should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateFarmMax(base) {
    var newMax2 = getFarmMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getMineMax(current) {
    var newMax2 = prompt('How many Mines should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateMineMax(base) {
    var newMax2 = getMineMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getFactoryMax(current) {
    var newMax2 = prompt('How many Factories should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateFactoryMax(base) {
    var newMax2 = getFactoryMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getBankMax(current) {
    var newMax2 = prompt('How many Banks should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateBankMax(base) {
    var newMax2 = getBankMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getTempleMax(current) {
    var newMax2 = prompt('How many Temples should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateTempleMax(base) {
    var newMax2 = getTempleMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getShipmentMax(current) {
    var newMax2 = prompt('How many Shipments should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateShipmentMax(base) {
    var newMax2 = getShipmentMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getLabMax(current) {
    var newMax2 = prompt('How many Alchemy Labs should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateLabMax(base) {
    var newMax2 = getLabMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getPortalMax(current) {
    var newMax2 = prompt('How many Portals should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updatePortalMax(base) {
    var newMax2 = getPortalMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getTimeMachineMax(current) {
    var newMax2 = prompt('How many Time Machines should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateTimeMachineMax(base) {
    var newMax2 = getTimeMachineMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getCondensorMax(current) {
    var newMax2 = prompt('How many Antimatter Condensors should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateCondensorMax(base) {
    var newMax2 = getCondensorMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getPrismMax(current) {
    var newMax2 = prompt('How many Prisms should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updatePrismMax(base) {
    var newMax2 = getPrismMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getChancemakerMax(current) {
    var newMax2 = prompt('How many Chancemakers should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateChancemakerMax(base) {
    var newMax2 = getChancemakerMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getFractalEngineMax(current) {
    var newMax2 = prompt('How many Fractal Engines should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateFractalEngineMax(base) {
    var newMax2 = getFractalEngineMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function getConsoleMax(current) {
    var newMax2 = prompt('How many Javascript Consoles should AutoBuy stop at?', current);
    if (typeof (newMax2) == 'undefined' || newMax2 == null || isNaN(Number(newMax2)) || Number(newMax2 < 0)) {
        newMax2 = current;
    }
    return Number(newMax2);
}

function updateConsoleMax(base) {
    var newMax2 = getConsoleMax(FrozenCookies[base]);
    if (newMax2 != FrozenCookies[base]) {
        FrozenCookies[base] = newMax2;
        FCStart();
    }
}

function updateTimeTravelAmount() {
    var newAmount = prompt("Warning: Time travel is highly unstable, and large values are highly likely to either cause long delays or crash the game. Be careful!\nHow much do you want to time travel by? This will happen instantly.");
    if (typeof (newAmount) === 'undefined' || newAmount === null || isNaN(Number(newAmount)) || Number(newAmount) < 0) {
        newAmount = 0;
    }
    FrozenCookies.timeTravelAmount = newAmount;
}

function cyclePreference(preferenceName) {
    var preference = FrozenCookies.preferenceValues[preferenceName];
    if (preference) {
        var display = preference.display;
        var current = FrozenCookies[preferenceName];
        var preferenceButton = $('#' + preferenceName + 'Button');
        if (display && display.length > 0 && preferenceButton && preferenceButton.length > 0) {
            var newValue = (current + 1) % display.length;
            preferenceButton[0].innerText = display[newValue];
            FrozenCookies[preferenceName] = newValue;
            FrozenCookies.recalculateCaches = true;
            Game.RefreshStore();
            Game.RebuildUpgrades();
            FCStart();
        }
    }
}

function toggleFrozen(setting) {
    if (!FrozenCookies[setting]) {
        FrozenCookies[setting] = 1;
    } else {
        FrozenCookies[setting] = 0;
    }
    FCStart();
}

var T = Game.Objects['Temple'].minigame;
var M = Game.Objects['Wizard tower'].minigame;

function rigiSell() {
    // Sell enough cursors to enable Rigidels effect
    if (Game.BuildingsOwned % 10) Game.Objects['Cursor'].sell(Game.BuildingsOwned % 10);
    return;
}

function lumpIn(mins) { // For debugging, set minutes until next lump is *ripe*
    Game.lumpT = Date.now() - Game.lumpRipeAge + (60000 * mins)
}

function swapIn(godId, targetSlot) { // mostly code copied from minigamePantheon.js, tweaked to avoid references to "dragging"
    if (T.swaps == 0) return;
    T.useSwap(1);
    T.lastSwapT = 0;
    var div = l('templeGod' + godId);
    var prev = T.slot[targetSlot] //id of God currently in slot
    if (prev != -1) { //when something's in there already
        prev = T.godsById[prev]; //prev becomes god object
        var prevDiv = l('templeGod' + prev.id);
        if (T.godsById[godId].slot != -1) l('templeSlot' + T.godsById[godId].slot).appendChild(prevDiv);
        else {
            var other = l('templeGodPlaceholder' + (prev.id));
            other.parentNode.insertBefore(prevDiv, other);
        }
    }
    l('templeSlot' + targetSlot).appendChild(l('templeGod' + godId));
    T.slotGod(T.godsById[godId], targetSlot);

    PlaySound('snd/tick.mp3');
    PlaySound('snd/spirit.mp3');

    var rect = l('templeGod' + godId).getBoundingClientRect();
    Game.SparkleAt((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2 - 24);
}



function autoRigidel() {
    if (!T) return; // Exit if pantheon doesnt even exist
    var timeToRipe = (Game.lumpRipeAge - (Date.now() - Game.lumpT)) / 60000; //Minutes until sugar lump ripens
    var orderLvl = Game.hasGod('order') ? Game.hasGod('order') : 0;
    switch (orderLvl) {
        case 0: //Rigidel isn't in a slot
            if (T.swaps < 2 || (T.swaps == 1 && T.slot[0] == -1)) return; //Don't do anything if we can't swap Rigidel in
            if (timeToRipe < 60) {
                var prev = T.slot[0] //cache whatever god you have equipped
                swapIn(10, 0); //swap in rigidel
                Game.computeLumpTimes();
                rigiSell(); //Meet the %10 condition
                Game.clickLump(); //harvest the ripe lump, AutoSL probably covers this but this should avoid issues with autoBuy going first and disrupting Rigidel
                if (prev != -1) swapIn(prev, 0); //put the old one back
            }
        case 1: //Rigidel is already in diamond slot
            if (timeToRipe < 60 && Game.BuildingsOwned % 10) {
                rigiSell();
                Game.computeLumpTimes();
                Game.clickLump();
            }
        case 2: //Rigidel in Ruby slot,
            if (timeToRipe < 40 && Game.BuildingsOwned % 10) {
                rigiSell();
                Game.computeLumpTimes();
                Game.clickLump();
            }
        case 3: //Rigidel in Jade slot
            if (timeToRipe < 20 && Game.BuildingsOwned % 10) {
                rigiSell();
                Game.computeLumpTimes();
                Game.clickLump();
            }
    }
}

function autoTicker() {
    if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') {
        Game.tickerL.click();
    }
}

function gardenToggle() {
    if (Game.Upgrades["Golden switch [on]"].unlocked && !Game.Upgrades["Golden switch [on]"].bought && Game.Objects.Farm.minigame.freeze === 0) {
        Game.Objects.Farm.minigame.freeze = 1;
        Game.Objects.Farm.minigame.computeEffs()
        logEvent("GardenToggle", "Garden frozen");
    }
    if (Game.Upgrades["Golden switch [off]"].unlocked && !Game.Upgrades["Golden switch [off]"].bought && Game.Objects.Farm.minigame.freeze === 1) {
        Game.Objects.Farm.minigame.freeze = 0;
        Game.Objects.Farm.minigame.computeEffs()
        logEvent("GardenToggle", "Garden thawed");
    }
}

function doubleCast(spell) {
    if (suppressNextGC) return;
    var towerCount = Game.Objects["Wizard tower"].amount;
    var minTowers = [307,303,298,294,309,357,386];
    var minMinTowers = [21,14,8,3,1,1,1];
    var lvl=Math.max(M.parent.level,1)-1;
    M.computeMagicM()
    if ((M.magic - Math.floor(spell.costMin + spell.costPercent * M.magicM)) >= 23) { // enough for another?
        if (M.castSpell(spell)) { logEvent('DoubleCast', "Cast Force the Hand of Fate"); } else return false;
        Game.Objects["Wizard tower"].sell(towerCount - minMinTowers[lvl]);
        M.computeMagicM()
        logEvent('AutoSpell', 'Sold Wizard towers. Towers now at ' + Game.Objects["Wizard tower"].amount + '. Mana at ' + M.magic);
        for (var i in Game.shimmers) {
            if (Game.shimmers[i].type == 'golden') {
                Game.shimmers[i].pop();
            }
        }
        if (M.castSpell(spell)) { logEvent('DoubleCast', "Cast Force the Hand of Fate - AGAIN"); } else return false;
        safeBuy(Game.Objects["Wizard tower"], minTowers[lvl] - Game.Objects["Wizard tower"].amount);
        logEvent('AutoSpell', 'Bought Wizard towers. Towers now at ' + Game.Objects["Wizard tower"].amount);
        return true;
    } else return false;
}

// need logic in here to reduce towers if necessary to cast a good cookie (i.e. if you have a DragonFlight and have predicted a building special and it's only 2 mana short or something.)
// I'm guessing I'd also need to implement the logic to calculate ideal tower amounts instead of hard coding 307 & 21


function safeCast(spell) {
    // need to keep something from being cast during a Dragonflight if it's a click frenzy in disguise (or anything similar)
    M.computeMagicM()
    if (M.magicM < Math.floor(spell.costMin + spell.costPercent * M.magicM)) return;
    if (suppressNextGC) return;
    if (predictNextSpell(0) === "Blab" || predictNextSpell(0) === "Sugar Lump") {   // if it's a cookie where the multiplier has no effect, just cast the spell and get it out of the way (regardless of CPS)
        return M.castSpell(spell);
    } else if (predictNextSpell(0) === "Clot" || predictNextSpell(0) === "Ruin Cookies") {  // if there's an actual detrimental effect, cast the spell and temporarily suppress AutoGC
        // if (cpsBonus() <= 1 && Game.shimmers.length === 0) { // should we also check to see if the next GC is at least some minimum amount of time away?
        //     suppressNextGC = true;
        //     if (M.castSpell(spell)) {
        //         logEvent('SafeCast', "Force the Hand of Fate -- Don't click on this next cookie");
        //         return true;
        //     }
        //     // if casting failed and these next two lines get executed, rewind
        //     suppressNextGC = false;
        //     return false;
        // } else return false;
        if (M.castSpell(M.spellsById[4])) {
            logEvent('SafeCast', "Cast Haggler's Charm to skip a detrimental spell");
            return true;
        } else return false;
        // otherwise wait until we have the right multiplier
    } else if ((predictNextSpell(0) === "Building Special" || predictNextSpell(0) === "Click Frenzy" || predictNextSpell(0) === "Elder Frenzy" || predictNextSpell(0) === "Cursed Finger") &&
               (predictNextSpell(1) === "Building Special" || predictNextSpell(1) === "Click Frenzy" || predictNextSpell(1) === "Elder Frenzy" || predictNextSpell(1) === "Cursed Finger") &&
                (cpsBonus() > FrozenCookies.minCpSMult)) {
        return doubleCast(spell);
    } else if ((predictNextSpell(0) === "Building Special" || predictNextSpell(0) === "Click Frenzy" || predictNextSpell(0) === "Elder Frenzy") &&
                (cpsBonus() > FrozenCookies.minCpSMult || Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy'))) {
        return M.castSpell(spell);
    } else if ((predictNextSpell(0) != "Building Special" && predictNextSpell(0) != "Click Frenzy" && predictNextSpell(0) != "Elder Frenzy") &&
                (cpsBonus() >= FrozenCookies.minCpSMult || Game.hasBuff('Click frenzy'))  && !Game.hasBuff('Dragonflight')) {
        return M.castSpell(spell);
    } return false;
}

function autoCast() {
    if (!M) return; // Just leave if you don't have grimoire
    if (M.magic == M.magicM) {
        switch (FrozenCookies.autoSpell) {
            case 0:
                return;
            case 1:
                if (cpsBonus() >= FrozenCookies.minCpSMult || Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy')) {
                    var CBG = M.spellsById[0];
                    if (M.magicM < Math.floor(CBG.costMin + CBG.costPercent * M.magicM)) return;
                    if (M.castSpell(CBG)) {
                        logEvent('AutoSpell', 'Cast Conjure Baked Goods');
                    }
                }
                return;
            case 2:
                var FTHOF = M.spellsById[1];
                if (M.magicM < Math.floor(FTHOF.costMin + FTHOF.costPercent * M.magicM)) return;
                // if (cpsBonus() >= FrozenCookies.minCpSMult || Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy')) {
                    if (safeCast(FTHOF)) {
                        logEvent('AutoSpell', 'Cast Force the Hand of Fate');
                    }
                // }
                return;
            case 3:
                if (cpsBonus() >= FrozenCookies.minCpSMult || Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy')) {
                    var SE = M.spellsById[3];
                    // This code apparently works under the following assumptions:
                    //      - you want to spend your mana to get the highest value building (currently Javascript Console)
                    //      - therefore you'll manually keep your number of Javascript consoles < 400, or don't mind selling the excess for the chance to win a free one
                    // If you don't have any Javascript Consoles yet, or can't cast SE, just give up.
                    if (Game.Objects["Javascript console"].amount == 0 || M.magicM < Math.floor(SE.costMin + SE.costPercent * M.magicM)) return;
                    // If we have over 400 Javascript consoles, always going to sell down to 399.
                    // If you don't have half a Javascript Console's worth of cookies in bank, sell one or more until you do
                    while (Game.Objects["Javascript console"].amount >= 400 || Game.cookies < Game.Objects["Javascript console"].price / 2) {
                        Game.Objects["Javascript console"].sell(1);
                        logEvent('Store', 'Sold 1 Javascript Console for ' + (Beautify(Game.Objects['Javascript console'].price * Game.Objects['Javascript console'].getSellMultiplier()) + ' cookies'));
                    }
                    if (M.castSpell(SE)) {
                        logEvent('AutoSpell', 'Cast Spontaneous Edifice');
                    }
                } return;
            case 4:
                if (cpsBonus() >= FrozenCookies.minCpSMult || Game.hasBuff('Dragonflight') || Game.hasBuff('Click frenzy')) {
                    var hagC = M.spellsById[4];
                    if (M.magicM < Math.floor(hagC.costMin + hagC.costPercent * M.magicM)) return;
                    if (M.castSpell(hagC)) {
                        logEvent('AutoSpell', 'Cast Haggler\'s Charm');
                    }
                } return;
        }
    }
}

function checkBlacklistGoal() {   // Automatically turn off a blacklist once the goal for that blacklist is achieved
    switch (FrozenCookies.blacklist) {
        case 1:
            FrozenCookies.blacklist = (Game.cookiesEarned >= 1000000) ? 0 : 1;
            break;
        case 2:
            FrozenCookies.blacklist = (Game.cookiesEarned >= 1000000000) ? 0 : 2;
            break;
        case 3:
            FrozenCookies.blacklist = (haveAll('halloween') && haveAll('easter')) ? 0 : 3;
            break;
        case 4:
            // This is the "No Buildings" blacklist, so no real goal to fulfill
            break;
    }
}

function generateProbabilities(upgradeMult, minBase, maxMult) {
    var cumProb = [];
    var remainingProbability = 1;
    var minTime = minBase * upgradeMult;
    var maxTime = maxMult * minTime;
    var spanTime = maxTime - minTime;
    for (var i = 0; i < maxTime; i++) {
        var thisFrame = remainingProbability * Math.pow(Math.max(0, (i - minTime) / spanTime), 5);
        remainingProbability -= thisFrame;
        cumProb.push(1 - remainingProbability);
    }
    return cumProb;
}

function getProbabilityList(listType) {
    var list;
    if (listType === "golden") {
        list = generateProbabilities(getProbabilityModifiers(listType), 5 * 60 * Game.fps, 3);
    } else if (listType === "reindeer") {
        list = generateProbabilities(getProbabilityModifiers(listType), 3 * 60 * Game.fps, 2);
    }
    return list;
}

function getProbabilityModifiers(listType) {
    var result;
    result = Game.shimmerTypes.golden.getTimeMod(Game.shimmerTypes.golden, 10000) / 10000 / Game.fps / 60
    return result;
}

function probabilitySpan(listType, start, endProbability) {
    var startProbability = getProbabilityList(listType)[start];
    return _.sortedIndex(getProbabilityList(listType), (startProbability + endProbability - startProbability * endProbability));
}

function clickBuffBonus() {
    var ret = 1
    for (var i in Game.buffs) {
        // Devastation, Godzamok's buff, is too variable and messes up the frenzy time tracking
        if (typeof Game.buffs[i].multClick != 'undefined' && Game.buffs[i].name != 'Devastation') {
            ret *= Game.buffs[i].multClick;
        }
    }
    return ret;
}

function cpsBonus() {
    var ret = 1
    for (var i in Game.buffs) {
        if (typeof Game.buffs[i].multCpS != 'undefined') {
            ret *= Game.buffs[i].multCpS;
        }
    }
    return ret;
}

function hasClickBuff() {
    return Game.hasBuff('Cursed finger') || clickBuffBonus() > 1;
}

function baseCps() {
    var buffMod = 1;
    for (var i in Game.buffs) {
        if (typeof Game.buffs[i].multCpS != 'undefined') buffMod *= Game.buffs[i].multCpS;
    }
    if (buffMod === 0) {
        return FrozenCookies.lastBaseCPS;
    }
    var baseCPS = Game.cookiesPs / buffMod;
    FrozenCookies.lastBaseCPS = baseCPS;
    return baseCPS;
}

function baseClickingCps(clickSpeed) {
    var clickFrenzyMod = clickBuffBonus();
    var frenzyMod = Game.hasBuff('Frenzy') ? Game.buffs['Frenzy'].multCpS : 1;
    var cpc = Game.mouseCps() / (clickFrenzyMod * frenzyMod);
    return clickSpeed * cpc;
}

function effectiveCps(delay, wrathValue, wrinklerCount) {
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    wrinklerCount = wrinklerCount != null ? wrinklerCount : (wrathValue ? 10 : 0);
    var wrinkler = wrinklerMod(wrinklerCount);
    if (delay == null) {
        delay = delayAmount();
    }
    return baseCps() * wrinkler + gcPs(cookieValue(delay, wrathValue, wrinklerCount)) + baseClickingCps(FrozenCookies.cookieClickSpeed * FrozenCookies.autoClick) + reindeerCps(wrathValue);
}

function frenzyProbability(wrathValue) {
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    return cookieInfo.frenzy.odds[wrathValue]; // + cookieInfo.frenzyRuin.odds[wrathValue] + cookieInfo.frenzyLucky.odds[wrathValue] + cookieInfo.frenzyClick.odds[wrathValue];
}

function clotProbability(wrathValue) {
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    return cookieInfo.clot.odds[wrathValue]; // + cookieInfo.clotRuin.odds[wrathValue] + cookieInfo.clotLucky.odds[wrathValue] + cookieInfo.clotClick.odds[wrathValue];
}

function bloodProbability(wrathValue) {
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    return cookieInfo.blood.odds[wrathValue];
}

function cookieValue(bankAmount, wrathValue, wrinklerCount) {
    var cps = baseCps();
    var clickCps = baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
    var frenzyCps = FrozenCookies.autoFrenzy ? baseClickingCps(FrozenCookies.autoFrenzy * FrozenCookies.frenzyClickSpeed) : clickCps;
    var luckyMod = Game.Has('Get lucky') ? 2 : 1;
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    wrinklerCount = wrinklerCount != null ? wrinklerCount : (wrathValue ? 10 : 0);
    var wrinkler = wrinklerMod(wrinklerCount);

    var value = 0;
    // Clot
    value -= cookieInfo.clot.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 66 * 0.5;
    // Frenzy
    value += cookieInfo.frenzy.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 77 * 6;
    // Blood
    value += cookieInfo.blood.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 6 * 665;
    // Chain
    value += cookieInfo.chain.odds[wrathValue] * calculateChainValue(bankAmount, cps, (7 - (wrathValue / 3)));
    // Ruin
    value -= cookieInfo.ruin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10) + 13);
    // Frenzy + Ruin
    value -= cookieInfo.frenzyRuin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10 * 7) + 13);
    // Clot + Ruin
    value -= cookieInfo.clotRuin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10 * 0.5) + 13);
    // Lucky
    value += cookieInfo.lucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15) + 13);
    // Frenzy + Lucky
    value += cookieInfo.frenzyLucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15 * 7) + 13);
    // Clot + Lucky
    value += cookieInfo.clotLucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15 * 0.5) + 13);
    // Click
    value += cookieInfo.click.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777;
    // Frenzy + Click
    value += cookieInfo.frenzyClick.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777 * 7;
    // Clot + Click
    value += cookieInfo.clotClick.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777 * 0.5;
    // Blah
    value += 0;
    return value;
}

function cookieStats(bankAmount, wrathValue, wrinklerCount) {
    var cps = baseCps();
    var clickCps = baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
    var frenzyCps = FrozenCookies.autoFrenzy ? baseClickingCps(FrozenCookies.autoFrenzy * FrozenCookies.frenzyClickSpeed) : clickCps;
    var luckyMod = Game.Has('Get lucky') ? 2 : 1;
    var clickFrenzyMod = clickBuffBonus();
    wrathValue = wrathValue != null ? wrathValue : Game.elderWrath;
    wrinklerCount = wrinklerCount != null ? wrinklerCount : (wrathValue ? 10 : 0);
    var wrinkler = wrinklerMod(wrinklerCount);

    var result = {};
    // Clot
    result.clot = -1 * cookieInfo.clot.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 66 * 0.5;
    // Frenzy
    result.frenzy = cookieInfo.frenzy.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 77 * 7;
    // Blood
    result.blood = cookieInfo.blood.odds[wrathValue] * (wrinkler * cps + clickCps) * luckyMod * 666 * 6;
    // Chain
    result.chain = cookieInfo.chain.odds[wrathValue] * calculateChainValue(bankAmount, cps, (7 - (wrathValue / 3)));
    // Ruin
    result.ruin = -1 * cookieInfo.ruin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10) + 13);
    // Frenzy + Ruin
    result.frenzyRuin = -1 * cookieInfo.frenzyRuin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10 * 7) + 13);
    // Clot + Ruin
    result.clotRuin = -1 * cookieInfo.clotRuin.odds[wrathValue] * (Math.min(bankAmount * 0.05, cps * 60 * 10 * 0.5) + 13);
    // Lucky
    result.lucky = cookieInfo.lucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15) + 13);
    // Frenzy + Lucky
    result.frenzyLucky = cookieInfo.frenzyLucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15 * 7) + 13);
    // Clot + Lucky
    result.clotLucky = cookieInfo.clotLucky.odds[wrathValue] * (Math.min(bankAmount * 0.15, cps * 60 * 15 * 0.5) + 13);
    // Click
    result.click = cookieInfo.click.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777;
    // Frenzy + Click
    result.frenzyClick = cookieInfo.frenzyClick.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777 * 7;
    // Clot + Click
    result.clotClick = cookieInfo.clotClick.odds[wrathValue] * frenzyCps * luckyMod * 13 * 777 * 0.5;
    // Blah
    result.blah = 0;
    return result;
}

function reindeerValue(wrathValue) {
    var value = 0;
    if (Game.season == 'christmas') {
        var remaining = 1 - (frenzyProbability(wrathValue) + clotProbability(wrathValue) + bloodProbability(wrathValue));
        var outputMod = Game.Has('Ho ho ho-flavored frosting') ? 2 : 1;

        value += Math.max(25, baseCps() * outputMod * 60 * 7) * frenzyProbability(wrathValue);
        value += Math.max(25, baseCps() * outputMod * 60 * 0.5) * clotProbability(wrathValue);
        value += Math.max(25, baseCps() * outputMod * 60 * 666) * bloodProbability(wrathValue);
        value += Math.max(25, baseCps() * outputMod * 60) * remaining;
    }
    return value;
}

function reindeerCps(wrathValue) {
    var averageTime = probabilitySpan('reindeer', 0, 0.5) / Game.fps;
    return reindeerValue(wrathValue) / averageTime * FrozenCookies.simulatedGCPercent;
}

function calculateChainValue(bankAmount, cps, digit) {
    x = Math.min(bankAmount, (cps * 60 * 60 * 6 * 4));
    n = Math.floor(Math.log((9 * x) / (4 * digit)) / Math.LN10);
    return 125 * Math.pow(9, (n - 3)) * digit;
}

function chocolateValue(bankAmount, earthShatter) {
    var value = 0;
    if (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg')) {
        bankAmount = (bankAmount != null && bankAmount !== 0) ? bankAmount : Game.cookies;
        var sellRatio = 0.25;
        var highestBuilding = 0;
        if (earthShatter == null) {
            if (Game.hasAura('Earth Shatterer')) sellRatio = 0.5;
        } else if (earthShatter) {
            sellRatio = 0.5;
            if (!Game.hasAura('Earth Shatterer')) {
                for (var i in Game.Objects) {
                    if (Game.Objects[i].amount > 0) highestBuilding = Game.Objects[i];
                }
            }
        }
        value = 0.05 * (wrinklerValue() + bankAmount + Game.ObjectsById.reduce(function (s, b) {
            return s + cumulativeBuildingCost(b.basePrice, 1, (b == highestBuilding ? b.amount : b.amount + 1) - b.free) * sellRatio
        }, 0));
    }
    return value;
}

function wrinklerValue() {
    return Game.wrinklers.reduce(function (s, w) {
        return s + popValue(w);
    }, 0);
}

function buildingRemaining(building, amount) {
    var cost = cumulativeBuildingCost(building.basePrice, building.amount, amount);
    var availableCookies = Game.cookies + wrinklerValue() + Game.ObjectsById.reduce(function (s, b) {
        return s + (b.name == building.name ? 0 : cumulativeBuildingCost(b.basePrice, 1, b.amount + 1) / 2);
    }, 0);
    availableCookies *= Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg') ? 1.05 : 1;
    return Math.max(0, cost - availableCookies);
}

// currently unused
function earnedRemaining(total) {
    return Math.max(0, total - (Game.cookiesEarned + wrinklerValue() + chocolateValue()));
}

// currently unused
function estimatedTimeRemaining(cookies) {
    return timeDisplay(cookies / effectiveCps());
}

function canCastSE() {
    if (M.magicM >= 80 && Game.Objects['Javascript console'].amount > 0) return 1;
    return 0;
}

function edificeBank() {
    if (!canCastSE) return 0;
    var cmCost = Game.Objects['Javascript console'].price;
    return Game.hasBuff('everything must go') ? (cmCost * (100 / 95)) / 2 : cmCost / 2;
}
function luckyBank() {
    return baseCps() * 60 * 100;
}

function luckyFrenzyBank() {
    return baseCps() * 60 * 100 * 7;
}

function chainBank() {
    //  More exact
    var digit = 7 - Math.floor(Game.elderWrath / 3);
    return 4 * Math.floor(digit / 9 * Math.pow(10, Math.floor(Math.log(194400 * baseCps() / digit) / Math.LN10)));
    //  return baseCps() * 60 * 60 * 6 * 4;
}

function harvestBank() {
    if (!FrozenCookies.setHarvestBankPlant) return 0;

    FrozenCookies.harvestMinutes = 0;
    FrozenCookies.harvestMaxPercent = 0;
    FrozenCookies.harvestFrenzy = 1;
    FrozenCookies.harvestBuilding = 1;
    FrozenCookies.harvestPlant = '';

    if (FrozenCookies.setHarvestBankType == 1 || FrozenCookies.setHarvestBankType == 3) {
        FrozenCookies.harvestFrenzy = 7;
    }

    if (FrozenCookies.setHarvestBankType == 2 || FrozenCookies.setHarvestBankType == 3) {
        var harvestBuildingArray = [Game.Objects['Cursor'].amount,
        Game.Objects['Grandma'].amount,
        Game.Objects['Farm'].amount,
        Game.Objects['Mine'].amount,
        Game.Objects['Factory'].amount,
        Game.Objects['Bank'].amount,
        Game.Objects['Temple'].amount,
        Game.Objects['Wizard tower'].amount,
        Game.Objects['Shipment'].amount,
        Game.Objects['Alchemy lab'].amount,
        Game.Objects['Portal'].amount,
        Game.Objects['Time machine'].amount,
        Game.Objects['Antimatter condenser'].amount,
        Game.Objects['Prism'].amount,
        Game.Objects['Chancemaker'].amount,
        Game.Objects['Fractal engine'].amount,
        Game.Objects['Javascript console'].amount];
        harvestBuildingArray.sort(function (a, b) { return b - a });

        for (var buildingLoop = 0; buildingLoop < FrozenCookies.maxSpecials; buildingLoop++) {
            FrozenCookies.harvestBuilding *= harvestBuildingArray[buildingLoop];
        }
    }

    switch (FrozenCookies.setHarvestBankPlant) {
        case 1:
            FrozenCookies.harvestPlant = 'Bakeberry';
            FrozenCookies.harvestMinutes = 30;
            FrozenCookies.harvestMaxPercent = 0.03;
            break;

        case 2:
            FrozenCookies.harvestPlant = 'Chocoroot';
            FrozenCookies.harvestMinutes = 3;
            FrozenCookies.harvestMaxPercent = 0.03;
            break;

        case 3:
            FrozenCookies.harvestPlant = 'White Chocoroot';
            FrozenCookies.harvestMinutes = 3;
            FrozenCookies.harvestMaxPercent = 0.03;
            break;

        case 4:
            FrozenCookies.harvestPlant = 'Queenbeet';
            FrozenCookies.harvestMinutes = 60;
            FrozenCookies.harvestMaxPercent = 0.04;
            break;

        case 5:
            FrozenCookies.harvestPlant = 'Duketater';
            FrozenCookies.harvestMinutes = 120;
            FrozenCookies.harvestMaxPercent = 0.08;
            break;

        case 6:
            FrozenCookies.harvestPlant = 'Crumbspore';
            FrozenCookies.harvestMinutes = 1;
            FrozenCookies.harvestMaxPercent = 0.01;
            break;

        case 7:
            FrozenCookies.harvestPlant = 'Doughshroom';
            FrozenCookies.harvestMinutes = 5;
            FrozenCookies.harvestMaxPercent = 0.03;
            break;
    }

    if (FrozenCookies.maxSpecials == 0) {
        FrozenCookies.maxSpecials = 1;
    }

    return baseCps() * 60 * FrozenCookies.harvestMinutes * FrozenCookies.harvestFrenzy * FrozenCookies.harvestBuilding / Math.pow(10, FrozenCookies.maxSpecials) / FrozenCookies.harvestMaxPercent;
}

function cookieEfficiency(startingPoint, bankAmount) {
    var results = Number.MAX_VALUE;
    var currentValue = cookieValue(startingPoint);
    var bankValue = cookieValue(bankAmount);
    var bankCps = gcPs(bankValue);
    if (bankCps > 0) {
        if (bankAmount <= startingPoint) {
            results = 0;
        } else {
            var cost = Math.max(0, (bankAmount - startingPoint));
            var deltaCps = gcPs(bankValue - currentValue);
            results = divCps(cost, deltaCps);
        }
    } else if (bankAmount <= startingPoint) {
        results = 0;
    }
    return results;
}

function bestBank(minEfficiency) {
    var results = {};
    var edifice = ((FrozenCookies.autoSpell == 3 || FrozenCookies.holdSEBank) ? edificeBank() : 0);
    var bankLevels = [0, luckyBank(), luckyFrenzyBank(), harvestBank()].sort(function (a, b) {
        return b - a;
    }).map(function (bank) {
        return {
            'cost': bank,
            'efficiency': cookieEfficiency(Game.cookies, bank)
        };
    }).filter(function (bank) {
        return (bank.efficiency >= 0 && bank.efficiency <= minEfficiency || FrozenCookies.setHarvestBankPlant) ? bank : null;
    });
    if (bankLevels[0].cost > edifice || FrozenCookies.setHarvestBankPlant) {
        return bankLevels[0];
    }
    return {
        'cost': edifice,
        'efficiency': 1
    };
}

function weightedCookieValue(useCurrent) {
    var cps = baseCps();
    var lucky_mod = Game.Has('Get lucky');
    var base_wrath = lucky_mod ? 401.835 * cps : 396.51 * cps;
    //  base_wrath += 192125500000;
    var base_golden = lucky_mod ? 2804.76 * cps : 814.38 * cps;
    if (Game.cookiesEarned >= 100000) {
        var remainingProbability = 1;
        var startingValue = '6666';
        var rollingEstimate = 0;
        for (var i = 5; i < Math.min(Math.floor(Game.cookies).toString().length, 12); i++) {
            startingValue += '6';
            rollingEstimate += 0.1 * remainingProbability * startingValue;
            remainingProbability -= remainingProbability * 0.1;
        }
        rollingEstimate += remainingProbability * startingValue;
        //    base_golden += 10655700000;
        base_golden += rollingEstimate * 0.0033;
        base_wrath += rollingEstimate * 0.0595;
    }
    if (useCurrent && Game.cookies < maxLuckyBank()) {
        if (lucky_mod) {
            base_golden -= ((900 * cps) - Math.min(900 * cps, Game.cookies * 0.15)) * 0.49 * 0.5 + (maxLuckyValue() - (Game.cookies * 0.15)) * 0.49 * 0.5;
        } else {
            base_golden -= (maxLuckyValue() - (Game.cookies * 0.15)) * 0.49;
            base_wrath -= (maxLuckyValue() - (Game.cookies * 0.15)) * 0.29;
        }
    }
    return Game.elderWrath / 3.0 * base_wrath + (3 - Game.elderWrath) / 3.0 * base_golden;
}

function maxLuckyValue() {
    var gcMod = Game.Has('Get lucky') ? 6300 : 900;
    return baseCps() * gcMod;
}

function maxLuckyBank() {
    return Game.Has('Get lucky') ? luckyFrenzyBank() : luckyBank();
}

function gcPs(gcValue) {
    var averageGCTime = probabilitySpan('golden', 0, 0.5) / Game.fps;
    gcValue /= averageGCTime;
    gcValue *= FrozenCookies.simulatedGCPercent;
    return gcValue;
}

function gcEfficiency() {
    if (gcPs(weightedCookieValue()) <= 0) {
        return Number.MAX_VALUE;
    }
    var cost = Math.max(0, (maxLuckyValue() * 10 - Game.cookies));
    var deltaCps = gcPs(weightedCookieValue() - weightedCookieValue(true));
    return divCps(cost, deltaCps);
}

function delayAmount() {
    return bestBank(nextChainedPurchase().efficiency).cost;
    /*
      if (nextChainedPurchase().efficiency > gcEfficiency() || (Game.frenzy && Game.Has('Get lucky'))) {
        return maxLuckyValue() * 10;
      } else if (weightedCookieValue() > weightedCookieValue(true)) {
        return Math.min(maxLuckyValue() * 10, Math.max(0,(nextChainedPurchase().efficiency - (gcEfficiency() * baseCps())) / gcEfficiency()));
      } else {
       return 0;
      }
    */
}

function haveAll(holiday) {
    return _.every(holidayCookies[holiday], function (id) {
        return Game.UpgradesById[id].unlocked;
    });
}

function checkPrices(currentUpgrade) {
    var value = 0;
    if (FrozenCookies.caches.recommendationList.length > 0) {
        var nextRec = FrozenCookies.caches.recommendationList.filter(function (i) {
            return i.id != currentUpgrade.id;
        })[0];
        var nextPrereq = (nextRec.type == 'upgrade') ? unfinishedUpgradePrereqs(nextRec.purchase) : null;
        nextRec = (nextPrereq == null || nextPrereq.filter(function (u) {
            return u.cost != null;
        }).length == 0) ? nextRec : FrozenCookies.caches.recommendationList.filter(function (a) {
            return nextPrereq.some(function (b) {
                return b.id == a.id && b.type == a.type
            })
        })[0];
        value = nextRec.cost == null ? 0 : (nextRec.cost / totalDiscount(nextRec.type == 'building')) - nextRec.cost;
    }
    return value;
}
// Use this for changes to future efficiency calcs
function purchaseEfficiency(price, deltaCps, baseDeltaCps, currentCps) {
    var efficiency = Number.POSITIVE_INFINITY;
    if (deltaCps > 0) {
        efficiency = FrozenCookies.efficiencyWeight * divCps(price, currentCps) + divCps(price, deltaCps);
    }
    return efficiency;
}

function recommendationList(recalculate) {
    // console.time("recommendationList");
    if (recalculate) {
        FrozenCookies.showAchievements = false;
        FrozenCookies.caches.recommendationList = addScores(
            upgradeStats(recalculate)
                .concat(buildingStats(recalculate))
                .concat(santaStats())
                .sort(function (a, b) {
                    return a.efficiency != b.efficiency ? a.efficiency - b.efficiency : (a.delta_cps != b.delta_cps ? b.delta_cps - a.delta_cps : a.cost - b.cost);
                }));
        if (FrozenCookies.pastemode) {
            FrozenCookies.caches.recommendationList.reverse();
        }
        FrozenCookies.showAchievements = true;
    }
    // console.timeEnd("recommendationList");
    return FrozenCookies.caches.recommendationList;
}

function addScores(recommendations) {
    var filteredList = recommendations.filter(function (a) {
        return a.efficiency < Number.POSITIVE_INFINITY && a.efficiency > Number.NEGATIVE_INFINITY;
    })
    if (filteredList.length > 0) {
        var minValue = Math.log(recommendations[0].efficiency);
        var maxValue = Math.log(recommendations[filteredList.length - 1].efficiency);
        var spread = maxValue - minValue;
        recommendations.forEach(function (purchaseRec, index) {
            if (purchaseRec.efficiency < Number.POSITIVE_INFINITY && purchaseRec.efficiency > Number.NEGATIVE_INFINITY) {
                var purchaseValue = Math.log(purchaseRec.efficiency);
                var purchaseSpread = purchaseValue - minValue;
                recommendations[index].efficiencyScore = 1 - (purchaseSpread / spread);
            } else {
                recommendations[index].efficiencyScore = 0;
            }
        });
    } else {
        recommendations.forEach(function (purchaseRec, index) {
            recommendations[index].efficiencyScore = 0;
        });
    }
    return recommendations;
}

function nextPurchase(recalculate) {
    if (recalculate) {
        FrozenCookies.showAchievements = false;
        var recList = recommendationList(recalculate);
        var purchase = null;
        var target = null;
        for (var i = 0; i < recList.length; i++) {
            target = recList[i];
            if (target.type == 'upgrade' && unfinishedUpgradePrereqs(Game.UpgradesById[target.id])) {
                var prereqList = unfinishedUpgradePrereqs(Game.UpgradesById[target.id]);
                purchase = recList.filter(function (a) {
                    return prereqList.some(function (b) {
                        return b.id == a.id && b.type == a.type
                    })
                })[0];
            } else {
                purchase = target;
            }
            if (purchase) {
                FrozenCookies.caches.nextPurchase = purchase;
                FrozenCookies.caches.nextChainedPurchase = target;
                break;
            }
        }
        if (purchase == null) {
            FrozenCookies.caches.nextPurchase = defaultPurchase();
            FrozenCookies.caches.nextChainedPurchase = defaultPurchase();
        }
        FrozenCookies.showAchievements = true;
    }
    return FrozenCookies.caches.nextPurchase;
    //  return purchase;
}

function nextChainedPurchase(recalculate) {
    nextPurchase(recalculate);
    return FrozenCookies.caches.nextChainedPurchase;
}

function buildingStats(recalculate) {
    // console.time("buildingStats");
    if (recalculate) {
        if (blacklist[FrozenCookies.blacklist].buildings === true) {
            FrozenCookies.caches.buildings = [];
        } else {
            var buildingBlacklist = Array.from(blacklist[FrozenCookies.blacklist].buildings);
            //If autocasting Spontaneous Edifice, don't buy any Javascript console after 399
            if (M && FrozenCookies.autoSpell == 3 && Game.Objects['Javascript console'].amount >= 399) {
                buildingBlacklist.push(16);
            }
            //Stop buying wizard towers at max Mana if enabled
            if (M && FrozenCookies.towerLimit && M.magicM >= FrozenCookies.manaMax) {
                buildingBlacklist.push(7);
            }
            //Stop buying Cursors if at set limit
            if (FrozenCookies.cursorLimit && Game.Objects['Cursor'].amount >= FrozenCookies.cursorMax) {
                buildingBlacklist.push(0);
            }
            //Stop buying Farms if at set limit
            if (FrozenCookies.farmLimit && Game.Objects['Farm'].amount >= FrozenCookies.farmMax) {
                buildingBlacklist.push(2);
            }
            FrozenCookies.caches.buildings = Game.ObjectsById.map(function (current, index) {
                if (_.contains(buildingBlacklist, current.id)) {
                    return null;
                }
                var currentBank = bestBank(0).cost;
                var baseCpsOrig = baseCps();
                var cpsOrig = effectiveCps(Math.min(Game.cookies, currentBank)); // baseCpsOrig + gcPs(cookieValue(Math.min(Game.cookies, currentBank))) + baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
                var existingAchievements = Game.AchievementsById.map(function (item, i) {
                    return item.won
                });
                buildingToggle(current);
                var baseCpsNew = baseCps();
                var cpsNew = effectiveCps(currentBank); // baseCpsNew + gcPs(cookieValue(currentBank)) + baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
                buildingToggle(current, existingAchievements);
                var deltaCps = cpsNew - cpsOrig;
                var baseDeltaCps = baseCpsNew - baseCpsOrig;
                var efficiency = purchaseEfficiency(current.getPrice(), deltaCps, baseDeltaCps, cpsOrig)
                return {
                    'id': current.id,
                    'efficiency': efficiency,
                    'base_delta_cps': baseDeltaCps,
                    'delta_cps': deltaCps,
                    'cost': current.getPrice(),
                    'purchase': current,
                    'type': 'building'
                };
            }).filter(function (a) {
                return a;
            });
        }
    }
    // console.timeEnd("buildingStats");
    return FrozenCookies.caches.buildings;
}











// recommendationList gets called three times on initial load or after ascension, even when nothing's being clicked or purchased.
// what's calling it and why?
// is there a case to store it in a variable so that other things don't need to rerun the function


// If autobuy is off, and the infobox or menu aren't shown, why update?


    // the two longest are upgradeToggle and effectiveCps
    // and they're both called twice




function testUpgradeStats(count) {
    var bestBankV = 0;
    var unfinishedUpgradePrereqsV = 0;
    var isUnavailableV = 0;
    var upgradePrereqCostV = 0;
    var baseCpsV = 0;
    var effectiveCpsV = 0;
    var GameAchievementsByIdmapV = 0;
    var totalDiscountV = 0;
    var upgradeToggleV = 0;
    var baseCps2V = 0;
    var effectiveCps2V = 0;
    var totalDiscount2V = 0;
    var upgradeToggle2V = 0;
    var purchaseEfficiencyV = 0;
    var timer = 0;

    var upgradeBlacklist = blacklist[FrozenCookies.blacklist].upgrades;

    timer = performance.now();
    for (i = 0; i < count; i++) {
        var currentBank = bestBank(0).cost;
    }
    bestBankV += performance.now() - timer;

    FrozenCookies.caches.upgrades = Game.UpgradesById.map(function (current) {

        //everything seems to run, and then most run again as bought
        if (!current.bought) {
            // console.log(current.name);

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var needed = unfinishedUpgradePrereqs(current);
            }
            unfinishedUpgradePrereqsV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                if (isUnavailable(current, upgradeBlacklist)) {
                    isUnavailableV += performance.now() - timer;
                    return null;
                }
            }
            isUnavailableV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var cost = upgradePrereqCost(current);
            }
            upgradePrereqCostV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var baseCpsOrig = baseCps();
            }
            baseCpsV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var cpsOrig = effectiveCps(Math.min(Game.cookies, currentBank)); // baseCpsOrig + gcPs(cookieValue(Math.min(Game.cookies, currentBank))) + baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
            }
            effectiveCpsV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var existingAchievements = Game.AchievementsById.map(function (item) {
                    return item.won
                });
            }
            GameAchievementsByIdmapV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var discounts = totalDiscount() + totalDiscount(true);
            }
            totalDiscountV += performance.now() - timer;

            // this actually buys all the upgrades
            timer = performance.now();
            for (i = 0; i < count; i++) {
                var reverseFunctions = upgradeToggle(current);
            }
            upgradeToggleV += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var baseCpsNew = baseCps();
            }
            baseCps2V += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var cpsNew = effectiveCps(currentBank); // baseCpsNew + gcPs(cookieValue(currentBank)) + baseClickingCps(FrozenCookies.autoClick * FrozenCookies.cookieClickSpeed);
            }
            effectiveCps2V += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var priceReduction = discounts == (totalDiscount() + totalDiscount(true)) ? 0 : checkPrices(current);
            }
            totalDiscount2V += performance.now() - timer;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                upgradeToggle(current, existingAchievements, reverseFunctions);
            }
            upgradeToggle2V += performance.now() - timer;

            var deltaCps = cpsNew - cpsOrig;
            var baseDeltaCps = baseCpsNew - baseCpsOrig;

            timer = performance.now();
            for (i = 0; i < count; i++) {
                var efficiency = (current.season && current.season == seasons[FrozenCookies.defaultSeason]) ? cost / baseCpsOrig : (priceReduction > cost) ? 1 : purchaseEfficiency(cost, deltaCps, baseDeltaCps, cpsOrig);
            }
            purchaseEfficiencyV += performance.now() - timer;

        } else {
        console.log("     ******     " + current.pool + " upgrade: " + current.name + " bought")
        }
    });
    console.log("bestBankV: " + Math.round(bestBankV));
    console.log("unfinishedUpgradePrereqsV: " + Math.round(unfinishedUpgradePrereqsV));
    console.log("isUnavailableV: " + Math.round(isUnavailableV));
    console.log("upgradePrereqCostV: " + Math.round(upgradePrereqCostV));
    console.log("baseCpsV: " + Math.round(baseCpsV));
    console.log("effectiveCpsV: " + Math.round(effectiveCpsV));
    console.log("GameAchievementsByIdmapV: " + Math.round(GameAchievementsByIdmapV));
    console.log("totalDiscountV: " + Math.round(totalDiscountV));
    console.log("upgradeToggleV: " + Math.round(upgradeToggleV));
    console.log("baseCps2V: " + Math.round(baseCps2V));
    console.log("effectiveCps2V: " + Math.round(effectiveCps2V));
    console.log("totalDiscount2V: " + Math.round(totalDiscount2V));
    console.log("upgradeToggle2V: " + Math.round(upgradeToggle2V));
    console.log("purchaseEfficiencyV: " + Math.round(purchaseEfficiencyV));
    for (i in Game.Objects) {
        Game.Objects[i].sell(550);
    }
}











function upgradeStats(recalculate) {
    // var timer = {current: 0, times: {}};
    // console.time("upgradeStats");
    if (recalculate) {
        if (blacklist[FrozenCookies.blacklist].upgrades === true) {
            FrozenCookies.caches.upgrades = [];
        } else {
            var upgradeBlacklist = blacklist[FrozenCookies.blacklist].upgrades;
            FrozenCookies.caches.upgrades = Game.UpgradesById.map(function (current) {
                if (!current.bought) {
                    if (isUnavailable(current, upgradeBlacklist)) {
                        return null;
                    }
                    // var i=0; timer.current = performance.now();
                    var currentBank = bestBank(0).cost;
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var cost = upgradePrereqCost(current);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var baseCpsOrig = baseCps();
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var cpsOrig = effectiveCps(Math.min(Game.cookies, currentBank));
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var existingAchievements = Game.AchievementsById.map(function (item) {
                        return item.won
                    });
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var existingWrath = Game.elderWrath;
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var discounts = totalDiscount() + totalDiscount(true);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var reverseFunctions = upgradeToggle(current);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var baseCpsNew = baseCps();
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var cpsNew = effectiveCps(currentBank);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var priceReduction = discounts == (totalDiscount() + totalDiscount(true)) ? 0 : checkPrices(current);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    upgradeToggle(current, existingAchievements, reverseFunctions);
                    Game.elderWrath = existingWrath;
                    var deltaCps = cpsNew - cpsOrig;
                    var baseDeltaCps = baseCpsNew - baseCpsOrig;
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    var efficiency = (current.season && current.season == seasons[FrozenCookies.defaultSeason]) ? cost / baseCpsOrig : (priceReduction > cost) ? 1 : purchaseEfficiency(cost, deltaCps, baseDeltaCps, cpsOrig);
                    // if (!timer.times[String(i)]) {timer.times[String(i)] = 0}; timer.times[String(i)] += (performance.now() - timer.current); timer.current = performance.now(); i++;
                    return {
                        'id': current.id,
                        'efficiency': efficiency,
                        'base_delta_cps': baseDeltaCps,
                        'delta_cps': deltaCps,
                        'cost': cost,
                        'purchase': current,
                        'type': 'upgrade'
                    };
                }
            }).filter(function (a) {
                return a;
            });
        }
    }
    // console.timeEnd("upgradeStats");
    // console.log(timer.times);
    return FrozenCookies.caches.upgrades;
}

function isUnavailable(upgrade, upgradeBlacklist) {
    // should we even recommend upgrades at all?
    if (upgradeBlacklist === true) {
        return true;
    }

    // check if the upgrade is in the selected blacklist, or is an upgrade that shouldn't be recommended
    if (upgradeBlacklist.concat(recommendationBlacklist).includes(upgrade.id)) {
        return true;
    }

    var result = false;

    var needed = unfinishedUpgradePrereqs(upgrade);
    result = result || !upgrade.unlocked && !needed;
    result = result || (_.find(needed, function (a) {
        return a.type == "wrinklers"
    }) != null) && needed;
    result = result || (upgrade.season && (!haveAll(Game.season) || (upgrade.season != seasons[FrozenCookies.defaultSeason] && haveAll(upgrade.season))));

    return result;
}

function santaStats() {
    // console.time("santaStats");
    var ret = Game.Has('A festive hat') && (Game.santaLevel + 1 < Game.santaLevels.length) ? {
        id: 0,
        efficiency: Infinity,
        base_delta_cps: 0,
        delta_cps: 0,
        cost: cumulativeSantaCost(1),
        type: 'santa',
        purchase: {
            id: 0,
            name: 'Santa Stage Upgrade (' + Game.santaLevels[(Game.santaLevel + 1) % Game.santaLevels.length] + ')',
            buy: buySanta,
            getCost: function () {
                return cumulativeSantaCost(1);
            }
        }
    } : [];
    // console.timeEnd("santaStats");
    return ret;
}

function defaultPurchase() {
    return {
        id: 0,
        efficiency: Infinity,
        delta_cps: 0,
        base_delta_cps: 0,
        cost: Infinity,
        type: 'other',
        purchase: {
            id: 0,
            name: 'No valid purchases!',
            buy: function () { },
            getCost: function () {
                return Infinity;
            }
        }
    }
}

// doesn't match what the game uses. Probably should get rid of it and use the game's building-specific function since that's the only way to take into account building fortunes.
function totalDiscount(building) {
    var price = 1;
    if (building) {
        if (Game.Has('Season savings')) price *= 0.99;
        if (Game.Has('Santa\'s dominion')) price *= 0.99;
        if (Game.Has('Faberge egg')) price *= 0.99;
        if (Game.Has('Divine discount')) price *= 0.99;
        if (Game.Has('Fortune #100')) price*=0.99;
        // if (Game.hasAura('Fierce Hoarder')) price *= 0.98;
        price*=1-Game.auraMult('Fierce Hoarder')*0.02;
        if (Game.hasBuff('Everything must go')) price *= 0.95;
        if (Game.hasBuff('Crafty pixies')) price*=0.98;
		if (Game.hasBuff('Nasty goblins')) price*=1.02;
    } else {
        if (Game.Has('Toy workshop')) price *= 0.95;
        if (Game.Has('Five-finger discount')) price *= Math.pow(0.99, Game.Objects['Cursor'].amount / 100);
        if (Game.Has('Santa\'s dominion')) price *= 0.98;
        if (Game.Has('Faberge egg')) price *= 0.99;
        if (Game.Has('Divine sales')) price *= 0.99;
        if (Game.hasAura('Master of the Armory')) price *= 0.98;
    }
    return price;
}

// this function is inaccurate and can only be assumed to be an approximation. Probably should get rid of it and use the game's building-specific function since that's the only way to take into account building fortunes and free buildings.
function cumulativeBuildingCost(basePrice, startingNumber, endingNumber) {
    return basePrice * totalDiscount(true) * (Math.pow(Game.priceIncrease, endingNumber) - Math.pow(Game.priceIncrease, startingNumber)) / (Game.priceIncrease - 1);
}

function newCumulativeBuildingCost(building, startingNumber, endingNumber) {    // return how much it would cost to buy some/more of this building
    var price = 0;
    for (var i = Math.max(0, startingNumber - building.free); i < Math.max(0, endingNumber - building.free); i++) {
        price += building.basePrice * Math.pow(Game.priceIncrease, Math.max(0, i));
    }
    price = Game.modifyBuildingPrice(building, price);
    return Math.ceil(price);
}

function cumulativeSantaCost(amount) {
    var total = 0;
    if (!amount) {

    } else if (Game.santaLevel + amount < Game.santaLevels.length) {
        for (var i = Game.santaLevel + 1; i <= Game.santaLevel + amount; i++) {
            total += Math.pow(i, i);
        }
    } else if (amount < Game.santaLevels.length) {
        for (var i = Game.santaLevel + 1; i <= amount; i++) {
            total += Math.pow(i, i);
        }
    } else {
        total = Infinity;
    }
    return total;
}

function upgradePrereqCost(upgrade, full) {
    var cost = upgrade.getPrice();
    if (upgrade.unlocked) {
        return cost;
    }
    var prereqs = upgradeJson[upgrade.id];
    if (prereqs) {
        cost += prereqs.buildings.reduce(function (sum, item, index) {
            var building = Game.ObjectsById[index];
            if (item && full) {
                sum += cumulativeBuildingCost(building.basePrice, 0, item);
            } else if (item && building.amount < item) {
                sum += cumulativeBuildingCost(building.basePrice, building.amount, item);
            }
            return sum;
        }, 0);
        cost += prereqs.upgrades.reduce(function (sum, item) {
            var reqUpgrade = Game.UpgradesById[item];
            if (!upgrade.bought || full) {
                sum += upgradePrereqCost(reqUpgrade, full);
            }
            return sum;
        }, 0);
        cost += cumulativeSantaCost(prereqs.santa);
    }
    return cost;
}

function unfinishedUpgradePrereqs(upgrade) {
    if (upgrade.unlocked) {
        return null;
    }
    var needed = [];
    var prereqs = upgradeJson[upgrade.id];
    if (prereqs) {
        prereqs.buildings.forEach(function (a, b) {
            if (a && Game.ObjectsById[b].amount < a) {
                needed.push({
                    'type': 'building',
                    'id': b
                });
            }
        });
        prereqs.upgrades.forEach(function (a) {
            if (!Game.UpgradesById[a].bought) {
                var recursiveUpgrade = Game.UpgradesById[a];
                var recursivePrereqs = unfinishedUpgradePrereqs(recursiveUpgrade);
                if (recursiveUpgrade.unlocked) {
                    needed.push({
                        'type': 'upgrade',
                        'id': a
                    });
                } else if (!recursivePrereqs) {
                    // Research is being done.
                } else {
                    recursivePrereqs.forEach(function (a) {
                        if (!needed.some(function (b) {
                            return b.id == a.id && b.type == a.type;
                        })) {
                            needed.push(a);
                        }
                    });
                }
            }
        });
        if (prereqs.santa) {
            needed.push({
                type: 'santa',
                id: 0
            });
        }
        if (prereqs.wrinklers && Game.elderWrath == 0) {
            needed.push({
                type: 'wrinklers',
                id: 0
            });
        }
    }
    return needed.length ? needed : null;
}

function upgradeToggle(upgrade, achievements, reverseFunctions) {
    if (!achievements) {
        reverseFunctions = {};
        if (!upgrade.unlocked) {
            var prereqs = upgradeJson[upgrade.id];
            if (prereqs) {
                reverseFunctions.prereqBuildings = [];
                prereqs.buildings.forEach(function (a, b) {
                    var building = Game.ObjectsById[b];
                    if (a && building.amount < a) {
                        var difference = a - building.amount;
                        reverseFunctions.prereqBuildings.push({
                            id: b,
                            amount: difference
                        });
                        building.amount += difference;
                        building.bought += difference;
                        Game.BuildingsOwned += difference;
                    }
                });
                reverseFunctions.prereqUpgrades = [];
                if (prereqs.upgrades.length > 0) {
                    prereqs.upgrades.forEach(function (id) {
                        var upgrade = Game.UpgradesById[id];
                        if (!upgrade.bought) {
                            reverseFunctions.prereqUpgrades.push({
                                id: id,
                                reverseFunctions: upgradeToggle(upgrade)
                            });
                        }
                    });
                }
            }
        }
        upgrade.bought = 1;
        Game.UpgradesOwned += 1;
        reverseFunctions.current = buyFunctionToggle(upgrade);
    } else {
        if (reverseFunctions.prereqBuildings) {
            reverseFunctions.prereqBuildings.forEach(function (b) {
                var building = Game.ObjectsById[b.id];
                building.amount -= b.amount;
                building.bought -= b.amount;
                Game.BuildingsOwned -= b.amount;
            });
        }
        if (reverseFunctions.prereqUpgrades) {
            reverseFunctions.prereqUpgrades.forEach(function (u) {
                var upgrade = Game.UpgradesById[u.id];
                upgradeToggle(upgrade, [], u.reverseFunctions);
            });
        }
        upgrade.bought = 0;
        Game.UpgradesOwned -= 1;
        buyFunctionToggle(reverseFunctions.current);
        Game.AchievementsOwned = 0;
        achievements.forEach(function (won, index) {
            var achievement = Game.AchievementsById[index];
            achievement.won = won;
            if (won && achievement.pool != 'shadow') {
                Game.AchievementsOwned += 1;
            }
        });
    }
    Game.recalculateGains = 1;
    Game.CalculateGains();
    return reverseFunctions;
}

function buildingToggle(building, achievements) {
    if (!achievements) {
        building.amount += 1;
        building.bought += 1;
        Game.BuildingsOwned += 1;
    } else {
        building.amount -= 1;
        building.bought -= 1;
        Game.BuildingsOwned -= 1;
        Game.AchievementsOwned = 0;
        achievements.forEach(function (won, index) {
            var achievement = Game.AchievementsById[index];
            achievement.won = won;
            if (won && achievement.pool != 'shadow') {
                Game.AchievementsOwned += 1;
            }
        });
    }
    Game.recalculateGains = 1;
    Game.CalculateGains();
}

function buyFunctionToggle(upgrade) {
    if (upgrade && upgrade.id == 452) return null;
    if (upgrade && !upgrade.length) {
        if (!upgrade.buyFunction) {
            return null;
        }

        var ignoreFunctions = [
            /Game\.Earn\('.*\)/,
            /Game\.Lock\('.*'\)/,
            /Game\.Unlock\(.*\)/,
            /Game\.Objects\['.*'\]\.drawFunction\(\)/,
            /Game\.Objects\['.*'\]\.redraw\(\)/,
            /Game\.SetResearch\('.*'\)/,
            /Game\.Upgrades\['.*'\]\.basePrice=.*/,
            /Game\.CollectWrinklers\(\)/,
            /Game\.RefreshBuildings\(\)/,
            /Game\.storeToRefresh=1/,
            /Game\.upgradesToRebuild=1/,
            /Game\.Popup\(.*\)/,
            /Game\.Notify\(.*\)/,
            /var\s+.+\s*=.+/,
            /Game\.computeSeasonPrices\(\)/,
            /Game\.seasonPopup\.reset\(\)/,
            /\S/
        ];
        var buyFunctions = upgrade.buyFunction.toString()
            .replace(/[\n\r\s]+/g, ' ')
            .replace(/function\s*\(\)\s*{(.+)\s*}/, "$1")
            .replace(/for\s*\(.+\)\s*\{.+\}/, '')
            .replace(/if\s*\(this\.season\)\s*Game\.season=this\.season\;/, ('Game.season="' + upgrade.season + '";'))
            .replace(/if\s*\(.+\)\s*[^{}]*?\;/, '')
            .replace(/if\s*\(.+\)\s*\{.+\}/, '')
            .replace(/else\s+\(.+\)\s*\;/, '')
            .replace('++', '+=1')
            .replace('--', '-=1')
            .split(';')
            .map(function (a) {
                return a.trim();
            })
            .filter(function (a) {
                ignoreFunctions.forEach(function (b) {
                    a = a.replace(b, '')
                });
                return a != '';
            });

        if (buyFunctions.length == 0) {
            return null;
        }

        var reversedFunctions = buyFunctions.map(function (a) {
            var reversed = '';
            var achievementMatch = /Game\.Win\('(.*)'\)/.exec(a);
            if (a.indexOf('+=') > -1) {
                reversed = a.replace('+=', '-=');
            } else if (a.indexOf('-=') > -1) {
                reversed = a.replace('-=', '+=');
            } else if (achievementMatch && Game.Achievements[achievementMatch[1]].won == 0) {
                reversed = 'Game.Achievements[\'' + achievementMatch[1] + '\'].won=0';
            } else if (a.indexOf('=') > -1) {
                var expression = a.split('=');
                var expressionResult = eval(expression[0]);
                var isString = _.isString(expressionResult);
                reversed = expression[0] + '=' + (isString ? "'" : '') + expressionResult + (isString ? "'" : '');
            }
            return reversed;
        });
        buyFunctions.forEach(function (f) {
            eval(f);
        });
        return reversedFunctions;
    } else if (upgrade && upgrade.length) {
        upgrade.forEach(function (f) {
            eval(f);
        });
    }
    return null;
}

function buySanta() {
    Game.specialTab = 'santa';
    Game.UpgradeSanta();
    if (Game.santaLevel + 1 >= Game.santaLevels.length) {
        Game.ToggleSpecialMenu();
    }
}

function statSpeed() {
    var speed = 0;
    switch (FrozenCookies.trackStats) {
        case 1: // 60s
            speed = 1000 * 60;
            break;
        case 2: // 30m
            speed = 1000 * 60 * 30;
            break;
        case 3: // 1h
            speed = 1000 * 60 * 60;
            break;
        case 4: // 24h
            speed = 1000 * 60 * 60 * 24;
            break;
    }
    return speed;
}

function saveStats(fromGraph) {
    FrozenCookies.trackedStats.push({
        time: Date.now() - Game.startDate,
        baseCps: baseCps(),
        effectiveCps: effectiveCps(),
        hc: Game.HowMuchPrestige(Game.cookiesEarned + Game.cookiesReset + wrinklerValue())
    });
    if ($('#statGraphContainer').length > 0 && !$('#statGraphContainer').is(':hidden') && !fromGraph) {
        viewStatGraphs();
    }
}

function viewStatGraphs() {
    saveStats(true);
    var containerDiv = $('#statGraphContainer').length ?
        $('#statGraphContainer') :
        $('<div>').attr('id', 'statGraphContainer')
            .html($('<div>')
                .attr('id', 'statGraphs'))
            .appendTo('body')
            .dialog({
                modal: true,
                title: 'Frozen Cookies Tracked Stats',
                width: $(window).width() * 0.8,
                height: $(window).height() * 0.8
            });
    if (containerDiv.is(':hidden')) {
        containerDiv.dialog();
    }
    if (FrozenCookies.trackedStats.length > 0 && (Date.now() - FrozenCookies.lastGraphDraw) > 1000) {
        FrozenCookies.lastGraphDraw = Date.now();
        $('#statGraphs').empty();
        var graphs = $.jqplot('statGraphs', transpose(FrozenCookies.trackedStats.map(function (s) {
            return [
                [s.time / 1000, s.baseCps],
                [s.time / 1000, s.effectiveCps],
                [s.time / 1000, s.hc]
            ]
        })), //
            {
                legend: {
                    show: true
                },
                height: containerDiv.height() - 50,
                axes: {
                    xaxis: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            angle: -30,
                            fontSize: '10pt',
                            showGridline: false,
                            formatter: function (ah, ai) {
                                return timeDisplay(ai);
                            }
                        }
                    },
                    yaxis: {
                        padMin: 0,
                        renderer: $.jqplot.LogAxisRenderer,
                        tickDistribution: 'even',
                        tickOptions: {
                            formatter: function (ah, ai) {
                                return Beautify(ai);
                            }
                        }
                    },
                    y2axis: {
                        padMin: 0,
                        tickOptions: {
                            showGridline: false,
                            formatter: function (ah, ai) {
                                return Beautify(ai);
                            }
                        }
                    }
                },
                highlighter: {
                    show: true,
                    sizeAdjust: 15
                },
                series: [{
                    label: 'Base CPS'
                }, {
                    label: 'Effective CPS'
                }, {
                    label: 'Earned HC',
                    yaxis: 'y2axis'
                }]
            });
    }
}

function updateCaches() {
    var recommendation, currentBank, targetBank, currentCookieCPS, currentUpgradeCount;
    var recalcCount = 0;
    do {
        recommendation = nextPurchase(FrozenCookies.recalculateCaches);
        FrozenCookies.recalculateCaches = false;
        currentBank = bestBank(0);
        targetBank = bestBank(recommendation.efficiency);
        currentCookieCPS = gcPs(cookieValue(currentBank.cost));
        currentUpgradeCount = Game.UpgradesInStore.length;
        FrozenCookies.safeGainsCalc();

        if (FrozenCookies.lastCPS != FrozenCookies.calculatedCps) {
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.lastCPS = FrozenCookies.calculatedCps;
        }

        if (FrozenCookies.currentBank.cost != currentBank.cost) {
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.currentBank = currentBank;
        }

        if (FrozenCookies.targetBank.cost != targetBank.cost) {
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.targetBank = targetBank;
        }

        if (FrozenCookies.lastCookieCPS != currentCookieCPS) {
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.lastCookieCPS = currentCookieCPS;
        }

        if (FrozenCookies.lastUpgradeCount != currentUpgradeCount) {
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.lastUpgradeCount = currentUpgradeCount;
        }
        recalcCount += 1;
    } while (FrozenCookies.recalculateCaches && recalcCount < 10);
}

function doTimeTravel() {
    //  'Time Travel DISABLED','Purchases by Estimated Effective CPS','Purchases by Simulated Real Time','Heavenly Chips by Estimated Effective CPS','Heavenly Chips by Simulated Real Time'
    if (FrozenCookies.timeTravelMethod) {
        // Estimated Effective CPS
        if (timeTravelMethod % 2 === 1) {
            var fullCps = effectiveCps();
            if (fullCps) {
                var neededCookies = 0;
                if (timeTravelMethod === 1) {

                } else if (timeTravelMethod === 3) {

                }
            }
        } else {

        }
    } else {
        FrozenCookies.timeTravelAmount = 0;
    }
    /*
      var fullCps = effectiveCps();
      if (fullCps > 0) {
        var neededCookies = Math.max(0, recommendation.cost + delayAmount() - Game.cookies);
        var time = neededCookies / fullCps;
        Game.Earn(neededCookies);
        Game.startDate -= time * 1000;
        Game.fullDate -= time * 1000;
        FrozenCookies.timeTravelPurchases -= 1;
        logEvent('Time travel', 'Travelled ' + timeDisplay(time) + ' into the future.');
      }
    */
}
//Why the hell is fcWin being called so often? It seems to be getting called repeatedly on the CPS achievements, 
//which should only happen when you actually win them?
function fcWin(what) {
    if (typeof what === 'string') {
        if (Game.Achievements[what]) {
            if (Game.Achievements[what].won == 0) {
                var achname = Game.Achievements[what].shortName ? Game.Achievements[what].shortName : Game.Achievements[what].name;
                Game.Achievements[what].won = 1;
                //This happens a ton of times on CPS achievements; it seems like they would be CHECKED for, but a degbug message placed
                //here gets repeatedly called seeming to indicate that the achievements.won value is 1, even though the achievement isn't
                //being unlocked. This also means that placing a function to log the achievement spams out messages. Are the Achievement.won
                //values being turned off before the game checks again? There must be some reason Game.Win is replaced with fcWin
                if (!FrozenCookies.disabledPopups) {
                    logEvent('Achievement', 'Achievement unlocked :<br>' + Game.Achievements[what].name + '<br> ', true);
                }
                if (FrozenCookies.showAchievements) {
                    Game.Notify('Achievement unlocked', '<div class="title" style="font-size:18px;margin-top:-2px;">' + achname + '</div>', Game.Achievements[what].icon);
                }
                if (Game.Achievements[what].pool != 'shadow') {
                    Game.AchievementsOwned++;
                }
                Game.recalculateGains = 1;
            }
        }
    } else {
        logEvent('fcWin Else condition');
        for (var i in what) {
            Game.Win(what[i]);
        }
    }
}

function logEvent(event, text, popup) {
    var time = '[' + timeDisplay((Date.now() - Game.startDate) / 1000) + ']';
    var output = time + ' ' + event + ': ' + text;
    if (FrozenCookies.logging) {
        console.log(output);
    }
    if (popup) {
        Game.Popup(text);
    }
}

function inRect(x, y, rect) {
    // Duplicate of internally defined method,
    // only needed because I'm modifying the scope of Game.UpdateWrinklers and it can't see this anymore.
    var dx = x + Math.sin(-rect.r) * (-(rect.h / 2 - rect.o)),
        dy = y + Math.cos(-rect.r) * (-(rect.h / 2 - rect.o));
    var h1 = Math.sqrt(dx * dx + dy * dy);
    var currA = Math.atan2(dy, dx);
    var newA = currA - rect.r;
    var x2 = Math.cos(newA) * h1;
    var y2 = Math.sin(newA) * h1;
    return (x2 > -0.5 * rect.w && x2 < 0.5 * rect.w && y2 > -0.5 * rect.h && y2 < 0.5 * rect.h);
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}

function smartTrackingStats(delay) {
    saveStats();
    if (FrozenCookies.trackStats == 6) {
        delay /= (FrozenCookies.delayPurchaseCount == 0) ? (1 / 1.5) : (delay > FrozenCookies.minDelay ? 2 : 1);
        FrozenCookies.smartTrackingBot = setTimeout(function () {
            smartTrackingStats(delay);
        }, delay);
        FrozenCookies.delayPurchaseCount = 0;
    }
}

function shouldClickGC() {
    if (Game.shimmers.length > 0) {
        for (var i in Game.shimmers) {
            if (Game.shimmers[i].type == 'golden') {
                return Game.shimmers[i].life > 0 && FrozenCookies.autoGC && !suppressNextGC;
            }
        }
    } else if (suppressNextGC == true) {
        suppressNextGC = false;
    }
}

function liveWrinklers() {
    return _.select(Game.wrinklers, function (w) {
        return w.sucked > 0.5 && w.phase > 0
    }).sort(function (w1, w2) {
        return w1.sucked < w2.sucked
    });
}

function wrinklerMod(num) {
    return 1.1 * num * num * 0.05 * (Game.Has('Wrinklerspawn') ? 1.05 : 1) + (1 - 0.05 * num);
}

function popValue(w) {
    var toSuck = 1.1;
    if (Game.Has('Sacrilegious corruption')) toSuck *= 1.05;
    if (w.type == 1) toSuck *= 3;//shiny wrinklers are an elusive, profitable breed
    var sucked = w.sucked * toSuck;//cookie dough does weird things inside wrinkler digestive tracts
    if (Game.Has('Wrinklerspawn')) sucked *= 1.05;
    return sucked;
}

function shouldPopWrinklers() {
    var toPop = [];
    var living = liveWrinklers();
    if (living.length > 0) {
        if ((Game.season == 'halloween' || Game.season == 'easter') && !haveAll(Game.season)) {
            toPop = living.map(function (w) {
                return w.id
            });
        } else {
            var delay = delayAmount();
            var wrinklerList = (FrozenCookies.shinyPop == 0) ? Game.wrinklers.filter(v >= v.type == 0) : Game.wrinklers;
            var nextRecNeeded = nextPurchase().cost + delay - Game.cookies;
            var nextRecCps = nextPurchase().delta_cps;
            var wrinklersNeeded = wrinklerList.sort(function (w1, w2) {
                return w1.sucked < w2.sucked
            }).reduce(function (current, w) {
                var futureWrinklers = living.length - (current.ids.length + 1);
                if (current.total < nextRecNeeded && effectiveCps(delay, Game.elderWrath, futureWrinklers) + nextRecCps > effectiveCps()) {
                    current.ids.push(w.id);
                    current.total += popValue(w);
                }
                return current;
            }, {
                total: 0,
                ids: []
            });
            toPop = (wrinklersNeeded.total > nextRecNeeded) ? wrinklersNeeded.ids : toPop;
        }
    }
    return toPop;
}

function autoFrenzyClick() {
    if (hasClickBuff() && !FrozenCookies.autoFrenzyBot) {
        if (FrozenCookies.autoclickBot) {
            clearInterval(FrozenCookies.autoclickBot);
            FrozenCookies.autoclickBot = 0;
        }
        FrozenCookies.autoFrenzyBot = setInterval(fcClickCookie, 1000 / FrozenCookies.frenzyClickSpeed);
    } else if (!hasClickBuff() && FrozenCookies.autoFrenzyBot) {
        clearInterval(FrozenCookies.autoFrenzyBot);
        FrozenCookies.autoFrenzyBot = 0;
        if (FrozenCookies.autoClick && FrozenCookies.cookieClickSpeed) {
            FrozenCookies.autoclickBot = setInterval(fcClickCookie, 1000 / FrozenCookies.cookieClickSpeed);
        }
    }
}

function autoGSBuy() {
    if (hasClickBuff()) {
        if (Game.Upgrades["Golden switch [off]"].unlocked && !Game.Upgrades["Golden switch [off]"].bought) {
            if (Game.Upgrades["Golden switch [off]"].buy()) {
                logEvent("AutoGS", "Turning Golden Switch on");
            }
        }
    } else if (cpsBonus() <= 1) {
        if (Game.Upgrades["Golden switch [on]"].unlocked && !Game.Upgrades["Golden switch [on]"].bought) {
            Game.CalculateGains();  // Ensure price is updated since Frenzy ended
            if (Game.Upgrades["Golden switch [on]"].buy()) {
                logEvent("AutoGS", "Turning Golden Switch back off");
            }
        }
    }
}

function safeBuy(bldg, count) {
    // If store is in Sell mode, Game.Objects[].buy will sell the building!
    if (Game.buyMode === -1) {
        document.getElementById('storeBulkBuy').click();
        bldg.buy(count);
        document.getElementById('storeBulkSell').click();
    } else {
        bldg.buy(count);
    }
}

var previousClickCount = Game.cookieClicks;
var previousClickTime = Date.now();
var measuredClicksPS = 0;
var timerRunning = null;

function measureClicks() {
    if (previousClickCount < Game.cookieClicks) {
        measuredClicksPS = (Game.cookieClicks - previousClickCount) / (Date.now() - previousClickTime) * 1000;
        previousClickCount = Game.cookieClicks;
        previousClickTime = Date.now();
        return measuredClicksPS;
    } else {
        previousClickCount = Game.cookieClicks;
        previousClickTime = Date.now();
        return 0;
    }
}



//does having godz running so much prevent clickbuffs?
// to pr, fix cumulativeBuildingCost, change preferences, and fix preferences around building limits


// work on iteration to make it a normal thing




function autoGodzamokAction() {
    if (!T || !FrozenCookies.autoGodzamok || !Game.hasGod("ruin")) {
        return; // Just leave if Pantheon isn't here yet, or autoGodzamok isn't turned on, or you don't worship Godzamok
    }

    if (timerRunning) {
        // clearTimeout(timerRunning);
        // measureDevastation(lastCookies);
        return; // just go
    }

    if ((!Game.hasBuff("Devastation"))) { // && hasClickBuff()) {
        if (Date.now() - previousClickTime > 30000) {
            measureClicks();
        }

        Game.CalculateGains();                      // make sure we have the most up to date
        Game.Objects.Farm.minigame.computeEffs()    // numbers to do the calculations
        var clickBuffTime = 10;     // default length of Devastation buff
        var clickCps = Game.computedMouseCps * Math.min(measuredClicksPS, FrozenCookies.cookieClickSpeed);
        var actualCps = Game.cookiesPs + clickCps;
        var godzamokMultiplier = 2 / Math.pow(2, Game.hasGod("ruin")) / 100;
        var totalSold = 0;
        var startCookies = Game.cookies;
                        // var startClicks = Game.cookieClicks;
                        // console.log("Start cookies: " +startCookies+ " / "+ Game.cookies);

        // see how long the shortest buff will last
        for (var i in Game.buffs) {
            if ((Game.buffs[i].time / Game.fps) < clickBuffTime) {
                clickBuffTime = (Game.buffs[i].time / Game.fps)
            }
        }

        // calculate which buildings provide a big enough payback to be sold
        for (var i in Game.Objects) {
            if (i === "Cursor") {
                if (i != "Wizard tower" || (!FrozenCookies.towerLimit && !FrozenCookies.autoSpell)) {  // leave Wizard tower out if you've set the mana-related limit or autoCast, since selling messes with mana
                    var toRemain = Game.Objects[i].minigameLoaded   // leave one of each building to avoid messing with minigames
                    var sellCount = Game.Objects[i].amount - toRemain;
                    var cpsModifier = 1 + (sellCount * godzamokMultiplier);
                    var deltaCps = clickCps * cpsModifier - clickCps;
                    var cost = newCumulativeBuildingCost(Game.Objects[i], toRemain, Game.Objects[i].amount);
                    // cost -= (cost * Game.Objects[i].getSellMultiplier()); // calculate a net cost by subtracting sales gains
                    cost -= (Game.Objects[i].getReverseSumPrice(sellCount)); // calculate a net cost by subtracting sales gains

                    if ((cost < (deltaCps * clickBuffTime) * .5) && (sellCount >= 10)) {   // cost/cookies comparison includes a buffer to make sure that it's really obviously better
                        if (cost < Game.cookies) {  // check against remaining bank to ensure you don't get stuck buying fewer buildings than expected
                            // sell the buildings
                            logEvent("AutoGodzamok", "deltaCps: " + deltaCps + ", clickBuffTime: " + clickBuffTime + ", clickCps: " + clickCps + ", measuredClicksPS: " + measuredClicksPS);
                            logEvent("AutoGodzamok", "Selling " + sellCount + " " + Game.Objects[i].plural + " will get "
                                + Beautify((deltaCps * clickBuffTime)) + " more cookies and cost "
                                + Beautify(cost) + " cookies (net) to rebuild.");
                            var cookiesBefore = Game.cookies;
                            Game.Objects[i].sell(sellCount);
                            totalSold += sellCount;
                            logEvent("AutoGodzamok", "Sold " + sellCount + " " + Game.Objects[i].plural);

                            // do some goofy looping
                            var mult = Math.min(Math.ceil((deltaCps * clickBuffTime) / cost), 500);
                            multSellCount = Math.ceil(sellCount / 10);
                            if (cost * mult < Game.cookies) {
                                for (ii = 0; ii < mult; ii++) {
                                    if (Game.Objects[i].amount < 10) {
                                        safeBuy(Game.Objects[i], multSellCount);
                                        // logEvent("AutoGodzamok", ii + " of " + mult + " - Went crazy with garbage. Bought " + ((Game.Objects[i].amount) - toRemain) + " " + Game.Objects[i].plural);
                                    }
                                    if (Game.Objects[i].amount >= 10) {
                                        Game.Objects[i].sell(multSellCount);
                                        totalSold += multSellCount;
                                        // logEvent("AutoGodzamok", ii + " of " + mult + " - Went nuts. Sold " + multSellCount + " " + Game.Objects[i].plural);
                                    }
                                }
                                logEvent("AutoGodzamok", "Oscillated buying and selling " + multSellCount + " " + Game.Objects[i].plural + " " + mult + " times.");
                            }

                            // buy everything back
                            if (Game.Objects[i].amount < 10) {
                                safeBuy(Game.Objects[i], sellCount);
                                logEvent("AutoGodzamok", "Bought " + ((Game.Objects[i].amount) - toRemain) + " " + Game.Objects[i].plural);
                            }
                            logEvent("AutoGodzamok", "Cookies spent on " + Game.Objects[i].plural + ": " + Beautify(cookiesBefore - Game.cookies) + ". New cookie amount: " + (Game.cookies));
                        } else logEvent("AutoGodzamok", Game.Objects[i].plural + " would qualify, but there's not enough cookies in bank to rebuy them.");
                    }
                }
            }
        }

        // console.log("Current cookies: " + Game.cookies);
        if (startCookies != Game.cookies) { // something must have been sold/bought
            // console.log("not equal");
            // console.log("Current cookies: " + Game.cookies);
            logEvent("AutoGodzamok", "Total spent on this ridiculousness: " + Beautify(startCookies - Game.cookies));
            logEvent("AutoGodzamok", "Expected production without Devastation: " + Beautify(actualCps * clickBuffTime));
            logEvent("AutoGodzamok", "Devastation buff total of +" + (totalSold) + " percent");
            // lastCookies = Game.cookies;
            // console.log("Clicks: " + (Game.cookieClicks - previousClickCount));
            // previousClickCount = Game.cookieClicks;
            // previousClickTime = Date.now();
            timerRunning = setTimeout(measureDevastation,clickBuffTime*999,Game.cookies);
        }
    }
}



function measureDevastation(lastCookies) {
    logEvent("AutoGodzamok", "*** Cookies increased by: " + Beautify(Game.cookies - lastCookies) + " cookies ***");
    logEvent("AutoGodzamok", "Measured clicks per second: " + measureClicks());
    lastCookies.Cookies = Game.cookies;
    timerRunning = null;
}

function goldenCookieLife() {
    for (var i in Game.shimmers) {
        if (Game.shimmers[i].type == 'golden') {
            return Game.shimmers[i].life
        }
    }
    return null;
}

function reindeerLife() {
    for (var i in Game.shimmers) {
        if (Game.shimmers[i].type == 'reindeer') {
            return Game.shimmers[i].life
        }
    }
    return null;
}

function fcClickCookie() {
    if (!Game.OnAscend && !Game.AscendTimer && !Game.specialTabHovered) {
        Game.ClickCookie();
    }
}

function autoCookie() {
    //console.log('autocookie called');
    if (!FrozenCookies.processing && !Game.OnAscend && !Game.AscendTimer) {
        FrozenCookies.processing = true;
        var currentHCAmount = Game.HowMuchPrestige(Game.cookiesEarned + Game.cookiesReset + wrinklerValue());

        if (Math.floor(FrozenCookies.lastHCAmount) < Math.floor(currentHCAmount)) {
            var changeAmount = currentHCAmount - FrozenCookies.lastHCAmount;
            FrozenCookies.lastHCAmount = currentHCAmount;
            FrozenCookies.prevLastHCTime = FrozenCookies.lastHCTime;
            FrozenCookies.lastHCTime = Date.now();
            var currHCPercent = (60 * 60 * (FrozenCookies.lastHCAmount - Game.heavenlyChips) / ((FrozenCookies.lastHCTime - Game.startDate) / 1000));
            if ((Game.heavenlyChips < (currentHCAmount - changeAmount)) && currHCPercent > FrozenCookies.maxHCPercent) {
                FrozenCookies.maxHCPercent = currHCPercent;
            }
            FrozenCookies.hc_gain += changeAmount;
        }
        updateCaches();
        var recommendation = nextPurchase();
        var delay = delayAmount();
        if (FrozenCookies.timeTravelAmount) {
            doTimeTravel();
        }
        if (FrozenCookies.autoSL) {
            var started = Game.lumpT;
            var ripeAge = Game.lumpRipeAge;
            if ((Date.now() - started) >= ripeAge) {
                Game.clickLump();
            }
        }
        if (FrozenCookies.autoSL == 2) autoRigidel();
        if (FrozenCookies.autoWrinkler == 1) {
            var popCount = 0;
            var popList = shouldPopWrinklers();
            _.filter(Game.wrinklers, function (w) {
                return _.contains(popList, w.id)
            }).forEach(function (w) {
                w.hp = 0;
                popCount += 1;
            });
            if (popCount > 0) {
                logEvent('Wrinkler', 'Popped ' + popCount + ' wrinklers.');
            }
        }
        if (FrozenCookies.autoWrinkler == 2) {
            var popCount = 0;
            var popList = Game.wrinklers;
            popList.forEach(function (w) {
                if (w.close == true) {
                    w.hp = 0;
                    popCount += 1;
                }
            });
            if (popCount > 0) {
                logEvent('Wrinkler', 'Popped ' + popCount + ' wrinklers.');
            }
        }

        var itemBought = false;

        //var seConditions = (Game.cookies >= delay + recommendation.cost) || (!(FrozenCookies.autoSpell == 3) && !(FrozenCookies.holdSEBank))); //true == good on SE bank or don't care about it
        if (FrozenCookies.autoBuy && ((Game.cookies >= delay + recommendation.cost) || recommendation.purchase.name == "Elder Pledge") && (FrozenCookies.pastemode || isFinite(nextChainedPurchase().efficiency))) {
            //    if (FrozenCookies.autoBuy && (Game.cookies >= delay + recommendation.cost)) {
            //console.log('something should get bought');
            recommendation.time = Date.now() - Game.startDate;
            //      full_history.push(recommendation);  // Probably leaky, maybe laggy?
            recommendation.purchase.clickFunction = null;
            disabledPopups = false;
            //      console.log(purchase.name + ': ' + Beautify(recommendation.efficiency) + ',' + Beautify(recommendation.delta_cps));
            if (recommendation.type == 'building') { safeBuy(recommendation.purchase); } else { recommendation.purchase.buy(); }
            FrozenCookies.autobuyCount += 1;
            if (FrozenCookies.trackStats == 5 && recommendation.type == 'upgrade') {
                saveStats();
            } else if (FrozenCookies.trackStats == 6) {
                FrozenCookies.delayPurchaseCount += 1;
            }
            logEvent('Store', 'Autobought ' + recommendation.purchase.name + ' for ' + Beautify(recommendation.cost) + ', resulting in ' + Beautify(recommendation.delta_cps) + ' CPS.');
            disabledPopups = true;
            if (FrozenCookies.autobuyCount >= 10) {
                Game.Draw();
                FrozenCookies.autobuyCount = 0;
            }
            FrozenCookies.recalculateCaches = true;
            FrozenCookies.processing = false;
            itemBought = true;
        }

        if (FrozenCookies.autoAscend && !Game.OnAscend && !Game.AscendTimer) {
            var currPrestige = Game.prestige;
            var resetPrestige = Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned + wrinklerValue() + chocolateValue());
            var ascendChips = FrozenCookies.HCAscendAmount;
            if ((resetPrestige - currPrestige) >= ascendChips && ascendChips > 0) {
                Game.ClosePrompt();
                Game.Ascend(1);
                setTimeout(function () {
                    Game.ClosePrompt();
                    Game.Reincarnate(1);
                }, 10000);
            }
        }

        var fps_amounts = ['15', '24', '30', '48', '60', '72', '88', '100', '120', '144', '200', '240', '300', '5', '10'];
        if (parseInt(fps_amounts[FrozenCookies["fpsModifier"]]) != Game.fps) {
            Game.fps = parseInt(fps_amounts[FrozenCookies["fpsModifier"]]);
        }

        // This apparently *has* to stay here, or else fast purchases will multi-click it.
        if (shouldClickGC()) {
            for (var i in Game.shimmers) {
                if (Game.shimmers[i].type == 'golden') {
                    Game.shimmers[i].pop();
                }
            }
        }
        if (reindeerLife() > 0 && FrozenCookies.autoReindeer) {
            for (var i in Game.shimmers) {
                if (Game.shimmers[i].type == 'reindeer') {
                    Game.shimmers[i].pop()
                }
            }
        }
        if (FrozenCookies.autoBlacklistStop) {
            checkBlacklistGoal();
        }
        var currentFrenzy = (Game.hasBuff('Frenzy') ? Game.buffs['Frenzy'].multCpS : 1) * clickBuffBonus();
        if (currentFrenzy != FrozenCookies.last_gc_state) {
            if (FrozenCookies.last_gc_state != 1 && currentFrenzy == 1) {
                logEvent('GC', 'Frenzy ended, cookie production x1');
                if (FrozenCookies.hc_gain) {

                    logEvent('HC', 'Won ' + FrozenCookies.hc_gain + ' heavenly chips during Frenzy. Rate: ' + (FrozenCookies.hc_gain * 1000) / (Date.now() - FrozenCookies.hc_gain_time) + ' HC/s.');
                    FrozenCookies.hc_gain_time = Date.now();
                    FrozenCookies.hc_gain = 0;
                }
            } else {
                if (FrozenCookies.last_gc_state != 1) {
                    logEvent('GC', 'Previous Frenzy x' + FrozenCookies.last_gc_state + ' interrupted.')
                } else if (FrozenCookies.hc_gain) {
                    logEvent('HC', 'Won ' + FrozenCookies.hc_gain + ' heavenly chips outside of Frenzy. Rate: ' + (FrozenCookies.hc_gain * 1000) / (Date.now() - FrozenCookies.hc_gain_time) + ' HC/s.');
                    FrozenCookies.hc_gain_time = Date.now();
                    FrozenCookies.hc_gain = 0;
                }
                logEvent('GC', 'Starting ' + (hasClickBuff() ? 'Clicking ' : '') + 'Frenzy x' + currentFrenzy);
            }
            if (FrozenCookies.frenzyTimes[FrozenCookies.last_gc_state] == null) {
                FrozenCookies.frenzyTimes[FrozenCookies.last_gc_state] = 0;
            }
            FrozenCookies.frenzyTimes[FrozenCookies.last_gc_state] += Date.now() - FrozenCookies.last_gc_time;
            FrozenCookies.last_gc_state = currentFrenzy;
            FrozenCookies.last_gc_time = Date.now();
        }
        FrozenCookies.processing = false;
        if (FrozenCookies.frequency) {
            FrozenCookies.cookieBot = setTimeout(autoCookie, itemBought ? 0 : FrozenCookies.frequency);
        }
    } else if (!FrozenCookies.processing && FrozenCookies.frequency) {
        FrozenCookies.cookieBot = setTimeout(autoCookie, FrozenCookies.frequency);
    }
}

function FCStart() {
    //  To allow polling frequency to change, clear intervals before setting new ones.

    if (FrozenCookies.cookieBot) {
        clearInterval(FrozenCookies.cookieBot);
        FrozenCookies.cookieBot = 0;
    }
    if (FrozenCookies.autoclickBot) {
        clearInterval(FrozenCookies.autoclickBot);
        FrozenCookies.autoclickBot = 0;
    }
    if (FrozenCookies.statBot) {
        clearInterval(FrozenCookies.statBot);
        FrozenCookies.statBot = 0;
    }

    if (FrozenCookies.autoGSBot) {
        clearInterval(FrozenCookies.autoGSBot);
        FrozenCookies.autoGSBot = 0;
    }

    if (FrozenCookies.autoGodzamokBot) {
        clearInterval(FrozenCookies.autoGodzamokBot);
        FrozenCookies.autoGodzamokBot = 0;
    }
    if (FrozenCookies.autoSpellBot) {
        clearInterval(FrozenCookies.autoSpellBot);
        FrozenCookies.autoSpellBot = 0;
    }
    if (FrozenCookies.autoFortuneBot) {
        clearInterval(FrozenCookies.autoFortuneBot);
        FrozenCookies.autoFortuneBot = 0;
    }

    //  if (!FrozenCookies.saveWrinklers && localStorage.wrinklers) {
    //    delete localStorage.wrinklers;
    //  }

    // Remove until timing issues are fixed
    //  if (FrozenCookies.goldenCookieBot) {
    //    clearInterval(FrozenCookies.goldenCookieBot);
    //    FrozenCookies.goldenCookieBot = 0;
    //  }

    // Now create new intervals with their specified frequencies.

    if (FrozenCookies.frequency) {
        FrozenCookies.cookieBot = setTimeout(autoCookie, FrozenCookies.frequency);
    }

    /*if (FrozenCookies.autoGC) {
        FrozenCookies.goldenCookieBot = setInterval(autoGoldenCookie, FrozenCookies.frequency);
    }*/

    if (FrozenCookies.autoClick && FrozenCookies.cookieClickSpeed) {
        FrozenCookies.autoclickBot = setInterval(fcClickCookie, 1000 / FrozenCookies.cookieClickSpeed);
    }

    if (FrozenCookies.autoFrenzy && FrozenCookies.frenzyClickSpeed) {
        FrozenCookies.frenzyClickBot = setInterval(autoFrenzyClick, FrozenCookies.frequency);
    }

    if (FrozenCookies.autoGS) {
        FrozenCookies.autoGSBot = setInterval(autoGSBuy, FrozenCookies.frequency)
    }

    if (FrozenCookies.autoGodzamok) {
        FrozenCookies.autoGodzamokBot = setInterval(autoGodzamokAction, FrozenCookies.frequency)
    }

    if (FrozenCookies.autoSpell) {
        FrozenCookies.autoSpellBot = setInterval(autoCast, FrozenCookies.frequency * 10)
    }

    if (FrozenCookies.autoFortune) {
        FrozenCookies.autoFortuneBot = setInterval(autoTicker, FrozenCookies.frequency * 10)
    }

    if (statSpeed(FrozenCookies.trackStats) > 0) {
        FrozenCookies.statBot = setInterval(saveStats, statSpeed(FrozenCookies.trackStats));
    } else if (FrozenCookies.trackStats == 6 && !FrozenCookies.smartTrackingBot) {
        FrozenCookies.smartTrackingBot = setTimeout(function () {
            smartTrackingStats(FrozenCookies.minDelay * 8)
        }, FrozenCookies.minDelay);
    }

    FCMenu();
}
