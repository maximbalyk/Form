/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';

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
  <span className="errorMessage">{errorMessage}</span>
);

export const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [gender, setGender] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  console.log(hidePassword);

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
        <img
          src="./icon.png"
          alt="icon"
        />
        <h1 className="header__title">Sign Up with email</h1>
      </header>

      <form method="post" className="form">

        <div className="d-flex flex-column align">
          <h2 className="form__title">Gender</h2>
          <div className="form__group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={gender === 'Male' ? 'form__button form__button--active' : 'form__button'}
              onClick={() => setGender('Male')}
            >
              <img src="./male.png" alt="male_icon" />
              <h3 className="form__button--text">Male</h3>
            </button>
            <button
              type="button"
              className={gender === 'Female' ? 'form__button form__button--active' : 'form__button'}
              onClick={() => setGender('Female')}
            >
              <img src="./female.png" alt="female_icon" />
              Female
            </button>
            <button
              type="button"
              className={gender === 'Other' ? 'form__button form__button--active' : 'form__button'}
              onClick={() => setGender('Other')}
            >
              <img src="./other.png" alt="other_icon" />
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
              type={hidePassword ? 'password' : 'text'}
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="form__button--showPassword"
              onClick={() => setHidePassword(!hidePassword)}
            >
              <img src="./eye.svg" alt="showPassword" />
            </button>
            {!isPasswordValid && password.length !== 0 ? renderError('Password not valid') : null}
          </label>
        </div>

        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
            <input
              value={passwordConfirm}
              type={hidePassword ? 'password' : 'text'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={e => setPasswordConfirm(e.target.value)}
              required
            />
            <button
              type="button"
              className="form__button--showPassword"
              onClick={() => setHidePassword(!hidePassword)}
            >
              <img src="./eye.svg" alt="showPassword" />
            </button>
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
          disabled={!isGenderValid || !isEmailValid || !isPasswordValid || !isConfirmValid}
        >
          Submit
        </button>
      </form>

      <footer className="d-flex flex-column">
        <div className="d-inline-flex">
          <p>
            Already have an account?
            <a href="#" className="link-success"> Log In</a>
          </p>

        </div>
        <div className="d-inline-flex">
          <p>
            Review privacy and disclosures
            <a href="#" className="link-success"> here</a>
          </p>
        </div>
      </footer>
    </div>
  );
};
