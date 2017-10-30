
module.exports = [
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'admin',
      isAdmin: true
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['orange']
      }
    ]
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'applejack',
      name: 'Applejack'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['orange']
      }
    ]
  }
];
