import {
    useDisclosure,
  AvatarBadge,
  Input,
  Button,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import react, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { toast } from "react-toastify";
import ChatLoading from "../ChatPage/ChatLoading";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = ChatState();

    const handleSearch = ()=>{
        if(!search){
           return toast.error("Enter something")
        }
        try {
            setloading(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <>
      <Box
        style={{ display: "flex" }}
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        text="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}  style={{ color: "white" }}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px="4" m="3">
              Search user
            </Text>
          </Button>
        </Tooltip>

        <Text fondsize="2xl" m="3" color="white" fontFamily="Work sans">
          Hi {user.name} Talk - Live 
        </Text>

        <Menu>
          <MenuButton p={2} m={2}>
            <i
              className="fas fa-bell"
              style={{ color: "white", margin: "15px" }}
            ></i>
            <Avatar name={user.name} src={user.pic} cursor="pointer"></Avatar>
          </MenuButton>
          
          <MenuList>
            <ProfileModel>
                <MenuList>My Profile</MenuList>
            </ProfileModel>
                <MenuList>Logout</MenuList>
          </MenuList>
        </Menu>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box style={{display:'flex'}} pb='2'>
            <Input placeholder='Type here...'
            mr={2}
            value={search}
            onChange={(e)=>setSearch(e.target.value)} />
            <Button 
            onClick={(handleSearch)}>
                Go
            </Button>
            </Box>
            {loading?(
                <ChatLoading/>
            ):(
                <span>Result</span>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Go
            </Button>
            </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideDrawer;
