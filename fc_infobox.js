// functionality for the infobox

function drawCircles(t_d, x, y) {
    var maxRadius, heightOffset, i_c, i_tc, t_b, maxWidth, maxHeight, s_t,
        c = $('#backgroundLeftCanvas');
    if (typeof (c.measureText) != "function") {
        return;
    }
    maxRadius = 10 + 10 * t_d.reduce(function (sum, item) { return (item.overlay) ? sum : sum + 1; }, 0);
    heightOffset = maxRadius + 5 - (15 * (t_d.length - 1) / 2);
    i_c = 0;
    i_tc = 0;
    t_b = ['rgba(170, 170, 170, 1)', 'rgba(187, 187, 187, 1)', 'rgba(204, 204, 204, 1)', 'rgba(221, 221, 221, 1)', 'rgba(238, 238, 238, 1)', 'rgba(255, 255, 255, 1)'];
    var maxText = _.max(t_d.map(function (o) {
        return o.name ? o.name + (o.display ? ': ' + o.display : '') : '';
    }), function (str) {
        return str.length;
    });
    var maxMeasure = c.measureText({
        fontSize: "12px",
        fontFamily: "Arial",
        maxWidth: c.width,
        text: maxText
    });
    maxWidth = maxMeasure.width;
    maxHeight = maxMeasure.height * t_d.length;
    if (FrozenCookies.fancyui % 2 == 1)
        c.drawRect({
            fillStyle: 'rgba(153, 153, 153, 0.6)',
            x: x + maxRadius * 2 + maxWidth / 2 + 35, y: y + maxRadius + 5,
            width: maxWidth + 20, height: maxHeight + 20
        });

    t_d.forEach(function (o_draw) {
        if (o_draw.overlay) {
            i_c--;
        }

        else {
            if (FrozenCookies.fancyui > 1) {
                c.drawArc({
                    strokeStyle: t_b[i_c % t_b.length],
                    strokeWidth: 10,
                    x: x + (maxRadius + 5), y: y + maxRadius + 5,
                    radius: maxRadius - i_c * 10
                });
                c.drawArc({
                    strokeStyle: t_b[(i_c + 2) % t_b.length],
                    strokeWidth: 1,
                    x: x + (maxRadius + 5), y: y + maxRadius + 5,
                    radius: maxRadius - 5 - (i_c) * 10
                });
            }
        }
        if (FrozenCookies.fancyui > 1) {
            c.drawArc({
                strokeStyle: o_draw.c1,
                x: x + (maxRadius + 5), y: y + maxRadius + 5,
                radius: maxRadius - i_c * 10,
                strokeWidth: 7,
                start: 0,
                end: (360 * o_draw.f_percent)
            });
        }
        if ((FrozenCookies.fancyui % 2 == 1) && o_draw.name) {
            s_t = o_draw.name + (o_draw.display ? ": " + o_draw.display : "");
            c.drawText({
                fontSize: "12px",
                fontFamily: "Arial",
                fillStyle: o_draw.c1,
                x: x + maxRadius * 2 + maxWidth / 2 + 35, y: y + heightOffset + 15 * i_tc,
                text: s_t
            });
            i_tc++;
        }
        i_c++;
    });
}
function buildingSpecialBuffTime() {
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].time;
        }
    }
    return 0;
}
function buildingSpecialBuffMaxTime() {
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].multCpS;
        }
    }
    return 0;
}
function buildingSpecialBuffValue() {
    for (var i in Game.buffs) {
        if (Game.buffs[i].type && (Game.buffs[i].type.name == 'building buff' || Game.buffs[i].type.name == 'building debuff')) {
            return Game.buffs[i].multCpS;
        }
    }
    return 0;
}
function buffTime(buffName) {
    var buff = Game.hasBuff(buffName);
    return buff ? buff.time : 0;
}
function buffMaxTime(buffname) {
    var buff = Game.hasBuff(buffname);
    return buff ? buff.maxTime : 0;
}
function maxCookieDelay() {
    return probabilitySpan('golden', Game.shimmerTypes.golden.time, 0.99);
}
function updateTimers() {
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
        cursedFingerTime = buffTime('Cursed finger'),
        cursedFingerMaxTime = buffMaxTime('Cursed finger'),
        cookieStormTime = buffTime('Cookie storm'),
        cookieStormMaxTime = buffMaxTime('Cookie storm'),
        buildingSpecialTime = buildingSpecialBuffTime(),
        bankTotal = delayAmount(),
        purchaseTotal = nextPurchase().cost,
        purchaseCompletion = Game.cookies / (bankTotal + purchaseTotal),
        chainTotal = 0,
        chainFinished,
        chainCompletion = 0;
    if (!Game.Has('Golden switch [off]')) {
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

    t_draw = [];

    if (chainTotal) {
        t_draw.push({
            f_percent: chainCompletion,
            c1: 'rgba(51, 51, 51, 1)',
            name: "Chain Completion Time",
            display: timeDisplay(divCps(Math.max(chainTotal + bankTotal - Game.cookies - chainFinished, 0), actualCps))
        });
    }
    if (purchaseTotal > 0) {
        t_draw.push({
            f_percent: purchaseCompletion,
            c1: 'rgba(17, 17, 17, 1)',
            name: "Purchase Completion Time",
            display: timeDisplay(divCps(Math.max(purchaseTotal + bankTotal - Game.cookies, 0), actualCps))
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
    if (buildingSpecialTime > 0) {
        t_draw.push({
            f_percent: buildingSpecialTime / buildingSpecialBuffMaxTime(),
            c1: "rgba(0, 196, 255, 1)",
            name: "Building Special (x" + buildingSpecialBuffValue() + ") Time",
            display: timeDisplay(buildingSpecialBuffTime() / Game.fps)
        });
    }
    height = $('#backgroundLeftCanvas').height() - 140;
    drawCircles(t_draw, 20, height);
}
