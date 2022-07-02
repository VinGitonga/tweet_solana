import {
    Flex,
    Box,
    Icon,
    useColorModeValue,
    Text,
    Button,
    Link,
    Image
} from "@chakra-ui/react"

import { GoHome } from "react-icons/go"
import { FaHashtag, FaBell } from "react-icons/fa"
import { IoMailOutline, IoLogoTwitter } from "react-icons/io5"
import { BsBookmarkFill } from "react-icons/bs"
import { RiFileList3Line } from "react-icons/ri"
import { FiUser } from "react-icons/fi"
import { CgMoreO } from "react-icons/cg"

const Side = () => {
    return (
        <Box
            as="nav"
            position="fixed"
            top="10"
            left="24"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            color={useColorModeValue("gray.100", "gray.900")}
            bg="white"
        >
            <Flex
                align="center"
                px="4"
                py="3"
            >
                <Icon
                    w={6}
                    h={6}
                    as={IoLogoTwitter}
                    mr={3}
                    color={"gray.800"}
                />
                <Text fontWeight="semibold" fontSize="lg" color={"teal.500"}>
                    Tweet Solana
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
            >
                <NavItem icon={GoHome} text={"Home"} />
                <NavItem icon={FaHashtag} text={"Explore"} />
                <NavItem icon={FaBell} text={"Notifications"} />
                <NavItem icon={IoMailOutline} text={"Messages"} />
                <NavItem icon={BsBookmarkFill} text={"Bookmarks"} />
                <NavItem icon={RiFileList3Line} text={"Lists"} />
                <NavItem icon={FiUser} text={"Profile"} />
                <NavItem icon={CgMoreO} text={"More"} />
                <Button my={2} colorScheme='messenger'>Connect Wallet</Button>

                <Flex alignItems="center" mt={8} >
                    <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                        alt="Avatar"
                    />
                    <Link
                        mx={2}
                        fontWeight="bold"
                        color="gray.700"
                        _dark={{
                            color: "gray.200",
                        }}
                    >
                        Jone Doe
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

const NavItem = ({ icon, text }) => {
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
        >
            <Icon
                mx="2"
                boxSize="4"
                _groupHover={{
                    color: useColorModeValue("gray.600", "gray.300"),
                }}
                as={icon}
            />
            <Text fontSize="md">
                {text}
            </Text>
        </Flex>
    )
}

export default Side