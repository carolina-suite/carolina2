
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
        args: ['admin123']
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
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'pinkiepie',
      name: 'PinkiePie'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['pink']
      }
    ]
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'twilightsparkle',
      name: 'Twilight Sparkle'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['purple']
      }
    ]
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'rarity',
      name: 'Rarity'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['white']
      }
    ]
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'fluttershy',
      name: 'Fluttershy'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['yellow']
      }
    ]
  },
  {
    model: { app: 'auth', model: 'User' },
    fields: {
      username: 'rainbowdash',
      name: 'Rainbow Dash'
    },
    functionFields: [
      {
        functionName: 'setPassword',
        args: ['blue']
      }
    ]
  }
];
