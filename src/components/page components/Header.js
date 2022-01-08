import { useContext } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Context from "../contexts/Context";
import textLogo from "../../assets/TrackIt.svg"

export default function Header() {
  const { user } = useContext(Context);
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' || location.pathname === '/cadastro' ? '' :
        <PageHeader>
          <img src={textLogo} alt='site logo' />
          <img src={user.image} alt='user profile' />
        </PageHeader>}
    </>
  )
}

const PageHeader = styled.div`
  width: 100vw;
  height: 70px;
  position:fixed;
  top: 0;
  left: 0;
  background-color: #126BA5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  img:first-of-type {
    width: 97px;
    height: 49px;
    margin-left: 18px;
  }

  img:last-of-type {
    width: 51px;
    height: 51px;
    border-radius: 100%;
    margin-right: 18px;
  }
`