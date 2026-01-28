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
