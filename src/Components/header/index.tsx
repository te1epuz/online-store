import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
// тут стили импортированы при помощи модулей, это один из способов подключения стилей.
// В таком случае в компонентах можно использовать повторяющиеся названия для стилей,
// т.к. к ним присоединиться случайный хеш и на самом деле название стиля будет отличаться
import styles from './styles.module.scss';

// компонент созданный при помощи function declaration,
// можно писать и используя expression. В другом компоненте будет пример
export default function Header() {
  // можно не обращать внимание на useMemo, это уже более продвинутый уровень
  // ниже функция которая навешивает определенный стиль исходя их переменной isActive,
  // это встроенная переменная в элементе NavLink
  // NavLink мы взяли из react-router-dom
  const activeStyles = useMemo(
    () => (bool: boolean) => (bool
      ? styles.header__navigation__link__active
      : styles.header__navigation__link),
    [],
  );

  return (
    <div className={styles.header}>
      <nav className={styles.header__navigation}>
        {/* ссылки которые используются для роутинга по страницам SPA
              подробнее можно прочитать в документации библиотеки react-router-dom */}
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/"
        >
          Main
        </NavLink>
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/other"
        >
          Other page
        </NavLink>
      </nav>
    </div>
  );
}
