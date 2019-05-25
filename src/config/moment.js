import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/sk';

const moment = extendMoment(Moment);

moment.locale('sk');
