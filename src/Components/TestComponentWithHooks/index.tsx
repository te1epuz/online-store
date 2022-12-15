import { useEffect, useState } from 'react';

function TestComponentWithHooks() {
  // пример использования хука useState
  const [counter, setCounter] = useState(0);
  // пример использования хука useEffect, который запуститься только 1 раз при рендере страницы
  // массив зависимостей в таком случае должен быть пустым
  useEffect(() => {
    console.log('вызывается один раз при рендере');
  }, []);
  // этот useEffect запустится при рендере
  // + при каждом изменении значения переменной указанной в массиве зависимостей
  useEffect(() => {
    console.log(`Текущий counter: ${counter}`);
  }, [counter]);

  return (
    <div>
      <h2>{`Current counter: ${counter}`}</h2>
      <button type="button" onClick={() => setCounter((prev) => prev + 1)}>+</button>
      <button type="button" onClick={() => setCounter((prev) => prev - 1)}>-</button>
    </div>
  );
}

export default TestComponentWithHooks;
