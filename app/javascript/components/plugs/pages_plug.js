import DataTypes from '../../photos/data_types.jpg'
import Variables from '../../photos/variables.jpg'

const pages = [
  {
    id: 0,
    courseId: 0,
    order: 1,
    title: 'Variables and Data types',
    theoryList:[
      {
        id: 0,
        subtitle: 'Variables',
        content: 'Variables are the memory locations, which hold any data to be used by any program.\n There are five types of variables supported by Ruby. You already have gone through a small description of these variables in the previous chapter as well. These five types of variables are explained in this chapter.',
        image: Variables,
      },
      {
        id: 1,
        subtitle: 'Data types',
        content: 'Data types in Ruby represent different categories of data such as text, string, numbers, etc. Since Ruby is an object-oriented language, all its supported data types are implemented as classes.\n Have a look at the various data types supported by Ruby in the illustration below:',
        image: DataTypes,
      },
      {
        id: 2,
        subtitle: 'Conclusion',
        content: 'Assignment to uninitialized local variables also serves as variable declaration. The variables start to exist until the end of the current scope is reached. The lifetime of local variables is determined when Ruby parses the program.',
        image: null,
      },
    ],
    practiceList:[
      {
        id: 0,
        title: 'choose data types',
        difficult: 'easy',
        description: 'you need to choose existing data types',
        question: 'which data types exist?',
        questionType: 'opened',
        variants: [
          {
            id: 0,
            order: 1,
            name: 'int',
            status: false,
          },
          {
            id: 1,
            order: 2,
            name: 'hash',
            status: false,
          },
          {
            id: 2,
            order: 3,
            name: 'float',
            status: false,
          },
          {
            id: 3,
            order: 4,
            name: 'double',
            status: false,
          },
          {
            id: 4,
            order: 5,
            name: 'array',
            status: false,
          },
          {
            id: 5,
            order: 6,
            name: 'range',
            status: false,
          },
          {
            id: 6,
            order: 7,
            name: 'decimal',
            status: false,
          },
        ],
        answers: [1,2,3,5,6],
      },
      {
        id: 1,
        title: 'create variable',
        difficult: 'easy',
        description: 'you need to create variable named \'a\' and save in it 77 (please keep spaces between symbols).  ',
        question: 'how we are creating variables in ruby?',
        questionType: 'closed',
        variants: [],
        answers: ['a = 77'],
      }
    ]
  },
  {
    id: 1,
    courseId: 0,
    order: 2,
    title: 'Arrays and Hashes',
    theoryList:[
      {
        id: 3,
        subtitle: 'Arrays',
        content: 'Arrays are the memory locations, which hold any data to be used by any program.\n There are five types of variables supported by Ruby. You already have gone through a small description of these variables in the previous chapter as well. These five types of variables are explained in this chapter.',
        image: Variables,
      },
      {
        id: 4,
        subtitle: 'Hashes',
        content: 'Hashes in Ruby represent different categories of data such as text, string, numbers, etc. Since Ruby is an object-oriented language, all its supported data types are implemented as classes.\n Have a look at the various data types supported by Ruby in the illustration below:',
        image: DataTypes,
      },
      {
        id: 5,
        subtitle: 'Conclusion',
        content: 'Assignment to uninitialized local variables also serves as variable declaration. The variables start to exist until the end of the current scope is reached. The lifetime of local variables is determined when Ruby parses the program.',
        image: null,
      },
    ],
    practiceList:[
      {
        id: 2,
        title: 'creating arrays',
        difficult: 'easy',
        description: 'choose all variants with which we can create array',
        question: 'which of these can help us in array creating?',
        questionType: 'opened',
        variants: [
          {
            id: 7,
            order: 1,
            name: 'Array.new',
          },
          {
            id: 8,
            order: 2,
            name: '[]',
          },
          {
            id: 9,
            order: 3,
            name: 'new Array()',
          },
        ],
        answers: [1,2],
      },
      {
        id: 3,
        title: 'hash rocket',
        difficult: 'easy',
        description: 'you need to write a \'hash rocket\'',
        question: 'how looks the famose \'hash rocket\'?',
        questionType: 'closed',
        variants: [],
        answers: ['=>'],
      }
    ]
  },
  {
    id: 2,
    courseId: 0,
    order: 3,
    title: 'Everything about everything',
    theoryList:[
      {
        id: 6,
        subtitle: 'Has you already loved ruby?',
        content: 'Arrays are the memory locations, which hold any data to be used by any program.\n There are five types of variables supported by Ruby. You already have gone through a small description of these variables in the previous chapter as well. These five types of variables are explained in this chapter.',
        image: null,
      }
    ],
    practiceList:[
      {
        id: 4,
        title: 'In love with ruby <3',
        difficult: 'hard',
        description: 'Anser hostly',
        question: 'Do you love ruby?',
        questionType: 'closed',
        variants: [],
        answers: ['Of course I love ruby <3'],
      }
    ]
  }
]

export default pages;