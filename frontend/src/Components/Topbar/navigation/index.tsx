import Image from "next/image";
import { useCallback } from "react";
import styled from "styled-components";
import earthIcon from './../../../../public/assets/Topbar/earth.svg';
import chestIcon from './../../../../public/assets/Topbar/chest.svg';
import profileIcon from './../../../../public/assets/Topbar/profile.svg';

const TopBar = (): JSX.Element => {
  const handleClickEarth = useCallback(() => {
    console.log("handleClickEarth")
  }, []);

  const handleClickChest = useCallback(() => {
    console.log("handleClickChest")
  }, []);

  const handleClickProfile = useCallback(() => {
    console.log("handleClickProfile")
  }, []);
 
  return (
    <TopBarContainer>
      <Image src={earthIcon} alt={""} style={{height: "100%"}} onClick={handleClickEarth}/>
      <UserSide>
        <Image src={chestIcon} alt={""} style={{height: "100%"}} onClick={handleClickChest}/>
        <Image src={profileIcon} alt={""} style={{height: "100%"}} onClick={handleClickProfile}/>  
      </UserSide>
    </TopBarContainer>
  );
};

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #3D3D3D;
  border-radius: 0px 0px 8px 8px;
  padding: 16px 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);;
  background: #D9D9D9;
  height: 70px;
`;

const UserSide = styled.div`
  display: flex;
  gap: 20px
`;

export default TopBar