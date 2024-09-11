import FadeLoader from "react-spinners/ClipLoader";
import Loader from 'react-loaders'

export function fadeLoader() {
    <FadeLoader color="#36d7b7" />
}

export function line_fade_spin() {
    return (
        <Loader type="line-spin-fade-loader" />
    );
}