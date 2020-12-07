
const question = {
  id: 2,
  title: 'qwer',
  difficult: 'easy',
  description: 'hgfdhj',
  question: 'jhgfsdfg?',
  question_type: 'opened',
  variants: [
    {
      id: 3,
      value: 'qwer',
    },
    {
      id: 4,
      value: 'qghder',
    },
    {
      id: 5,
      value: 'qwerer',
    },
  ],
  answers: [2],
}

const userAnswers = [
  {
    id: 0,
    question: question,
    user: 0,
    answers: [1],
    isCorrect: false,
  }
]

export default userAnswers;