import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromAPI, setInputValue } from './features/locationSlice';

import '../src/App.scss';
import { Navbar } from './components/navbar/navbar';
import { ErrorComponent } from './components/error/errorComponent'

function App() {
  const dispatch = useDispatch();
  const locationData = useSelector((state) => state.location.locationData);
  const isLoading = useSelector((state) => state.location.isLoading);
  const hasError = useSelector((state) => state.location.hasError);
  const inputValue = useSelector((state) => state.location.inputValue);

  useEffect(() => {
    if (inputValue.length > 0) {
      dispatch(setInputValue(inputValue));
      dispatch(fetchDataFromAPI());
    }
  }, [dispatch, inputValue]);

  /*  if (isLoading) {
    return <div>Loading...</div>;
  } */

  if (hasError) {
    return <ErrorComponent />;
  }

  console.log(locationData);

  return (
    <div className='page'>
      <nav className='page__nav'>
        <Navbar />
      </nav>

      <main>
        <section>
          {isLoading}
          <pre>{JSON.stringify(locationData, null, 2)}</pre>
        </section>
      </main>
    </div>
  );
}

export default App;
