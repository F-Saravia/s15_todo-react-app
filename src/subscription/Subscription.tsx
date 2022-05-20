import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import * as UI from "../shared/ui";
import { auth } from "../utils/Firebase";

export default function Subscription() {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //importe la navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      setUsernameError("Vous devez spécifier un nom d'utilisateur");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Votre username doit être de 3 caractères minimum");
      return;
    }
    if (username.length > 25) {
      setUsernameError("Votre username est trop long");
      return;
    }
    setUsernameError("");
  }, [username]);

  const onUseStateChange =
    (setter: (v: string) => void) =>
    (event: React.SyntheticEvent<HTMLInputElement>) =>
      setter(event.currentTarget.value);

  const onFormSubmit = async (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, { displayName: username });

    localStorage.setItem("user", JSON.stringify(credential.user));

    //redirection vers la paged'acceuil
    navigate("/");
  };

  return (
    <UI.AppContainer as="form" onSubmit={onFormSubmit}>
      <h1>Inscription</h1>
      <UI.InputContainer>
        <UI.Input
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={onUseStateChange(setUsername)}
        />
      </UI.InputContainer>
      <p>{usernameError}</p>
      <UI.InputContainer>
        <UI.Input
          name="email"
          placeholder="Email"
          onChange={onUseStateChange(setEmail)}
        />
      </UI.InputContainer>
      <UI.InputContainer>
        <UI.Input
          name="password"
          placeholder="Mot de Passe"
          onChange={onUseStateChange(setPassword)}
        />
      </UI.InputContainer>
      <button type="submit">S'inscrire</button>
    </UI.AppContainer>
  );
}
