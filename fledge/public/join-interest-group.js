// const ads = new URL(location.href).searchParams.get('ads');
// console.log(ads);

const groupName = 'shopping'
const owner = 'https://localhost:9443'

const interestGroup = {
  name: groupName,
  owner: owner,

  // x-allow-fledge: true
  biddingLogicUrl: `${owner}/bidding-logic.js`,

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: `${owner}/bidding-signal.json`,
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: `${owner}/daily_update_url`, // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://localhost:9443/ad1.html`,
      metadata: { type: 'shopping' },
    },
    {
      renderUrl: `https://localhost:9443/ad2.html`,
      metadata: { type: 'shopping' },
    },
  ],
};
console.log(interestGroup);

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log('join-interest-group',);
  if (!navigator.joinAdInterestGroup) {
    console.error("cannot find navigator.joinAdInterestGroup");
  }

  const kSecsPerDay = 3600 * 24 * 30;
  navigator.joinAdInterestGroup(interestGroup, kSecsPerDay).then(() => {
    console.log("joinAdInterestGroup success with", { interestGroup, kSecsPerDay });
  }).catch(error => {
    console.log("joinAdInterestGroup error:", error);
  })
});