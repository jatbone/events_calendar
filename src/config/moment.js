import Moment from 'moment';
import { extendMoment } from 'moment-range';
// import 'moment/locale/sk';

const moment = extendMoment(Moment);

moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

// moment.locale('sk');
