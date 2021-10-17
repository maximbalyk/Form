/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  onClick: () => void;
}

export const Provider: React.FC<Props> = React.memo(
  ({ onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  ),
);

const renderError = (errorMessage: {} | null | undefined) => (
  <span>{errorMessage}</span>
);

export const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [gender, setGender] = useState('');

  const emailValidator = (clientEmail: string) => {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return re.test(clientEmail);
  };

  const confirmPasswordValidate = (pass: string, confirmPass: string) => {
    return pass === confirmPass && pass.length !== 0;
  };

  const isGenderValid = gender.length !== 0;
  const isEmailValid = emailValidator(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = confirmPasswordValidate(password, passwordConfirm);

  // eslint-disable-next-line no-useless-concat
  const alertMessage = `gender : ${gender} \nemail : ${email} \npassword : ${password}`;

  return (
    <div className="App">
      <header className="header">
        <img src="/icon.svg" alt="icon" />
        <h1 className="header__title">Sign Up with email</h1>
      </header>

      <form method="post">

        <div className="d-flex flex-column">
          <h2 className="form__title">Gender</h2>
          <div className="form__group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="form__button"
              onClick={() => setGender('Male')}
            >
              <img src="/male.png" alt="" />
              <h3 className="form__button--text">Male</h3>
            </button>
            <button
              type="button"
              className="form__button"
              onClick={() => setGender('Female')}
            >
              <img src="/female.png" alt="" />
              Female
            </button>
            <button
              type="button"
              className="form__button"
              onClick={() => setGender('Other')}
            >
              <img src="/other.png" alt="" />
              Other
            </button>
          </div>
        </div>

        <div className="form__input">
          <label htmlFor="exampleInputEmail1" className="form-label">
            E-mail
            <input
              value={email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="johnsmith@mail.com"
              onChange={e => setEmail(e.target.value)}
            />
            {!isEmailValid && email.length !== 0 ? renderError('Email not valid') : null}
          </label>
        </div>

        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Create Password
            <input
              value={password}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={e => setPassword(e.target.value)}
              required
            />
            {!isPasswordValid && password.length !== 0 ? renderError('Password not valid') : null}
          </label>
        </div>

        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
            <input
              value={passwordConfirm}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={e => setPasswordConfirm(e.target.value)}
              required
            />
            {!isConfirmValid && password.length !== 0 ? renderError('Confirm password not valid') : null}
          </label>
        </div>

        <button
          type="button"
          className="form__button--singUp"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(alertMessage);
          }}
          disabled={!isGenderValid && !isEmailValid && !isPasswordValid && !isConfirmValid}
        >
          Submit
        </button>
      </form>

      <footer className="d-flex flex-column">
        <div className="d-inline-flex">
          <p>
            Already have an account?
            <a href="1" className="link-success"> Log In</a>
          </p>

        </div>
        <div className="d-inline-flex">
          <p>
            Review privacy and disclosures
            <a href="2" className="link-success"> here</a>
          </p>
        </div>
      </footer>
    </div>
  );
};
