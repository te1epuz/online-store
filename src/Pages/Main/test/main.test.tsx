import { render, screen } from '@testing-library/react';
import Main from '../index';
// Тест. Проверяем зарендерилась страница с теми блоками которые мы ожидаем на ней увидеть
test('renders main page', () => {
  render(<Main />);
  const textElement = screen.getByText(/Main page component №1/i);
  expect(textElement).toBeInTheDocument();
});
