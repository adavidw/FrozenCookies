// functionality for the infobox

var previousBoxSize = {
    maxRadius: 0,
    maxBoxWidth: 0,
    maxBoxHeight: 0,
};


function drawInfobox(t_d) {   // draw the wheel and text box
    var s_t;
    var textBox = {};
    var margin = {
        x: 12,  // stay at least this far away from left edge
        y: 36   // stay at least this far away from bottom edge
    };
    var allTheTopStuff = Game.cookieOriginY + 256; // shine.png behind the cookie is 512x512, so this keeps the box off that graphic
    var alley = 24;     // the space between the wheel and the text box

    //spacing and positioning attributes
    var canvas = {
        width: Game.LeftBackground.canvas.width,
        height: Game.LeftBackground.canvas.height,
        center: {
            x: (Game.LeftBackground.canvas.width / 2),
            y: (Game.LeftBackground.canvas.height / 2)
        }
    };

    var padding = {
        x: margin.x,
        y: margin.y
    };

    // look to see if any special tabs make us need padding on left or bottom
    if (Game.specialTabs.length > 0) {  // if length > 0, that means Santa or Krumblor icons are present
        padding.x += 48;
    }
    if (Game.specialTab != 0) {     // test to see if Krumblor or Santa has been selected and has their window up
        padding.y += 130
    }
    var maxDraw = {
        width: canvas.width - margin.x - padding.x,
        height: canvas.height - allTheTopStuff - padding.y
    };
    maxDraw.center = {
        x: padding.x + (maxDraw.width / 2),
        y: canvas.height - padding.y - (maxDraw.height / 2)
    };

    // startingY aims to have the wheel center point vertically centered between Krumblor and Santa, which is 96 pixels above the bottom of the canvas
    var startingY = Game.LeftBackground.canvas.height - 60 - padding.y;

    // style and formatting attributes
    var c = $("#backgroundLeftCanvas");
    var boxFont = "Helvetica,Arial";
    var boxFontSize = "14px";
    var wheel = {
        hub: 15,
        arcWidth: 9,
        lineWidth: 3,
        interval: 12,
        depthFactor: 0.3,
        BGColors: ['rgba(170, 170, 170, 1)', 'rgba(187, 187, 187, 1)', 'rgba(204, 204, 204, 1)', 'rgba(221, 221, 221, 1)', 'rgba(238, 238, 238, 1)', 'rgba(255, 255, 255, 1)']
    };

















    function getRadius() {
        wheel.maxRadius = wheel.hub + wheel.interval * t_d.reduce(function (sum, item) { return (item.overlay) ? sum : sum + 1; }, 0);
        if (wheel.maxRadius < 48) {
            scaler(48 / wheel.maxRadius);
        }
        // dynamically resize the wheel in a less jerky fashion
        if (wheel.maxRadius + 1 <= previousBoxSize.maxRadius) {
            wheel.maxRadius = previousBoxSize.maxRadius - 1;
        };
        previousBoxSize.maxRadius = wheel.maxRadius;
    }

    function scaler(scaleFactor) {
        for (i in wheel) {
            wheel[i] *= scaleFactor;
        }
    }

    function getBoxSize() {
        if (typeof (c.measureText) != "function") {
            return;
        }
        var heightOffset = (16 * (t_d.length - 1) / 2);     // what is this for?
        var maxText = _.max(t_d.map(function (o) {
            return o.name ? o.name + (o.display ? ': ' + o.display : '') : '';
        }), function (str) {
            return str.length;
        });
        // console.log(t_d);
        // console.log(t_d.map(function (o) {
        //     return o.name + ((o.name && o.display) ? ": " : "") + o.display;
        //     }));

        // var maxText = _.max(
        //     t_d.map(function (o) {
        //         return o.name + ((o.name && o.display) ? ": " : "") + o.display;
        //     }),
        //     function (str) {
        //         return str.length;
        //     });
        //     // console.log(maxText);
        var maxMeasure = c.measureText({
            fontSize: boxFontSize,
            fontFamily: boxFont,
            maxWidth: c.width,
            text: maxText
        });
        textBox.maxWidth = maxMeasure.width;
        textBox.maxHeight = maxMeasure.height * t_d.length + 20;
        // dynamically resize the box in a less jerky fashion
        if (textBox.maxWidth > previousBoxSize.maxBoxWidth) { previousBoxSize.maxBoxWidth = textBox.maxWidth };
        if (textBox.maxWidth < previousBoxSize.maxBoxWidth) { previousBoxSize.maxBoxWidth--; textBox.maxWidth = previousBoxSize.maxBoxWidth };
        if (textBox.maxHeight > previousBoxSize.maxBoxHeight) { previousBoxSize.maxBoxHeight = textBox.maxHeight };
        if (textBox.maxHeight < previousBoxSize.maxBoxHeight) { previousBoxSize.maxBoxHeight--; textBox.maxHeight = previousBoxSize.maxBoxHeight };
    }
















    c.drawRect({    // testing maxDraw
        fillStyle: 'rgba(200, 200, 255, 0.4)',
        x: maxDraw.center.x, y: maxDraw.center.y,
        width: maxDraw.width, height: maxDraw.height
    });

    c.drawRect({    // testing normal wheel placement
        fillStyle: 'rgba(30, 30, 30, 0.7)',
        x: padding.x + wheel.maxRadius, y: startingY,
        width: wheel.maxRadius * 2, height: wheel.maxRadius * 2
    });

    c.drawRect({    // testing old text box placement
        fillStyle: 'rgba(30, 30, 30, 0.7)',
        x: padding.x + wheel.maxRadius * 2 + (textBox.maxWidth / 2) + alley, y: startingY,
        width: textBox.maxWidth + 20, height: textBox.maxHeight
    });









    switch (FrozenCookies.fancyUI) {
        case 1: {
            getBoxSize();
            drawTextBox();
            break;
        }
        case 2: {
            getRadius();
            drawWheel();
            break;
        }
        case 3: {
            getRadius();
            getBoxSize();
            drawWheel();
            drawTextBox();
            break;
        }
    }
















    function drawWheel() {  //draw the wheel
        var itemCount = 0;
        // if (wheel.maxRadius < textBox.maxHeight) {
        //     scaler((textBox.maxHeight / 2) / wheel.maxRadius);
        // }
        x = padding.x + wheel.maxRadius;
        y = startingY;
        if (startingY + wheel.maxRadius > allTheTopStuff + maxDraw.height) {
            y = allTheTopStuff + maxDraw.height - wheel.maxRadius;
        }
        // console.log("startingY: "+startingY + ", wheel.maxRadius: "+ Math.ceil(wheel.maxRadius) + ", allTheTopStuff:" + allTheTopStuff + ", maxDraw.height: " + maxDraw.height + ", y:" + y);
        c.drawArc({     // draw the wheel outer ring
            strokeStyle: wheel.BGColors[(itemCount + 2) % wheel.BGColors.length],
            strokeWidth: wheel.lineWidth,
            x: x, y: y,
            radius: wheel.maxRadius - wheel.interval / 6
        });
        t_d.forEach(function (o_draw) {
            if (o_draw.overlay) {
                itemCount--;
            }
            else {
                c.drawArc({     // draw the wheel background
                    strokeStyle: wheel.BGColors[itemCount % wheel.BGColors.length],
                    strokeWidth: wheel.arcWidth + 1,
                    x: x, y: y,
                    radius: wheel.maxRadius - wheel.interval * 2 / 3 - itemCount * wheel.interval
                });
                c.drawArc({
                    strokeStyle: wheel.BGColors[(itemCount + 2) % wheel.BGColors.length],
                    strokeWidth: wheel.lineWidth,
                    x: x, y: y,
                    radius: wheel.maxRadius - wheel.interval * 7 / 6 - (itemCount) * wheel.interval
                });
            }
            // draw the time arcs on the wheel
            if (!o_draw.overlay) {
                c.drawArc({ // shadow arc
                    strokeStyle: "#222",
                    x: x - wheel.depthFactor, y: y + wheel.depthFactor * 2,
                    radius: wheel.maxRadius - wheel.interval * 2 / 3 - itemCount * wheel.interval,
                    strokeWidth: wheel.arcWidth,
                    start: 0,
                    end: (360 * o_draw.f_percent)
                });
            }
            c.drawArc({ // colored arc
                strokeStyle: o_draw.c1,
                x: x + wheel.depthFactor, y: y - wheel.depthFactor * 2,
                radius: wheel.maxRadius - wheel.interval * 2 / 3 - itemCount * wheel.interval - wheel.depthFactor,
                strokeWidth: wheel.arcWidth,
                start: 0,
                end: (360 * o_draw.f_percent)
            });
            itemCount++;
        });
    }

    function drawTextBox() {    // draw the box
        var heightOffset = (16 * (t_d.length - 1) / 2);     // what is this for?
        var i_tc = 0;
        var x = 0;
        var y = startingY;
        if (!wheel.maxRadius) {
            x = canvas.center.x
        } else {
            x = ((canvas.width - margin.x) + (padding.x + (wheel.maxRadius * 2))) / 2
        }
        // draw the box background
        c.drawRect({
            fillStyle: 'rgba(220, 220, 220, 0.6)',
            x: x, y: y,
            width: textBox.maxWidth + 20, height: textBox.maxHeight
        });
        // iterate through the text items
        t_d.forEach(function (o_draw) {
            if (o_draw.name || o.draw.display) {
                s_t = o_draw.name + ((o_draw.name && o_draw.display) ? ": " : "") + o_draw.display;
                c.drawText({
                    fontSize: boxFontSize,
                    fontFamily: boxFont,
                    fillStyle: o_draw.c1,
                    x: x, y: y - heightOffset + 16 * i_tc,
                    text: s_t
                });
                i_tc++;
            }
        });
    }
}

