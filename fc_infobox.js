// functionality for the infobox

var previousBoxSize = {
    maxRadius: 0,
    maxBoxWidth: 0,
    maxBoxHeight: 0,
};

// measure the left pane, and size the elements relative to that


function drawInfobox(t_d) {   // draw the wheel and text box

    // figure out positioning
    var xMargin = 12;
    var maxWidth = Game.LeftBackground.canvas.width - xMargin * 2;

    var yMargin = 48;
    var maxHeight = Game.LeftBackground.canvas.height;

    var alley = 24;

    if (Game.specialTabs.length > 0) {  // if length > 0, that means Santa or Krumblor icons are present
        xMargin += 48;
    }

    var y = Game.LeftBackground.canvas.height - 48 - yMargin;
    if (Game.specialTab != 0) {
        y -= 130
    }

    var maxRadius, heightOffset, i_c, i_tc, t_b, maxBoxWidth, maxBoxHeight, s_t,
        c = $('#backgroundLeftCanvas'),
        boxFont = "Helvetica,Arial",
        boxFontSize = "14px";
    if (typeof (c.measureText) != "function") {
        return;
    }
    maxRadius = 16 + 12 * t_d.reduce(function (sum, item) { return (item.overlay) ? sum : sum + 1; }, 0);
    heightOffset = (16 * (t_d.length - 1) / 2);
    i_c = 0;
    i_tc = 0;
    t_b = ['rgba(170, 170, 170, 1)', 'rgba(187, 187, 187, 1)', 'rgba(204, 204, 204, 1)', 'rgba(221, 221, 221, 1)', 'rgba(238, 238, 238, 1)', 'rgba(255, 255, 255, 1)'];
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
    maxBoxWidth = maxMeasure.width;
    maxBoxHeight = maxMeasure.height * t_d.length + 20;

    // dynamically resize the box in a less jerky fashion
    if (maxRadius > previousBoxSize.maxRadius) { previousBoxSize.maxRadius = maxRadius };
    if (maxRadius < previousBoxSize.maxRadius) { previousBoxSize.maxRadius-- };
    if (maxBoxWidth > previousBoxSize.maxBoxWidth) { previousBoxSize.maxBoxWidth = maxBoxWidth };
    if (maxBoxWidth < previousBoxSize.maxBoxWidth) { previousBoxSize.maxBoxWidth--; maxBoxWidth = previousBoxSize.maxBoxWidth };
    if (maxBoxHeight > previousBoxSize.maxBoxHeight) { previousBoxSize.maxBoxHeight = maxBoxHeight };
    if (maxBoxHeight < previousBoxSize.maxBoxHeight) { previousBoxSize.maxBoxHeight--; maxBoxHeight = previousBoxSize.maxBoxHeight };

    // draw the box
    if (FrozenCookies.fancyui % 2 == 1) {
        // draw the box background
        c.drawRect({
            fillStyle: 'rgba(200, 200, 255, 0.6)',
            x: xMargin + (maxRadius * 2) + (maxBoxWidth / 2) + alley, y: y,
            width: maxBoxWidth + 20, height: maxBoxHeight
        });
        // iterate through the text items
        t_d.forEach(function (o_draw) {
            if (o_draw.name || o.draw.display) {
                s_t = o_draw.name + ((o_draw.name && o_draw.display) ? ": " : "") + o_draw.display;
                c.drawText({
                    fontSize: boxFontSize,
                    fontFamily: boxFont,
                    fillStyle: o_draw.c1,
                    x: xMargin + maxRadius * 2 + maxBoxWidth / 2 + alley, y: y - heightOffset + 16 * i_tc,
                    text: s_t
                });
                i_tc++;
            }
        });
    }

    //draw the wheel
    if (FrozenCookies.fancyui > 1) {    // draw the wheel outer ring
        // if (maxRadius < maxBoxHeight) {maxRadius = maxBoxHeight / 2;}
        x = xMargin + maxRadius
        c.drawArc({
            strokeStyle: t_b[(i_c + 2) % t_b.length],
            strokeWidth: 3,
            x: x, y: y,
            radius: maxRadius - 2
        });
        t_d.forEach(function (o_draw) {
            if (o_draw.overlay) {
                i_c--;
            }
            else {
                c.drawArc({     // draw the wheel background
                    strokeStyle: t_b[i_c % t_b.length],
                    strokeWidth: 10,
                    x: x, y: y,
                    radius: maxRadius - 8 - i_c * 12
                });
                c.drawArc({
                    strokeStyle: t_b[(i_c + 2) % t_b.length],
                    strokeWidth: 3,
                    x: x, y: y,
                    radius: maxRadius - 14 - (i_c) * 12
                });
            }
            // draw the time arcs on the wheel
            c.drawArc({ // shadow arc
                strokeStyle: "#222",
                x: x - 1, y: y,
                radius: maxRadius - 8 - i_c * 12,
                strokeWidth: 9,
                start: 0,
                end: (360 * o_draw.f_percent)
            });
            c.drawArc({ // colored arc
                strokeStyle: o_draw.c1,
                x: x, y: y - 1,
                radius: maxRadius - 8 - i_c * 12,
                strokeWidth: 9,
                start: 0,
                end: (360 * o_draw.f_percent)
            });
            i_c++;
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
    if (FrozenCookies.fancyui === 0) {
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
