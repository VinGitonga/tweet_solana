const anchor = require("@project-serum/anchor");
const BN = require("bn.js");
import { Program } from "@project-serum/anchor"
import { TweetSolana } from "../target/types/tweet_solana";
const spl_token = require("@solana/spl-token");
const TOKEN_PROGRAM_ID = spl_token.TOKEN_PROGRAM_ID;
const _ = require("lodash")
const { web3 } = anchor;
const { SystemProgram } = web3
const assert = require("assert")
const utf8 = anchor.utils.bytes.utf8

const provider = anchor.AnchorProvider.env()
anchor.setProvider(provider)

// setting default accounts
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}

const program = anchor.workspace.TweetSolana as Program<TweetSolana>;
let creatorKey = provider.wallet.publicKey;
let stateSigner;
let userCreateSigner;
let tweetSigner;



describe("tweet_solana", () => {

    it("Should create a state", async () => {
        ;[stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('state')],
            program.programId,
        )

        // Check if state is created using try and catch
        try {
            const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        }
        catch {
            await program.rpc.createState({
                accounts: {
                    state: stateSigner,
                    authority: creatorKey,
                    ...defaultAccount,
                }
            })
        }

        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        assert(
            stateInfo.authority.toString() === creatorKey.toString(),
            "State authority is not set to creator"
        )
    })

    it("Should create a new user", async () => {
        ;[userCreateSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('user'), creatorKey.toBuffer()],
            program.programId,
        )


        await program.rpc.createUser("Jack Ryan", "ryan.jack@outlook.com", {
            accounts: {
                user: userCreateSigner,
                authority: creatorKey,
                ...defaultAccount,
            }
        })

        // Get all users
        const users = await program.account.userAccount.all();
        console.log(users)

    });

    it("Create first tweet", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        // log the current tweet count
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        [tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("tweet"), stateInfo.tweetCount.toBuffer("be", 8)],
            program.programId,
        )

        await program.rpc.createTweet("Yo! My party people", "Kelly Jones", {
            accounts: {
                state: stateSigner,
                tweet: tweetSigner,
                authority: creatorKey,
                ...defaultAccount,
            }
        });
    })

    // Fetch all tweets
    it("Fetch all tweets", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        const tweets = await program.account.tweetAccount.all();
        console.log(tweets)
    })

    // Create second tweet
    it("Create second tweet", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        // log the current tweet count
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        [tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("tweet"), stateInfo.tweetCount.toBuffer("be", 8)],
            program.programId,
        )

        await program.rpc.createTweet("Its your guy here", "Jane Riley", {
            accounts: {
                state: stateSigner,
                tweet: tweetSigner,
                authority: creatorKey,
                ...defaultAccount,
            }
        });
    })

    // Fetch all tweets
    it("Fetch all tweets", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        const tweets = await program.account.tweetAccount.all();
        console.log(tweets)
    })

});
