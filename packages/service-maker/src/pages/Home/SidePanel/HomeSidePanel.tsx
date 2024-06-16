import type { Dispatch, SetStateAction } from 'react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PageType } from 'pages/Home/HomePage';
import styled from 'styled-components';

import 'styles/navigationMenu.css';

import { HomeIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Button } from '@radix-ui/themes';

interface HomeSidePanelProps {
  currentPage: PageType;
  setCurrentPage: Dispatch<SetStateAction<PageType>>;
}

function HomeSidePanel({ currentPage, setCurrentPage }: HomeSidePanelProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (target: PageType) => {
      setCurrentPage(target);
    },
    [setCurrentPage],
  );

  const handleLogout = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <LogoOllamy src={'/assets/Ollamy.svg'} />
      </Header>
      <Body>
        <NavigationMenu.Root>
          <List className={'NavigationMenuList'}>
            <NavigationMenu.Item onClick={() => handleClick('home')}>
              <LinkNav
                active={currentPage === 'home'}
                className={'NavigationMenuLink'}
              >
                <HomeIcon />
                Home
              </LinkNav>
            </NavigationMenu.Item>
            {/* <NavigationMenu.Item onClick={() => handleClick('profile')}> */}
            {/*   <LinkNav */}
            {/*     active={currentPage === 'profile'} */}
            {/*     className={'NavigationMenuLink'} */}
            {/*   > */}
            {/*     <PersonIcon /> */}
            {/*     Profile */}
            {/*   </LinkNav> */}
            {/* </NavigationMenu.Item> */}
            {/* <NavigationMenu.Item onClick={() => handleClick('settings')}> */}
            {/*   <LinkNav */}
            {/*     active={currentPage === 'settings'} */}
            {/*     className={'NavigationMenuLink'} */}
            {/*   > */}
            {/*     <GearIcon /> */}
            {/*     Settings */}
            {/*   </LinkNav> */}
            {/* </NavigationMenu.Item> */}

            <NavigationMenu.Indicator className={'NavigationMenuIndicator'}>
              <div className={'Arrow'} />
            </NavigationMenu.Indicator>
          </List>

          <div className={'ViewportPosition'}>
            <NavigationMenu.Viewport className={'NavigationMenuViewport'} />
          </div>
        </NavigationMenu.Root>
        <Button
          color={'red'}
          variant={'soft'}
          onClick={handleLogout}
          style={{ width: '100%' }}
        >
          Logout
        </Button>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100%;

  background: #fbfaff;
  border: 1px solid rgba(233, 233, 233, 0.83);
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100px;

  padding: 28px;
  box-sizing: border-box;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 60px 0;
  box-sizing: border-box;
`;

const LogoOllamy = styled.img``;

const List = styled(NavigationMenu.List)`
  flex-direction: column;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0);

  gap: 17px;
  padding: 0 15px;
  box-sizing: border-box;
`;

const LinkNav = styled(NavigationMenu.Link)`
  display: flex;
  align-items: center;
  gap: 66px;

  height: 48px;

  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  &[data-active] {
    color: white;
    background-color: #021e2e;
  }
`;

export default HomeSidePanel;
