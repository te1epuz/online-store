import styles from './Footer.module.scss';
import githubLogo from '../assets/github-mark-white.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__blackbar_wrapper}>
        <ul className={styles.footer__blackbar}>
          <li className={styles.github__links}>
            <a
              className={styles.github__link}
              href="//github.com/santaz0r"
            >
              <img className={styles.github__logo} src={githubLogo} alt="github logo" />
              <span>santaz0r</span>
            </a>
            <a
              className={styles.github__link}
              href="//github.com/Te1epuz"
            >
              <img className={styles.github__logo} src={githubLogo} alt="github logo" />
              <span>te1epuz</span>
            </a>
          </li>
          <li>
            <span>2022-2023</span>
          </li>
          <li>
            <a
              className={styles.rsschool__link}
              href="https://rs.school/js/"
            ><span>Rs School</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
