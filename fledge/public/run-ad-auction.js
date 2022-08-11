// ssp
const auctionConfig = {
    seller: 'https://localhost:9443/ad-container.html', // should https & same as decisionLogicUrl's origin

    // x-allow-fledge: true
    decisionLogicUrl: '/decision-logic.js',

    interestGroupBuyers: [
        // * is not supported yet
        'https://localhost:9443',
    ],
    // public for everyone
    auctionSignals: { auction_signals: 'auction_signals' },

    // only for single party
    sellerSignals: { seller_signals: 'seller_signals' },

    // only for single party
    perBuyerSignals: {
        // listed on interestGroupByers
        'https://localhost:9443': {
            per_buyer_signals: 'per_buyer_signals',
        },
    },
};

document.addEventListener('DOMContentLoaded', async (e) => {
    const adAuctionResult = await navigator.runAdAuction(auctionConfig);
    console.log('run-ad-auction', { auctionConfig, adAuctionResult });
    const query = new URL(location.href).search;
    // const frametype = query === '?fencedframe' ? 'fencedframe' : 'iframe';
    // console.log(`display ads in <${frametype}>`);
    // const $iframe = document.createElement(frametype);
    const $iframe = document.createElement('iframe');
    $iframe.src = adAuctionResult;
    document.body.appendChild($iframe);
});
