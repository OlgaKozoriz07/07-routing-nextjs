
import css from "./Footer.module.css";

export default function Footer()  {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olga Kozoriz</p>
          <p>
            Contact us:
            <a href="mailto:olga.kozoriz7@gmail.com">
              olga.kozoriz7@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
