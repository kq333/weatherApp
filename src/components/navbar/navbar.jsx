import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../features/locationSlice';
import './navbar.scss';

export const Navbar = () => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const iconColor = !inputText.length
    ? `#ef4444
  `
    : `#000000
  `;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setInputValue(inputText.toLocaleLowerCase()));

    const cityCounter = localStorage.getItem('cities')
      ? JSON.parse(localStorage.getItem('cities'))
      : {};

    cityCounter[inputText] = (cityCounter[inputText] || 0) + 1;

    localStorage.setItem('cities', JSON.stringify(cityCounter));

    setInputText('');
  };

  return (
    <div className={`${!inputText ? 'navbar' : 'navbar--isActive'} `}>
      <form className='navbar__form' onSubmit={handleSubmit}>
        <input
          className='navbar__input-elem'
          type='text'
          value={inputText}
          onChange={handleTextChange}
          placeholder='Search location'
        />

        <button
          type='submit'
          className={`${
            !inputText ? 'navbar__search-btn--isActive' : 'navbar__search-btn'
          } `}
          disabled={!inputText}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className={`bi bi-search ${iconColor}`}
            viewBox='0 0 16 16'
          >
            <path
              d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'
              fill={iconColor}
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
