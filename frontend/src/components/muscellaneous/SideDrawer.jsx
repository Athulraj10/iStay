import {AvatarBadge, Button, Menu, MenuButton, Tooltip } from '@chakra-ui/react'
import {Box, Text } from '@chakra-ui/layout'
import {Avatar } from '@chakra-ui/avatar'
import react,{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider'

const SideDrawer  = ()=>{
    
    const [search,setSearch]=useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading,setloading]=useState(false)
    const [loadingChat,setloadingChat]=useState()

    const {user} =ChatState()

    return (
        <>
            <Box
            style={{display:'flex'}}
            d='flex'
            justifyContent='space-between'
            alignItems="center"
            text='white'
            w='100%'
            p='5px 10px 5px 10px'
            borderWidth='5px'
            >
                <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
                    <Button variant="ghost" style={{color:'white'}}>
                        <i className='fas fa-search'></i>
                        <Text d={{base:'none',md:'flex'}} px="4" m="3" >
                            Search user
                        </Text>
                    </Button>
                </Tooltip>

                <Text fondsize='2xl' m="3" color="white"  fontFamily="Work sans" >
                Talk - Live
                </Text>

                <Menu >
                    <MenuButton p={2} m={2} >
                    <i  className='fas fa-bell'style={{color:'white',margin:'15px'}}></i>
                    <Avatar name={user.name} src={user.pic} cursor='pointer'></Avatar>
                    </MenuButton>
                </Menu>
            </Box>
        </>
    )
}
export default SideDrawer