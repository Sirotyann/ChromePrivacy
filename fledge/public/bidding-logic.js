function log(label, o) {
    console.log(label, JSON.stringify(o, ' ', ' '));
}

function generateBid(
    interestGroup,
    auctionSignals,
    perBuyerSignals,
    trustedBiddingSignals,
    browserSignals
) {
    log('[bindding] generateBid', {
        interestGroup,
        auctionSignals,
        perBuyerSignals,
        trustedBiddingSignals,
        browserSignals,
        ads: interestGroup.ads
    });

    return {
        ad: 'ad-metadata',
        bid: Math.floor(Math.random() * 100, 10),
        render: interestGroup.ads[1].renderUrl,
    };
}

function reportWin(
    auctionSignals,
    perBuyerSignals,
    sellerSignals,
    browserSignals
) {
    // log('[bindding] reportWin', {
    //     auctionSignals,
    //     perBuyerSignals,
    //     sellerSignals,
    //     browserSignals,
    // });
    sendReportTo(browserSignals.interestGroupOwner + '/reporting?report=win');
}