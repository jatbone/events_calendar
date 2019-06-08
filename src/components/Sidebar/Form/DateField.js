import React, { useEffect, useRef, useState } from 'react';

import moment from 'moment';
import flatpickr from 'flatpickr';
import ShortcutButtonsPlugin from 'shortcut-buttons-flatpickr';

import makeStyles from '@material-ui/core/styles/makeStyles';
import AddCircle from '@material-ui/icons/AddCircle';
import CTextField from 'components/Sidebar/Form/CTextField';

import { FLATPICKR_DATE_FORMAT } from 'constants/index';

const useStylesDatepickerOverlay = makeStyles(() => ({
  wrapper: {
    position: 'relative'
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    border: `1px solid red`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));

const DateField = ({
  setFieldValue,
  setFieldTouched,
  optional = false,
  defaultDate = null,
  ...rest
}) => {
  const [isHidden, setIsHidden] = useState(optional);
  const datePickerRef = useRef(null);
  const classesOverlay = useStylesDatepickerOverlay();
  const { name } = rest;
  useEffect(() => {
    flatpickr(datePickerRef.current, {
      defaultDate,
      dateFormat: FLATPICKR_DATE_FORMAT,
      enableTime: true,
      time_24hr: true,
      todayBtn: true,
      onChange: selectedDates => {
        const selectedDate = selectedDates[0] || null;
        if (selectedDate) {
          setFieldValue(name, moment(selectedDate).toISOString());
        } else {
          setFieldValue(name, '');
        }
      },
      onOpen: [
        () => {
          setFieldTouched(name, true);
        }
      ],
      plugins: [
        ShortcutButtonsPlugin({
          button: [
            {
              label: 'Yesterday'
            },
            {
              label: 'Today'
            },
            {
              label: 'Tomorrow'
            }
          ],
          label: 'or',
          onClick: (index, fp) => {
            let date;
            switch (index) {
              case 0:
                date = moment().subtract(1, 'days');
                break;
              case 1:
                date = moment();
                break;
              case 2:
                date = moment().add(1, 'days');
                break;
              default:
                break;
            }
            fp.setDate(date.toDate());
            setFieldValue(name, date.toISOString());
          }
        })
      ]
    });
  }, [name, defaultDate, setFieldValue, setFieldTouched]);
  const onAddEndDateClick = e => {
    e.preventDefault();
    setIsHidden(false);
  };
  return (
    <div className={classesOverlay.wrapper}>
      {isHidden ? (
        <div className={classesOverlay.root} onClick={onAddEndDateClick}>
          <AddCircle /> End date
        </div>
      ) : (
        ''
      )}
      <CTextField inputRef={datePickerRef} {...rest} />
    </div>
  );
};

export default DateField;
