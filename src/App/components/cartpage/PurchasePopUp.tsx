import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { clearLocaleStorageCart, clearLocaleStoragePromo } from '../../services/localStorage.service';
import { TCart } from '../../types/types';
import styles from './PurchasePopUp.module.scss';
import PurchasePopUpInput from './PurchasePopUpInput';

import cardImage from '../../assets/credit-card.png';
import cardImage2 from '../../assets/credit-card2.png';
import cardImage3 from '../../assets/credit-card3.png';
import cardImage4 from '../../assets/credit-card4.png';
import cardImage5 from '../../assets/credit-card5.png';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
};

function PurchasePopUp({ setIsPurchasePopUpEnabled, setCart }: TProps) {
  const [isPayed, setIsPayed] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [countDown, setCountDown] = useState(4);
  const navigate = useNavigate();
  const [,,, setIsFastBuy] = useOutletContext<[
    null,
    null,
    null,
    React.Dispatch<React.SetStateAction<boolean>>
  ]>();
  const [formText, setFormText] = useState<{
    [index: string] : {
      value: string;
      placeholder: string;
      isValid: boolean;
      reg: RegExp;
      errorMsg: string;
    }
  }>({
    name: {
      value: '',
      placeholder: 'Enter First and Last name',
      isValid: false,
      reg: /^[a-zA-Z]{3,}(\s([a-zA-Z]){3,}){1,}$/,
      errorMsg: '*invalid input, must be at least 2 words, 3 letters each',
    },
    phone: {
      value: '',
      placeholder: 'Enter phone',
      isValid: false,
      reg: /^\+\d{9,20}$/,
      errorMsg: '*invalid input, must start with "+" and be more than 9 numbers long',
    },
    adress: {
      value: '',
      placeholder: 'Enter adress',
      isValid: false,
      reg: /^[a-zA-Z]{5,}(\s([a-zA-Z]){5,})(\s([a-zA-Z]){5,}){1,}$/,
      errorMsg: '*invalid input, must be at least 3 words, 5 letters each',
    },
    email: {
      value: '',
      placeholder: 'Enter valid e-mail',
      isValid: false,
      reg: /^\S+@\S+\.\S+$/,
      errorMsg: '*invalid input, must be valid e-mail adress',
    },
    creditcard: {
      value: '',
      placeholder: 'Enter credit card number',
      isValid: false,
      reg: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      errorMsg: '*invalid input, must be 16 numbers long',
    },
    thru: {
      value: '',
      placeholder: '00/00',
      isValid: false,
      reg: /^(0[1-9]|1[0-2])\/(2[3-9]|[3-9][0-9])$/,
      errorMsg: '*invalid input, must be valid date',
    },
    CVV: {
      value: '',
      placeholder: '000',
      isValid: false,
      reg: /^\d{3}$/,
      errorMsg: '*invalid input, must be 3 digits',
    },
  });
  const [cardImg, setCardImg] = useState(cardImage);

  function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    if (isAllValid) { // payment starts here
      setIsPayed(true);
      const count = setInterval(() => setCountDown((prev) => prev - 1), 1000);
      setTimeout(() => {
        clearInterval(count);
        setIsPurchasePopUpEnabled(false);
        clearLocaleStoragePromo();
        setCart([]);
        clearLocaleStorageCart();
        setIsFastBuy(false);
        navigate('..');
      }, 4000);
    }
  }

  useEffect(() => {
    const newFormObj = { ...formText };
    const allKeys = Object.keys(newFormObj);
    allKeys.forEach((key) => {
      if (formText[key].reg.test(formText[key].value)) {
        newFormObj[key].isValid = true;
      } else {
        newFormObj[key].isValid = false;
      }
    });

    if (newFormObj.creditcard.value.split('').length > 0
      && !/[0-9]/.test(newFormObj.creditcard.value.slice(-1))) {
      newFormObj.creditcard.value = newFormObj.creditcard.value.slice(0, -1);
    }
    if (newFormObj.creditcard.value.split('').length === 5 && newFormObj.thru.value.split('')[4] !== ' ') {
      newFormObj.creditcard.value =
      `${newFormObj.creditcard.value.slice(0, -1)} ${newFormObj.creditcard.value.slice(-1)}`;
    }
    if (newFormObj.creditcard.value.split('').length === 10 && newFormObj.thru.value.split('')[9] !== ' ') {
      newFormObj.creditcard.value =
      `${newFormObj.creditcard.value.slice(0, -1)} ${newFormObj.creditcard.value.slice(-1)}`;
    }
    if (newFormObj.creditcard.value.split('').length === 15 && newFormObj.thru.value.split('')[14] !== ' ') {
      newFormObj.creditcard.value =
      `${newFormObj.creditcard.value.slice(0, -1)} ${newFormObj.creditcard.value.slice(-1)}`;
    }
    if (newFormObj.creditcard.value.split('').length > 19) {
      newFormObj.creditcard.value = newFormObj.creditcard.value.slice(0, 19);
    }
    if (newFormObj.thru.value.split('').length === 3 && newFormObj.thru.value.split('')[2] !== '/') {
      newFormObj.thru.value =
      `${newFormObj.thru.value.slice(0, -1)}/${newFormObj.thru.value.slice(-1)}`;
    }
    if (newFormObj.thru.value.split('').length > 5) newFormObj.thru.value = newFormObj.thru.value.slice(0, 5);
    if (newFormObj.CVV.value.split('').length > 0
      && !/[0-9]/.test(newFormObj.CVV.value.slice(-1))) {
      newFormObj.CVV.value = newFormObj.CVV.value.slice(0, -1);
    }
    if (newFormObj.CVV.value.split('').length > 3) newFormObj.CVV.value = newFormObj.CVV.value.slice(0, 3);

    switch (newFormObj.creditcard.value.split('')[0]) {
      case '2':
        setCardImg(cardImage2);
        break;
      case '3':
        setCardImg(cardImage3);
        break;
      case '4':
        setCardImg(cardImage4);
        break;
      case '5':
        setCardImg(cardImage5);
        break;
      default:
        setCardImg(cardImage);
    }

    setFormText(newFormObj);
    const isAllReallyValid = allKeys.every((key) => newFormObj[key].isValid);
    setIsAllValid(isAllReallyValid);
  }, [formText.name.value, formText.phone.value, formText.adress.value,
    formText.email.value, formText.creditcard.value, formText.thru.value, formText.CVV.value]);

  function fillTheForm() {
    const newFormObj = { ...formText };
    newFormObj.name.value = 'John Smith';
    newFormObj.phone.value = '+123456789';
    newFormObj.adress.value = 'Secret generic adress';
    newFormObj.email.value = 'email@adress.com';
    newFormObj.creditcard.value = '4234 5678 9012 3456';
    newFormObj.thru.value = '12/29';
    newFormObj.CVV.value = '123';
    setFormText(newFormObj);
  }

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
        <h1 className={styles.title}>Check Out Form</h1>
        <div className={styles.input__row}>
          <div>Name:</div>
          <PurchasePopUpInput inputKey="name" formText={formText} setFormText={setFormText} showErrors={showErrors} />
        </div>
        <div className={styles.input__row}>
          <div>Phone:</div>
          <PurchasePopUpInput inputKey="phone" formText={formText} setFormText={setFormText} showErrors={showErrors} />
        </div>
        <div className={styles.input__row}>
          <div>Adress:</div>
          <PurchasePopUpInput inputKey="adress" formText={formText} setFormText={setFormText} showErrors={showErrors} />
        </div>
        <div className={styles.input__row}>
          <div>E-mail:</div>
          <PurchasePopUpInput inputKey="email" formText={formText} setFormText={setFormText} showErrors={showErrors} />
        </div>
        <div className={styles.input__row}>
          <div>Credit Card number:</div>
          <PurchasePopUpInput
            inputKey="creditcard"
            formText={formText}
            setFormText={setFormText}
            showErrors={showErrors}
          />
          <img className={styles.card__img} src={cardImg} alt="credit card logo" />
        </div>
        <div className={styles.input__creditcard_row}>
          <div className={styles.input__creditcard_info}>
            <div>valid thru:</div>
            <PurchasePopUpInput inputKey="thru" formText={formText} setFormText={setFormText} showErrors={showErrors} />
          </div>
          <div className={styles.input__creditcard_info}>
            <div>CVV:</div>
            <PurchasePopUpInput inputKey="CVV" formText={formText} setFormText={setFormText} showErrors={showErrors} />
          </div>
        </div>

        <button type="submit" className={styles.button__confirm} disabled={isPayed || (!isAllValid && showErrors)}>
          {isPayed ? 'Done ✔️' : 'Confirm'}
        </button>
        <div className={styles.footnote}>
          {isPayed ? `redirecting in ${countDown}...` : '*press to finish' }
        </div>
        <button type="button" onClick={fillTheForm}>auto fill 😫</button>
      </form>
    </div>
  );
}

export default PurchasePopUp;
