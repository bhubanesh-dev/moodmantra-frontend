 // client/src/features/survey/surveyData.js
export const mentalHealthSurveys = [
  {
    id: 'phq-9',
    title: 'PHQ-9 Depression Questionnaire',
    description: 'Measures depression severity over the last 2 weeks',
    instructions: 'How often have you been bothered by the following over the last 2 weeks?',
    questions: [
      {
        id: 'q1',
        text: 'Little interest or pleasure in doing things',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q2',
        text: 'Feeling down, depressed, or hopeless',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q4',
        text: 'Feeling tired or having little energy',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q5',
        text: 'Poor appetite or overeating',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q6',
        text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q8',
        text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q9',
        text: 'Thoughts that you would be better off dead or of hurting yourself in some way',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      }
    ],
    scoring: {
      ranges: [
        { min: 0, max: 4, result: 'Minimal depression', feedback: 'Your score suggests minimal depression symptoms.' },
        { min: 5, max: 9, result: 'Mild depression', feedback: 'Your score suggests mild depression. Consider speaking with a healthcare provider.' },
        { min: 10, max: 14, result: 'Moderate depression', feedback: 'Your score suggests moderate depression. We recommend consulting with a healthcare provider.' },
        { min: 15, max: 19, result: 'Moderately severe depression', feedback: 'Your score suggests moderately severe depression. Please consider seeking professional help.' },
        { min: 20, max: 27, result: 'Severe depression', feedback: 'Your score suggests severe depression. We strongly recommend seeking professional help immediately.' }
      ]
    }
  },
  {
    id: 'gad-7',
    title: 'GAD-7 Anxiety Questionnaire',
    description: 'Measures generalized anxiety disorder symptoms over the last 2 weeks',
    instructions: 'How often have you been bothered by the following over the last 2 weeks?',
    questions: [
      {
        id: 'q1',
        text: 'Feeling nervous, anxious, or on edge',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q2',
        text: 'Not being able to stop or control worrying',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q3',
        text: 'Worrying too much about different things',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q4',
        text: 'Trouble relaxing',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q5',
        text: 'Being so restless that it\'s hard to sit still',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q6',
        text: 'Becoming easily annoyed or irritable',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'q7',
        text: 'Feeling afraid as if something awful might happen',
        type: 'likert',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      }
    ],
    scoring: {
      ranges: [
        { min: 0, max: 4, result: 'Minimal anxiety', feedback: 'Your score suggests minimal anxiety symptoms.' },
        { min: 5, max: 9, result: 'Mild anxiety', feedback: 'Your score suggests mild anxiety. Consider speaking with a healthcare provider.' },
        { min: 10, max: 14, result: 'Moderate anxiety', feedback: 'Your score suggests moderate anxiety. We recommend consulting with a healthcare provider.' },
        { min: 15, max: 21, result: 'Severe anxiety', feedback: 'Your score suggests severe anxiety. Please consider seeking professional help.' }
      ]
    }
  },
  {
    id: 'pss',
    title: 'Perceived Stress Scale (PSS)',
    description: 'Measures the degree to which situations in one\'s life are appraised as stressful',
    instructions: 'How often have you felt or thought the following in the last month?',
    questions: [
      {
        id: 'q1',
        text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      },
      {
        id: 'q2',
        text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      },
      {
        id: 'q3',
        text: 'In the last month, how often have you felt nervous and "stressed"?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      },
      {
        id: 'q4',
        text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
        type: 'likert',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' }
        ]
      },
      {
        id: 'q5',
        text: 'In the last month, how often have you felt that things were going your way?',
        type: 'likert',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' }
        ]
      },
      {
        id: 'q6',
        text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      },
      {
        id: 'q7',
        text: 'In the last month, how often have you been able to control irritations in your life?',
        type: 'likert',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' }
        ]
      },
      {
        id: 'q8',
        text: 'In the last month, how often have you felt that you were on top of things?',
        type: 'likert',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' }
        ]
      },
      {
        id: 'q9',
        text: 'In the last month, how often have you been angered because of things that happened that were outside of your control?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      },
      {
        id: 'q10',
        text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
        type: 'likert',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' }
        ]
      }
    ],
    scoring: {
      ranges: [
        { min: 0, max: 13, result: 'Low stress', feedback: 'Your score suggests low perceived stress.' },
        { min: 14, max: 26, result: 'Moderate stress', feedback: 'Your score suggests moderate perceived stress. Consider stress management techniques.' },
        { min: 27, max: 40, result: 'High stress', feedback: 'Your score suggests high perceived stress. You may benefit from stress reduction strategies or professional support.' }
      ]
    }
  }
];

export const getSurveyById = (id) => 
  mentalHealthSurveys.find(survey => survey.id === id);