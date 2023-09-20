import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromAPI, setInputValue } from './features/locationSlice';
import '../src/App.scss';
import { Navbar } from './components/navbar/navbar';
import { ErrorComponent } from './components/error/errorComponent';
import { ListItems } from './components/listItems/listItems';

function App() {
  const dispatch = useDispatch();
  const locationData = useSelector((state) => state.location.locationData);
  const isLoading = useSelector((state) => state.location.isLoading);
  const hasError = useSelector((state) => state.location.hasError);
  const inputValue = useSelector((state) => state.location.inputValue);

  const [cityData, setCityData] = useState([]);
  const [cityCounter, setCityCounter] = useState({});

  useEffect(() => {
    const savedDataFromStorage =
      JSON.parse(localStorage.getItem('cityData')) || [];
    const savedCounterFromStorage =
      JSON.parse(localStorage.getItem('cityCounter')) || {};

    setCityData(savedDataFromStorage);
    setCityCounter(savedCounterFromStorage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        dispatch(setInputValue(inputValue));

        try {
          const response = await dispatch(fetchDataFromAPI());

          if (!fetchDataFromAPI.rejected.match(response)) {
            const newCityData = {
              city: inputValue.toLowerCase(),
              date: new Date().toISOString(),
              temperature: locationData[0]?.current?.feelslike_c,
            };

            const updatedCityData = [...cityData, newCityData];
            setCityData(updatedCityData);

            const updatedCityCounter = {
              ...cityCounter,
              [newCityData.city]: (cityCounter[newCityData.city] || 0) + 1,
            };
            setCityCounter(updatedCityCounter);

            localStorage.setItem('cityData', JSON.stringify(updatedCityData));
            localStorage.setItem(
              'cityCounter',
              JSON.stringify(updatedCityCounter),
            );
          }
        } catch (error) {
          console.error('Error fetching data from the API:', error);
        }

        dispatch(setInputValue(''));
      }
    };

    fetchData();
  }, [dispatch, inputValue, locationData, cityData, cityCounter]);

  if (isLoading) {
    return <div className='page__loader'>Loading...</div>;
  }

  if (hasError) {
    console.log(hasError);
    return <ErrorComponent />;
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
