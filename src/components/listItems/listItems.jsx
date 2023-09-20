import './listItem.scss';
import {capitalizeFirstLetter } from '../../utils/helpers'

export const ListItems = ({ cityData, cityCounter }) => {

  return (
    <div className='list'>
      <ul className='list__wrapper'>
        {cityData.map((data, index) => {
          const count = cityCounter[data.city] || 0;
          const timesLabel = count === 1 ? 'time(s)' : 'times(s)';
          const cityNameCapitalized = capitalizeFirstLetter(data.city);

          return (
            <li className='list__item' key={index}>
              {cityNameCapitalized} | {new Date(data.date).toLocaleDateString()}{' '}
              | {data.temperature} (°C) | searched: {count} {timesLabel}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
