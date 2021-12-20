import Image from 'next/image';
import logo from '../../../public/images/logo.svg'; 
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';
// O Next permite a utilziação de um componente Image para otimização de imagens
/* 
  O Next também permite a importação de images a partir da /, pois ele considera
  que tu estás importando a partir da pasta public (pasta padrão para imagens).
*/

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Post</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}