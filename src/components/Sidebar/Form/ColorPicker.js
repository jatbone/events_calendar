import React, { useEffect, useRef, useState } from 'react';
import Pickr from '@simonwep/pickr/dist/pickr.es5.min';

import makeStyles from '@material-ui/core/styles/makeStyles';
import EditIcon from '@material-ui/icons/Edit';

import '@simonwep/pickr/dist/pickr.min.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: props => ({
    backgroundColor: props.backgroundColor
  })
});

const ColorPicker = ({ defaultColor, setFieldValue, setFieldTouched }) => {
  const [color, setColor] = useState(defaultColor);
  const colorPickerRef = useRef(null);
  const classes = useStyles({ backgroundColor: color });
  let pickr;
  useEffect(() => {
    pickr = Pickr.create({
      el: colorPickerRef.current,
      default: defaultColor,
      useAsButton: true,
      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
          hex: true,
          input: true,
          save: true
        }
      }
    }).on('save', HSVaColorObject => {
      const newColor = HSVaColorObject.toHEXA().toString();
      setColor(newColor);
      setFieldTouched('color', true);
      setFieldValue('color', newColor);
    });
  }, []);
  useEffect(
    () => () => {
      if (pickr) {
        pickr.destroy();
      }
    },
    []
  );
  return (
    <Button
      variant="contained"
      ref={colorPickerRef}
      className={classes.root}
      href="#"
    >
      <EditIcon />
    </Button>
  );
};

export default ColorPicker;
