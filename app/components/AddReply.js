import {
    Box,
    Flex,
    Image,
    Input,
    Button,
} from "@chakra-ui/react"

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

export default AddReply;