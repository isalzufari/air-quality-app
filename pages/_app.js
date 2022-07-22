import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavbarComponent, FooterComponent } from "../components/index";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavbarComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}
