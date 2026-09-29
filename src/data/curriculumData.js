// ShikshaMate Curriculum Taxonomy, Sample Exam Problems, and AI Knowledge Base

export const CURRICULUM_OPTIONS = [
  { id: 'ncert_10', label: 'NCERT Class 10 (CBSE / State Boards)', examType: 'Board Exam' },
  { id: 'ncert_12_pcm', label: 'NCERT Class 12 Science (PCM)', examType: 'Board Exam' },
  { id: 'ncert_12_pcb', label: 'NCERT Class 12 Science (PCB)', examType: 'Board Exam' },
  { id: 'jee', label: 'JEE Main & Advanced', examType: 'Competitive Exam' },
  { id: 'neet', label: 'NEET-UG (Medical Entrance)', examType: 'Competitive Exam' },
  { id: 'upsc', label: 'UPSC Civil Services (GS 1-4)', examType: 'National Exam' },
  { id: 'maha_board', label: 'Maharashtra State Board (SSC/HSC)', examType: 'State Board' },
  { id: 'tn_board', label: 'Tamil Nadu Board (Samacheer Kalvi)', examType: 'State Board' },
  { id: 'up_board', label: 'UP Madhyamik Shiksha Parishad', examType: 'State Board' }
];

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
];

export const SAMPLE_PROBLEMS = [
  {
    id: 'p1',
    title: 'NCERT Class 10 Science: Convex Mirror Focal Length & Image Distance',
    subject: 'Physics (Optics)',
    curriculum: 'ncert_10',
    boardTag: 'NCERT Class 10 • Light: Reflection and Refraction • Exercise 10.2',
    imageType: 'textbook',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    extractedText: `An object 4.0 cm in size is placed at 25.0 cm in front of a concave mirror of focal length 15.0 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and the size of the image.`,
    conceptSummary: 'Mirror Formula (1/v + 1/u = 1/f) and Magnification (m = -v/u = h\'/h) with standard Cartesian sign conventions.',
    solutionSteps: {
      en: [
        {
          title: 'Step 1: Identify Given Data & Apply Cartesian Sign Convention',
          content: '• Height of object (h₁) = +4.0 cm\n• Object distance (u) = -25.0 cm (in front of mirror, light travels left-to-right)\n• Focal length (f) = -15.0 cm (concave mirror has focal point in front of reflective surface)\n• Image distance (v) = ?\n• Height of image (h₂) = ?'
        },
        {
          title: 'Step 2: Apply the Mirror Formula',
          content: 'Formula: 1/v + 1/u = 1/f\nSubstitute values: 1/v + 1/(-25) = 1/(-15)\n1/v = -1/15 - (-1/25) = -1/15 + 1/25\nLCM of 15 and 25 is 75:\n1/v = (-5 + 3)/75 = -2/75\nTherefore: v = -75/2 = -37.5 cm.\nThe screen must be placed at 37.5 cm in front of the concave mirror.'
        },
        {
          title: 'Step 3: Calculate Magnification & Image Characteristics',
          content: 'Magnification formula: m = h₂/h₁ = -v/u\nh₂ = h₁ × (-v / u) = 4.0 × (-(-37.5) / (-25.0))\nh₂ = 4.0 × (-1.5) = -6.0 cm.\n\nImage Characteristics:\n1. Nature: Real and Inverted (negative sign of image distance & height)\n2. Size: Enlarged (6.0 cm vs object 4.0 cm)\n3. Position: 37.5 cm on the same side as the object.'
        },
        {
          title: 'Step 4: Examiner\'s Secret & Board Marking Tip',
          content: '⚠️ Frequent Mistake: Students forget to apply negative sign to focal length f for concave mirrors. In CBSE/State board marking schemes, sign convention carries 1 full mark out of 3!'
        }
      ],
      hi: [
        {
          title: 'चरण 1: दिया गया मान पहचानें एवं कार्तीय चिन्ह परिपाटी लागू करें',
          content: '• वस्तु की ऊंचाई (h₁) = +4.0 सेमी\n• वस्तु की दूरी (u) = -25.0 सेमी (दर्पण के सामने)\n• अवतल दर्पण की फोकस दूरी (f) = -15.0 सेमी\n• प्रतिबिम्ब की दूरी (v) = ?\n• प्रतिबिम्ब की ऊंचाई (h₂) = ?'
        },
        {
          title: 'चरण 2: दर्पण सूत्र का प्रयोग करें',
          content: 'सूत्र: 1/v + 1/u = 1/f\n1/v - 1/25 = -1/15\n1/v = -1/15 + 1/25 = (-5 + 3)/75 = -2/75\nv = -37.5 सेमी।\nपर्दे को अवतल दर्पण के सामने 37.5 सेमी की दूरी पर रखना चाहिए।'
        },
        {
          title: 'चरण 3: आवर्धन एवं प्रतिबिम्ब की प्रकृति',
          content: 'आवर्धन: m = -v/u = h₂/h₁\nh₂ = 4.0 × (-(-37.5) / -25) = -6.0 सेमी।\nप्रकृति: वास्तविक एवं उल्टा (Real & Inverted), आकार में बड़ा (Enlarged)।'
        },
        {
          title: 'चरण 4: परीक्षक की टिप (Board Exam Tip)',
          content: 'अवतल दर्पण के लिए f और u दोनों हमेशा ऋणात्मक (-) होते हैं। चिन्ह न लगाने पर 1 अंक कट जाता है।'
        }
      ],
      mr: [
        {
          title: 'चरण 1: दिलेली माहिती आणि चिन्ह संकेतांचा वापर',
          content: '• वस्तूची उंची (h₁) = +4.0 सेमी\n• वस्तूचे अंतर (u) = -25.0 सेमी (आरशाच्या समोर)\n• अंतर्गोल आरशाचे नाभीय अंतर (f) = -15.0 सेमी\n• प्रतिमेचे अंतर (v) = ?\n• प्रतिमेची उंची (h₂) = ?'
        },
        {
          title: 'चरण 2: आरसा सूत्र (Mirror Formula) लागू करा',
          content: 'सूत्र: 1/v + 1/u = 1/f\n1/v - 1/25 = -1/15\n1/v = -1/15 + 1/25 = (-5 + 3)/75 = -2/75\nv = -37.5 सेमी.\nपडदा अंतर्गोल आरशासमोर 37.5 सेमी अंतरावर ठेवावा लागेल.'
        },
        {
          title: 'चरण 3: विशालन आणि प्रतिमेचे स्वरूप',
          content: 'विशालन: m = -v/u = h₂/h₁\nh₂ = 4.0 × (-(-37.5) / -25) = -6.0 सेमी.\nस्वरूप: वास्तव आणि उलटी (Real & Inverted), आकाराने मोठी (Enlarged).'
        },
        {
          title: 'चरण 4: परीक्षक टीप (Board Exam Tip)',
          content: 'अंतर्गोल आरशासाठी f आणि u दोन्ही ऋण (-) असतात. योग्य चिन्ह न दिल्यास 1 गुण वजा होतो.'
        }
      ],
      ta: [
        {
          title: 'படி 1: கொடுக்கப்பட்ட தரவு மற்றும் குறி மரபுகளைப் பயன்படுத்துக',
          content: '• பொருளின் உயரம் (h₁) = +4.0 செ.மீ\n• பொருள் தொலைவு (u) = -25.0 செ.மீ (ஆடிக்கு முன்)\n• குழி ஆடியின் குவியத் தொலைவு (f) = -15.0 செ.மீ\n• பிம்ப தொலைவு (v) = ?\n• பிம்பத்தின் உயரம் (h₂) = ?'
        },
        {
          title: 'படி 2: ஆடிச் சூத்திரத்தைப் (Mirror Formula) பயன்படுத்துக',
          content: 'சூத்திரம்: 1/v + 1/u = 1/f\n1/v - 1/25 = -1/15\n1/v = -1/15 + 1/25 = (-5 + 3)/75 = -2/75\nv = -37.5 செ.மீ.\nதிரை குழி ஆடிக்கு முன்னால் 37.5 செ.மீ தொலைவில் வைக்கப்பட வேண்டும்.'
        },
        {
          title: 'படி 3: உருப்பெருக்கம் மற்றும் பிம்பத்தின் பண்புகள்',
          content: 'உருப்பெருக்கம்: m = -v/u = h₂/h₁\nh₂ = 4.0 × (-(-37.5) / -25) = -6.0 செ.மீ.\nபிம்பத்தின் தன்மை: மெய் மற்றும் தலைகீழ் (Real & Inverted), பெரியது (Enlarged).'
        },
        {
          title: 'படி 4: தேர்வாளர் குறிப்பு (Exam Tip)',
          content: 'குழி ஆடிக்கு f மற்றும் u இரண்டும் எப்போதும் எதிர்மறை (-) குறியைக் கொண்டிருக்கும்.'
        }
      ],
      te: [
        {
          title: 'దశ 1: ఇచ్చిన వివరాలు మరియు కార్టీసియన్ సంజ్ఞా సంప్రదాయం',
          content: '• వస్తువు ఎత్తు (h₁) = +4.0 సెం.మీ\n• వస్తువు దూరం (u) = -25.0 సెం.మీ\n• పుటాకార దర్పణ నాభ్యాంతరం (f) = -15.0 సెం.మీ\n• ప్రతిబింబ దూరం (v) = ?\n• ప్రతిబింబం ఎత్తు (h₂) = ?'
        },
        {
          title: 'దశ 2: దర్పణ సూత్రాన్ని (Mirror Formula) ఉపయోగించండి',
          content: 'సూత్రం: 1/v + 1/u = 1/f\n1/v - 1/25 = -1/15\n1/v = -1/15 + 1/25 = -2/75\nv = -37.5 సెం.మీ.\nతెరను పుటాకార దర్పణం ముందు 37.5 సెం.మీ దూరంలో ఉంచాలి.'
        },
        {
          title: 'దశ 3: ఆవర్ధనం మరియు ప్రతిబింబ లక్షణాలు',
          content: 'ఆవర్ధనం: m = -v/u = h₂/h₁\nh₂ = 4.0 × (-(-37.5) / -25) = -6.0 సెం.మీ.\nలక్షణాలు: నిజ మరియు తలక్రిందుల ప్రతిబింబం (Real & Inverted), పెద్దది (Enlarged).'
        },
        {
          title: 'దశ 4: పరీక్షకుని చిట్కా (Board Tip)',
          content: 'పుటాకార దర్పణానికి f మరియు u ఎల్లప్పుడూ ఋణాత్మకం (-). గుర్తులు సరిగా వేయకుంటే మార్కులు తగ్గుతాయి.'
        }
      ],
      kn: [
        {
          title: 'ಹಂತ 1: ನೀಡಲಾದ ಮಾಹಿತಿ ಮತ್ತು ಚಿಹ್ನೆ ಪದ್ಧತಿ',
          content: '• ವಸ್ತುವಿನ ಎತ್ತರ (h₁) = +4.0 ಸೆಂ.ಮೀ\n• ವಸ್ತುವಿನ ದೂರ (u) = -25.0 ಸೆಂ.ಮೀ\n• ನಿಮ್ನ ದರ್ಪಣದ ಸಂಗಮ ದೂರ (f) = -15.0 ಸೆಂ.ಮೀ\n• ಪ್ರತಿಬಿಂಬದ ದೂರ (v) = ?\n• ಪ್ರತಿಬಿಂಬದ ಎತ್ತರ (h₂) = ?'
        },
        {
          title: 'ಹಂತ 2: ದರ್ಪಣ ಸೂತ್ರವನ್ನು (Mirror Formula) ಅನ್ವಯಿಸಿ',
          content: 'ಸೂತ್ರ: 1/v + 1/u = 1/f\n1/v - 1/25 = -1/15\n1/v = -1/15 + 1/25 = -2/75\nv = -37.5 ಸೆಂ.ಮೀ.\nಪರದೆಯನ್ನು ನಿಮ್ನ ದರ್ಪಣದ ಮುಂದೆ 37.5 ಸೆಂ.ಮೀ ದೂರದಲ್ಲಿ ಇಡಬೇಕು.'
        },
        {
          title: 'ಹಂತ 3: ವರ್ಧನೆ ಮತ್ತು ಪ್ರತಿಬಿಂಬದ ಗುಣಲಕ್ಷಣಗಳು',
          content: 'ವರ್ಧನೆ: m = -v/u = h₂/h₁\nh₂ = 4.0 × (-(-37.5) / -25) = -6.0 ಸೆಂ.ಮೀ.\nಗುಣ: ನೈಜ ಮತ್ತು ತಲೆಕೆಳಗಾದ (Real & Inverted), ದೊಡ್ಡದಾದ ಪ್ರತಿಬಿಂಬ.'
        },
        {
          title: 'ಹಂತ 4: ಪರೀಕ್ಷಕರ ಸಲಹೆ (Board Tip)',
          content: 'ನಿಮ್ನ ದರ್ಪಣಕ್ಕೆ f ಮತ್ತು u ಎರಡೂ ಯಾವಾಗಲೂ ಋಣಾತ್ಮಕ (-) ಆಗಿರುತ್ತವೆ.'
        }
      ]
    },
    practiceQuestions: [
      {
        q: 'A convex mirror used for rearview on an automobile has a radius of curvature of 3.00 m. If a bus is located at 5.00 m from this mirror, find the position, nature, and size of the image.',
        hint: 'f = R/2 = +1.50 m (convex mirror has positive f).'
      },
      {
        q: 'Why does a ray of light passing through the center of curvature of a concave mirror retrace its path after reflection?',
        hint: 'The ray strikes the mirror along the normal (angle of incidence i = 0°).'
      },
      {
        q: 'Calculate the magnification if an object 2 cm high produces an inverted image 4 cm high.',
        hint: 'm = h₂/h₁ = -4/2 = -2.'
      }
    ]
  },
  {
    id: 'p2',
    title: 'JEE Advanced Physics: Rolling Without Slipping on an Inclined Plane',
    subject: 'Physics (Mechanics)',
    curriculum: 'jee',
    boardTag: 'JEE Advanced • Rotational Motion • Rigid Body Dynamics',
    imageType: 'handwritten',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    extractedText: `A solid uniform cylinder of mass M and radius R rolls without slipping down an inclined plane of inclination θ. Find:
(a) The acceleration of the center of mass of the cylinder.
(b) The frictional force acting on the cylinder during pure rolling.
(c) Minimum coefficient of static friction (μ_min) required to prevent slipping.`,
    conceptSummary: 'Combined translational (F_net = Ma_cm) and rotational dynamics (τ = I_cm α) with rolling constraint a_cm = Rα.',
    solutionSteps: {
      en: [
        {
          title: 'Step 1: Free Body Diagram & Equations of Motion',
          content: 'Forces acting on cylinder along the incline:\n1. Component of gravity: Mg sin θ (downwards)\n2. Static friction force f_s (upwards along the incline to provide torque about COM)\n3. Normal force: N = Mg cos θ (perpendicular to incline)\n\nTranslational equation:\nMg sin θ - f_s = M a_cm  --- (Equation 1)'
        },
        {
          title: 'Step 2: Rotational Dynamics & Constraint Relation',
          content: 'Torque about Center of Mass:\nτ = f_s × R = I_cm × α\nFor a solid cylinder, moment of inertia I_cm = 1/2 M R².\nFor pure rolling without slipping: a_cm = R × α ⇒ α = a_cm / R.\n\nSubstitute into torque equation:\nf_s × R = (1/2 M R²) × (a_cm / R)\nf_s = 1/2 M a_cm  --- (Equation 2)'
        },
        {
          title: 'Step 3: Solve for Acceleration and Friction',
          content: 'Substitute Equation 2 into Equation 1:\nMg sin θ - 1/2 M a_cm = M a_cm\nMg sin θ = (3/2) M a_cm\n\n(a) Acceleration:\na_cm = (2/3) g sin θ\n\n(b) Frictional force:\nf_s = 1/2 M (2/3 g sin θ) = (1/3) Mg sin θ'
        },
        {
          title: 'Step 4: Determine Minimum Friction Coefficient (μ_min)',
          content: 'For pure rolling, f_s ≤ μ_s N\n(1/3) Mg sin θ ≤ μ_s (Mg cos θ)\nμ_s ≥ (1/3) tan θ\nTherefore: μ_min = (1/3) tan θ.\n\n💡 JEE Tip: For any rolling body with I_cm = k M R², general acceleration is a = g sin θ / (1 + k). For cylinder k = 1/2, so a = (2/3)g sin θ.'
        }
      ],
      hi: [
        {
          title: 'चरण 1: बल रेखाचित्र और गति समीकरण',
          content: 'ढलान के अनुदिश बल:\nMg sin θ - f_s = M a_cm  --- (समीकरण 1)\nलंबवत बल: N = Mg cos θ'
        },
        {
          title: 'चरण 2: घूर्णन गति और बिना फिसले लुढ़कने की शर्त',
          content: 'बल आघूर्ण τ = f_s × R = I_cm × α\nठोस बेलन हेतु: I_cm = (1/2) M R²\nशुद्ध लोटनी गति (Pure Rolling): a_cm = R α\nf_s = (1/2) M a_cm  --- (समीकरण 2)'
        },
        {
          title: 'चरण 3: त्वरण एवं घर्षण बल की गणना',
          content: 'समीकरण 1 एवं 2 से:\nMg sin θ - (1/2) M a_cm = M a_cm\na_cm = (2/3) g sin θ\nघर्षण बल f_s = (1/3) Mg sin θ'
        },
        {
          title: 'चरण 4: न्यूनतम स्थैतिक घर्षण गुणांक',
          content: 'f_s ≤ μ_s N ⇒ (1/3) Mg sin θ ≤ μ_s Mg cos θ\nμ_min = (1/3) tan θ'
        }
      ]
    },
    practiceQuestions: [
      {
        q: 'If a hollow sphere and solid sphere of identical mass and radius roll down the same incline, which reaches the bottom first?',
        hint: 'Solid sphere has lower I_cm = (2/5)MR² compared to hollow sphere (2/3)MR², hence higher acceleration.'
      },
      {
        q: 'Calculate the total kinetic energy of the cylinder when its center of mass speed is v.',
        hint: 'KE_total = 1/2 M v² + 1/2 I ω² = (3/4) M v².'
      },
      {
        q: 'What is the work done by static friction during pure rolling down length L of the incline?',
        hint: 'Zero! Point of contact is instantaneously at rest.'
      }
    ]
  },
  {
    id: 'p3',
    title: 'NEET-UG Biology: Dihybrid Cross & Mendelian Inheritance Probability',
    subject: 'Biology (Genetics)',
    curriculum: 'neet',
    boardTag: 'NEET-UG • Principles of Inheritance & Variation • NCERT Class 12 Ch 5',
    imageType: 'textbook',
    imageUrl: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=600&auto=format&fit=crop&q=80',
    extractedText: `In a dihybrid cross between heterozygous yellow round seeded pea plants (YyRr × YyRr):
1. What is the phenotypic ratio of the offspring?
2. What is the probability of obtaining an offspring that is homozygous recessive for seed shape but heterozygous for seed color?
3. What is the fraction of recombinant phenotypes?`,
    conceptSummary: 'Law of Independent Assortment, Punnett square segregation (9:3:3:1 ratio), and product rule of independent probabilities.',
    solutionSteps: {
      en: [
        {
          title: 'Step 1: Analyze Parental Genotypes and Gametes',
          content: 'Cross: YyRr × YyRr\n• Alleles for color: Y (Yellow - dominant), y (Green - recessive)\n• Alleles for shape: R (Round - dominant), r (Wrinkled - recessive)\nGametes produced by each parent: YR, Yr, yR, yr in equal ratios (1:1:1:1).'
        },
        {
          title: 'Step 2: Determine Phenotypic Ratio',
          content: 'The 16-cell Punnett square yields:\n• Yellow Round (Y_R_): 9/16\n• Yellow Wrinkled (Y_rr): 3/16\n• Green Round (yyR_): 3/16\n• Green Wrinkled (yyrr): 1/16\nClassical Mendelian Dihybrid Phenotypic Ratio = 9 : 3 : 3 : 1.'
        },
        {
          title: 'Step 3: Calculate Requested Specific Genotypic Probability',
          content: 'Target Genotype: Heterozygous for seed color (Yy) AND Homozygous recessive for seed shape (rr) = Yyrr.\nUsing probability product rule:\n• P(Yy from Yy × Yy) = 2/4 = 1/2\n• P(rr from Rr × Rr) = 1/4\nCombined P(Yyrr) = (1/2) × (1/4) = 1/8 (or 2/16).\nProbability = 12.5%.'
        },
        {
          title: 'Step 4: Calculate Fraction of Recombinant (Non-Parental) Types',
          content: 'Parental phenotypes: Yellow Round and Green Wrinkled (9 + 1 = 10/16).\nRecombinant phenotypes: Yellow Wrinkled (3/16) and Green Round (3/16).\nTotal Recombinants = 3/16 + 3/16 = 6/16 = 3/8 (37.5%).\n\n🎯 NEET High-Yield Note: Questions frequently confuse genotypic ratio (1:2:1:2:4:2:1:2:1) with phenotypic ratio (9:3:3:1)!'
        }
      ],
      hi: [
        {
          title: 'चरण 1: जनकों का जीनोटाइप एवं युग्मक निर्माण',
          content: 'संकरण: YyRr × YyRr\n• रंग: Y (पीला - प्रभावी), y (हरा - अप्रभावी)\n• आकार: R (गोल - प्रभावी), r (झुर्रीदार - अप्रभावी)\nयुग्मक: YR, Yr, yR, yr (प्रत्येक 25%)।'
        },
        {
          title: 'चरण 2: फीनोटाइपिक अनुपात (Phenotypic Ratio)',
          content: 'पनेट वर्ग के अनुसार:\n• पीला गोल (Y_R_): 9\n• पीला झुर्रीदार (Y_rr): 3\n• हरा गोल (yyR_): 3\n• हरा झुर्रीदार (yyrr): 1\nअनुपात = 9 : 3 : 3 : 1'
        },
        {
          title: 'चरण 3: Yyrr जीनोटाइप की प्रायिकता',
          content: 'P(Yy) = 2/4 = 1/2\nP(rr) = 1/4\nP(Yyrr) = 1/2 × 1/4 = 1/8 (या 2/16 = 12.5%)'
        },
        {
          title: 'चरण 4: पुनर्योजन (Recombinant) फीनोटाइप',
          content: 'पुनर्योजक = पीला झुर्रीदार (3/16) + हरा गोल (3/16) = 6/16 = 3/8'
        }
      ]
    },
    practiceQuestions: [
      {
        q: 'In a test cross of a dihybrid plant (YyRr × yyrr), what is the expected phenotypic and genotypic ratio?',
        hint: '1:1:1:1 for both, because test cross reveals gamete frequencies directly.'
      },
      {
        q: 'How many different types of gametes are produced by an organism with genotype AaBbCcDd?',
        hint: 'Formula 2^n where n is heterozygous pairs. Here 2^4 = 16 gametes.'
      },
      {
        q: 'Which law of Mendel has no universal exception: Segregation or Independent Assortment?',
        hint: 'Law of Segregation has no exceptions in diploid organisms (Independent assortment is violated by linkage).'
      }
    ]
  },
  {
    id: 'p4',
    title: 'Class 12 Chemistry: Nernst Equation & Electrochemical Cell Potential',
    subject: 'Chemistry (Physical)',
    curriculum: 'ncert_12_pcm',
    boardTag: 'NCERT Class 12 • Electrochemistry • Chapter 3 Numerical 3.5',
    imageType: 'textbook',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80',
    extractedText: `Calculate the emf of the cell in which the following reaction takes place at 298 K:
Ni(s) + 2Ag+(0.002 M) → Ni2+(0.160 M) + 2Ag(s)
Given: E°(Ni2+/Ni) = -0.25 V and E°(Ag+/Ag) = +0.80 V.`,
    conceptSummary: 'Standard cell potential calculation E°_cell = E°_cathode - E°_anode followed by Nernst equation correction for non-standard concentration.',
    solutionSteps: {
      en: [
        {
          title: 'Step 1: Calculate Standard Cell Potential (E°_cell)',
          content: 'Cathode (reduction): Ag⁺ + e⁻ → Ag ; E°(Ag⁺/Ag) = +0.80 V\nAnode (oxidation): Ni → Ni²⁺ + 2e⁻ ; E°(Ni²⁺/Ni) = -0.25 V\nNumber of electrons transferred (n) = 2.\n\nE°_cell = E°_cathode - E°_anode\nE°_cell = +0.80 V - (-0.25 V) = +1.05 V.'
        },
        {
          title: 'Step 2: Formulate Nernst Equation for 298 K',
          content: 'E_cell = E°_cell - (0.0591 / n) × log₁₀ Q\nReaction Quotient Q = [Ni²⁺] / [Ag⁺]²\nNotice that the stoichiometric coefficient of Ag⁺ is 2, so its concentration must be squared!'
        },
        {
          title: 'Step 3: Substitute Values & Solve Logarithm',
          content: 'Q = (0.160) / (0.002)² = 0.160 / (4 × 10⁻⁶) = 0.160 / 0.000004 = 40,000 = 4 × 10⁴.\nlog₁₀(4 × 10⁴) = log₁₀(4) + 4 = 0.6021 + 4 = 4.6021.\n\nE_cell = 1.05 V - (0.0591 / 2) × 4.6021\nE_cell = 1.05 V - (0.02955) × 4.6021\nE_cell = 1.05 V - 0.136 V = +0.914 V.'
        },
        {
          title: 'Step 4: Examiner Marking Advice',
          content: '⚠️ Common error: Forgetting to square the denominator concentration [Ag⁺]². Marking schemes award 1 mark for E°_cell, 1 mark for correct log Q substitution, and 1 mark for final calculated emf with units (V).'
        }
      ],
      hi: [
        {
          title: 'चरण 1: मानक सेल विभव (E°_cell) की गणना',
          content: 'कैथोड: E°(Ag⁺/Ag) = +0.80 V\nएनोड: E°(Ni²⁺/Ni) = -0.25 V\nइलेक्ट्रॉनों की संख्या (n) = 2\nE°_cell = +0.80 - (-0.25) = +1.05 V'
        },
        {
          title: 'चरण 2: 298 K पर नेर्न्स्ट समीकरण',
          content: 'E_cell = E°_cell - (0.0591 / n) × log₁₀([Ni²⁺] / [Ag⁺]²)'
        },
        {
          title: 'चरण 3: मान रखकर गणना करें',
          content: 'Q = 0.160 / (0.002)² = 40,000\nlog₁₀(40000) = 4.6021\nE_cell = 1.05 - (0.02955 × 4.6021) = 1.05 - 0.136 = +0.914 V'
        },
        {
          title: 'चरण 4: मुख्य बिंदु',
          content: '[Ag⁺] का वर्ग (square) करना अत्यंत आवश्यक है क्योंकि समीकरण में 2Ag⁺ है।'
        }
      ]
    },
    practiceQuestions: [
      {
        q: 'What happens to cell emf if the concentration of Ni2+ is increased tenfold?',
        hint: 'Emf decreases by (0.0591/2) * log(10) = 0.02955 V.'
      },
      {
        q: 'Write the relationship between standard cell potential E°_cell and equilibrium constant K_c at 298 K.',
        hint: 'E°_cell = (0.0591 / n) log₁₀ K_c.'
      },
      {
        q: 'Can a cell reaction occur spontaneously when E_cell is negative?',
        hint: 'No, because ΔG = -nFE_cell. Negative E_cell implies positive ΔG (non-spontaneous).'
      }
    ]
  }
];

