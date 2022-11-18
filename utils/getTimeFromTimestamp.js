// input a timestamp then format it as time between dates
// NONE OF THIS WORKS 
const getDifference = (timestamp) => {
    const date = new Date(timestamp)
    const secondsSinceEpoch = timestamp / 1000

    const YYMMDDnow = new Date(Date.now()).toISOString().split('T')[0].split("-")
    console.log(YYMMDDnow)
    const yearNow = YYMMDDnow[0]
    const monthNow = YYMMDDnow[1]
    const dayNow = YYMMDDnow[2]

    const YYMMDDthen = date.toISOString().split('T')[0].split("-")
    console.log(YYMMDDthen)
    const yearThen = YYMMDDthen[0]
    const monthThen = YYMMDDthen[1]
    const dayThen = YYMMDDthen[2]

    var diffYear = yearNow - yearThen
    var diffMonth = monthNow - monthThen
    var diffDay = dayNow - dayThen

    if (diffDay < 0) {
        // negative number
        const monthThenDays = getNumberOfDaysInMonth(monthThen, yearThen) // March
        const monthNowDays = getNumberOfDaysInMonth(monthNow, yearNow)

        const monthThenDaysNext = getNumberOfDaysInMonth(monthThen + 1, yearThen) // April
        const monthThenNext = monthThen + 1

        const thenDiffToEndOfMonthDays = parseInt(monthThenDays) - parseInt(dayThen)
        const thenDiffIntoNewMonthDays = dayNow
        const newDiffDay = (parseInt(dayThen) + parseInt(thenDiffIntoNewMonthDays))
        diffMonth -= 1
        const newActualDiffDay = monthThenDays - 36
        const newNewDiffDay = (() => {
            if (newActualDiffDay < 0) {
                return newDiffDay + newActualDiffDay + newActualDiffDay + newActualDiffDay

            }
            return newDiffDay
        })()
        diffDay = newNewDiffDay
        console.log(newNewDiffDay)
    }
    // return `${diffYear} years ${diffMonth} months and ${diffDay} days`
    return `NOT AVAILABLE`
}

function getNumberOfDaysInMonth(month, year) {
    // 01 is jan
    const nums = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ]

    return nums[month - 1]
}

function isLeapYear(year) {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

// 1 year 6 months 24 days 


// YYYY-MM-DD
// 2022-09-12 14:09
// 1987-03-23 20:31

// APR 12  30 days in month 
// MAR 23 31 days in month
// DIFF = 

//-13 = march 30
// -20 = march 23
// april 12 to march 23 is - 20 days

module.exports = getDifference

// getDifference(new Date("2022-09-12 14:19"))




