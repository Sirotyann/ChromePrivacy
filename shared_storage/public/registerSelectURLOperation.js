class SelectURLOperation {
    async run(urls, options) {
        //window.sharedStorage.set('data-for-month', `${new Date()}`);
        // const dateForMonth = await this.sharedStorage.get('data-for-month');
        // console.log(`[if data last more than a month] Today is ${new Date()}, the data stored at ${dateForMonth}`)
        const keep_visiting = await this.sharedStorage.get('keep_visiting');
        console.log("# keep_visiting: ", keep_visiting)

        // const three_weeks = await this.sharedStorage.get('three_weeks');
        // console.log("# three_weeks: ", three_weeks)

        const four_weeks = await this.sharedStorage.get('four_weeks');
        console.log("# four_weeks: ", four_weeks)

        const dec_14_three_weeks_1 = await this.sharedStorage.get('dec_14_three_weeks_1');
        console.log("# dec_14_three_weeks_1: ", dec_14_three_weeks_1);

        // const threeWeeks = await this.sharedStorage.get('three_weeks');
        // console.log("# threeWeeks: ", threeWeeks)

        const activeGroup = await this.sharedStorage.get('active-group');
        const groups = options.groups;
        console.log(JSON.stringify({ urls, options }));
        const index = Array.from(groups).findIndex(it => it === activeGroup);
        console.log(`SelectURLOperation run, find group index ${index}, activeGroup(${activeGroup}) groups(${groups})`);
        return index;
    }
}


/**
 * register(name, operation)
 * Registers a shared storage worklet operation with the provided name
 */
register('active-group', SelectURLOperation);
