import { Disease, Crop } from '@/types/disease';

export const diseases: Disease[] = [
  // TOMATO (Existing + New)
  {
    id: 'tomato-early-blight',
    name: 'Early Blight',
    nameHindi: 'अगेती झुलसा',
    crop: 'tomato',
    severity: 'medium',
    description: 'A fungal disease causing dark spots with concentric rings on leaves.',
    symptoms: [
      'Dark brown spots with concentric rings',
      'Yellowing of leaves around spots',
      'Lower leaves affected first',
      'Premature leaf drop'
    ],
    treatment: [
      'Remove and destroy infected leaves',
      'Apply copper-based fungicide',
      'Improve air circulation',
      'Water at soil level'
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Practice crop rotation',
      'Mulch around plants',
      'Avoid overhead watering'
    ]
  },
  {
    id: 'tomato-late-blight',
    name: 'Late Blight',
    nameHindi: 'पछेती झुलसा',
    crop: 'tomato',
    severity: 'high',
    description: 'A devastating disease that can destroy entire crops within days.',
    symptoms: [
      'Water-soaked spots on leaves',
      'White fuzzy growth on leaf undersides',
      'Brown/black lesions on stems',
      'Rapid plant death'
    ],
    treatment: [
      'Remove infected plants immediately',
      'Apply systemic fungicide',
      'Avoid irrigation during outbreak',
      'Sanitize all tools'
    ],
    prevention: [
      'Plant resistant varieties',
      'Ensure good drainage',
      'Monitor weather conditions',
      'Space plants adequately'
    ]
  },
  {
    id: 'tomato-leaf-mold',
    name: 'Leaf Mold',
    nameHindi: 'पत्ता फफूंदी',
    crop: 'tomato',
    severity: 'medium',
    description: 'A fungal disease that thrives in humid greenhouse conditions.',
    symptoms: [
      'Yellow spots on upper leaf surface',
      'Olive-green fuzzy mold underneath',
      'Leaves curl and drop',
      'Reduced fruit production'
    ],
    treatment: [
      'Improve ventilation',
      'Reduce humidity levels',
      'Apply sulfur-based fungicide',
      'Remove affected foliage'
    ],
    prevention: [
      'Maintain low humidity',
      'Ensure good air circulation',
      'Water in morning',
      'Use drip irrigation'
    ]
  },
  {
    id: 'tomato-septoria-leaf-spot',
    name: 'Septoria Leaf Spot',
    nameHindi: 'सेप्टोरिया पत्ती धब्बा',
    crop: 'tomato',
    severity: 'medium',
    description: 'Causes significant leaf loss, starting from the bottom of the plant.',
    symptoms: [
      'Small, circular spots with dark borders',
      'Centers of spots turn gray or tan',
      'Tiny black specks in spot centers',
      'Lower leaves turn yellow and drop'
    ],
    treatment: [
      'Apply fungicides (chlorothalonil or mancozeb)',
      'Remove heavily infected lower leaves',
      'Keep foliage dry',
      'Clean tools after use'
    ],
    prevention: [
      'Water at the base of the plant',
      'Practice 3-year crop rotation',
      'Mulch to prevent soil splash',
      'Stake plants to keep off ground'
    ]
  },
  {
    id: 'tomato-bacterial-spot',
    name: 'Bacterial Spot',
    nameHindi: 'जीवाणु धब्बा',
    crop: 'tomato',
    severity: 'high',
    description: 'Small, dark, water-soaked spots on foliage and fruit.',
    symptoms: [
      'Small, circular, water-soaked spots on leaves',
      'Spots turn dark brown and look greasy',
      'Yellowing of leaves around spots',
      'Raised, scab-like spots on fruit'
    ],
    treatment: [
      'Apply copper-based sprays early',
      'Remove and destroy infected debris',
      'Avoid working among plants when wet',
      'Practice strict sanitation'
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Ensure 2-year crop rotation',
      'Avoid overhead irrigation',
      'Space plants for good airflow'
    ]
  },
  {
    id: 'tomato-spider-mites',
    name: 'Spider Mites',
    nameHindi: 'लाल मकड़ी',
    crop: 'tomato',
    severity: 'medium',
    description: 'Tiny pests that suck plant juices, causing stippling and webbing.',
    symptoms: [
      'Fine yellow/white stippling on leaves',
      'Fine webbing on leaf undersides',
      'Leaves look dusty or bronzed',
      'Plant vigor decreases significantly'
    ],
    treatment: [
      'Wash mites off with strong water spray',
      'Apply neem oil or insecticidal soap',
      'Use predatory mites (biological control)',
      'Remove heavily infested leaves'
    ],
    prevention: [
      'Keep plants well-watered (avoid drought stress)',
      'Maintain adequate humidity',
      'Monitor undersides of leaves regularly',
      'Remove weeds that harbor mites'
    ]
  },
  {
    id: 'tomato-target-spot',
    name: 'Target Spot',
    nameHindi: 'लक्ष्य धब्बा',
    crop: 'tomato',
    severity: 'medium',
    description: 'A fungal disease creating spots resembling a bullseye.',
    symptoms: [
      'Small brown spots with concentric circles',
      'Spots look like a target or bullseye',
      'Leaves may turn yellow and drop',
      'Pitted brown spots on fruit'
    ],
    treatment: [
      'Apply systemic fungicides',
      'Improve air circulation around plants',
      'Remove infected lower foliage',
      'Ensure proper plant spacing'
    ],
    prevention: [
      'Avoid overhead watering',
      'Plant in well-drained soil',
      'Practice 3-year crop rotation',
      'Keep garden free of plant debris'
    ]
  },
  {
    id: 'tomato-mosaic-virus',
    name: 'Mosaic Virus',
    nameHindi: 'मोज़ेक वायरस',
    crop: 'tomato',
    severity: 'high',
    description: 'Highly infectious virus causing mottling and distortion of leaves.',
    symptoms: [
      'Mottled light and dark green patterns',
      'Leaves may be distorted or "fern-like"',
      'Yellowing and curling of foliage',
      'Internal browning of tomato fruit'
    ],
    treatment: [
      'No cure; pull and burn infected plants',
      'Disinfect hands and tools frequently',
      'Do not smoke near plants',
      'Remove host weeds nearby'
    ],
    prevention: [
      'Use certified virus-free seed',
      'Plant resistant cultivars',
      'Control aphids and other vectors',
      'Wash hands before handling plants'
    ]
  },
  {
    id: 'tomato-yellow-leaf-curl',
    name: 'Yellow Leaf Curl Virus',
    nameHindi: 'पीला पत्ता मरोड़ वायरस',
    crop: 'tomato',
    severity: 'high',
    description: 'Transmitted by whiteflies, severely stunts plant growth.',
    symptoms: [
      'Leaves curl upward and inward',
      'Yellowing of leaf margins',
      'Severe stunting of the plant',
      'Flowers drop and fruit production stops'
    ],
    treatment: [
      'No cure for virus; remove infected plants',
      'Control whitefly populations',
      'Use reflective mulches to repel pests',
      'Apply neem oil to manage vectors'
    ],
    prevention: [
      'Plant resistant tomato varieties',
      'Use fine mesh netting in greenhouses',
      'Eliminate weeds and volunteer plants',
      'Avoid planting near older infected crops'
    ]
  },
  {
    id: 'tomato-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'tomato',
    severity: 'low',
    description: 'Optimal chlorophyll levels and structural integrity. No anomalies detected.',
    symptoms: [
      'Vibrant green color',
      'Firm stems',
      'Hydrated leaves',
      'Normal growth pattern'
    ],
    treatment: [
      'None required'
    ],
    prevention: [
      'Maintain regular watering schedule',
      'Balanced fertilization',
      'Ensure 6-8 hours of sunlight',
      'Regular scouting for early pests'
    ]
  },

  // APPLE
  {
    id: 'apple-scab',
    name: 'Apple Scab',
    nameHindi: 'सेब का स्कैब',
    crop: 'apple',
    severity: 'medium',
    description: 'A widespread fungal disease affecting leaves and fruit of apple trees.',
    symptoms: [
      'Olive-green to velvety black spots on leaves',
      'Distorted or puckered leaves',
      'Brown or black scabby blotches on fruit',
      'Fruit distortion and cracking'
    ],
    treatment: [
      'Apply fixed copper or Bordeaux mixture',
      'Use wettable sulfur (organic option)',
      'Fungicide sprays (e.g., myclobutanil)',
      'Apply early in the season'
    ],
    prevention: [
      'Rake and remove fallen leaves (sanitation)',
      'Prune for better air circulation',
      'Avoid overhead irrigation',
      'Plant resistant varieties like Gala or Honeycrisp'
    ]
  },
  {
    id: 'apple-black-rot',
    name: 'Black Rot',
    nameHindi: 'काला सड़न',
    crop: 'apple',
    severity: 'high',
    description: 'Fungal infection causing leaf spots, cankers, and fruit rot.',
    symptoms: [
      'Frog-eye leaf spots (purple margins, tan centers)',
      'Sunken reddish-brown cankers on bark',
      'Firm black rot on fruit in concentric rings',
      'Mummified fruit remains on tree'
    ],
    treatment: [
      'Prune out cankers 6 inches below visible infection',
      'Apply captan-based fungicides',
      'Remove all mummified fruit',
      'Burn or bury infected material'
    ],
    prevention: [
      'Eliminate dead wood and stumps',
      'Keep trees healthy and well-watered',
      'Prune during dormant season (Feb/Mar)',
      'Sanitize pruning tools between trees'
    ]
  },
  {
    id: 'apple-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'apple',
    severity: 'low',
    description: 'Healthy apple tree foliage and developing fruit.',
    symptoms: [
      'Deep green leaves with no spots',
      'Smooth, healthy bark',
      'Normal fruit development',
      'Strong seasonal growth'
    ],
    treatment: ['None'],
    prevention: [
      'Annual pruning for shelf structure',
      'Thin out fruit for better size',
      'Mulch to retain moisture',
      'Dormant oil spray for pest control'
    ]
  },

  // BLUEBERRY
  {
    id: 'blueberry-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'blueberry',
    severity: 'low',
    description: 'Healthy blueberry bush with vibrant foliage.',
    symptoms: [
      'Green, glossy leaves',
      'Strong new shoot growth',
      'Plump berry development',
      'No visible leaf spotting'
    ],
    treatment: ['None'],
    prevention: [
      'Maintain acidic soil (pH 4.5-5.5)',
      'Consistent shallow watering',
      'Pine needle or oak leaf mulch',
      'Avoid nitrogen late in the season'
    ]
  },

  // CHERRY
  {
    id: 'cherry-powdery-mildew',
    name: 'Powdery Mildew',
    nameHindi: 'चूर्णिल आसिता',
    crop: 'cherry',
    severity: 'medium',
    description: 'Fungal growth that appears as white powder on leaves and fruit.',
    symptoms: [
      'White powdery patches on leaf undersides',
      'Leaf curling and upward puckering',
      'Distorted new shoot growth',
      'White "bloom" on ripening fruit'
    ],
    treatment: [
      'Apply sulfur-based fungicides (avoid >90°F)',
      'Strobilurin fungicides (Cabrio, Flint)',
      'Neem oil for organic management',
      'Post-harvest preventative sprays'
    ],
    prevention: [
      'Open canopy pruning for airflow',
      'Remove root suckers (sources of inoculum)',
      'Avoid early season overhead irrigation',
      'Monitor root suckers carefully'
    ]
  },
  {
    id: 'cherry-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'cherry',
    severity: 'low',
    description: 'Healthy cherry leaves and fruit production.',
    symptoms: [
      'Uniformly green leaves',
      'Plump, bright fruit',
      'Sturdy branch structure',
      'Good leaf retention'
    ],
    treatment: ['None'],
    prevention: [
      'Proper pruning during dormancy',
      'Monitor for aphids and pests',
      'Mulch for moisture retention',
      'Ensure good soil drainage'
    ]
  },

  // CORN
  {
    id: 'corn-gray-leaf-spot',
    name: 'Gray Leaf Spot',
    nameHindi: 'सर्कोस्पोरा पत्ती धब्बा',
    crop: 'corn',
    severity: 'medium',
    description: 'Fungal disease that reduces photosynthetic area of corn leaves.',
    symptoms: [
      'Pinpoint lesions with yellow halos (early)',
      'Thin rectangular tan/gray spots',
      'Lesions bounded by leaf veins',
      'Blighting of entire leaves in severe cases'
    ],
    treatment: [
      'Foliar fungicides (VT-R1 stage)',
      'Copper-based fungicides',
      'Sulfur application',
      'Scout 2-3 weeks before tasseling'
    ],
    prevention: [
      'Plant resistant hybrids',
      '2-year crop rotation',
      'Tillage to bury corn residue',
      'Avoid high humidity conditions'
    ]
  },
  {
    id: 'corn-common-rust',
    name: 'Common Rust',
    nameHindi: 'सामान्य रस्ट',
    crop: 'corn',
    severity: 'low',
    description: 'Fungal disease identified by reddish-brown pustules on leaves.',
    symptoms: [
      'Small yellow flecks on leaves',
      'Reddish-brown powdery pustules',
      'Pustules on both leaf surfaces',
      'Darkening of pustules as they age'
    ],
    treatment: [
      'Foliar fungicides early in outbreak',
      'Usually not needed for field corn',
      'Manage only if severely impacting yield',
      'Neem oil for garden plots'
    ],
    prevention: [
      'Use resistant hybrids (primary method)',
      'Avoid late planting',
      'Ensure balanced soil nutrition',
      'Monitor during cool, moist weather'
    ]
  },
  {
    id: 'corn-northern-leaf-blight',
    name: 'Northern Leaf Blight',
    nameHindi: 'उत्तरी पत्ती झुलसा',
    crop: 'corn',
    severity: 'medium',
    description: 'Fungal disease causing large cigar-shaped lesions.',
    symptoms: [
      'Large cigar-shaped tan lesions (1-6 inches)',
      'Grey-green water-soaked spots (early)',
      '"Dirty" appearance from fungal spores',
      'Symptoms start on lower leaves'
    ],
    treatment: [
      'Apply fungicides during VT-R1 stages',
      'Azoxystrobin or Pyraclostrobin based products',
      'Manage humidity in the canopy',
      'Scout lower leaves regularly'
    ],
    prevention: [
      'Resistant hybrids',
      '1-year crop rotation away from corn',
      'Deep tillage of crop debris',
      'Proper plant spacing for airflow'
    ]
  },
  {
    id: 'corn-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'corn',
    severity: 'low',
    description: 'Robust corn plant with strong stalk and green leaves.',
    symptoms: [
      'Dark green, broad leaves',
      'Single strong main stalk',
      'Well-developed ears',
      'No spotting or wilting'
    ],
    treatment: ['None'],
    prevention: [
      'Proper nitrogen management',
      'Timely weed control',
      'Adequate moisture during silking',
      'Broad hybrid selection'
    ]
  },

  // GRAPE
  {
    id: 'grape-black-rot',
    name: 'Black Rot',
    nameHindi: 'काला सड़न',
    crop: 'grape',
    severity: 'high',
    description: 'Attacks all green parts of the vine, most damaging to fruit.',
    symptoms: [
      'Small circular yellow leaf lesions',
      'Black dots (pycnidia) in lesions',
      'Shriveled black "mummy" grapes',
      'Pitted lesions on shoots and stems'
    ],
    treatment: [
      'Mancozeb or Myclobutanil fungicides',
      'Captan for early season control',
      'Apply every 10-14 days after bud break',
      'Remove all infected clusters immediately'
    ],
    prevention: [
      'Remove and destroy all mummies',
      'Prune for maximum air circulation',
      'Avoid overhead watering',
      'Bury mummies on ground with mulch'
    ]
  },
  {
    id: 'grape-esca',
    name: 'Esca (Black Measles)',
    nameHindi: 'एस्का',
    crop: 'grape',
    severity: 'high',
    description: 'A wood-rotting disease complex causing leaf striping and fruit spots.',
    symptoms: [
      'Interveinal leaf striping (red or yellow)',
      'Necrotic leaf margins',
      'Small round dark spots on berries (measles)',
      'Cross-section of wood shows dark rings'
    ],
    treatment: [
      'No cure for systemic infection',
      'Cut off cankered portions in summer',
      'Apply wound sealants to pruning cuts',
      'Monitor for "apoplexy" (sudden dieback)'
    ],
    prevention: [
      'Minimize pruning wounds in wet weather',
      'Disinfect pruning tools frequently',
      'Use Trichoderma-based wound protectants',
      'Remove dead stumps from vineyard'
    ]
  },
  {
    id: 'grape-leaf-blight',
    name: 'Leaf Blight',
    nameHindi: 'पत्ती झुलसा',
    crop: 'grape',
    severity: 'medium',
    description: 'Minor fungal disease causing irregularly shaped spots late in the season.',
    symptoms: [
      'Large irregular dull red to brown spots',
      'Spots turn black and brittle with age',
      'Premature leaf drop in severe cases',
      'Common on poorly sprayed vines'
    ],
    treatment: [
      'Standard grape fungicide programs',
      'Liquid lime sulfur in early spring',
      'Copper-based sprays',
      'Improve overall vine health'
    ],
    prevention: [
      'Remove fallen leaf debris (sanitation)',
      'Improve canopy management for airflow',
      'Avoid overhead watering',
      'Water at root zone'
    ]
  },
  {
    id: 'grape-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'grape',
    severity: 'low',
    description: 'Lush green grapevine foliage and clean fruit clusters.',
    symptoms: [
      'Uniform green leaf color',
      'Smooth, dark green canes',
      'Clean, developing fruit',
      'Strong tendrils'
    ],
    treatment: ['None'],
    prevention: [
      'Annual dormant pruning',
      'Leaf pulling for cluster exposure',
      'Soil testing and PH balance',
      'Deep watering twice weekly'
    ]
  },

  // ORANGE
  {
    id: 'orange-citrus-greening',
    name: 'Citrus Greening (HLB)',
    nameHindi: 'सिट्रस ग्रीनिंग',
    crop: 'orange',
    severity: 'high',
    description: 'Fatal bacterial disease spread by psyllid insects.',
    symptoms: [
      'Asymmetrical blotchy yellow leaf mottling',
      'Small, upright leathery leaves',
      'Lopsided green/bitter fruit',
      'Twig dieback and overall decline'
    ],
    treatment: [
      'No absolute cure; remove infected trees',
      'Nutritional support to prolong life',
      'Antimicrobial treatments (professional use)',
      'Heat therapy experiments'
    ],
    prevention: [
      'Strict Asian Citrus Psyllid vector control',
      'Use only certified disease-free budwood',
      'Monthly inspections for psyllids',
      'Screen-house (CUPS) cultivation'
    ]
  },
  {
    id: 'orange-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'orange',
    severity: 'low',
    description: 'Vigorous citrus tree with dark green leaves.',
    symptoms: [
      'Symmetrical green leaves',
      'Healthy white blossoms',
      'Uniform fruit shape/color',
      'Steady seasonal growth flushes'
    ],
    treatment: ['None'],
    prevention: [
      'Regular zinc and micronutrient sprays',
      'Proper citrus-specific fertilization',
      'Monitor for scale and psyllids',
      'Consistent deep watering'
    ]
  },

  // PEACH
  {
    id: 'peach-bacterial-spot',
    name: 'Bacterial Spot',
    nameHindi: 'जीवाणु धब्बा',
    crop: 'peach',
    severity: 'high',
    description: 'Bacterial disease causing leaf spots and fruit pitting.',
    symptoms: [
      'Angular reddish-brown leaf spots',
      '"Shot-hole" appearance (centers fall out)',
      'Crater-like pitted spots on fruit',
      'Premature defoliation'
    ],
    treatment: [
      'Copper-based bactericides (dormant/spring)',
      'Oxytetracycline (Mycoshield) sprays',
      'Sanitize tools between trees',
      'Prune and destroy infected twigs'
    ],
    prevention: [
      'Plant resistant varieties (e.g. Red Haven)',
      'Windbreaks to reduce leaf damage',
      'Avoid overhead watering',
      'Maintain strong tree vigor'
    ]
  },
  {
    id: 'peach-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'peach',
    severity: 'low',
    description: 'Vibrant peach tree foliage and fruit.',
    symptoms: [
      'Long, glossy green leaves',
      'Smooth reddish-brown fruit skin',
      'Strong branch structure',
      'Clear gum-free bark'
    ],
    treatment: ['None'],
    prevention: [
      'Proper dormant pruning',
      'Fruit thinning for branch health',
      'Borer protection at trunk base',
      'Stable mulch for moisture'
    ]
  },

  // PEPPER
  {
    id: 'pepper-bacterial-spot',
    name: 'Bacterial Spot',
    nameHindi: 'जीवाणु धब्बा',
    crop: 'pepper',
    severity: 'high',
    description: 'Bacterial disease causing spots on leaves and fruit.',
    symptoms: [
      'Small water-soaked spots',
      'Spots turn brown with yellow halo',
      'Raised scab-like lesions on fruit',
      'Severe defoliation'
    ],
    treatment: [
      'Apply copper bactericide',
      'Remove infected plants',
      'Avoid working when wet',
      'Sanitize equipment'
    ],
    prevention: [
      'Use disease-free transplants',
      'Avoid overhead watering',
      'Practice crop rotation',
      'Control insect vectors'
    ]
  },
  {
    id: 'pepper-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'pepper',
    severity: 'low',
    description: 'Strong pepper plant with clean, glossy leaves.',
    symptoms: [
      'Shiny dark green leaves',
      'Sturdy upright growth',
      'Uniformly colored peppers',
      'Abundant blossoms'
    ],
    treatment: ['None'],
    prevention: [
      'Mulch to prevent soil splash',
      'Drip irrigation',
      'Stake for support',
      'Keep area weed-free'
    ]
  },

  // POTATO
  {
    id: 'potato-early-blight',
    name: 'Early Blight',
    nameHindi: 'अगेती झुलसा',
    crop: 'potato',
    severity: 'medium',
    description: 'Common fungal disease affecting potato leaves and tubers.',
    symptoms: [
      'Dark brown circular spots',
      'Target-like concentric rings',
      'Yellowing between spots',
      'Defoliation in severe cases'
    ],
    treatment: [
      'Apply chlorothalonil fungicide',
      'Remove infected plant debris',
      'Maintain adequate nutrition',
      'Ensure proper watering'
    ],
    prevention: [
      'Use certified disease-free seed',
      'Practice 2-3 year rotation',
      'Hill plants properly',
      'Avoid overhead irrigation'
    ]
  },
  {
    id: 'potato-late-blight',
    name: 'Late Blight',
    nameHindi: 'पछेती झुलसा',
    crop: 'potato',
    severity: 'high',
    description: 'Highly destructive disease causing rapid plant death.',
    symptoms: [
      'Water-soaked lesions on leaves',
      'White sporulation on undersides',
      'Brown rot on tubers',
      'Foul-smelling decay'
    ],
    treatment: [
      'Apply metalaxyl or mancozeb',
      'Destroy all infected material',
      'Harvest remaining healthy tubers',
      'Do not store infected tubers'
    ],
    prevention: [
      'Plant resistant cultivars',
      'Eliminate volunteer plants',
      'Destroy cull piles',
      'Scout fields regularly'
    ]
  },
  {
    id: 'potato-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'potato',
    severity: 'low',
    description: 'Healthy potato foliage ready for tuber development.',
    symptoms: [
      'Full, bush-like foliage',
      'Deep green leaf color',
      'Sturdy stems',
      'Healthy flowering'
    ],
    treatment: ['None'],
    prevention: [
      'Proper hilling',
      'Balanced NPK fertilization',
      'Regular moisture monitoring',
      'Clean source seed'
    ]
  },

  // SOYBEAN
  {
    id: 'soybean-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'soybean',
    severity: 'low',
    description: 'Healthy soybean plants with clean trifoliate leaves.',
    symptoms: [
      'Bright green trifoliates',
      'Strong branching',
      'Healthy pod set',
      'No visible spotting'
    ],
    treatment: ['None'],
    prevention: [
      'Proper seed placement',
      'Pre-emergent weed control',
      'Regular field scouting',
      'Trace mineral availability'
    ]
  },

  // SQUASH
  {
    id: 'squash-powdery-mildew',
    name: 'Powdery Mildew',
    nameHindi: 'चूर्णिल आसिता',
    crop: 'squash',
    severity: 'medium',
    description: 'White flour-like patches on leaves and stems.',
    symptoms: [
      'White powdery spots on leaves',
      'Spots enlarge to cover entire surface',
      'Leaves turn yellow and dry up',
      'Stunted growth of new fruit'
    ],
    treatment: [
      'Apply Neem oil or sulfur',
      'Potassium bicarbonate sprays',
      'Milk-water solution (1:9 ratio)',
      'Remove heavily infected leaves'
    ],
    prevention: [
      'Wide plant spacing for airflow',
      'Plant in full sun',
      'Resistant varieties (Zucchini/Pumpkin)',
      'Avoid overhead watering'
    ]
  },
  {
    id: 'squash-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'squash',
    severity: 'low',
    description: 'Vigorous squash vine with large green leaves.',
    symptoms: [
      'Massive healthy green leaves',
      'Strong vine growth',
      'Active pollinator visits',
      'Clean, developing fruit'
    ],
    treatment: ['None'],
    prevention: [
      'Ensure pollinator access',
      'Steady consistent watering',
      'Heavy mulching for vine',
      'Regular borer checks'
    ]
  },

  // STRAWBERRY
  {
    id: 'strawberry-leaf-scorch',
    name: 'Leaf Scorch',
    nameHindi: 'पत्ती झुलसा',
    crop: 'strawberry',
    severity: 'medium',
    description: 'Fungal disease that makes leaves appear burnt or scorched.',
    symptoms: [
      'Small irregular purplish spots',
      'Spots coalesce to cover leaf surface',
      'Leaves dry up and curl at edges',
      'Scorched reddish-brown appearance'
    ],
    treatment: [
      'Fungicide sprays (e.g., Monterey Liqui-Cop)',
      'Remove and burn infected debris',
      'Apply during flowering and fall',
      'Renovate beds every 3-4 years'
    ],
    prevention: [
      'Use certified disease-free plants',
      'Drip irrigation only',
      'Avoid excessive nitrogen in spring',
      'Spacing for leaf drying'
    ]
  },
  {
    id: 'strawberry-healthy',
    name: 'Healthy',
    nameHindi: 'स्वस्थ',
    crop: 'strawberry',
    severity: 'low',
    description: 'Healthy strawberry plants with clean leaves and fruit.',
    symptoms: [
      'Green, serrated leaves',
      'White flowers with yellow centers',
      'Bright red berries',
      'Vigorous runners'
    ],
    treatment: ['None'],
    prevention: [
      'Straw mulch to keep fruit clean',
      'Regular weeding',
      'Thin out runners',
      'Bird protection netting'
    ]
  }
];

