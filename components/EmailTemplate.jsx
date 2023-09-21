import React from "react";

const EmailTemplate = ({ name }) => {
  return (
    <div>
      <h1>Üdv, {name}!</h1>

      <p>
        Új heti menü került feltöltésre az Alföldi Nyomda Ebédrendelés oldalán
      </p>
      <p>Kérjük látogasson meg minket!</p>

      <p>Üdvözlettel,</p>
      <p>Alföldi Nyomda Csapata</p>
    </div>
  );
};

export default EmailTemplate;
