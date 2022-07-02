import { useState } from "react"
import AddTweet from './AddTweet';
import { chakra, Box, Flex, Image, Link, IconButton, Input, Button } from "@chakra-ui/react";
import { BiMessageRounded } from "react-icons/bi"
import { BsHeart } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { FiShare } from "react-icons/fi"
import Side from './Side';

const Feed = () => {
    return (
        <Flex fontFamily={"Poppins"} px={2} py={12} mx="auto">
            <Side />
            <Box mx="auto" w={{ lg: 8 / 12, xl: 5 / 12 }}>
                <AddTweet />
                {[...Array(5)].map((_, i) => <Tweet key={i} />)}
            </Box>
        </Flex>
    );
};

// Create Tweet Component
const Tweet = () => {
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReplyClick = () => setShowReplyInput(!showReplyInput);

    return (
        <Box mt={8}>
            <Flex alignItems="center">
                <Flex alignItems="center">
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
                <chakra.span
                    mx={1}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                        color: "gray.300",
                    }}
                >
                    30 JUNE 2022
                </chakra.span>
            </Flex>
            <chakra.p
                mt={2}
                fontSize="sm"
                color="gray.600"
                _dark={{
                    color: "gray.400",
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
                parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
                egestas quam volutpat viverra. In pretium nec senectus erat. Et
                malesuada lobortis.
            </chakra.p>
            <Flex alignItems="center" my={4} justifyContent={'space-between'}>
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Reply'
                    icon={<BiMessageRounded />}
                    fontSize='20px'
                    borderRadius={'full'}
                    onClick={handleReplyClick}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Retweet'
                    icon={<FaRetweet />}
                    fontSize='20px'
                    borderRadius={'full'}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Like'
                    icon={<BsHeart />}
                    fontSize='20px'
                    borderRadius={'full'}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Share'
                    icon={<FiShare />}
                    fontSize='20px'
                    borderRadius={'full'}
                />
            </Flex>
            {showReplyInput && <AddReply />}
            <hr style={{ backgroundColor: "#cbd5e0", color: "#cbd5e0", height: 2 }} />
        </Box>
    )
}

const AddReply = () => {
    return (
        <Box my={4} ml={4} >
            <Flex alignItems="center">
                <Image
                    h={10}
                    fit="cover"
                    rounded="full"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                />
                <Input mx={2} color={"gray.700"} variant="flushed" placeholder="Tweet your Reply" fontSize={"md"} size={'lg'} />
                <Button variant="solid" colorScheme={"messenger"} borderRadius={'lg'} >
                    Reply
                </Button>
            </Flex>
        </Box>
    )
}

export default Feed;