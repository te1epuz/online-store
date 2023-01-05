import React from 'react';

type TProps = {
  inputKey: string;
  formText: {
    [index: string]: {
      value: string;
      placeholder: string;
      isValid: boolean;
      reg: RegExp;
      errorMsg: string;
    };
  };
  setFormText: React.Dispatch<React.SetStateAction<{
    [index: string]: {
      value: string;
      placeholder: string;
      isValid: boolean;
      reg: RegExp;
      errorMsg: string;
    };
  }>>;
  showErrors: boolean;
}

function PurchasePopUpInput({ inputKey, formText, setFormText, showErrors } : TProps) {
  const newFormObj = { ...formText };
  return (
    <div>
      <input
        placeholder={newFormObj[inputKey].placeholder}
        value={formText[inputKey].value}
        onChange={(event) => {
          newFormObj[inputKey].value = event.target.value;
          setFormText(newFormObj);
        }}
      />
      {!formText[inputKey].isValid && showErrors ?
        <div>{newFormObj[inputKey].errorMsg}</div> : ''}
    </div>
  );
}

export default PurchasePopUpInput;
