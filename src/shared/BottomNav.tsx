import { useState } from "react";

import * as UI from "../shared/ui";
import Profile from "../profile/Profil";

export type BottomNavProps = {
  topBar?: JSX.Element;
};

export default function BottomNav({ topBar }: BottomNavProps) {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);

  // const openProfile = () => setProfileOpen(true)
  // const closeProfile = () => setProfileOpen(false)

  return (
    <UI.BottomNav>
      {topBar}
      <UI.BottomNavMenu>
        <UI.BottomNavItem className="fa-solid fa-bars"></UI.BottomNavItem>
        <UI.BottomNavItem
          className="fa-solid fa-user"
          onClick={toggleProfile}
          //onclick={openProfile}
        ></UI.BottomNavItem>
      </UI.BottomNavMenu>
      <Profile
        open={profileOpen}
        onClose={toggleProfile}
        //onCLose={closeProfile}
      />
    </UI.BottomNav>
  );
}
