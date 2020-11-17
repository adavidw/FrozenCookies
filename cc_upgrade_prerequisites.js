// This variable builds a list of upgrades that have prerequisites.
// With this list, the recommendation engine can include them even before the prerequisites are met.
// (useful for determining chain strategies) or tracking what's left




// for (k = 11; k < 18; k++) {
//     console.log("    // " + Game.ObjectsById[k].name + " tiered upgrades");
//     for (i in upgradeJson) {
//         if (Game.UpgradesById[i].buildingTie.id === k &&
//             Game.UpgradesById[i].pool != "tech" &&
//             Game.UpgradesById[i].tier != "fortune") {
//             var tiers = [0, 1, 5, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]
//             var zeros = "[";
//             while (zeros.length < (k * 2 + 1)) {
//                 zeros += "0,";
//             }

//             var string = (i + ": {'buildings': " + zeros + tiers[Game.UpgradesById[i].tier] + "], 'upgrades': []},");
//             console.log(string + (
//                 (string.length % 4) ?
//                     ((string.length % 4 == 1) ? "   " : ((string.length % 4 == 2) ? "  " : " "))
//                     : "    "
//             ) +
//                 "// " + Game.UpgradesById[i].name);
//         }
//     }
//     console.log("");
// }



var upgradeJson = {
    // Cursor tiered upgrades
    0: {'buildings': [1], 'upgrades': []},
    1: {'buildings': [1], 'upgrades': []},
    2: {'buildings': [10], 'upgrades': []},
    3: {'buildings': [25], 'upgrades': []},
    4: {'buildings': [50], 'upgrades': []},
    5: {'buildings': [100], 'upgrades': []},
    6: {'buildings': [150], 'upgrades': []},
    43: {'buildings': [200], 'upgrades': []},
    82: {'buildings': [250], 'upgrades': []},
    109: {'buildings': [300], 'upgrades': []},
    188: {'buildings': [350], 'upgrades': []},
    189: {'buildings': [400], 'upgrades': []},
    660: {'buildings': [450], 'upgrades': []},

    // Grandma tiered upgrades
    7: {'buildings': [0,1], 'upgrades': []},    // Forwards from grandma
    8: {'buildings': [0,5], 'upgrades': []},    // Steel-plated rolling pins
    9: {'buildings': [0,25], 'upgrades': []},   // Lubricated dentures
    44: {'buildings': [0,50], 'upgrades': []},  // Prune juice
    110: {'buildings': [0,100], 'upgrades': []},    // Double-thick glasses
    192: {'buildings': [0,150], 'upgrades': []},    // Aging agents
    294: {'buildings': [0,200], 'upgrades': []},    // Xtreme walkers
    307: {'buildings': [0,250], 'upgrades': []},    // The Unbridling
    428: {'buildings': [0,300], 'upgrades': []},    // Reverse dementia
    480: {'buildings': [0,350], 'upgrades': []},    // Timeproof hair dyes
    506: {'buildings': [0,400], 'upgrades': []},    // Good manners
    662: {'buildings': [0,450], 'upgrades': []},    // Generation degeneration
    700: {'buildings': [0,500], 'upgrades': []},    // Visits

    // Farm tiered upgrades
    10: {'buildings': [0,0,1], 'upgrades': []},   // Cheap hoes
    11: {'buildings': [0,0,5], 'upgrades': []},   // Fertilizer
    12: {'buildings': [0,0,25], 'upgrades': []},  // Cookie trees
    45: {'buildings': [0,0,50], 'upgrades': []},  // Genetically-modified cookies
    111: {'buildings': [0,0,100], 'upgrades': []},    // Gingerbread scarecrows
    193: {'buildings': [0,0,150], 'upgrades': []},    // Pulsar sprinklers
    295: {'buildings': [0,0,200], 'upgrades': []},    // Fudge fungus
    308: {'buildings': [0,0,250], 'upgrades': []},    // Wheat triffids
    429: {'buildings': [0,0,300], 'upgrades': []},    // Humane pesticides
    481: {'buildings': [0,0,350], 'upgrades': []},    // Barnstars
    507: {'buildings': [0,0,400], 'upgrades': []},    // Lindworms
    663: {'buildings': [0,0,450], 'upgrades': []},    // Global seed vault
    701: {'buildings': [0,0,500], 'upgrades': []},    // Reverse-veganism

    // Mine tiered upgrades
    16: {'buildings': [0,0,0,1], 'upgrades': []},   // Sugar gas
    17: {'buildings': [0,0,0,5], 'upgrades': []},   // Megadrill
    18: {'buildings': [0,0,0,25], 'upgrades': []},  // Ultradrill
    47: {'buildings': [0,0,0,50], 'upgrades': []},  // Ultimadrill
    113: {'buildings': [0,0,0,100], 'upgrades': []},    // H-bomb mining
    195: {'buildings': [0,0,0,150], 'upgrades': []},    // Coreforge
    296: {'buildings': [0,0,0,200], 'upgrades': []},    // Planetsplitters
    309: {'buildings': [0,0,0,250], 'upgrades': []},    // Canola oil wells
    430: {'buildings': [0,0,0,300], 'upgrades': []},    // Mole people
    482: {'buildings': [0,0,0,350], 'upgrades': []},    // Mine canaries
    508: {'buildings': [0,0,0,400], 'upgrades': []},    // Bore again
    664: {'buildings': [0,0,0,450], 'upgrades': []},    // Air mining
    702: {'buildings': [0,0,0,500], 'upgrades': []},    // Caramel alloys

    // Factory tiered upgrades
    13: {'buildings': [0,0,0,0,1], 'upgrades': []},   // Sturdier conveyor belts
    14: {'buildings': [0,0,0,0,5], 'upgrades': []},   // Child labor
    15: {'buildings': [0,0,0,0,25], 'upgrades': []},  // Sweatshop
    46: {'buildings': [0,0,0,0,50], 'upgrades': []},  // Radium reactors
    112: {'buildings': [0,0,0,0,100], 'upgrades': []},    // Recombobulators
    194: {'buildings': [0,0,0,0,150], 'upgrades': []},    // Deep-bake process
    297: {'buildings': [0,0,0,0,200], 'upgrades': []},    // Cyborg workforce
    310: {'buildings': [0,0,0,0,250], 'upgrades': []},    // 78-hour days
    431: {'buildings': [0,0,0,0,300], 'upgrades': []},    // Machine learning
    483: {'buildings': [0,0,0,0,350], 'upgrades': []},    // Brownie point system
    509: {'buildings': [0,0,0,0,400], 'upgrades': []},    // "Volunteer" interns
    665: {'buildings': [0,0,0,0,450], 'upgrades': []},    // Behavioral reframing
    703: {'buildings': [0,0,0,0,500], 'upgrades': []},    // The infinity engine

    // Bank tiered upgrades
    232: {'buildings': [0,0,0,0,0,1], 'upgrades': []},  // Taller tellers
    233: {'buildings': [0,0,0,0,0,5], 'upgrades': []},  // Scissor-resistant credit cards
    234: {'buildings': [0,0,0,0,0,25], 'upgrades': []}, // Acid-proof vaults
    235: {'buildings': [0,0,0,0,0,50], 'upgrades': []}, // Chocolate coins
    236: {'buildings': [0,0,0,0,0,100], 'upgrades': []},    // Exponential interest rates
    237: {'buildings': [0,0,0,0,0,150], 'upgrades': []},    // Financial zen
    298: {'buildings': [0,0,0,0,0,200], 'upgrades': []},    // Way of the wallet
    311: {'buildings': [0,0,0,0,0,250], 'upgrades': []},    // The stuff rationale
    432: {'buildings': [0,0,0,0,0,300], 'upgrades': []},    // Edible money
    484: {'buildings': [0,0,0,0,0,350], 'upgrades': []},    // Grand supercycles
    510: {'buildings': [0,0,0,0,0,400], 'upgrades': []},    // Rules of acquisition
    666: {'buildings': [0,0,0,0,0,450], 'upgrades': []},    // Altruistic loop
    704: {'buildings': [0,0,0,0,0,500], 'upgrades': []},    // Diminishing tax returns

    // Temple tiered upgrades
    238: {'buildings': [0,0,0,0,0,0,1], 'upgrades': []},    // Golden idols
    239: {'buildings': [0,0,0,0,0,0,5], 'upgrades': []},    // Sacrifices
    240: {'buildings': [0,0,0,0,0,0,25], 'upgrades': []},   // Delicious blessing
    241: {'buildings': [0,0,0,0,0,0,50], 'upgrades': []},   // Sun festival
    242: {'buildings': [0,0,0,0,0,0,100], 'upgrades': []},  // Enlarged pantheon
    243: {'buildings': [0,0,0,0,0,0,150], 'upgrades': []},  // Great Baker in the sky
    299: {'buildings': [0,0,0,0,0,0,200], 'upgrades': []},  // Creation myth
    312: {'buildings': [0,0,0,0,0,0,250], 'upgrades': []},  // Theocracy
    433: {'buildings': [0,0,0,0,0,0,300], 'upgrades': []},  // Sick rap prayers
    485: {'buildings': [0,0,0,0,0,0,350], 'upgrades': []},  // Psalm-reading
    511: {'buildings': [0,0,0,0,0,0,400], 'upgrades': []},  // War of the gods
    667: {'buildings': [0,0,0,0,0,0,450], 'upgrades': []},  // A novel idea
    705: {'buildings': [0,0,0,0,0,0,500], 'upgrades': []},  // Apparitions

    // Wizard Tower tiered upgrades
    244: {'buildings': [0,0,0,0,0,0,0,1], 'upgrades': []},  // Pointier hats
    245: {'buildings': [0,0,0,0,0,0,0,5], 'upgrades': []},  // Beardlier beards
    246: {'buildings': [0,0,0,0,0,0,0,25], 'upgrades': []}, // Ancient grimoires
    247: {'buildings': [0,0,0,0,0,0,0,50], 'upgrades': []}, // Kitchen curses
    248: {'buildings': [0,0,0,0,0,0,0,100], 'upgrades': []},    // School of sorcery
    249: {'buildings': [0,0,0,0,0,0,0,150], 'upgrades': []},    // Dark formulas
    300: {'buildings': [0,0,0,0,0,0,0,200], 'upgrades': []},    // Cookiemancy
    313: {'buildings': [0,0,0,0,0,0,0,250], 'upgrades': []},    // Rabbit trick
    434: {'buildings': [0,0,0,0,0,0,0,300], 'upgrades': []},    // Deluxe tailored wands
    486: {'buildings': [0,0,0,0,0,0,0,350], 'upgrades': []},    // Immobile spellcasting
    512: {'buildings': [0,0,0,0,0,0,0,400], 'upgrades': []},    // Electricity
    668: {'buildings': [0,0,0,0,0,0,0,450], 'upgrades': []},    // Spelling bees
    706: {'buildings': [0,0,0,0,0,0,0,500], 'upgrades': []},    // Wizard basements

    // Shipment tiered upgrades
    19: {'buildings': [0,0,0,0,0,0,0,0,1], 'upgrades': []}, // Vanilla nebulae
    20: {'buildings': [0,0,0,0,0,0,0,0,5], 'upgrades': []}, // Wormholes
    21: {'buildings': [0,0,0,0,0,0,0,0,25], 'upgrades': []},    // Frequent flyer
    48: {'buildings': [0,0,0,0,0,0,0,0,50], 'upgrades': []},    // Warp drive
    114: {'buildings': [0,0,0,0,0,0,0,0,100], 'upgrades': []},  // Chocolate monoliths
    196: {'buildings': [0,0,0,0,0,0,0,0,150], 'upgrades': []},  // Generation ship
    301: {'buildings': [0,0,0,0,0,0,0,0,200], 'upgrades': []},  // Dyson sphere
    314: {'buildings': [0,0,0,0,0,0,0,0,250], 'upgrades': []},  // The final frontier
    435: {'buildings': [0,0,0,0,0,0,0,0,300], 'upgrades': []},  // Autopilot
    487: {'buildings': [0,0,0,0,0,0,0,0,350], 'upgrades': []},  // Restaurants at the end of the universe
    513: {'buildings': [0,0,0,0,0,0,0,0,400], 'upgrades': []},  // Universal alphabet
    669: {'buildings': [0,0,0,0,0,0,0,0,450], 'upgrades': []},  // Toroid universe
    707: {'buildings': [0,0,0,0,0,0,0,0,500], 'upgrades': []},  // Prime directive

    // Alchemy lab tiered upgrades
    22: {'buildings': [0,0,0,0,0,0,0,0,0,1], 'upgrades': []},   // Antimony
    23: {'buildings': [0,0,0,0,0,0,0,0,0,5], 'upgrades': []},   // Essence of dough
    24: {'buildings': [0,0,0,0,0,0,0,0,0,25], 'upgrades': []},  // True chocolate
    49: {'buildings': [0,0,0,0,0,0,0,0,0,50], 'upgrades': []},  // Ambrosia
    115: {'buildings': [0,0,0,0,0,0,0,0,0,100], 'upgrades': []},    // Aqua crustulae
    197: {'buildings': [0,0,0,0,0,0,0,0,0,150], 'upgrades': []},    // Origin crucible
    302: {'buildings': [0,0,0,0,0,0,0,0,0,200], 'upgrades': []},    // Theory of atomic fluidity
    315: {'buildings': [0,0,0,0,0,0,0,0,0,250], 'upgrades': []},    // Beige goo
    436: {'buildings': [0,0,0,0,0,0,0,0,0,300], 'upgrades': []},    // The advent of chemistry
    488: {'buildings': [0,0,0,0,0,0,0,0,0,350], 'upgrades': []},    // On second thought
    514: {'buildings': [0,0,0,0,0,0,0,0,0,400], 'upgrades': []},    // Public betterment
    670: {'buildings': [0,0,0,0,0,0,0,0,0,450], 'upgrades': []},    // Hermetic reconciliation
    708: {'buildings': [0,0,0,0,0,0,0,0,0,500], 'upgrades': []},    // Chromatic cycling

    // Portal tiered upgrades
    25: {'buildings': [0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []}, // Ancient tablet
    26: {'buildings': [0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []}, // Insane oatling workers
    27: {'buildings': [0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []},    // Soul bond
    50: {'buildings': [0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []},    // Sanity dance
    116: {'buildings': [0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},  // Brane transplant
    198: {'buildings': [0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},  // Deity-sized portals
    303: {'buildings': [0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},  // End of times back-up plan
    316: {'buildings': [0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},  // Maddening chants
    437: {'buildings': [0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},  // The real world
    489: {'buildings': [0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},  // Dimensional garbage gulper
    515: {'buildings': [0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},  // Embedded microportals
    671: {'buildings': [0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},  // His advent
    709: {'buildings': [0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},  // Domestic rifts

    // Time machine tiered upgrades
    28: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},   // Flux capacitors
    29: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},   // Time paradox resolver
    30: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []},  // Quantum conundrum
    51: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []},  // Causality enforcer
    117: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},    // Yestermorrow comparators
    199: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},    // Far future enactment
    304: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},    // Great loop hypothesis
    317: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},    // Cookietopian moments of maybe
    438: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},    // Second seconds
    490: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},    // Additional clock hands
    516: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},    // Nostalgia
    672: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},    // Split seconds
    710: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},    // Patience abolished

    // Antimatter condenser tiered upgrades
    99: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []}, // Sugar bosons
    100: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},    // String theory
    101: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []},   // Large macaron collider
    102: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []},   // Big bang bake
    118: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},  // Reverse cyclotrons
    200: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},  // Nanocosmics
    305: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},  // The Pulse
    318: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},  // Some other super-tiny fundamental particle? Probably?
    439: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},  // Quantum comb
    491: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},  // Baking Nobel prize
    517: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},  // The definite molecule
    673: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},  // Flavor itself
    711: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},  // Delicious pull

    // Prism tiered upgrades
    175: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},  // Gem polish
    176: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},  // 9th color
    177: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []}, // Chocolate light
    178: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []}, // Grainbow
    179: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},    // Pure cosmic light
    201: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},    // Glow-in-the-dark
    306: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},    // Lux sanctorum
    319: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},    // Reverse shadows
    440: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},    // Crystal mirrors
    492: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},    // Reverse theory of light
    518: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},    // Light capture measures
    674: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},    // Light speed limit
    712: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},    // Occam's laser

    // Chancemaker tiered upgrades
    416: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},    // Your lucky cookie
    417: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},    // "All Bets Are Off" magic coin
    418: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []},   // Winning lottery ticket
    419: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []},   // Four-leaf clover field
    420: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},  // A recipe book about books
    421: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},  // Leprechaun village
    422: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},  // Improbability drive
    423: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},  // Antisuperstistronics
    441: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},  // Bunnypedes
    493: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},  // Revised probabilistics
    519: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},  // 0-sided dice
    675: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},  // A touch of determinism
    713: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},  // On a streak

    // Fractal engine tiered upgrades
    522: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},  // Metabakeries
    523: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},  // Mandelbrown sugar
    524: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []}, // Fractoids
    525: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []}, // Nested universe theory
    526: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},    // Menger sponge cake
    527: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},    // One particularly good-humored cow
    528: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},    // Chocolate ouroboros
    529: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},    // Nested
    530: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},    // Space-filling fibers
    531: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},    // Endless book of prose
    532: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},    // The set of all sets
    676: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},    // This upgrade
    714: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},    // A box

    // Javascript console tiered upgrades
    594: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},    // The JavaScript console for dummies
    595: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},    // 64bit arrays
    596: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []},   // Stack overflow
    597: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []},   // Enterprise compiler
    598: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},  // Syntactic sugar
    599: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},  // A nice cup of coffee
    600: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},  // Just-in-time baking
    601: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},  // cookies++
    602: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},  // Software updates
    603: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},  // Game.Loop
    604: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},  // eval()
    677: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},  // Your biggest fans
    715: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},  // Hacker shades

    // Idleverse tiered upgrades
    684: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 'upgrades': []},  // Manifest destiny
    685: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5], 'upgrades': []},  // The multiverse in a nutshell
    686: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25], 'upgrades': []}, // All-conversion
    687: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50], 'upgrades': []}, // Multiverse agents
    688: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100], 'upgrades': []},    // Escape plan
    689: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150], 'upgrades': []},    // Game design
    690: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200], 'upgrades': []},    // Sandbox universes
    691: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,250], 'upgrades': []},    // Multiverse wars
    692: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,300], 'upgrades': []},    // Mobile ports
    693: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,350], 'upgrades': []},    // Encapsulated realities
    694: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,400], 'upgrades': []},    // Extrinsic clicking
    695: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,450], 'upgrades': []},    // Universal idling
    716: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,500], 'upgrades': []},    // Break the fifth wall

    // Grandma upgrades
    57: {'buildings': [0,1,15], 'upgrades': []},
    58: {'buildings': [0,1,0,15], 'upgrades': []},
    59: {'buildings': [0,1,0,0,15], 'upgrades': []},
    60: {'buildings': [0,1,0,0,0,15], 'upgrades': []},
    61: {'buildings': [0,1,0,0,0,0,15], 'upgrades': []},
    62: {'buildings': [0,1,0,0,0,0,0,15], 'upgrades': []},
    63: {'buildings': [0,1,0,0,0,0,0,0,15], 'upgrades': []},
    103: {'buildings': [0,1,0,0,0,0,0,0,0,15], 'upgrades': []},
    180: {'buildings': [0,1,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    250: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    251: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    252: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    415: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    521: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    593: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    683: {'buildings': [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': []},
    
    // Synergies
    369: {'buildings': [0,0,15,0,0,0,0,0,0,0,0,15,0,0,0], 'upgrades': [393]},
    370: {'buildings': [0,0,75,0,0,0,75,0,0,0,0,0,0,0,0], 'upgrades': [394]},
    371: {'buildings': [0,0,0,15,0,0,0,15,0,0,0,0,0,0,0], 'upgrades': [393]},
    372: {'buildings': [0,0,0,75,0,0,0,0,75,0,0,0,0,0,0], 'upgrades': [394]},
    373: {'buildings': [0,0,0,0,15,0,0,0,0,0,0,0,15,0,0], 'upgrades': [393]},
    374: {'buildings': [0,0,0,0,75,0,0,0,0,0,0,75,0,0,0], 'upgrades': [394]},
    375: {'buildings': [0,0,0,0,0,15,0,0,0,0,15,0,0,0,0], 'upgrades': [393]},
    376: {'buildings': [0,0,0,0,75,75,0,0,0,0,0,0,0,0,0], 'upgrades': [394]},
    377: {'buildings': [0,0,0,0,0,0,15,0,0,0,15,0,0,0,0], 'upgrades': [393]},
    378: {'buildings': [0,0,0,0,0,0,75,0,0,0,0,0,75,0,0], 'upgrades': [394]},
    379: {'buildings': [0,0,0,0,0,0,0,15,0,15,0,0,0,0,0], 'upgrades': [393]},
    380: {'buildings': [0,0,75,0,0,0,0,75,0,0,0,0,0,0,0], 'upgrades': [394]},
    381: {'buildings': [0,0,0,15,0,0,0,0,15,0,0,0,0,0,0], 'upgrades': [393]},
    382: {'buildings': [0,0,0,0,75,0,0,0,15,0,0,0,0,0,0], 'upgrades': [394]},
    383: {'buildings': [0,0,0,15,0,0,0,0,0,15,0,0,0,0,0], 'upgrades': [393]},
    384: {'buildings': [0,0,0,0,0,75,0,0,0,75,0,0,0,0,0], 'upgrades': [394]},
    385: {'buildings': [0,0,15,0,0,0,0,0,0,0,15,0,0,0,0], 'upgrades': [393]},
    386: {'buildings': [0,0,0,0,0,0,0,0,0,0,75,0,0,75,0], 'upgrades': [394]},
    387: {'buildings': [0,0,0,0,0,0,0,0,15,0,0,15,0,0,0], 'upgrades': [393]},
    388: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,75,0,75,0], 'upgrades': [394]},
    389: {'buildings': [0,0,0,0,0,15,0,0,0,0,0,0,15,0,0], 'upgrades': [393]},
    390: {'buildings': [0,0,0,0,0,0,0,0,0,75,0,0,75,0,0], 'upgrades': [394]},
    391: {'buildings': [0,0,0,0,0,0,0,15,0,0,0,0,0,15,0], 'upgrades': [393]},
    392: {'buildings': [0,0,0,0,0,0,75,0,0,0,0,0,0,75,0], 'upgrades': [394]},
    424: {'buildings': [0,0,0,15,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [393]},
    443: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,75,0,75], 'upgrades': [394]},
    533: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,15], 'upgrades': [393]},
    534: {'buildings': [75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,75], 'upgrades': [394]},
    605: {'buildings': [0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [393]},
    606: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,75,0,75], 'upgrades': [394]},
    696: {'buildings': [0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,15], 'upgrades': [393]},
    697: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,75,0,75], 'upgrades': [394]},

    // Fortune upgrades - Requires "Fortune cookies" heavenly upgrade (643)
    621: {'buildings': [15], 'upgrades': [643]},
    622: {'buildings': [0,15], 'upgrades': [643]},
    623: {'buildings': [0,0,15], 'upgrades': [643]},
    624: {'buildings': [0,0,0,15], 'upgrades': [643]},
    625: {'buildings': [0,0,0,0,15], 'upgrades': [643]},
    626: {'buildings': [0,0,0,0,0,15], 'upgrades': [643]},
    627: {'buildings': [0,0,0,0,0,0,15], 'upgrades': [643]},
    628: {'buildings': [0,0,0,0,0,0,0,15], 'upgrades': [643]},
    629: {'buildings': [0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    630: {'buildings': [0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    631: {'buildings': [0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    632: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    633: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    634: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    635: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    636: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    637: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},
    698: {'buildings': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15], 'upgrades': [643]},

    // Reward cookies - Unlocked when all buildings reach a certain number
    334: {'buildings': [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100], 'upgrades': []},  // Milk chocolate butter biscuit
    335: {'buildings': [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150], 'upgrades': []},  // Dark chocolate butter biscuit
    336: {'buildings': [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200], 'upgrades': []},  // White chocolate butter biscuit
    337: {'buildings': [250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250], 'upgrades': []},  // Ruby chocolate butter biscuit
    400: {'buildings': [300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300], 'upgrades': []},  // Lavender chocolate butter biscuit
    477: {'buildings': [350,350,350,350,350,350,350,350,350,350,350,350,350,350,350,350,350,350], 'upgrades': []},  // Synthetic chocolate green honey butter biscuit
    478: {'buildings': [400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400,400], 'upgrades': []},  // Royal raspberry chocolate butter biscuit
    479: {'buildings': [450,450,450,450,450,450,450,450,450,450,450,450,450,450,450,450,450,450], 'upgrades': []},  // Ultra-concentrated high-energy chocolate butter biscuit
    497: {'buildings': [500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500], 'upgrades': []},  // Pure pitch-black chocolate butter biscuit
    659: {'buildings': [550,550,550,550,550,550,550,550,550,550,550,550,550,550,550,550,550,550], 'upgrades': []},  // Cosmic chocolate butter biscuit
    699: {'buildings': [600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600], 'upgrades': []},  // Butter biscuit (with butter)

    // Grandmapocalypse research
    64: {'buildings': [0,6], 'upgrades': [57,58,59,250,251,252,60]}, //,61,62,63,103,180,415]},
    65: {'buildings': [], 'upgrades': [64]},
    66: {'buildings': [], 'upgrades': [65]},
    67: {'buildings': [], 'upgrades': [66]},
    68: {'buildings': [], 'upgrades': [67]},
    69: {'buildings': [], 'upgrades': [68]},
    70: {'buildings': [], 'upgrades': [69]},
    71: {'buildings': [], 'upgrades': [70]},
    72: {'buildings': [], 'upgrades': [71]},
    73: {'buildings': [], 'upgrades': [72]},
    74: {'buildings': [], 'upgrades': [73]},    // Elder Pledge
    84: {'buildings': [], 'upgrades': [73]},
    85: {'buildings': [], 'upgrades': [73]},

    // Heavenly chips
    130: {'buildings': [], 'upgrades': [129]},
    131: {'buildings': [], 'upgrades': [130]},
    132: {'buildings': [], 'upgrades': [131]},
    133: {'buildings': [], 'upgrades': [132]},

    // Santa upgrades
    152: {'buildings': [], 'upgrades': [182]},
    153: {'buildings': [], 'upgrades': [152], 'santa': 1},
    154: {'buildings': [], 'upgrades': [152], 'santa': 1},
    155: {'buildings': [], 'upgrades': [152], 'santa': 1},
    156: {'buildings': [], 'upgrades': [152], 'santa': 1},
    157: {'buildings': [], 'upgrades': [152], 'santa': 1},
    158: {'buildings': [], 'upgrades': [152], 'santa': 1},
    159: {'buildings': [], 'upgrades': [152], 'santa': 1},
    160: {'buildings': [], 'upgrades': [152], 'santa': 1},
    161: {'buildings': [], 'upgrades': [152], 'santa': 1},
    162: {'buildings': [], 'upgrades': [152], 'santa': 1},
    163: {'buildings': [], 'upgrades': [152], 'santa': 1},
    164: {'buildings': [], 'upgrades': [152], 'santa': 1},
    165: {'buildings': [], 'upgrades': [152], 'santa': 1},
    166: {'buildings': [], 'upgrades': [152], 'santa': 1},
    168: {'buildings': [], 'upgrades': [152], 'santa': 14},

    // Season switching - requires "Season switcher" heavenly upgrade (181)
    182: {'buildings': [], 'upgrades': [181]},      // Christmas
    183: {'buildings': [], 'upgrades': [181]},      // Halloween
    184: {'buildings': [], 'upgrades': [181]},      // Valentine's
    185: {'buildings': [], 'upgrades': [181]},      // Business Day
    209: {'buildings': [], 'upgrades': [181]},      // Easter
    
    // Easter season - Requires "Bunny biscuit" (209)
    210: {'buildings': [], 'upgrades': [209]},
    211: {'buildings': [], 'upgrades': [209]},
    212: {'buildings': [], 'upgrades': [209]},
    213: {'buildings': [], 'upgrades': [209]},
    214: {'buildings': [], 'upgrades': [209]},
    215: {'buildings': [], 'upgrades': [209]},
    216: {'buildings': [], 'upgrades': [209]},
    217: {'buildings': [], 'upgrades': [209]},
    218: {'buildings': [], 'upgrades': [209]},
    219: {'buildings': [], 'upgrades': [209]},
    220: {'buildings': [], 'upgrades': [209]},
    221: {'buildings': [], 'upgrades': [209]},
    222: {'buildings': [], 'upgrades': [209]},
    223: {'buildings': [], 'upgrades': [209]},
    224: {'buildings': [], 'upgrades': [209]},
    225: {'buildings': [], 'upgrades': [209]},
    226: {'buildings': [], 'upgrades': [209]},
    227: {'buildings': [], 'upgrades': [209]},
    228: {'buildings': [], 'upgrades': [209]},
    229: {'buildings': [], 'upgrades': [209]},

    // Halloween season - Requires "Ghostly biscuit" (183); actually getting rewards requires "One mind" and wrinklers
    134: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    135: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    136: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    137: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    138: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    139: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},
    140: {'buildings': [], 'upgrades': [69,183], 'wrinklers': 1},

    // Christmas season - Requires "Festive biscuit" (182)
    143: {'buildings': [], 'upgrades': [182]},
    144: {'buildings': [], 'upgrades': [182]},
    145: {'buildings': [], 'upgrades': [182]},
    146: {'buildings': [], 'upgrades': [182]},
    147: {'buildings': [], 'upgrades': [182]},
    148: {'buildings': [], 'upgrades': [182]},
    149: {'buildings': [], 'upgrades': [182]},

    // Valentine's Day season - Requires "Lovesick biscuit" (184); each Valentine's biscuit requires the previous one
    169: {'buildings': [], 'upgrades': [184]},
    170: {'buildings': [], 'upgrades': [169,184]},
    171: {'buildings': [], 'upgrades': [170,184]},
    172: {'buildings': [], 'upgrades': [171,184]},
    173: {'buildings': [], 'upgrades': [172,184]},
    174: {'buildings': [], 'upgrades': [173,184]},
    645: {'buildings': [], 'upgrades': [174,184]},

    // Dragon upgrades - Requires the "How to bake your dragon" heavenly upgrade (323); the gifts require A crumbly egg (324) and the "Pet the dragon" heavenly upgrade (647)
    324: {'buildings': [], 'upgrades': [323]},
    648: {'buildings': [], 'upgrades': [323,324,647]},
    649: {'buildings': [], 'upgrades': [323,324,647]},
    650: {'buildings': [], 'upgrades': [323,324,647]},
    651: {'buildings': [], 'upgrades': [323,324,647]}
};











// var testJson = {}
// for (i in Game.UpgradesById) {
//     var me = Game.UpgradesById[i];
//     testJson[i] = {id: me.id, name: me.name, tier: me.tier};
//     // if (me.tier=="synergy1"||me.tier=="synergy2") {
//         testJson[i] = false
//         for (ii in upgradeJson) {
//             if (i == ii) {
//                 testJson[i] = true;
//             }
//         }
//         if (testJson[i] == false) {
//             console.log(me.id + ": " + me.name + ", " + me.buildingTie.name);
//             console.log(me);
//         }
//     // }
// }














var blacklist = [
    {
        'upgrades': [],
        'buildings': []
    },
    {
        'upgrades': [129,130,131,132,133],
        'buildings': []
    },
    {
        'upgrades': true,
        'buildings': []
    },
    {
        'upgrades': [71, 72, 73, 74, 84, 85],
        'buildings': []
    },
    {
        'upgrades': [],
        'buildings': true
    }
];

var recommendationBlacklist = [
    227, // blacklist chocolate egg from being included in the recommendationList
    331, 332, // blacklist golden switch from being included in the recommendationList
    333, // blacklist milk selector from being included in the recommendationList
    361, // blacklist golden cookie sound selector from being included in the recommendationList
    414, // blacklist backgMath.round selector from being included in the recommendationList
    452, // blacklist sugar frenzy from being included in the recommendationList
    563, 564 // blacklist shimmering veil from being included in the recommendationList
]

var seasons = ['','fools','christmas','easter','halloween','valentines'];

var holidayCookies = {
    halloween: [134,135,136,137,138,139,140],
    christmas: [143,144,145,146,147,148,149],
    valentines: [169,170,171,172,173,174,645],
    easter: [210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229]
}

var cookieInfo = {
    'clot':        {'odds':[0,0.10386789477947,0.19565417350258,0.279830557040944],                   isOverlap:false},
    'frenzy':      {'odds':[0.475438636303817,0.330397784579005,0.17665214624519,0],                  isOverlap:false},
    'blood':       {'odds':[0,0.021118483342717,0.042826537084539,0.065166067095688],                 isOverlap:false},
    'chain':       {'odds':[0.004445863757111,0.025152456647178,0.046465712706818,0.068600124409242], isOverlap:false},
    'ruin':        {'odds':[0,0.059020277260868,0.111661484235184,0.171880882712373],                 isOverlap:false},
    'frenzyRuin':  {'odds':[0,0.031491314174174,0.033674609798233,0],                                 isOverlap:true},
    'clotRuin':    {'odds':[0,0.013356303344429,0.050318079469162,0.107949674328571],                 isOverlap:true},
    'lucky':       {'odds':[0.070071731013916,0.113288563286977,0.146693408687535,0.171634249195106], isOverlap:false},
    'frenzyLucky': {'odds':[0.405366905290347,0.219293086015375,0.083880131161928,0],                 isOverlap:true},
    'clotLucky':   {'odds':[0,0.046715208884435,0.081736878830784,0.107949674328571],                 isOverlap:true},
    'click':       {'odds':[0.022561043069409,0.020309670016808,0.019242724580528,0.019177860550822], isOverlap:false},
    'frenzyClick': {'odds':[0.022115820565423,0.012720131151967,0.005384749977878,0],                 isOverlap:true},
    'clotClick':   {'odds':[0,0.001307530606642,0.005809363719639,0.007810910338684],                 isOverlap:true},
    'blah':        {'odds':[0,0,0,0],                                                                 isOverlap:false}
};