export const crops: Crop[] = [
  { id: 'apple', name: 'Apple', nameHindi: 'सेब', icon: '🍎', diseases: diseases.filter(d => d.crop === 'apple') },
  { id: 'blueberry', name: 'Blueberry', nameHindi: 'ब्लूबेरी', icon: '🫐', diseases: diseases.filter(d => d.crop === 'blueberry') },
  { id: 'cherry', name: 'Cherry', nameHindi: 'चेरी', icon: '🍒', diseases: diseases.filter(d => d.crop === 'cherry') },
  { id: 'corn', name: 'Corn', nameHindi: 'मक्का', icon: '🌽', diseases: diseases.filter(d => d.crop === 'corn') },
  { id: 'grape', name: 'Grape', nameHindi: 'अंगूर', icon: '🍇', diseases: diseases.filter(d => d.crop === 'grape') },
  { id: 'orange', name: 'Orange', nameHindi: 'संतरा', icon: '🍊', diseases: diseases.filter(d => d.crop === 'orange') },
  { id: 'peach', name: 'Peach', nameHindi: 'आड़ू', icon: '🍑', diseases: diseases.filter(d => d.crop === 'peach') },
  { id: 'pepper', name: 'Pepper', nameHindi: 'मिर्च', icon: '🫑', diseases: diseases.filter(d => d.crop === 'pepper') },
  { id: 'potato', name: 'Potato', nameHindi: 'आलू', icon: '🥔', diseases: diseases.filter(d => d.crop === 'potato') },
  { id: 'soybean', name: 'Soybean', nameHindi: 'सोयाबीन', icon: '🌱', diseases: diseases.filter(d => d.crop === 'soybean') },
  { id: 'squash', name: 'Squash', nameHindi: 'स्क्वाश', icon: '🎃', diseases: diseases.filter(d => d.crop === 'squash') },
  { id: 'strawberry', name: 'Strawberry', nameHindi: 'स्ट्रॉबेरी', icon: '🍓', diseases: diseases.filter(d => d.crop === 'strawberry') },
  { id: 'tomato', name: 'Tomato', nameHindi: 'टमाटर', icon: '🍅', diseases: diseases.filter(d => d.crop === 'tomato') }
];

export const healthyResult: Omit<Disease, 'id'> = {
  name: 'Healthy',
  nameHindi: 'स्वस्थ',
  crop: '',
  severity: 'low',
  description: 'Your plant appears to be healthy! No diseases detected.',
  symptoms: [],
  treatment: [],
  prevention: [
    'Continue regular watering',
    'Maintain proper nutrition',
    'Monitor for pests',
    'Ensure adequate sunlight'
  ]
};
