import { useEffect, useState } from 'react';
import '../listItems/listItem.scss';

export const ListItems = ({ locationData }) => {
  const [cityCounts, setCityCounts] = useState({});

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem('cities')) || {};
    setCityCounts(storedCounts);
  }, [locationData]);

  return (
    <div className='list'>
      <div className='list__wrapper'>
        {locationData.map((elem, index) => {
          const cityName = elem.location.name.toLowerCase();
          const count = cityCounts[cityName] || 1;
          const timesLabel = count >= 2 ? 'times' : 'time';

          return (
            <div className='list__item' key={index}>
              {elem.location.name} | {elem.location.localtime.slice(0, 10)} |{' '}
              {elem.current.feelslike_c} (st C) | searched: {count} {timesLabel}
            </div>
          );
        })}
      </div>
    </div>
  );
};
