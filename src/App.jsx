import React, { useEffect } from 'react';

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

  useEffect(() => {
    if (inputValue.length > 0) {
      dispatch(setInputValue(inputValue));
      dispatch(fetchDataFromAPI());
      dispatch(setInputValue(''));
    }
  }, [dispatch, inputValue]);

  if (isLoading) {
    return <div className='page__loader'>Loading...</div>;
  }

  if (hasError) {
    return <ErrorComponent />;
  }

  return (
    <div className='page'>
      <nav className='page__nav'>
        <Navbar />
      </nav>

      <main>
        <section>
          <ListItems locationData={locationData} />
        </section>
      </main>
    </div>
  );
}

export default App;