export const VOICE_CONVERSATION_SAMPLES = [
  {
    id: 'vc1',
    userQuery: 'Newton ka doosra niyam samjhao with daily life example',
    language: 'Hindi',
    subject: 'Physics',
    transcript: 'Student: "Newton ka doosra niyam samjhao with daily life example"',
    response: `न्यूटन का दूसरा नियम (Newton's Second Law of Motion) कहता है कि:
"किसी वस्तु के संवेग परिवर्तन की दर उस पर लगाए गए बाहरी असंतुलित बल के समानुपाती होती है, और यह परिवर्तन उसी दिशा में होता है जिस दिशा में बल लगाया गया है।"

गणितीय रूप: F = m × a (बल = द्रव्यमान × त्वरण)

दैनिक जीवन का सबसे प्रसिद्ध उदाहरण (Cricket Catch):
जब एक क्रिकेट खिलाड़ी तेजी से आती गेंद को कैच करता है, तो वह अपने हाथों को पीछे की ओर खींचता है।
• ऐसा करने से गेंद का वेग शून्य होने में लगा समय (Δt) बढ़ जाता है।
• संवेग परिवर्तन की दर (Δp / Δt) कम हो जाती है।
• परिणामस्वरूप खिलाड़ी की हथेलियों पर लगने वाला बल (F) काफी कम हो जाता है और चोट नहीं लगती!`,
    voiceSnippet: 'न्यूटन का दूसरा नियम कहता है कि किसी वस्तु के संवेग परिवर्तन की दर उस पर लगाए गए बल के समानुपाती होती है...',
    stats: {
      latency: '290ms',
      npuPower: '3.1W',
      tokensPerSec: '52 t/s',
      model: 'Whisper-Base INT8 + Phi-3-mini INT4 (Qualcomm AI Hub)'
    }
  },
  {
    id: 'vc2',
    userQuery: 'Explain how Lenz\'s law is in accordance with the law of conservation of energy.',
    language: 'English',
    subject: 'Physics (Electromagnetism)',
    transcript: 'Student: "Explain how Lenz\'s law is in accordance with the law of conservation of energy."',
    response: `Lenz's Law states that the polarity of induced EMF is such that it produces an induced current whose magnetic field opposes the change in magnetic flux that produced it.

How it obeys Conservation of Energy:
1. When a magnet's North pole approaches a closed coil, the induced current creates an opposing North pole on the near face of the coil.
2. To push the magnet closer against this repulsive force, an external agent must do mechanical work.
3. This mechanical work done against the magnetic repulsion is exactly converted into electrical energy (induced current), which subsequently dissipates as thermal Joule heating (I²Rt).

What if Lenz's law were opposite?
If an approaching North pole created an attractive South pole, the magnet would accelerate on its own without any input of energy, creating perpetual motion and violating the First Law of Thermodynamics! Hence, Lenz's law is a direct consequence of energy conservation.`,
    voiceSnippet: "Lenz's Law states that the polarity of induced EMF is such that it produces an induced current whose magnetic field opposes the change...",
    stats: {
      latency: '310ms',
      npuPower: '3.4W',
      tokensPerSec: '49 t/s',
      model: 'Whisper-Base INT8 + Phi-3-mini INT4 (Qualcomm AI Hub)'
    }
  },
  {
    id: 'vc3',
    userQuery: 'What is the role of RuBisCO in C3 cycle and photorespiration?',
    language: 'English',
    subject: 'Biology (Botany)',
    transcript: 'Student: "What is the role of RuBisCO in C3 cycle and photorespiration?"',
    response: `RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) is the most abundant enzyme on Earth and acts as a bifunctional catalyst:

1. Carboxylation (C3 Calvin Cycle):
When CO₂:O₂ ratio is high, RuBisCO catalyzes:
RuBP (5C) + CO₂ → 2 molecules of 3-PGA (3C).
This leads to normal sugar synthesis without energy waste.

2. Oxygenation (Photorespiration / C2 Cycle):
When temperature is high and O₂ concentration rises relative to CO₂ (stomatal closure during hot days), RuBisCO binds oxygen instead:
RuBP (5C) + O₂ → 1 molecule of 3-PGA (3C) + 1 molecule of Phosphoglycolate (2C).
Phosphoglycolate enters the photorespiratory glycolate pathway across Chloroplast → Peroxisome → Mitochondria.

Why Photorespiration is wasteful:
It consumes ATP and NADPH without producing sugars or ATP, releasing previously fixed CO₂ back into the atmosphere (wasting up to 25% of fixed carbon). C4 plants avoid this via Kranz anatomy and spatial separation of initial CO₂ fixation!`,
    voiceSnippet: 'RuBisCO is the most abundant enzyme on Earth and acts as a bifunctional catalyst in photosynthesis...',
    stats: {
      latency: '340ms',
      npuPower: '3.2W',
      tokensPerSec: '54 t/s',
      model: 'Whisper-Base INT8 + Phi-3-mini INT4 (Qualcomm AI Hub)'
    }
  }
];

