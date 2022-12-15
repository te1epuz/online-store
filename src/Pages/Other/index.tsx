import TestComponentWithHooks from '../../Components/TestComponentWithHooks';
import TestForOther from '../../Components/TestForOther';

function Other() {
  return (
    <>
      <TestForOther />
      <TestComponentWithHooks />
    </>
  );
}

export default Other;
