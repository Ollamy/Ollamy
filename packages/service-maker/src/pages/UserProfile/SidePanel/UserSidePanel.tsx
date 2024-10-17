import React from 'react';
import {
  Body,
  Container,
  Header,
  LinkNav,
  List,
  LogoOllamy,
} from 'pages/Home/SidePanel/HomeSidePanel';
import { styled } from 'styled-components';

import 'styles/navigationMenu.css';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

// eslint-disable-next-line
interface UserSidePanelProps {}

function UserSidePanel({}: UserSidePanelProps) {
  return (
    <Container>
      <Header>
        <LogoOllamy src={'/assets/Ollamy.svg'} />
      </Header>
      <Body>
        <NavigationMenu.Root>
          <Title>Account</Title>
          <List className={'NavigationMenuList'}>
            <NavigationMenu.Item>
              <LinkNav active className={'NavigationMenuLink'}>
                Your settings
              </LinkNav>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className={'NavigationMenuIndicator'}>
              <div className={'Arrow'} />
            </NavigationMenu.Indicator>
          </List>

          <div className={'ViewportPosition'}>
            <NavigationMenu.Viewport className={'NavigationMenuViewport'} />
          </div>
        </NavigationMenu.Root>
      </Body>
    </Container>
  );
}

const Title = styled.h3`
  margin: 0 0 12px 15px;
`;

export default UserSidePanel;
