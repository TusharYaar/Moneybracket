import 'moment/locale/en-in';
import 'moment/locale/hi';

const hindiMoment = moment.locale('hi');
const englishMoment = moment.locale('en-in');

export default dateLanguages = {
  en: hindiMoment,
  hi: englishMoment,
};
