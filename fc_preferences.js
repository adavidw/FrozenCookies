FrozenCookies.preferenceValues = {

    // clicking options
    'clickingOptions': {
        'hint': 'Auto clicking options:'
    },
    'autoClick': {
        'hint': 'Click the large cookie',
        'display': ['Autoclick OFF', 'Autoclick ON'],
        'default': 0,
        'extras': '<a class="option" id="cookieClickSpeed" onclick="updateSpeed(\'cookieClickSpeed\');">${cookieClickSpeed} clicks/sec</a>'
    },
    'autoFrenzy': {
        'hint': 'Click the large cookie during Clicking Frenzies',
        'display': ['Autofrenzy OFF', 'Autofrenzy ON'],
        'default': 0,
        'extras': '<a class="option" id="frenzyClickSpeed" onclick="updateSpeed(\'frenzyClickSpeed\');">${frenzyClickSpeed} clicks/sec</a>'
    },
    'autoGC': {
        'hint': 'Automatically click Golden Cookies when they appear',
        'display': ["Autoclick GC OFF", "Autoclick GC ON"],
        'default': 0
    },
    'autoReindeer': {
        'hint': 'Automatically click reindeer',
        'display': ['Autoclick Reindeer OFF', 'Autoclick Reindeer ON'],
        'default': 0
    },
    'autoFortune': {
        'hint': 'Automatically click the news ticker when Fortune News appears',
        'display': ["Auto Fortune OFF", "Auto Fortune ON"],
        'default': 0
    },

    // autobuy options
    'buyingOptions': {
        'hint': 'Auto buying options:'
    },
    'autoBuy': {
        'hint': 'Automatically buy the most efficient building when you\'ve met its cost',
        'display': ["AutoBuy OFF", "AutoBuy ON"],
        'default': 0
    },
    'autoBulk': {
        'hint': 'Automatically set buildings to be bought in bulk after reincarnation',
        'display': ['Auto Bulkbuy OFF', 'Auto Bulkbuy x10', 'Auto Bulkbuy x100'],
        'default': 0
    },
    'autoBlacklistStop': {
        'hint': 'Automatically turn off a blacklist once the goal for that blacklist is achieved',
        'display': ['Auto Blacklist OFF', 'Auto Blacklist ON'],
        'default': 0
    },
    'blacklist': {
        'hint': 'Blacklist purchases from the efficiency calculations',
        'display': ['Blacklist OFF', 'Blacklist Mode SPEEDRUN', 'Blacklist Mode HARDCORE', 'Blacklist Mode GRANDMAPOCALYPSE', 'Blacklist Mode NO BUILDINGS'],
        'default': 0
    },
    'pastemode': {
        'hint': 'Always autobuy the least efficient purchase. This is a stupid idea, you should never turn this on.',
        'display': ['Pastemode OFF', 'Pastemode ON'],
        'default': 0
    },

    // autobuy limits
    'limitOptions': {
        'hint': 'Autobuy limits (to make things like AutoGodzamok and AutoCast more efficient):'
    },
    // is there a way to use cumulativeBuildingCost() to automatically figure an appropriate amount for these limits, maybe based on a specified number of minutes of cps?
    'cursorLimit': {
        'hint': 'Limit max number of Cursors that AutoBuy will purchase',
        'display': ['Cursor Limit OFF', 'Cursor Limit ON'],
        'default': 0,
        'extras': '<a class="option" id="cursorMax" onclick="updateCursorMax(\'cursorMax\');">${cursorMax} Cursors</a>'
    },
    // 'grandmaLimit': {
    //     'hint': 'Limit max number of Grandmas that AutoBuy will purchase',
    //     'display': ['Grandma Limit OFF', 'Grandma Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="grandmaMax" onclick="updateGrandmaMax(\'grandmaMax\');">${grandmaMax} Grandmas</a>'
    // },
    'farmLimit': {
        'hint': 'Limit max number of Farms that AutoBuy will purchase',
        'display': ['Farm Limit OFF', 'Farm Limit ON'],
        'default': 0,
        'extras': '<a class="option" id="farmMax" onclick="updateFarmMax(\'farmMax\');">${farmMax} Farms</a>'
    },
    // 'mineLimit': {
    //     'hint': 'Limit max number of Mines that AutoBuy will purchase',
    //     'display': ['Mine Limit OFF', 'Mine Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="mineMax" onclick="updateMineMax(\'mineMax\');">${mineMax} Mines</a>'
    // },
    // 'factoryLimit': {
    //     'hint': 'Limit max number of Factories that AutoBuy will purchase',
    //     'display': ['Factory Limit OFF', 'Factory Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="factoryMax" onclick="updateFactoryMax(\'factoryMax\');">${factoryMax} Factories</a>'
    // },
    // 'bankLimit': {
    //     'hint': 'Limit max number of Banks that AutoBuy will purchase',
    //     'display': ['Bank Limit OFF', 'Bank Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="bankMax" onclick="updateBankMax(\'bankMax\');">${bankMax} Banks</a>'
    // },
    // 'templeLimit': {
    //     'hint': 'Limit max number of Temples that AutoBuy will purchase',
    //     'display': ['Temple Limit OFF', 'Temple Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="templeMax" onclick="updateTempleMax(\'templeMax\');">${templeMax} Temples</a>'
    // },
    'towerLimit': {
        'hint': 'Stop autobuying Wizard Towers at selected Max Mana, for spellcasting efficiency',
        'display': ['Wizard Tower Cap OFF', 'Wizard Tower Cap ON'],
        'default': 0,
        'extras': '<a class="option" id="manaMax" onclick="updateManaMax(\'manaMax\');">${manaMax} max Mana</a>'
    },
    // 'shipmentLimit': {
    //     'hint': 'Limit max number of Shipments that AutoBuy will purchase',
    //     'display': ['Shipment Limit OFF', 'Shipment Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="shipmentMax" onclick="updateShipmentMax(\'shipmentMax\');">${shipmentMax} Shipments</a>'
    // },
    // 'labLimit': {
    //     'hint': 'Limit max number of Alchemy Labs that AutoBuy will purchase',
    //     'display': ['Alchemy Lab Limit OFF', 'Alchemy Lab Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="labMax" onclick="updateLabMax(\'labMax\');">${labMax} Alchemy Labs</a>'
    // },
    // 'portalLimit': {
    //     'hint': 'Limit max number of Portals that AutoBuy will purchase',
    //     'display': ['Portal Limit OFF', 'Portal Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="portalMax" onclick="updatePortalMax(\'portalMax\');">${portalMax} Portals</a>'
    // },
    // 'timeMachineLimit': {
    //     'hint': 'Limit max number of Time Machines that AutoBuy will purchase',
    //     'display': ['Time Machine Limit OFF', 'Time Machine Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="timeMachineMax" onclick="updateTimeMachineMax(\'timeMachineMax\');">${timeMachineMax} Time Machines</a>'
    // },
    // 'condensorLimit': {
    //     'hint': 'Limit max number of Antimatter Condensors that AutoBuy will purchase',
    //     'display': ['Antimatter Condensor Limit OFF', 'Antimatter Condensor Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="condensorMax" onclick="updateCondensorMax(\'condensorMax\');">${condensorMax} Antimatter Condensors</a>'
    // },
    // 'prismLimit': {
    //     'hint': 'Limit max number of Prisms that AutoBuy will purchase',
    //     'display': ['Prism Limit OFF', 'Prism Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="prismMax" onclick="updatePrismMax(\'prismMax\');">${prismMax} Prisms</a>'
    // },
    // 'chancemakerLimit': {
    //     'hint': 'Limit max number of Chancemakers that AutoBuy will purchase',
    //     'display': ['Chancemaker Limit OFF', 'Chancemaker Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="chancemakerMax" onclick="updateChancemakerMax(\'chancemakerMax\');">${chancemakerMax} Chancemakers</a>'
    // },
    // 'fractalEngineLimit': {
    //     'hint': 'Limit max number of Fractal Engines that AutoBuy will purchase',
    //     'display': ['Fractal Engine Limit OFF', 'Fractal Engine Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="fractalEngineMax" onclick="updateFractalEngineMax(\'fractalEngineMax\');">${fractalEngineMax} Fractal Engines</a>'
    // },
    // 'consoleLimit': {
    //     'hint': 'Limit max number of Javascript Consoles that AutoBuy will purchase',
    //     'display': ['Javascript Console Limit OFF', 'Javascript Console Limit ON'],
    //     'default': 0,
    //     'extras': '<a class="option" id="consoleMax" onclick="updateConsoleMax(\'consoleMax\');">${consoleMax} Javascript Consoles</a>'
    // },

    // other auto options
    'autoOtherOptions': {
        'hint': 'Other automatic actions:'
    },
    'autoAscend': {
        'hint': 'Automatically ascend when your heavenly chip count hits a certain number. (Note: this will skip the upgrade screen)',
        'display': ["Autoascend OFF", "Autoascend ON"],
        'default': 0,
        'extras': '<a class="option" id="chipsToAscend" onclick="updateAscendAmount(\'HCAscendAmount\');">${HCAscendAmount} heavenly chips</a>'
    },
    'autoWrinkler': {
        'hint': 'Automatically pop wrinklers efficiently (calculated timing to balance cookies vs. upgrades) or instantly',
        'display': ['Autopop Wrinklers OFF', 'Autopop Wrinklers EFFICIENTLY', 'Autopop Wrinklers INSTANTLY'],
        'default': 0
    },
    'autoSL': {
        'hint': 'Automatically harvest sugar lumps when ripe, with option to automatically swap in Rigidel',
        'display': ["Autoharvest SL OFF", "Autoharvest SL ON", "Autoharvest SL ON + AUTO RIGIDEL"],
        'default': 0
    },
    'autoGS': {
        'hint': 'Automatically turn on the Golden Switch during Dragonflight and Click Frenzy (and turn back off at the end)',
        'display': ['Auto-GS-Switch OFF', 'Auto-GS-Switch ON'],
        'default': 0
    },
    'autoGodzamok': {
        'hint': 'During click buffs and other bonuses, automatically sell buildings to get the Devastation bonus if you worship Godzamok',
        'display': ['Auto-Godzamok OFF', 'Auto-Godzamok ON'],
        'default': 0
    },
    'autoSpell': {
        'hint': 'Automatically cast selected spell when your mana is full',
        'display': ["Auto Cast OFF", "Auto Cast CONJURE BAKED GOODS", "Auto Cast FORCE THE HAND OF FATE", "Auto Cast SPONTANEOUS EDIFICE", "Auto Cast HAGGLER'S CHARM (cheapest)"],
        'default': 0,
        'extras': '<a class="option" id="minCpSMult" onclick="updateCpSMultMin(\'minCpSMult\');">x${minCpSMult} minimum Frenzy</a>'
    },

    //Display options
    'displayOptions': {
        'hint': 'Display options:'
    },
    'numberDisplay': {
        'hint': 'Change how numbers are shortened',
        'display': ["Number Display RAW", "Number Display FULL (million, billion)", "Number Display INITIALS (M, B)", "Number Display SI UNITS (M, G, T)", "Number Display SCIENTIFIC (6.3e12)"],
        'default': 1
    },
    'fancyUI': {
        'hint': 'Infobox type (can be slow)',
        'display': ['Infobox OFF', 'Infobox TEXT ONLY', 'Infobox WHEEL ONLY', 'Infobox WHEEL & TEXT'],
        'default': 0
    },

    //Other options
    'otherOptions': {
        'hint': 'Other options:'
    },
    /*Not working yet
    'shinyPop':{
        'hint':'Protect the endangered Shiny Wrinkler from being auomatically popped',
        'display':['Save Shiny Wrinklers ON', 'Save Shiny Wrinklers OFF'],
        'default':0
    },
    */
    'holdSEBank': {
        'hint': 'Maintain a bank for Spontaneous Edifice (already enabled if Auto Casting SE)',
        'display': ["SE Bank OFF", "SE Bank ON"],
        'default': 0
    },
    'setHarvestBankPlant': {
        'hint': 'Maintain a bank for a specific plant you are going to harvest/let explode',
        'display': ['Harvesting Bank OFF', 'Harvesting Bank BAKEBERRY', 'Harvesting Bank CHOCOROOT', 'Harvesting Bank WHITE CHOCOROOT', 'Harvesting Bank QUEEENBEET', 'Harvesting Bank DUKETATER', 'Harvesting Bank CRUMBSPORE', 'Harvesting Bank DOUGHSHROOM'],
        'default': 0
    },
    'setHarvestBankType': {
        'hint': 'Calculate the needed harvesting bank based on whether a CPS multiplier is in effect when you intend to harvest (no effect if no plant was selected above).',
        'display': ['Harvesting during NO CPS MULTIPLER', 'Harvesting during FRENZY', 'Harvesting during BUILDING SPECIAL', 'Harvesting during FRENZY + BUILDING SPECIAL'],
        'default': 0,
        'extras': '<a class="option" id="maxSpecials" onclick="updateMaxSpecials(\'maxSpecials\');">${maxSpecials} Building specials</a>'
    },
    /*
    'timeTravelMethod':{
        'hint':'Time travel is unstable. This determines how time travel works. If you\'re unsure, don\'t touch this.',
        'display':['Time Travel DISABLED'],//, 'Purchases by Estimated Effective CPS', 'Purchases by Simulated Real Time', 'Heavenly Chips by Estimated Effective CPS', 'Heavenly Chips by Simulated Real Time'],
        'default':0,
        'extras':'<a class="option" id="timeTravelPurchases" onclick="updateTimeTravelAmount();">Set Time Travel Amount</a>'
    },
    */
    'simulatedGCPercent': {
        'hint': 'Assume a percentage of Golden Cookies as "clicked" for GC efficiency calculations (100% recommended)',
        'display': ["0%", "100%"],
        'default': 1
    },
    'fpsModifier': {
        'hint': 'Run the game at the selected frame rate (browser default is 30). 60 is twice as fast, 15 is half as fast, etc. If you\'re not sure, keep this at 30',
        'display': ['Frame Rate 15 fps', 'Frame Rate 24 fps', 'Frame Rate 30 fps', 'Frame Rate 48 fps', 'Frame Rate 60 fps', 'Frame Rate 2 fps', 'Frame Rate 88 fps', 'Frame Rate 100 fps', 'Frame Rate 120 fps', 'Frame Rate 144 fps', 'Frame Rate 200 fps', 'Frame Rate 240 fps', 'Frame Rate 300 fps', 'Frame Rate 5 fps', 'Frame Rate 10 fps'],
        'default': 2
    },
    'logging': {
        'hint': 'Display detailed logs in the javascript console',
        'display': ['Logging OFF', 'Logging ON'],
        'default': 1
    },
    'trackStats': {
        'hint': 'Track your CpS / HC earned over time during a single session to enable graphing. This may end up being *extremely* memory-intensive',
        'display': ['Tracking OFF', 'Tracking EVERY 60s', 'Tracking EVERY 30m', 'Tracking EVERY 1h', 'Tracking EVERY 24h', 'Tracking ON UPGRADES', 'Tracking SMART TIMING'],
        'default': 0,
        'extras': '<a class="option" id="viewStats" onclick="viewStatGraphs();">View Stat Graphs</a>'
    },

    /*Doesnt work
    'showAchievements':{
        'hint':'Show achievement popups (Kind of broken early game)',
        'display':['Achievement Popups OFF', 'Achievement Popups ON'],
        'default':0
    },
    */

    'defaultSeason': {
        'hint': 'Autobuy a selected season when no others have needed upgrades',
        'display': ['Default Season OFF', 'Default Season BUSINESS DAY', 'Default Season CHRISTMAS', 'Default Season EASTER', 'Default Season HALLOWEEN', "Default Season VALENTINE'S DAY"],
        'default': 0
    }
};
