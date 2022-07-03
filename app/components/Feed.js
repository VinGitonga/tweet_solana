import { useState, useEffect } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import AddTweet from './AddTweet';
import Side from './Side';
import Tweet from './Tweet';
import Signup from './Signup';

import { useWallet } from "@solana/wallet-adapter-react"
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance } from "../utils/utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"


const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;


// Setup the default account
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}




const Feed = () => {
    const [isAccount, setIsAccount] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const wallet = useWallet();

    const connection = new anchor.web3.Connection(SOLANA_HOST);

    const program = getProgramInstance(connection, wallet);

    // check account is created in blockchain
    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('user'), wallet.publicKey.toBuffer()],
            program.programId,
        )

        // confirm if account exists using try and catch block
        try {
            const userInfo = await program.account.userAccount.fetch(user_pda);
            console.log(userInfo);
            setUserDetail(userInfo);
            setIsAccount(true);
        } catch (e) {
            console.log(e);
            setIsAccount(false);
        }
    }

    useEffect(() => {
        if (wallet.connected) {
            checkAccount();
        }
    }, [wallet.connected])

    return (
        <>
            {isAccount ? (
                <Flex fontFamily={"Poppins"} px={2} py={12} mx="auto">
                    <Side />
                    <Box mx="auto" w={{ lg: 8 / 12, xl: 5 / 12 }}>
                        <AddTweet />
                        {[...Array(5)].map((_, i) => <Tweet key={i} />)}
                    </Box>
                </Flex>
            ) : (
                <Signup />
            )}
        </>
    );
};


export default Feed;