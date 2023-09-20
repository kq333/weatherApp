import './listItem.scss';

export const ListItems = ({ cityData, cityCounter }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

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