export const TOPIC_KNOWLEDGE_GRAPH = [
  { id: 't1', subject: 'Physics', name: 'Ray & Wave Optics', mastery: 86, status: 'strong', reviewsDue: 0, chapters: 'NCERT Ch 9 & 10' },
  { id: 't2', subject: 'Physics', name: 'Rotational Motion & Inertia', mastery: 44, status: 'weak', reviewsDue: 3, chapters: 'NCERT Ch 7 (JEE High Weightage)' },
  { id: 't3', subject: 'Physics', name: 'Electromagnetic Induction', mastery: 72, status: 'medium', reviewsDue: 1, chapters: 'NCERT Class 12 Ch 6' },
  { id: 't4', subject: 'Chemistry', name: 'Electrochemistry & Nernst Eq.', mastery: 90, status: 'strong', reviewsDue: 0, chapters: 'NCERT Class 12 Ch 3' },
  { id: 't5', subject: 'Chemistry', name: 'Aldehydes, Ketones & Carboxylic Acids', mastery: 52, status: 'weak', reviewsDue: 4, chapters: 'NCERT Class 12 Ch 12' },
  { id: 't6', subject: 'Chemistry', name: 'Chemical Thermodynamics', mastery: 68, status: 'medium', reviewsDue: 2, chapters: 'NCERT Class 11 Ch 6' },
  { id: 't7', subject: 'Biology', name: 'Principles of Inheritance & Genetics', mastery: 82, status: 'strong', reviewsDue: 0, chapters: 'NCERT Class 12 Ch 5' },
  { id: 't8', subject: 'Biology', name: 'Photosynthesis in Higher Plants', mastery: 64, status: 'medium', reviewsDue: 1, chapters: 'NCERT Class 11 Ch 13' },
  { id: 't9', subject: 'Mathematics', name: 'Definite Integrals & Areas', mastery: 78, status: 'medium', reviewsDue: 1, chapters: 'NCERT Class 12 Ch 8' },
  { id: 't10', subject: 'Mathematics', name: 'Probability & Bayes Theorem', mastery: 48, status: 'weak', reviewsDue: 2, chapters: 'NCERT Class 12 Ch 13' }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    curriculum: 'ncert_12_pcm',
    subject: 'Physics',
    topic: 'Rotational Motion',
    type: 'MCQ',
    question: 'A disc and a ring of the same mass and radius roll down an inclined plane from the same height without slipping. Which reaches the bottom first?',
    options: [
      { id: 'A', text: 'Ring' },
      { id: 'B', text: 'Disc' },
      { id: 'C', text: 'Both reach at the same time' },
      { id: 'D', text: 'Depends on the angle of inclination' }
    ],
    correctAnswer: 'B',
    explanation: 'Acceleration on an incline during pure rolling is a = g sin θ / (1 + I / MR²). For disc, I/(MR²) = 0.5, so a = (2/3)g sin θ ≈ 0.67 g sin θ. For ring, I/(MR²) = 1, so a = 0.5 g sin θ. Disc has higher acceleration and arrives first.',
    difficulty: 'Medium',
    examTag: 'JEE Main & CBSE Class 11'
  },
  {
    id: 'q2',
    curriculum: 'ncert_10',
    subject: 'Science',
    topic: 'Acids, Bases & Salts',
    type: 'MCQ',
    question: 'When baking soda (NaHCO₃) is heated during cooking, which gas is released that causes bread or cake to rise and become soft and spongy?',
    options: [
      { id: 'A', text: 'Hydrogen (H₂)' },
      { id: 'B', text: 'Oxygen (O₂)' },
      { id: 'C', text: 'Carbon Dioxide (CO₂)' },
      { id: 'D', text: 'Carbon Monoxide (CO)' }
    ],
    correctAnswer: 'C',
    explanation: 'Thermal decomposition reaction: 2 NaHCO₃(s) + Heat → Na₂CO₃(s) + H₂O(g) + CO₂(g). The released CO₂ gas bubbles through the dough, making it fluffy.',
    difficulty: 'Easy',
    examTag: 'NCERT Class 10 Board'
  },
  {
    id: 'q3',
    curriculum: 'neet',
    subject: 'Biology',
    topic: 'Genetics',
    type: 'MCQ',
    question: 'A man with blood group A marries a woman with blood group B. What are the possible blood groups of their biological children if both parents are heterozygous?',
    options: [
      { id: 'A', text: 'Only AB' },
      { id: 'B', text: 'Only A and B' },
      { id: 'C', text: 'A, B, AB, and O' },
      { id: 'D', text: 'Only AB and O' }
    ],
    correctAnswer: 'C',
    explanation: 'Father is I^A i and Mother is I^B i. Possible combinations: I^A I^B (Group AB), I^A i (Group A), I^B i (Group B), and i i (Group O). All four ABO phenotypes are possible with 25% probability each.',
    difficulty: 'Medium',
    examTag: 'NEET-UG High Yield'
  },
  {
    id: 'q4',
    curriculum: 'ncert_12_pcm',
    subject: 'Chemistry',
    topic: 'Aldehydes & Ketones',
    type: 'MCQ',
    question: 'Which of the following compounds gives a bright yellow precipitate of Iodoform (CHI₃) when warmed with NaOH and I₂?',
    options: [
      { id: 'A', text: 'Methanol (CH₃OH)' },
      { id: 'B', text: 'Propan-2-ol (CH₃-CH(OH)-CH₃)' },
      { id: 'C', text: 'Benzophenone (C₆H₅-CO-C₆H₅)' },
      { id: 'D', text: 'Propan-1-ol (CH₃-CH₂-CH₂OH)' }
    ],
    correctAnswer: 'B',
    explanation: 'The Iodoform test requires a methyl ketone group (-CO-CH₃) or a secondary alcohol with structure CH₃-CH(OH)-R which oxidizes to a methyl ketone. Propan-2-ol has this structure and produces yellow CHI₃ precipitate.',
    difficulty: 'Hard',
    examTag: 'CBSE Class 12 & JEE'
  }
];

