import { useAuth0 } from '@auth0/auth0-react'
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

export default function NavMenu() {
  const { logout, user } = useAuth0()

  return (
    <Menu>
      <MenuButton>
        <Avatar
          colorScheme="teal"
          size="sm"
          name={user?.name}
          src={user?.picture}
        />
      </MenuButton>
      <MenuList minW="0" w={'150px'}>
        <MenuItem
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <Text width={'100%'} textAlign={'center'}>
            Logout
          </Text>
        </MenuItem>
        <MenuItem>
          <Text width={'100%'} textAlign={'center'}>
            Settings
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
