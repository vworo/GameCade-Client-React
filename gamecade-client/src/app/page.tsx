import SignInGoogle from '../components/login/SignInGoogle';
import './Login.css';

export default function Login() {
    return (
        <div className="loginContainer">
            <div className="landingContent">
                <h1>GAMECADE</h1>
                <SignInGoogle />
                {/* <SignInAnon /> */}
            </div>
        </div>
    );
}