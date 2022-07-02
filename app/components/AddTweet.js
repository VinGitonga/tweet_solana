import {
    Box,
    Flex,
    Image,
    Input,
    Badge,
    Button
} from "@chakra-ui/react"


const AddTweet = () => {
    return (
        <Box mt={4} mb={7} >
            <Flex alignItems="center">
                <Image
                    h={10}
                    fit="cover"
                    rounded="full"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                />
                <Input mx={2} color={"gray.700"} variant="flushed" placeholder="What's happening?" size={'lg'} />
            </Flex>
            <Flex alignItems="center" justifyContent={"space-between"} mt={3}>
                <Badge colorScheme="teal" variant="subtle" size={'md'}>
                    #tweetSolana
                </Badge>
                <Button variant="solid" colorScheme={"pink"} borderRadius={'lg'} >
                    Tweet
                </Button>
            </Flex>
        </Box>
    )
}

export default AddTweet