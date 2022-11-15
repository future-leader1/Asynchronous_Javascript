'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     console.log(data);

//     const html = `<article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row">👨‍👨‍👦<span>${(+data.population / 1000000).toFixed(
//       1
//     )}</span> people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//     <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData();
// getCountryData('italy');
// getCountryData('france');

const renderFunction = function (data, classList = '') {
  const html = `<article class="country ${classList} ">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row">👨‍👨‍👦<span>${(+data.population / 1000000).toFixed(
        1
      )}</span> people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages
      )}</p>
      <p class="country__row"><span>💰</span>${Object.keys(data.currencies)}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went Wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}`, response.status);
    return response.json();
  });
};

/*

const getCountryDataAndNeighbour = function (country) {
  //ajaxt call
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data);
    //render country
    renderFunction(data);

    //getneighbour country
    const [neighbours] = data.borders;
    if (!neighbours) return;

    // second ajax call

    console.log(neighbours);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbours}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderFunction(data2);
    });
  });
};

getCountryDataAndNeighbour('portugal');
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);


*/

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);

//console.log(request);

/* 
///reference before putinng it into function

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error('Country not found', response.status);

      return response.json();
    })
    .then(data => {
      renderFunction(data[0]);
      const neighbour = data[0].borders[0];
      //   const neighbour = 'asdasd';

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderFunction(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err}🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

*/

/*
/// using country name API

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderFunction(data[0]);
      const neighbour = data[0].borders[0];
      //const neighbour = null;
      console.log(neighbour);
      if (!neighbour) throw new Error('no neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderFunction(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

*/
//challange 1
/*

const getCountryByRegion = function (country) {
  console.log(country);
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderFunction(data[0]);
    });
};

const WhereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (response.status === 403)
        throw new Error(`too fast request ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!data.city || !data.region)
        throw new Error('city or region not found');

      console.log(`you are in ${data.city}, ${data.region}`, data);
      getCountryByRegion(data.country);

      //   renderFunction(data.);
    })
    .catch(err => {
      console.log(`${err.message} 🔥🔥🔥`);
      renderError(`Something Went Wrong.. ${err.message} Please try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

WhereAmI(52.508, 13.381);
WhereAmI(19.037, 72.873);
WhereAmI(-33.933, 18.474);


*/

// console.log('test start');

// setTimeout(() => console.log('0 sec passed'), 0);

// Promise.resolve('Resolved Promise 1').then(res => console.log(res));

// Promise.resolve('Reslolved Promise 2').then(res => {
//   for (let i = 0; i < 100000; i++) {}
//   console.log(res);
// });

// console.log('Test End');

/*
///creating Promise and consume

const lotteryPromise = new Promise(function (reslove, reject) {
  console.log('it is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      reslove('You are winner 🥇');
    } else {
      reject(new Error('you lost your money 💩'));
    }
  }, 2000);
});
//console.log();

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
*/
//promisifying Settimeout
const wait = function (seconds) {
  return new Promise(function (reslove) {
    setTimeout(reslove, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('i waited 1 sec');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i waited 2 sec');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('i waited 3 sec');
//     return wait(1);
//   })
//   .then(() => console.log('i waited 4 sec'));

//   getCountryDataAndNeighbour('portugal');
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('Abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.log(x));

/*
///////////////////////////

const getPositon = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCountryByRegion = function (country) {
  console.log(country);
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderFunction(data[0]);
    });
};

const WhereAmI = function () {
  getPositon()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(
        response => {
          if (!response.ok)
            throw new Error(`too fast request ${response.status}`);
          return response.json();
        }
      );
    })

    .then(data => {
      console.log(data);
      if (!data.city || !data.region)
        throw new Error('city or region not found');

      console.log(`you are in ${data.city}, ${data.region}`, data);
      getCountryByRegion(data.country);

      //   renderFunction(data.);
    })
    .catch(err => {
      console.log(`${err.message} 🔥🔥🔥`);
      renderError(`Something Went  Wrong.. ${err.message} Please try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', WhereAmI);

const imageContainer = document.querySelector('.images');

const createImg = function (inputPath) {
  return new Promise(function (reslove, reject) {
    const s = document.createElement('img');
    s.src = inputPath;

    s.addEventListener('load', function () {
      imageContainer.append(s);
      reslove(s);
    });
    s.addEventListener('error', function () {
      reject(new Error('Img not found'));
    });
  });
};

let curImg;
createImg('img/img-1.jpg')
  .then(res => {
    console.log('iMG 1 has loaded');
    curImg = res;
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
    return createImg('img/img-2.jpg')
      .then(res => {
        console.log('image 2 has loaded');
        curImg = res;
        return wait(2);
      })
      .then(() => {
        curImg.style.display = 'none';
        return createImg('img/img-3.jpg');
      })
      .then(res => {
        console.log('Image 3 has downloaded');
        curImg = res;
        return wait(3);
      })
      .then(() => (curImg.style.display = 'none'));
  })
  .catch(err => console.error(`Something is Wrong ${err}`));

  */

const getPositon = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    //geolocation
    const pos = await getPositon();
    const { latitude: lat, longitude: lng } = pos.coords;
    //reverse geocoding
    const geoCoding = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    if (!geoCoding.ok)
      throw new Error('Problem Getting Location data 🔥🔥🔥🔥');
    const dataGeo = await geoCoding.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Country not Found');

    const data = await res.json();
    //console.log(data);
    renderFunction(data[0]);

    return `you are in ${dataGeo.city} , ${dataGeo.country}`;
  } catch (err) {
    console.error(`🔥🔥🔥🔥 ${err}`);
    renderError(`🔥🔥🔥🔥 ${err.message}`);

    //reject promise returned form async functions
    throw err;
  }
};

// whereAmI();
// whereAmI();
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: 🔥 ${err.message}`))
//   .finally(() => console.log('3: finished getting loc'));

/*

(async function () {
  console.log('1: will get location');
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(`2:🔥 ${err.message}`);
  }
  console.log('3: finished getting loc');
})();

*/

///promise.all bringing data at the same time. in paralel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'uzbekistan');

////Promise.race
