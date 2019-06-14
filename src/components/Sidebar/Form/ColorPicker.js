import React, { useEffect, useRef, useState } from 'react';
import Pickr from '@simonwep/pickr/dist/pickr.es5.min';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ColorLens from '@material-ui/icons/ColorLens';
import { invertColor } from 'common/helpers';
import Button from '@material-ui/core/Button';

import '@simonwep/pickr/dist/pickr.min.css';
const useStyles = makeStyles({
  root: props => ({
    backgroundColor: props.backgroundColor,
    padding: 0,
    minWidth: 0,
    width: '100%',
    borderRadius: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: props.backgroundColor,
      boxShadow: 'none'
    },
    '&:focus': {
      backgroundColor: props.backgroundColor,
      boxShadow: 'none'
    }
  })
});

const ColorPicker = ({ defaultColor, setFieldValue, setFieldTouched }) => {
  let pickr;
  const [color, setColor] = useState(defaultColor);
  const colorPickerRef = useRef(null);
  const classes = useStyles({ backgroundColor: color });
  useEffect(() => {
    pickr = Pickr.create({
      el: colorPickerRef.current,
      default: defaultColor,
      useAsButton: true,
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          input: true,
          save: true
        }
      }
    })
      .on('init', () => {
        setFieldTouched('color', true);
        setFieldValue('color', defaultColor);
      })
      .on('save', HSVaColorObject => {
        const newColor = HSVaColorObject.toHEXA().toString();
        setColor(newColor);
        setFieldTouched('color', true);
        setFieldValue('color', newColor);
      });
  }, [defaultColor, setFieldValue, setFieldTouched]);
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
      <ColorLens style={{ color: invertColor(color, true) }} />
    </Button>
  );
};

export default ColorPicker;
