# crypto-tracker
Cryotocurreny tracker app using Angular, Typescript, and Nativescript. Features the top 200 coins on coinmarketcap.com, sorted by their market cap and 3 tabs: Coins, portfolio, and misc

## Coins page (First tab)
- Features a scrolling list of the top 200 coins and their price, name, and percent change in the last 24h
- Tap on a particular item to view a popup with additional information such as volume and how it's changed in the last week

## Portfolio page (Second tab)
- Features a place to store a user's portfolio
- When adding a new entry, a user can choose a name, quantity, purchased price, and date purchased
- All of the entries are then added up and displayed at the top

## Misc page (Third tab)
- Settings page (Incomplete)

## TODO
- Add pull to refresh and lazy loading on the coins page
- Add persistent database storage on the porfolio page
- Add some changeable settings to the misc page
- Add portfolio import/export options
- Increase efficiency of filter function
