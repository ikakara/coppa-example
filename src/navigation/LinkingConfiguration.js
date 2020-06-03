import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: { // used by tab navigation
      path: 'root',
      screens: {
        User: 'user',
        Links: 'links',
        Product: 'product',
        Todo: 'todo',
      },
    },
    User: 'user', // used by stack navigation
    Product: 'product',
    Todo: 'todo',
  },
};
