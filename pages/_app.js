import RootLayout from "../components/RootLayout";
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    )
}