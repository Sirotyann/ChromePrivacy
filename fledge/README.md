# structure
index.html
    - (iframe) join-interest-group.html
        - join-interest-group.js
            // call `navigator.joinAdInterestGroup()`
            // with `bidding-logic.js` which is the key for showing ads

publisher.html
    - (iframe) ad-container.html
        - run-ad-auction.js 
            // call `navigator.runAdAuction()`
            // get the ad url
            // give the url to an iframe


The decision-logic.js contains a scoreAd() method, what's the purpose of this method is unclear.

Both decision-logic.js and bidding-logic.js have a method sending report to server