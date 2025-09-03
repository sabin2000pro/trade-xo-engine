Position Statuses: 
- Open
- Closed
- Frozen
- Liquidated
- Pending Settlement

Order Statuses:
- Pending
- Fulfilled
- Cancelled
- Completed

Transaction Statuses:


Margin Calls Notes / Data Model Fields

Purpose: Capture why a margin call happened, how much the shortfall is,
what was done (Notified, Deposits, Liquidations) and its final outcome.

A margin call is whenever a user (applicant / client) in the system uses leverage which is the process of borrowing additional funds from their broker / exchange in order to open bigger positions than their account balance actually allows, therefore their equity acts as collateral.

Equity = Cash Balance + Unrealized Profit / Loss
Margin = Collateral required to support open positions.

A margin call is a demand for the trader to deposits more funds or close / reduce the positions that they have because their account equity has dropped below the required maintenance margin. Below are the reasons why margin calls are dangerous:

1. Rapid Liquidation Risk: If the trader does not add additional funds in time to cover the positions, the broker / exchange may automatically liquidate positions at the market prices. Liquidation often happens at the worst possible moment (during high volatility) which results in huge losses, therefore incurring big losses.

2. Loss Amplification: Since the positions are leveraged, usually X2, X5, X10, X30 are common, small adverse market shifts can wipe out the entire account very quickly. For example, with a 10X leverage, a 10X move against you, then that results in a 100% account wipeout.

Wallet - Domain Entity (2)

Wallets are one of the most important core entities in any trading system because it represents the balances that users can deposit, withdraw or use for trading. Below are several types of Wallets that a user can have:

1. Fiat Wallets (GBP / USD / EUR) -> These are the balances which are held in bank accounts / payment providers.

2. Crypto Wallets (BTC / ETH / USDT) -> Balances are tracked either on chain or in the internal ledger.

3. Margin Wallet: Used exclusively for leveraged trading, it holds collateral (cash / crypto) against open positions. The balance changes dynamically as the PnL updates. And these are often separate from spot wallets.

4. Derivatives Wallet: A dedicated wallet for futures / options / swaps contracts. Keeps the margin and realized PnL separate from spot trading. It supports settlement rules

5. Funding Wallet: Used for P2P lending / borrowing (funding markets). It is used to move assets here to earn funding interest or provide liquidity. Bitfines has a Funding Wallet distinct from a Trading Wallet.

A user can have multiple wallets -> One per currency / network and therefore the relationship is: User -> Wallets (1:M)

Authentication Domain Entity - API Controllers
- Register User Async
- Login User Async
- Forgot Password Async
- Reset Password Async
- Logout Async
- Send E-mail Verification Async
- Resend E-mail Verification Async
- Change Password

Wallet Domain Entity - API Controllers

1. Create New Wallet (POST)
2. Get All Wallets
3. Get Wallet By ID
4. Update Wallet By ID Async
5. Delete Wallet By ID Async
6. Delete All Wallets By ID Async
7. Freeze Wallet Async
8. Unfreeze Wallet Async
