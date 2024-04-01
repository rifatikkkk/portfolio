import React from 'react'
import styles from '../styles/HeaderSection.module.scss'
import Link from 'next/link'

const HeaderSection = () => {
    return (
        <header className={styles.header}>
            <div className="wrapper">
                <nav className={styles.nav}>
                    <ul className={`${styles.nav__list} ${styles.nav_left}`}>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} href='/about'>about</Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} href='/services'>services</Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} href='/gallery'>gallery</Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} href='/contact'>contact</Link>
                        </li>
                    </ul>

                    <h3 className={styles.nav__name}>rifatikkkk</h3>

                    <ul className={`${styles.nav__list} ${styles.nav_right}`}>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} href='/book'>book a court</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderSection