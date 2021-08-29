import SQLite from 'react-native-sqlite-storage';

export const HELLO = 'hello';
const db = SQLite.openDatabase({
  name: 'categories.db',
  createFromLocation: 1,
});

export const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM categories',
        [],
        (tx, results) => {
          var data = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = data.push(results.rows.item(i));
          }
          resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
};

const errorCB = err => {
  console.log('SQL Error: ' + err);
};

const successCB = () => {
  console.log('SQL executed fine');
};

const openCB = () => {
  console.log('Database OPENED');
};
