use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("Axi1KZky2SVgKBY3HCkecagLv54GQw8YoTTeWQuCM7PP");

// Constants
const USER_NAME_LEGNTH: usize = 50;
const USER_EMAIL_LEGNTH: usize = 100;
const MAX_TWEET_LENGTH: usize = 1024;


#[program]
pub mod tweet_solana {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>
    ) -> Result<()> {
        // Get the state from the context
        let state = &mut ctx.accounts.state;

        // Save the authority to state
        state.authority = ctx.accounts.authority.key();

        // Initialize the tweet count
        state.tweet_count = 0;

        Ok(())
    }

    // create user
    // takes param name, email
    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        email: String,
    ) -> Result<()> {
        // Get the user
        let user = &mut ctx.accounts.user;
        // set the authority (wallet address)
        user.user_wallet_address = ctx.accounts.authority.key();

        // set the name
        user.user_name = name;
        // set the email
        user.user_email = email;

        Ok(())
    }

    // create tweet
    // takes param tweet_content and tweet_author
    pub fn create_tweet(
        ctx: Context<CreateTweet>,
        tweet_content: String,
        tweet_author: String,
    ) -> Result<()> {
        // Get the state first
        let state = &mut ctx.accounts.state;

        // Get the tweet
        let tweet = &mut ctx.accounts.tweet;
        // Now set the tweet authority
        tweet.authority = ctx.accounts.authority.key();
        // Set the tweet content
        tweet.tweet_content = tweet_content;
        // Set the tweet author
        tweet.tweet_author = tweet_author;

        // set tweet comment count to 0
        tweet.tweet_comment_count = 0;
        // set tweet index to state tweet count
        tweet.tweet_index = state.tweet_count;
        // increment the tweet count
        state.tweet_count += 1;

        Ok(())
    }
}


// Create State Struct
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticate state account
    #[account(
        init, 
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8 // size of state account and add 8 bytes for discriminator
    )]
    pub state: Account<'info, StateAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,
}

// Create User context
#[derive(Accounts)]
pub struct CreateUser<'info> {
    // Authenticate user account
    #[account(
        init,
        // Use string user and authority as seeds
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_NAME_LEGNTH + USER_EMAIL_LEGNTH + 8, // size of user account and USER_NAME_LEGNTH + USER_EMAIL_LEGNTH + 8 bytes for discriminator

    )]
    pub user: Account<'info, UserAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the user created.
    pub clock: Sysvar<'info, Clock>,
}

// Create Tweet Context
#[derive(Accounts)]
pub struct CreateTweet<'info> {
    // Authenticate state account
    #[account(
        mut,
        seeds = [b"state".as_ref()],
        bump,
    )]
    pub state: Account<'info, StateAccount>,

    // Authenticate the tweet account
    #[account(
        init,
        seeds = [b"tweet".as_ref(), state.tweet_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<TweetAccount>() + USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8, // size of tweet account and USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8 bytes for discriminator
    )]
    pub tweet: Account<'info, TweetAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,

    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the tweet created.
    pub clock: Sysvar<'info, Clock>,
}

// State Account
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,
    // Tweet count
    pub tweet_count: u64,
}

// User Account
#[account]
pub struct UserAccount {
    // User name
    pub user_name: String,
    // User email
    pub user_email: String,
    // User wallet address
    pub user_wallet_address: Pubkey,
}

// Tweet Account
#[account]
pub struct TweetAccount {
    // authority
    pub authority: Pubkey,
    // tweet content
    pub tweet_content: String,
    // tweet author
    pub tweet_author: String,
    // tweet comment count
    pub tweet_comment_count: u64,
    // tweet index
    pub tweet_index: u64,
    // tweet created at
    pub tweet_time: i64,
}