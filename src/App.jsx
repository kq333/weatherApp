import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataFromAPI,
  setInputValue,
  setSearchError,
} from '../src/features/locationSlice';
import './App.scss';
import { Navbar } from './components/navbar/navbar';
import { ErrorComponent } from './components/error/errorComponent';
import { ListItems } from './components/listItems/listItems';
import { LoaderComponent } from './components/loader/loader';
import { Info } from './components/info';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.location.isLoading);
  const hasError = useSelector((state) => state.location.hasError);
  const inputValue = useSelector((state) => state.location.inputValue);
  const cityData = useSelector((state) => state.location.cityData);
  const cityCounter = useSelector((state) => state.location.cityCounter);
  const searchError = useSelector((state) => state.location.searchError);

  useEffect(() => {
    const savedDataFromStorage =
      JSON.parse(localStorage.getItem('cityData')) || [];
    const savedCounterFromStorage =
      JSON.parse(localStorage.getItem('cityCounter')) || {};

    dispatch({ type: 'location/setCityData', payload: savedDataFromStorage });
    dispatch({
      type: 'location/setCityCounter',
      payload: savedCounterFromStorage,
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        dispatch(setInputValue(inputValue));

        try {
          const response = await dispatch(fetchDataFromAPI());

          if (response.error) {
            console.error('City not found or other API error:', response.error);
          }
        } catch (error) {
          console.error('Error fetching data from the API:', error);
        }

        dispatch(setInputValue(''));
      }
    };

    fetchData();
  }, [dispatch, inputValue]);

  useEffect(() => {
    localStorage.setItem('cityData', JSON.stringify(cityData));
    localStorage.setItem('cityCounter', JSON.stringify(cityCounter));
  }, [cityData, cityCounter]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (hasError) {
    return <ErrorComponent />;
  }

  if (searchError) {
    dispatch(setSearchError(true));
    setTimeout(() => {
      dispatch(setSearchError(false));
    }, 2000);
    return <Info />;
  }

  return (
    <div className='page'>
      <nav className='page__nav'>
        <Navbar />
      </nav>
      <main>
        <section>
          <ListItems cityData={cityData} cityCounter={cityCounter} />
        </section>
      </main>
    </div>
  );
}

export default App;
