import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: { // used by tab navigation
      path: 'root',
      screens: {
        Home: 'home',
        Links: 'links',
        Template: 'template',
        User: 'user',
      },
    },
    User: 'user', // used by default stack navigation
    Template: 'template',
    Todo: 'todo',
  },
};
