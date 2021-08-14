import Hindi from './hindi';
import English from './english';

export default languages = {
  en: English,
  hi: Hindi,
};

const objectToArray = () => {
  let array = [];
  for (const key in languages) {
    array.push(languages[key]);
  }
  return array;
};

export const LanguagesArray = objectToArray();
