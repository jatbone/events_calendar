import moment from 'moment';

const events = [
  {
    id: 1,
    name: 'Event title 1',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi libero omnis possimus! Ad beatae, dicta dolor, dolorem esse explicabo, fugit in laudantium maxime nam nobis nulla repellendus vel vero voluptate.',
    startDate: moment([2019, 4, 3, 13, 30]).toISOString(),
    color: '#7cc6ff'
  },
  {
    id: 2,
    name: 'Event title 2',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi libero omnis possimus! Ad beatae, dicta dolor, dolorem esse explicabo, fugit in laudantium maxime nam nobis nulla repellendus vel vero voluptate.',
    startDate: moment([2019, 4, 25]).toISOString(),
    endDate: moment([2019, 4, 28]).toISOString(),
    color: '#dfdfdf'
  },
  {
    id: 3,
    name: 'Event title 3',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi libero omnis possimus! Ad beatae, dicta dolor, dolorem esse explicabo, fugit in laudantium maxime nam nobis nulla repellendus vel vero voluptate.',
    startDate: moment([2019, 4, 24]).toISOString(),
    color: '#65df91'
  },
  {
    id: 4,
    name: 'Event title 4',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi libero omnis possimus! Ad beatae, dicta dolor, dolorem esse explicabo, fugit in laudantium maxime nam nobis nulla repellendus vel vero voluptate.',
    startDate: moment([2019, 4, 1]).toISOString(),
    endDate: moment([2019, 4, 4, 13, 31]).toISOString(),
    color: '#c183df'
  }
];

export default events;
