import { Disease, Crop } from '@/types/disease';

export const diseases: Disease[] = [
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
    description: 'The disease that caused the Irish Potato Famine, highly destructive.',
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
    id: 'pepper-bacterial-spot',
    name: 'Bacterial Spot',
    nameHindi: 'जीवाणु धब्बा',
    crop: 'pepper',
    severity: 'high',
    description: 'A bacterial disease causing spots on leaves and fruit.',
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
    id: 'tomato-bacterial-spot',
    name: 'Bacterial Spot',
    nameHindi: 'जीवाणु धब्बा (टमाटर)',
    crop: 'tomato',
    severity: 'high',
    description: 'A common bacterial disease causing small, dark, water-soaked spots on foliage and fruit.',
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
    id: 'tomato-septoria-leaf-spot',
    name: 'Septoria Leaf Spot',
    nameHindi: 'सेप्टोरिया पत्ती धब्बा',
    crop: 'tomato',
    severity: 'medium',
    description: 'One of the most common foliage diseases of tomatoes, causing significant leaf loss.',
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
    id: 'tomato-spider-mites',
    name: 'Spider Mites',
    nameHindi: 'लाल मकड़ी',
    crop: 'tomato',
    severity: 'medium',
    description: 'Tiny pests that suck plant juices, causing stippling and webbing on leaves.',
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
    nameHindi: 'लक्ष्य धब्बा (टारगेट स्पॉट)',
    crop: 'tomato',
    severity: 'medium',
    description: 'A fungal disease that creates spots resembling a bullseye or target.',
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
    id: 'tomato-yellow-leaf-curl',
    name: 'Yellow Leaf Curl',
    nameHindi: 'पीला पत्ता मरोड़ वायरस',
    crop: 'tomato',
    severity: 'high',
    description: 'A viral disease transmitted by whiteflies that severely stunts plant growth.',
    symptoms: [
      'Leaves curl upward and inward',
      'Yellowing of leaf margins (margins)',
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
    id: 'tomato-mosaic-virus',
    name: 'Mosaic Virus',
    nameHindi: 'मोज़ेक वायरस',
    crop: 'tomato',
    severity: 'high',
    description: 'A highly infectious virus that creates mottling and distortion of leaves.',
    symptoms: [
      'Mottled light and dark green patterns',
      'Leaves may be distorted or "fern-like"',
      'Yellowing and curling of foliage',
      'Internal browning of tomato fruit'
    ],
    treatment: [
      'No cure; pull and burn infected plants',
      'Disinfect hands and tools frequently',
      'Do not smoke near plants (tobacco carries it)',
      'Remove host weeds nearby'
    ],
    prevention: [
      'Use certified virus-free seed',
      'Plant resistant cultivars',
      'Control aphids and other vectors',
      'Wash hands before handling plants'
    ]
  }
];

export const crops: Crop[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    nameHindi: 'टमाटर',
    icon: '🍅',
    diseases: diseases.filter(d => d.crop === 'tomato')
  },
  {
    id: 'potato',
    name: 'Potato',
    nameHindi: 'आलू',
    icon: '🥔',
    diseases: diseases.filter(d => d.crop === 'potato')
  },
  {
    id: 'pepper',
    name: 'Pepper',
    nameHindi: 'मिर्च',
    icon: '🌶️',
    diseases: diseases.filter(d => d.crop === 'pepper')
  }
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
