import React from 'react';
import TestForMain from '../../Components/TestForMain';

function Main() {
  const testArr = [1, 2, 3, 4];

  // Рендерим 4 компонента на основе массива, передаем в каждый компонент пропсы из массива
  // При таком рендере важно указывать key для каждого компонента. Он должен быть уникальным
  return (
    <>
      {
            testArr.map((item) => <TestForMain key={item} number={item} />)
        }
    </>
  );
}

export default Main;
