/* eslint-disable */

/*
 :'######::'########::::'###::::'########::'########:'########:'########::
 '##... ##:... ##..::::'## ##::: ##.... ##:... ##..:: ##.....:: ##.... ##:
  ##:::..::::: ##:::::'##:. ##:: ##:::: ##:::: ##:::: ##::::::: ##:::: ##:
 . ######::::: ##::::'##:::. ##: ########::::: ##:::: ######::: ########::
 :..... ##:::: ##:::: #########: ##.. ##:::::: ##:::: ##...:::: ##.. ##:::
 '##::: ##:::: ##:::: ##.... ##: ##::. ##::::: ##:::: ##::::::: ##::. ##::
 . ######::::: ##:::: ##:::: ##: ##:::. ##:::: ##:::: ########: ##:::. ##:
 :......::::::..:::::..:::::..::..:::::..:::::..:::::........::..:::::..::
*/

window.addEventListener("load", () => {
	loadPageData().then((page) => {
		document.title = `${page.title}`;
		page.info = { appVersion: '2.0', version: page.version };
		EventBus = new Vue();

		DATA = new Vue({
			el: '#root',
			methods: {},
			data: () => { return { data: page } },
			mounted: function () {},
			created() {
				let load_delay = 0;
				setTimeout(() => { document.querySelectorAll('.page').forEach((e) => { e.classList.add('loaded'); }); }, load_delay);
				EventBus.$on('page-data', (data) => { this.data = data; });
			}
		});

	});
}, false);

// GATHER DATA FROM OUTSIDE SOURCE
async function loadPageData() {
	return new Promise((resolve) => {
		return getJSON(`https://fakestoreapi.com/products`, function (err, data) {
			return resolve(data);
		})
	})
}

function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () { (xhr.status == 200) ? callback(null, xhr.response) : callback(xhr.status); };
	xhr.send();
};