export const SNAPDRAGON_MODELS = [
  {
    id: 'phi3',
    name: 'Phi-3-mini-4K-Instruct',
    task: 'Curriculum Reasoning & Step-by-Step Tutoring',
    source: 'Qualcomm AI Hub',
    quantization: 'INT4 (W4A16)',
    size: '2.18 GB',
    ramUsage: '2.4 GB',
    hardware: 'Qualcomm Hexagon NPU',
    status: 'Loaded (Active)',
    topsEstimate: '38 TOPS peak',
    latency: '18ms / token'
  },
  {
    id: 'whisper',
    name: 'Whisper-Base-Multilingual',
    task: 'Offline Speech-to-Text (Hindi + English)',
    source: 'Qualcomm AI Hub',
    quantization: 'INT8',
    size: '142 MB',
    ramUsage: '180 MB',
    hardware: 'Qualcomm Hexagon NPU',
    status: 'Loaded (Active)',
    topsEstimate: '22 TOPS',
    latency: '240ms per 5s chunk'
  },
  {
    id: 'trocr',
    name: 'PaddleOCR / TrOCR Math-Vision',
    task: 'Textbook OCR & Handwritten Formula Extraction',
    source: 'Qualcomm AI Hub / Open-Source',
    quantization: 'INT8',
    size: '290 MB',
    ramUsage: '340 MB',
    hardware: 'Qualcomm Hexagon NPU',
    status: 'Loaded (Active)',
    topsEstimate: '28 TOPS',
    latency: '1.2s per 1080p page'
  },
  {
    id: 'minilm',
    name: 'All-MiniLM-L6-v2',
    task: 'Curriculum Semantic Search & RAG Vector Match',
    source: 'Qualcomm AI Hub / Open-Source',
    quantization: 'INT8',
    size: '85 MB',
    ramUsage: '110 MB',
    hardware: 'Qualcomm Hexagon NPU',
    status: 'Loaded (Active)',
    topsEstimate: '15 TOPS',
    latency: '45ms per query'
  },
  {
    id: 'fastspeech',
    name: 'FastSpeech2 Indian Voice Synthesis',
    task: 'Bilingual Audio Response (Hindi / English)',
    source: 'Open-Source ONNX Runtime',
    quantization: 'FP16',
    size: '124 MB',
    ramUsage: '150 MB',
    hardware: 'Hexagon NPU / Oryon CPU',
    status: 'Loaded (Active)',
    topsEstimate: '12 TOPS',
    latency: '380ms per response'
  }
];
