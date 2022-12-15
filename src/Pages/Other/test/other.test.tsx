import { render, screen } from '@testing-library/react';
import Other from '../index';
// Тест. Проверяем зарендерилась страница с теми блоками которые мы ожидаем на ней увидеть
test('renders other page', () => {
  render(<Other />);
  const textElement = screen.getByText(/Other page component/i);
  expect(textElement).toBeInTheDocument();
});
