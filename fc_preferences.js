FrozenCookies.preferenceValues = {

    // clicking options
    'clickingOptions':{
        'hint':'Auto clicking options:'
    },
    'autoClick':{
        'hint':'Click the large cookie',
        'display':['Autoclick OFF', 'Autoclick ON'],
        'default':0,
        'extras':'<a class="option" id="cookieClickSpeed" onclick="updateSpeed(\'cookieClickSpeed\');">${cookieClickSpeed} clicks/sec</a>'
    },
    'autoFrenzy':{
        'hint':'Click the large cookie during Clicking Frenzies',
        'display':['Autofrenzy OFF', 'Autofrenzy ON'],
        'default':0,
        'extras':'<a class="option" id="frenzyClickSpeed" onclick="updateSpeed(\'frenzyClickSpeed\');">${frenzyClickSpeed} clicks/sec</a>'
    },
    'autoGC':{
        'hint':'Automatically click Golden Cookies when they appear',
        'display':["Autoclick GC OFF", "Autoclick GC ON"],
        'default':0
    },
       'autoReindeer':{
        'hint':'Automatically click reindeer',
        'display':['Autoclick Reindeer OFF', 'Autoclick Reindeer ON'],
        'default':0
    },
    'autoFortune':{
        'hint':'Automatically click the news ticker when Fortune News appears',
        'display':["Auto Fortune OFF","Auto Fortune ON"],
        'default':0
    },

    // autobuy options
    'buyingOptions':{
        'hint':'Auto buying options:'
    },
    'autoBuy':{
        'hint':'Automatically buy the most efficient building when you\'ve met its cost',
        'display':["Autobuy OFF","Autobuy ON"],
        'default':0
    },
    'autoBulk':{
        'hint':'Automatically set buildings to be bought in bulk after reincarnation',
        'display':['Auto Bulkbuy OFF', 'Auto Bulkbuy x10', 'Auto Bulkbuy x100'],
        'default':0
    },
    'autoBlacklistOff':{
        'hint':'Automatically turns off a blacklist once the goal for that blacklist is achieved',
        'display':['Auto Blacklist OFF', 'Auto Blacklist ON'],
        'default':0
    },
    'blacklist':{
        'hint':'Blacklist purchases from the efficiency calculations',
        'display':['No Blacklist', 'Speedrun Blacklist', 'Hardcore Blacklist', 'Grandmapocalypse Mode', 'No Buildings'],
        'default':0
    },
    'cursorLimit':{
        'hint':'Limit max number of cursors to keep Godzamok useful',
        'display':['Cursor Limit OFF','Cursor Limit ON'],
        'default':0,
        'extras':'<a class="option" id="cursorMax" onclick="updateCursorMax(\'cursorMax\');">${cursorMax} cursors</a>'
    },
    'farmLimit':{
        'hint':'Limit max number of farms to keep Godzamok useful',
        'display':['Farm Limit OFF','Farm Limit ON'],
        'default':0,
        'extras':'<a class="option" id="farmMax" onclick="updateFarmMax(\'farmMax\');">${farmMax} farms</a>'
    },
    'towerLimit':{
        'hint':'Stop Autobuying Wizard Towers at selected Max Mana, for spellcasting efficiency',
        'display':['Wizard Tower Cap OFF','Wizard Tower Cap ON'],
        'default':0,
        'extras':'<a class="option" id="manaMax" onclick="updateManaMax(\'manaMax\');">${manaMax} max Mana</a>'
    },
    'pastemode':{
        'hint':'Always autobuy the least efficient purchase. This is a stupid idea, you should never turn this on.',
        'display':['Pastemode OFF','Pastemode ON'],
        'default':0
    },

    //Display options
    'displayOptions':{
        'hint':'Display options:'
    },
    'numberDisplay':{
        'hint':'Change how numbers are shortened',
        'display':["Raw Numbers","Full Word (million, billion)","Initials (M, B)","SI Units (M, G, T)", "Scientific Notation (6.3e12)"],
        'default':1
    },
    'fancyui':{
        'hint':'As these graphics are very slow, enable it here.',
        'display':['No graphic','Textbox only','Wheel only','Full graphics'],
        'default':0
    },

    //Other options
    'otherOptions':{
        'hint':'Other options:'
    },
    'autoAscend':{
        'hint':'Automatically ascend when your heavenly chip count hits a certain number. (note: this will skip the upgrade screen)',
        'display':["Autoascend OFF", "Autoascend ON"],
        'default':0,
        'extras':'<a class="option" id="chipsToAscend" onclick="updateAscendAmount(\'HCAscendAmount\');">${HCAscendAmount} heavenly chips</a>'
    },

    'autoWrinkler':{
        'hint':'Automatically pop wrinklers efficiently or instantly',
        'display':['Autopop Wrinklers OFF', 'Autopop Wrinklers Efficiently', 'Autopop Wrinklers Instantly'],
        'default':0
    },
/*Not working yet
    'shinyPop':{
        'hint':'Protect the endangered Shiny Wrinkler from being auomatically popped',
        'display':['Save Shiny Wrinklers ON', 'Save Shiny Wrinklers OFF'],
        'default':0
    },*/
    'autoSL':{
        'hint':'Automatically harvest sugar lumps when ripe, with option to automatically swap in Rigidel',
        'display':["Autoharvest SL OFF", "Autoharvest SL ON", "Autoharvest SL ON + Auto Rigidel"],
        'default':0
    },
    'autoGS':{
        'hint':'Automatically turn on the Golden Switch during Dragonflight and Click Frenzy (and turn back off at the end)',
        'display':['Auto-Switch OFF','Auto-Switch ON'],
        'default':0
    },
    'autoGodzamok':{
        'hint':'Automatically sell all cursors and farms (except one) during Dragonflight and Click Frenzy if you worship Godzamok',
        'display':['Auto-Godzamok OFF','Auto-Godzamok ON (Rebuy up to limit)','Auto-Godzamok ON (Rebuy all)'],
        'default':0
    },
    'autoSpell':{
        'hint':'Automatically cast selected spell when your mana is full',
        'display':["Auto Cast OFF","Auto Cast: Conjure Baked Goods","Auto Cast: Force the Hand of Fate","Auto Cast: Spontaneous Edifice","Auto Cast: Haggler's Charm (cheapest)"],
        'default':0,
        'extras':'<a class="option" id="minCpSMult" onclick="updateCpSMultMin(\'minCpSMult\');">x${minCpSMult} minimum Frenzy</a>'
    },
    'holdSEBank':{
        'hint':'Maintain a bank for Spontaneous Edifice (already enabled if Auto Casting SE)',
        'display':["SE Bank OFF","SE Bank ON"],
        'default':0
    },
    'setHarvestBankPlant':{
        'hint':'Choose the plant you are going to harvest/let explode.',
        'display':['No harvesting Bank','Bakeberry Bank','Chocoroot Bank','White Chocoroot Bank','Queenbeet Bank','Duketater Bank','Crumbspore Bank','Doughshroom Bank'],
        'default':0
    },
    'setHarvestBankType':{
        'hint':'Choose a scenario that you want for harvesting to calculate the needed Bank (no effect if no plant was selected above).',
        'display':['No CpS multiplier','Frenzy','Building special','Frenzy + Building special'],
        'default':0,
        'extras':'<a class="option" id="maxSpecials" onclick="updateMaxSpecials(\'maxSpecials\');">${maxSpecials} Building specials</a>'
    },

/*  'timeTravelMethod':{
        'hint':'Time travel is unstable. This determines how time travel works. If you\'re unsure, don\'t touch this.',
        'display':['Time Travel DISABLED'],//,'Purchases by Estimated Effective CPS','Purchases by Simulated Real Time','Heavenly Chips by Estimated Effective CPS','Heavenly Chips by Simulated Real Time'],
        'default':0,
        'extras':'<a class="option" id="timeTravelPurchases" onclick="updateTimeTravelAmount();">Set Time Travel Amount</a>'
    },*/

    'simulatedGCPercent':{
        'hint':'What percentage of Golden Cookies should be assumed as "clicked" for GC efficiency calculations (100% recommended)',
        'display':["0%","100%"],
        'default':1
    },
    'fpsModifier':{
        'hint':'The frame rate at which the game runs. 60 is twice as fast, 15 is half as fast, etc. If you\'re not sure, keep this at 30',
        'display':['24', '30', '48', '60', '72', '88', '100', '120', '144', '200', '240', '300','5', '10', '15'],
        'default':2
    },
    'logging':{
        'hint':'Display detailed logs in the javascript console',
        'display':['Logging OFF', 'Logging ON'],
        'default':1
    },
    'trackStats':{
        'hint':'Track your CPS/HC earned over time during a single session to enable graphing. This may end up being *extremely* memory-intensive',
        'display':['Tracking OFF', 'Every 60s', 'Every 30m', 'Every 1h', 'Every 24h', 'On upgrades', 'Smart Timing'],
        'default':0,
        'extras':'<a class="option" id="viewStats" onclick="viewStatGraphs();">View Stat Graphs</a>'
    },
    
    /*Doesnt work
    'showAchievements':{
        'hint':'Show achievement popups (Kind of broken early game)',
        'display':['Achievement Popups OFF','Achievement Popups ON'],
        'default':0
    },
    */

    'defaultSeason':{
        'hint':'Season to maintain when no others have needed upgrades',
        'display':['Default Season: None','Default Season: Business Day','Default Season: Christmas','Default Season: Easter','Default Season: Halloween',"Default Season: Valentine's Day"],
        'default':0
    }
};
