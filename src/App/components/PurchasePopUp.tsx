import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { clearLocaleStorageCart } from '../services/localStorage.service';
import { TCart } from '../types/types';
import styles from './PurchasePopUp.module.scss';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
};

function PurchasePopUp({ setIsPurchasePopUpEnabled, setCart }: TProps) {
  const [isPayed, setIsPayed] = useState(false);
  const [countDown, setCountDown] = useState(4);
  const navigate = useNavigate();
  const [,,, setIsFastBuy] = useOutletContext<[
    null,
    null,
    null,
    React.Dispatch<React.SetStateAction<boolean>>
  ]>();

  const [formText, setFormText] = useState({
    name: {
      value: '',
      isValid: false,
      reg: /^[a-zA-Z]{3,}(\s([a-zA-Z]){3,}){1,}$/,
    },
    phone: {
      value: '',
      isValid: false,
      reg: /^\+\d{9,20}$/,
    },
    adress: {
      value: '',
      isValid: false,
      reg: /^[a-zA-Z]{5,}(\s([a-zA-Z]){5,})(\s([a-zA-Z]){5,}){1,}$/,
    },
    email: {
      value: '',
      isValid: false,
      reg: /^\S+@\S+\.\S+$/,
    },
  });

  function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPayed(true);
    const count = setInterval(() => setCountDown((prev) => prev - 1), 1000);
    setTimeout(() => {
      clearInterval(count);
      setIsPurchasePopUpEnabled(false);
      setCart([]);
      clearLocaleStorageCart();
      setIsFastBuy(false);
      navigate('..');
    }, 4000);
  }

  useEffect(() => {
    const newFormObj = { ...formText };
    if (formText.name.reg.test(formText.name.value)) {
      newFormObj.name.isValid = true;
    } else {
      newFormObj.name.isValid = false;
    }

    if (formText.phone.reg.test(formText.phone.value)) {
      newFormObj.phone.isValid = true;
    } else {
      newFormObj.phone.isValid = false;
    }

    if (formText.adress.reg.test(formText.adress.value)) {
      newFormObj.adress.isValid = true;
    } else {
      newFormObj.adress.isValid = false;
    }

    if (formText.email.reg.test(formText.email.value)) {
      newFormObj.email.isValid = true;
    } else {
      newFormObj.email.isValid = false;
    }
    setFormText(newFormObj);
  }, [formText.name.value, formText.phone.value, formText.adress.value, formText.email.value]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.background}
        type="button"
        onClick={() => {
          setIsFastBuy(false);
          setIsPurchasePopUpEnabled(false);
        }}
      >close popup
      </button>
      <form className={styles.mainwindow} onSubmit={handleConfirm}>
        <div>Name:</div>
        <input
          placeholder="input First Name and Last Name"
          value={formText.name.value}
          onChange={(event) => {
            const newFormObj = { ...formText };
            newFormObj.name.value = event.target.value;
            setFormText(newFormObj);
          }}
        />
        {!formText.name.isValid && formText.name.value.split('').length > 0 ?
          <div>invalid input, must be at least 2 words, 3 letters each</div> : ''}
        <div>Phone:</div>
        <input
          placeholder="input phone here"
          value={formText.phone.value}
          onChange={(event) => {
            const newFormObj = { ...formText };
            newFormObj.phone.value = event.target.value;
            setFormText(newFormObj);
          }}
        />
        {!formText.phone.isValid && formText.phone.value.split('').length > 0 ?
          <div>invalid input, must start with &apos;+&apos; and be more than 9 numbers long</div> : ''}
        <div>Adress:</div>
        <textarea
          placeholder="input adress here"
          value={formText.adress.value}
          onChange={(event) => {
            const newFormObj = { ...formText };
            newFormObj.adress.value = event.target.value;
            setFormText(newFormObj);
          }}
        />
        {!formText.adress.isValid && formText.adress.value.split('').length > 0 ?
          <div>invalid input, must be at least 3 words, 5 letters each</div> : ''}
        <div>E-mail:</div>
        <input
          placeholder="input e-mail here"
          value={formText.email.value}
          onChange={(event) => {
            const newFormObj = { ...formText };
            newFormObj.email.value = event.target.value;
            setFormText(newFormObj);
          }}
        />
        {!formText.email.isValid && formText.email.value.split('').length > 0 ?
          <div>invalid input, must be e-mail adress</div> : ''}

        <div>Bank Card: NOT DONE</div>
        <div>FINAL VALIDATION NOT DONE</div>
        <button type="submit" className={styles.button__confirm} disabled={isPayed}>
          {isPayed ? 'Done ✔️' : 'Confirm'}
        </button>
        {isPayed ? <div>redirecting in {countDown}...</div> : <div>*press to finish</div>}
      </form>
    </div>
  );
}

export default PurchasePopUp;
