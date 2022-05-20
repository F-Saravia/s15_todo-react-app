import PubSub from "pubsub-js";
import { useState, useEffect } from "react";

import * as Ui from "../shared/ui";

type ProfileProps = {
  open?: boolean;
  onClose: () => void;
};

export default function Profile({ open, onClose }: ProfileProps) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storeUser = localStorage.getItem("user");

    if (storeUser) {
      setUsername(JSON.parse(storeUser).displayName);
    }
  }, []);

  useEffect(() => {
    console.log(`On publie tout changement du username ${username}`);
    PubSub.publish("updatedUsername", username);
  }, [username]);

  const changeUsername = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value);

  return (
    <Ui.GreenRightFrame open={open}>
      <Ui.GreenFrameHeader>
        <Ui.GreenFrameClose
          className="fa-solid fa-circle-xmark"
          onClick={onClose}
        ></Ui.GreenFrameClose>
        <Ui.GreenFrameTitle>Mon Profil</Ui.GreenFrameTitle>
      </Ui.GreenFrameHeader>
      <Ui.AppContainer>
        <Ui.InputContainer display="white">
          <Ui.Input
            type="text"
            display="white"
            placeholder="Votre nom d'utilisateur"
            value={username}
            onChange={changeUsername}
          ></Ui.Input>
        </Ui.InputContainer>
      </Ui.AppContainer>
    </Ui.GreenRightFrame>
  );
}
