// Copy the JSON from cars.json and assign it to a variable in a new application. This data holds sales information for a car dealership. Your job is to produce the following reports for the dealership based on their total 2017 sales.

const sales2017 = cars.filter(car => car.purchase_date.split("-")[0] === "2017")



// * 1 Total profit for 2017

const totalProfits2017 = sales2017.map(car => car.gross_profit)
    .reduce((currentTotal, nextCar) => currentTotal + nextCar, 0)

console.log(totalProfits2017)



// * 2 In which month did they sell the most cars?

// Build object with each month as key and value representing total sales in the month
const salesByMonth = sales2017.reduce((newObject, car) => {
    const month = car.purchase_date.split("-")[1];
    if (month in newObject) {
        newObject[month]++;
    } else {
        newObject[month] = 1;
    }
    return newObject
}, {})

// Turn each key-value pair into an array, push to one large array to hold all month-sales pairs
var sortableSales = [];
for (var month in salesByMonth) {
    sortableSales.push([month, salesByMonth[month]]);
}

// Sort the array of month-sales arrays by number of sales
const sortedSales = sortableSales.sort((a, b) => b[1] - a[1]);

// Check if there is more than one month with the highest number of sales
// If there is only one winner, it will be returned alone in an array
// If there are multiple months with the same (highest) number of sales, all will be returned in an array
const monthMostSales = sortedSales.filter(month => (month === sortedSales[0] || month[1] === sortedSales[0][1]))
    .map(month => month[0])

console.log(monthMostSales)



// * 3 Which salesperson sold the most cars?
// Same logical process as #2

const sellerFullNames = sales2017.map(car => [car.sales_agent.first_name, car.sales_agent.last_name].join(" "))

const salesPerSeller = sellerFullNames.reduce((newObject, name) => {
    if (name in newObject) {
        newObject[name]++;
    } else {
        newObject[name] = 1;
    }
    return newObject
}, {})

// use Object.entries() to accomplish same thing as for...in loop in #2.
// This turns an object's key-value pairs into arrays in an array
const topSeller = Object.entries(salesPerSeller)
    .sort((a, b) => b[1] - a[1])[0][0];

console.log(topSeller)



// * 4 Which salesperson made the most profit?
const sellerAndProfit = sales2017.map(car => [[car.sales_agent.first_name, car.sales_agent.last_name].join(" "), car.gross_profit])

const profitPerSeller = sellerAndProfit.reduce((newObject, name) => {
    if (name[0] in newObject) {
        newObject[name[0]] += name[1];
    } else {
        newObject[name[0]] = name[1];
    }
    return newObject
}, {})

const topProfitSeller = Object.entries(profitPerSeller)
    .sort((a, b) => b[1] - a[1])[0][0];

console.log(topProfitSeller)



// * 5 Which model was the most popular?

const carModels = sales2017.map(car => car.vehicle.model)

const salesPerModel = carModels.reduce((newObject, model) => {
    if (model in newObject) {
        newObject[model]++;
    } else {
        newObject[model] = 1;
    }
    return newObject
}, {})

const modelWithTheMostest = Object.entries(salesPerModel)
    .sort((a, b) => b[1] - a[1])[0][0];

console.log(modelWithTheMostest)



// * 6 Which bank provided the most loans to our customers?

const bankLoans = sales2017.map(car => car.credit.credit_provider)

const loansPerBank = bankLoans.reduce((newObject, bank) => {
    if (bank in newObject) {
        newObject[bank]++;
    } else {
        newObject[bank] = 1;
    }
    return newObject
}, {})

const mostUsedBank = Object.entries(loansPerBank)
    .sort((a, b) => b[1] - a[1])[0][0];

console.log(mostUsedBank)


