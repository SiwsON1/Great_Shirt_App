import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductRating.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { addUserStars } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { getProductById } from '../../../redux/productsRedux';

const ProductRating = props => {
  const userStars = useSelector(state => {
    const product = getProductById(state, props.id);
    return product ? product.rating : 0;
  });

  const [hoverStars, setHoverStars] = useState(undefined);
  const dispatch = useDispatch();
  const id = props.id;

  const handleClick = (e, starsClicked) => {
    e.preventDefault();
    if (userStars !== starsClicked) {
      dispatch(addUserStars({ id, userStars: starsClicked }));
    }
  };

  const handleMouseOver = i => {
    if (userStars !== 0) setHoverStars(i);
  };

  const handleMouseOff = () => {
    setHoverStars(undefined);
  };

  const renderStarIcon = i => {
    if (userStars >= i) return faStar;
    else if (hoverStars >= i) return faStar;
    else if (props.stars >= i) return faStar;
    else return farStar;
  };

  const accessStarStyles = i => {
    if (userStars >= i) return styles.hoverStars;
    else if (hoverStars) return hoverStars < i ? styles.stars : styles.hoverStars;
    else return '';
  };
  const classes = [];

  if (props.noPadding) {
    classes.push(styles.noPadding);
  }

  return (
    <div className={` ${styles.content} ${classes.join(' ')}`}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(i => (
          <a key={i} href='#'>
            <FontAwesomeIcon
              key={i}
              className={accessStarStyles(i)}
              icon={renderStarIcon(i)}
              onClick={e => handleClick(e, i)}
              onMouseOver={() => handleMouseOver(i)}
              onMouseLeave={handleMouseOff}
            >
              {i} stars
            </FontAwesomeIcon>
          </a>
        ))}
      </div>
    </div>
  );
};

ProductRating.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  stars: PropTypes.number,
  userStars: PropTypes.number,
  noPadding: PropTypes.bool,
};

export default ProductRating;