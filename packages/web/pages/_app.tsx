import { AppProps } from 'next/app';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import BasePage from '../components/base-page';
import { ToastContainer } from 'react-toastify';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BasePage>
        <Component {...pageProps} />
      </BasePage>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default CustomApp;
