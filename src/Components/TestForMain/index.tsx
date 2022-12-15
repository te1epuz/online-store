import './styles.scss';

interface Props {
    number: number
}
// компонент объявлен в виде function expression, особой разницы нет, можно и declaration
// также посмотрите на типизацию пропсов, можно типизировать через FC, почитайте в доке
function TestForMain({ number }: Props) {
  return (
    <div className="test__main">
      <h2>{`Main page component №${number}`}</h2>
    </div>
  );
}

export default TestForMain;