function buildingSpecialBuffTime() {    // calculate building special remaining time
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].time;
        }
    }
    return 0;
}

function buildingSpecialBuffMaxTime() { // calculate building special total time
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].maxTime;
        }
    }
    return 0;
}

function buildingSpecialBuffValue() {   // calculate building special multiplier
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].multCpS;
        }
    }
    return 0;
}

function buffTime(buffName) {   // calculate buff remaining time
    var buff = Game.hasBuff(buffName);
    return buff ? buff.time : 0;
}

function buffMaxTime(buffname) {    // calculate buff total time
    var buff = Game.hasBuff(buffname);
    return buff ? buff.maxTime : 0;
}

function maxCookieDelay() { // calculate the max amount of time reasonably expected (99% probability) until the next golden cookie
    return probabilitySpan('golden', Game.shimmerTypes.golden.time, 0.99);
}

function updateTimers() {   // update calculations and assemble output -- called every time Game.DrawBackground() is called
    if (FrozenCookies.fancyUI === 0) {
        return  // skip doing any calculations if the infobox isn't turned on
    } else {
        var chainPurchase, bankPercent, purchasePercent, bankMax, actualCps, t_draw,
            maxColor, height, gcDelay, gcMaxDelay, gcMinDelay,
            clotTime = buffTime('Clot'),
            clotMaxTime = buffMaxTime('Clot'),
            elderFrenzyTime = buffTime('Elder frenzy'),
            elderFrenzyMaxTime = buffMaxTime('Elder frenzy'),
            frenzyTime = buffTime('Frenzy'),
            frenzyMaxTime = buffMaxTime('Frenzy'),
            dragonHarvestTime = buffTime('Dragon Harvest'),
            dragonHarvestMaxTime = buffMaxTime('Dragon Harvest'),
            clickFrenzyTime = buffTime('Click frenzy'),
            clickFrenzyMaxTime = buffMaxTime('Click frenzy'),
            dragonflightTime = buffTime('Dragonflight'),
            dragonflightMaxTime = buffMaxTime('Dragonflight'),
            devastationTime = buffTime('Devastation'),
            devastationMaxTime = buffMaxTime('Devastation'),
            cursedFingerTime = buffTime('Cursed finger'),
            cursedFingerMaxTime = buffMaxTime('Cursed finger'),
            cookieStormTime = buffTime('Cookie storm'),
            cookieStormMaxTime = buffMaxTime('Cookie storm'),
            buildingSpecialTime = buildingSpecialBuffTime(),
            buildingSpecialMaxTime = buildingSpecialBuffMaxTime(),
            bankTotal = delayAmount(),
            purchaseTotal = nextPurchase().cost,
            purchaseCompletion = Game.cookies / (bankTotal + purchaseTotal),
            chainTotal = 0,
            chainFinished,
            chainCompletion = 0;

        // calculate min, max, and median expected times for golden cookie
        if (!Game.Has('Golden switch [off]')) { // when golden switch is on, golden cookies don't spawn, so only calculate time for them if they can actually appear
            gcDelay = (probabilitySpan('golden', Game.shimmerTypes.golden.time, 0.5) - Game.shimmerTypes.golden.time),
                gcMaxDelay = (probabilitySpan('golden', Game.shimmerTypes.golden.time, 0.99) - Game.shimmerTypes.golden.time),
                gcMinDelay = (probabilitySpan('golden', Game.shimmerTypes.golden.time, 0.01) - Game.shimmerTypes.golden.time);
        }
        if (nextChainedPurchase().cost > nextPurchase().cost) {
            chainPurchase = nextChainedPurchase().purchase;
            chainTotal = upgradePrereqCost(chainPurchase, true) - chainPurchase.getPrice();
            chainFinished = chainTotal - (upgradePrereqCost(chainPurchase) - chainPurchase.getPrice());
            chainCompletion = (chainFinished + Math.max(Game.cookies - bankTotal, 0)) / (bankTotal + chainTotal);
        }
        bankPercent = Math.min(Game.cookies, bankTotal) / (bankTotal + purchaseTotal);
        purchasePercent = purchaseTotal / (purchaseTotal + bankTotal);
        bankMax = bankTotal / (purchaseTotal + bankTotal);
        actualCps = Game.cookiesPs + Game.mouseCps() * FrozenCookies.cookieClickSpeed;

        // create an array of all the elements to draw
        t_draw = [];

        if (chainTotal) {
            t_draw.push({
                f_percent: chainCompletion,
                c1: 'rgba(77, 77, 77, 1)',
                name: "Chain Completion Time (" + chainPurchase.name + "):",
                display: timeDisplay(divCps(Math.max(chainTotal + bankTotal - Game.cookies - chainFinished, 0), actualCps))
            });
        }
        // if (purchaseTotal > 0) {
        //     t_draw.push({
        //         f_percent: purchaseCompletion,
        //         c1: 'rgba(44, 44, 44, 1)',
        //         name: "Purchase Time (" + nextPurchase().purchase.name + ")",
        //         display: timeDisplay(divCps(Math.max(purchaseTotal + bankTotal - Game.cookies, 0), actualCps))
        //     });
        // }

        // if text is wider than some percentage, split it

        if (purchaseTotal > 0) {
            t_draw.push({
                // f_percent: 0,
                c1: 'rgba(44, 44, 44, 1)',
                name: "Purchase Completion Time"
                , display: ""
            })
            t_draw.push({
                f_percent: purchaseCompletion,
                c1: 'rgba(44, 44, 44, 1)',
                name: "(" + nextPurchase().purchase.name + ")",
                display: timeDisplay(divCps(Math.max(purchaseTotal + bankTotal - Game.cookies, 0), actualCps)),
                overlay: true
            });
        }
        if (bankMax > 0) {
            maxColor = (Game.cookies >= bankTotal) ? 'rgba(252, 212, 0, 1)' : 'rgba(201, 169, 0, 1)';
            t_draw.push({
                f_percent: bankMax,
                name: !FrozenCookies.setHarvestBankPlant ? "Max Bank" : "Harvest Bank",
                display: Beautify(bankTotal),
                c1: maxColor,
                overlay: true
            });
            if (bankPercent > 0 && Game.cookies < bankTotal) {
                t_draw.push({
                    f_percent: bankPercent,
                    c1: 'rgba(252, 212, 0, 1)',
                    name: "Bank Completion",
                    display: timeDisplay(divCps(Math.max(bankTotal - Game.cookies, 0), actualCps)),
                    overlay: true
                });
            }
        }
        if (gcMaxDelay > 0) {
            t_draw.push({
                f_percent: gcMaxDelay / maxCookieDelay(),
                c1: "rgba(255, 155, 0, 1)",
                name: "Golden Cookie Maximum (99%)",
                display: timeDisplay(gcMaxDelay / Game.fps)
            });
            t_draw.push({
                f_percent: gcDelay / maxCookieDelay(),
                c1: "rgba(255, 195, 0, 1)",
                name: "Golden Cookie Estimate (50%)",
                display: timeDisplay(gcDelay / Game.fps),
                overlay: true
            });
            t_draw.push({
                f_percent: gcMinDelay / maxCookieDelay(),
                c1: "rgba(255, 235, 0, 1)",
                name: "Golden Cookie Minimum (1%)",
                display: timeDisplay(gcMinDelay / Game.fps),
                overlay: true
            });
        }
        if (clotTime > 0) {
            t_draw.push({
                f_percent: clotTime / clotMaxTime,
                c1: "rgba(193, 98, 3, 1)",
                name: "Clot (x" + Game.buffs['Clot'].multCpS + ") Time",
                display: timeDisplay(clotTime / Game.fps)
            });
        }
        if (elderFrenzyTime > 0) {
            t_draw.push({
                f_percent: elderFrenzyTime / elderFrenzyMaxTime,
                c1: "rgba(79, 0, 7, 1)",
                name: "Elder Frenzy (x" + Game.buffs['Elder frenzy'].multCpS + ") Time",
                display: timeDisplay(elderFrenzyTime / Game.fps)
            });
        }
        if (frenzyTime > 0) {
            t_draw.push({
                f_percent: frenzyTime / frenzyMaxTime,
                c1: "rgba(255, 0, 0, 1)",
                name: "Frenzy (x" + Game.buffs['Frenzy'].multCpS + ") Time",
                display: timeDisplay(frenzyTime / Game.fps)
            });
        }
        if (dragonHarvestTime > 0) {
            t_draw.push({
                f_percent: dragonHarvestTime / dragonHarvestMaxTime,
                c1: "rgba(206, 180, 49, 1)",
                name: "Dragon Harvest (x" + Game.buffs['Dragon Harvest'].multCpS + ") Time",
                display: timeDisplay(dragonHarvestTime / Game.fps)
            });
        }
        if (clickFrenzyTime > 0) {
            t_draw.push({
                f_percent: clickFrenzyTime / clickFrenzyMaxTime,
                c1: "rgba(0, 196, 255, 1)",
                name: "Click Frenzy (x" + Game.buffs['Click frenzy'].multClick + ") Time",
                display: timeDisplay(clickFrenzyTime / Game.fps)
            });
        }
        if (dragonflightTime > 0) {
            t_draw.push({
                f_percent: dragonflightTime / dragonflightMaxTime,
                c1: "rgba(183, 206, 49, 1)",
                name: "Dragonflight (x" + Game.buffs['Dragonflight'].multClick + ") Time",
                display: timeDisplay(dragonflightTime / Game.fps)
            });
        }
        if (cursedFingerTime > 0) {
            t_draw.push({
                f_percent: cursedFingerTime / cursedFingerMaxTime,
                c1: "rgba(23, 79, 1, 1)",
                name: "Cursed Finger Time",
                display: timeDisplay(cursedFingerTime / Game.fps)
            });
        }
        if (cookieStormTime > 0) {
            t_draw.push({
                f_percent: cookieStormTime / cookieStormMaxTime,
                c1: "rgba(0, 196, 255, 1)",
                name: "Cookie Storm Time",
                display: timeDisplay(cookieStormTime / Game.fps)
            });
        }
        if (devastationTime > 0) {
            t_draw.push({
                f_percent: devastationTime / devastationMaxTime,
                c1: "rgba(183, 206, 49, 1)",
                name: "Devastation (x" + (Math.round(Game.buffs['Devastation'].multClick * 100) / 100) + ") Time",
                display: timeDisplay(devastationTime / Game.fps)
            });
        }
        if (buildingSpecialTime > 0) {
            t_draw.push({
                f_percent: buildingSpecialTime / buildingSpecialMaxTime,
                c1: "rgba(0, 196, 255, 1)",
                name: "Building Special (x" + buildingSpecialBuffValue() + ") Time",
                display: timeDisplay(buildingSpecialTime / Game.fps)
            });
        }
        drawInfobox(t_draw);
    }
}
