import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: { // used by tab navigation
      path: 'root',
      screens: {
        Home: 'home',
        Links: 'links',
        Product: 'product',
        User: 'user',
      },
    },
    User: 'user', // used by stack navigation
    Product: 'product',
    Todo: 'todo',
  },
};
