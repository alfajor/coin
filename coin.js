const fetch = require('node-fetch');
const stdio = require('stdio');
const colors = require('colors');
const currencies = require('./currencies.json');

let currencyList = JSON.stringify(currencies, null, "\r");

let ops = stdio.getopt({
  info: {description: `The following currencies are supported: \r\n ${currencyList.replace(/[{}]/g, '').grey}`}
});

stdio.question('Enter a base currency i.e (USD)'.cyan, (err, from) => {
  stdio.question('Enter a second currency'.cyan, (err, to) => {
    from = from.toUpperCase();
    to = to.toUpperCase();

    fetch(`http://api.openrates.io/latest?base=${from}&symbols=${from},${to}`).then((res) => {
      return res.json();
    }).then((result, err) => {
      let rates = result.rates;

      console.log(`\n Your rates for ${from} to ${to} are: \r\n`.yellow);

      if(rates == undefined) {
        console.log('No rates are available for one or more currencies'.red);
      } else {
        console.log(rates);
      }
    });

  });
});
