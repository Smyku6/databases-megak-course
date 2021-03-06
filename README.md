# databases-megak-course

**MySQL Collation:**
utf8mb4_unicode_ci

| What?       | Description                                   |
|-------------|-----------------------------------------------|
| **utf8mb4** | UTF8 implementation (1-4 bytes for character) |
| **unicode** | Unicode implementation                        |
| **ci**      | case insensitive                              |
|             | spaces are like no-spaces, "Ab " === "Ab"     |


#QUERYING SINGLE TABLE

Fetch all columns from the `country` table:
~~~~
SELECT *
FROM country;
~~~~

Fetch id and name columns from the `city` table:
~~~~
SELECT id, name
FROM city;
~~~~


Fetch city names sorted by the `rating` column in the default ASCending order:
~~~~
SELECT name
FROM city
ORDER BY rating [ASC];
~~~~


Fetch city names sorted by the `rating` column in the DESCending order:
~~~~
SELECT name
FROM city
ORDER BY rating DESC;
~~~~


#ALIASES

##COLUMNS
~~~~
SELECT name AS city_name
FROM city;
~~~~

##TABLES
~~~~
SELECT co.name, ci.name
FROM city AS ci
JOIN country AS co
ON ci.country_id = co.id;
~~~~

#FILTERING THE OUTPUT

##COMPARISON OPERATORS

Fetch names of cities that have a rating above 3:
~~~~
SELECT name
FROM city
WHERE rating > 3;
~~~~

Fetch names of cities that are neither Berlin nor Madrid:
~~~~
SELECT name
FROM city
WHERE name != 'Berlin'
AND name != 'Madrid';
~~~~

##TEXT OPERATORS

Fetch names of cities that start with a 'P' or end with an 's':
~~~~
SELECT name
FROM city
WHERE name LIKE 'P%'
OR name LIKE '%s';
~~~~

Fetch names of cities that start with any letter followed by 'ublin' (like Dublin in Ireland or Lublin in Poland):
~~~~
SELECT name
FROM city
WHERE name LIKE '_ublin';
~~~~

##OTHER OPERATORS

Fetch names of cities that have a population between 500K and 5M:
~~~~
SELECT name
FROM city
WHERE population BETWEEN 500000 AND 5000000;
~~~~

Fetch names of cities that don't miss a rating value:
~~~~
SELECT name
FROM city
WHERE rating IS NOT NULL;
~~~~

Fetch names of cities that are in countries with IDs 1, 4, 7, or 8:
~~~~
SELECT name
FROM city
WHERE country_id IN (1, 4, 7, 8);
~~~~



#AGGREGATION AND GROUPING

`GROUP BY` groups together rows that have the same values in specified columns. It computes summaries (aggregates) for each unique combination of values.

![img.png](img.png)

##AGGREGATE FUNCTIONS
`avg(expr)` ??? average value for rows within the group

`count(expr)` ??? count of values for rows within the group

`max(expr)` ??? maximum value within the group

`min(expr)` ??? minimum value within the group

`sum(expr)` ??? sum of values within the group

##EXAMPLE QUERIES

Find out the number of cities:
~~~~
SELECT COUNT(*)
FROM city;
~~~~

Find out the number of cities with non-null ratings:
~~~~
SELECT COUNT(rating)
FROM city;
~~~~

Find out the number of distinctive country values:
~~~~
SELECT COUNT(DISTINCT country_id)
FROM city;
~~~~

Find out the smallest and the greatest country populations:
~~~~
SELECT MIN(population), MAX(population)
FROM country;
~~~~

Find out the total population of cities in respective countries:
~~~~
SELECT country_id, SUM(population)
FROM city
GROUP BY country_id;
~~~~

Find out the average rating for cities in respective countries if the average is above 3.0:
~~~~
SELECT country_id, AVG(rating)
FROM city
GROUP BY country_id
HAVING AVG(rating) > 3.0;
~~~~

# Zagadnienia
---
## ==Z1.1== Node.js
Node.js jest ??rodowiskiem uruchomieniowym (*runtime*) JavaScript zbudowanym na bazie silnika V8, wykorzystywanego w Chome. Pozwala na uruchomienie aplikacji JavaScriptowych poza przegl??dark??. Jest jednow??tkowy, nie-blokuj??cy i asynchroniczny dzi??ki wykorzystaniu p??tli zdarze??. ([??r??d??o](https://intro-to-nodejs-v2-site.vercel.app/lesson/01-what-is-node))

Jest wykorzystywany do:
- serwer??w i API (mo??e ob??u??y?? wiele request??w)
- baz danych
- CLI - Command Line Interface
- build tools
- automatyzacji
- skrypt??w
- bot??w

Niezbyt dobrze nadaje si?? do operacji wymagaj??cych du??ego wykorzystania CPU ([??r??d??o](https://frontendmasters.com/courses/node-js-v2/testing-an-api-with-httpie/)):
- arytmetyka
- sztuczna inteligencja
- uczenie maszynowe

**nvm** jest narz??dziem do zarz??dzania wersj?? Node.js.

---
## ==Z1.2== Global object
### Zmienne wygl??daj??ce na globalne i zakres modu??u
W przegl??darce, zakres najwy??szego poziomu to zakres globalny. Wykorzystanie `var something` na najwy??szym poziomie zdefiniuje now?? zmienn?? globaln??. W Node.js najwy??szy poziom to zakres modu??u. Wykorzystanie `var something` w module Node.js zdefiniuje zmienn?? lokaln?? do tego modu??u. Jest to osi??gni??te za pomoc?? opakowania ca??ego kodu z pliku w funkcj?? (*module wrapper*). Udost??pnia to w ka??dym module CJS kilka zmiennych wygl??daj??cych na globalne: `exports`, `require`, `module`, `__filename`, `__dirname`. Te zmienne **nie** s?? dost??pne w modu??ach ES! **Nie s?? one globalne** (wbrew temu co by??o powiedziane na FrontendMasters, [??r??d??o](https://nodejs.org/api/globals.html#global-objects))!

### Obiekt globalny
Opr??cz tego, istnieje obiekt `global`, odpowiednik `window` w przegl??darce, dost??pny zar??wno w modu??ach ESM i CJS.

Zawiera klucze ([??r??d??o](https://nodejs.org/api/globals.html)): `global` (referencja cykliczna), `AbortController`, `AbortSignal`, `Buffer`, `clearImmediate()`, `clearInterval()`, `clearTimeout()`, `console`, `Event`, `EventTarget`, `fetch()` (eksperymentalne i schowane za flag?? `--experimental-fetch` wraz z `Headers`, `Response`, `Request`), `MessageChannel`, `MessageEvent`, `MessagePort`, `performance`, `process`, `queueMicrotask()`,  `setImmediate()`, `setInterval()`, `setTimeout()`, `structuredClone()`, `DOMException`, `TextDecoder`, `TextEncoder`, `URL`, `URLSearchParams`, `WebAssembly`.

Z ka??dej z tych w??a??ciwo??ci mo??emy skorzysta?? r??wnie?? bez zapisania `global.` jako przedrostek (same w sobie **s?? obiektami globalnymi**).

### Standardowe wbudowane obiekty
Opr??cz wymienionych wcze??niej obiekt??w globalnych specyficznych dla Node.js, zawiera on wszystkie standardowo dost??pne w JS obiekty globalne (kt??re zawiera te?? przegl??darka) takie jak ([??r??d??o](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)): `Infinity`, `NaN`, `undefined`, `globalThis` (obiekt, do kt??rego `this` odwo??uje si?? w zakresie globalnym, ujednolica `window`, `self`, `frames` i `global`), `eval()`, `isFinite()`, `isNaN()`, `parseFloat()`, `parseInt()`, `encodeURI()`, `encodeURIComponent()`, `decodeURI()`, `decodeURIComponent()`, `Object`, `Function`, `Boolean`, `Symbol`, `Error` (i jego podtypy), `Number`, `BigInt`, `Math`, `Date`, `String`, `RegExp`, `Array` (oraz tablice wyspecjalizowane dla typ??w), `Map`, `Set`, `WeakMap`, `WeakSet`, `ArrayBuffer`, `SharedArrayBuffer`, `Atomics`, `DataView`, `JSON`, `Promise`, `Generator`, `Proxy`, `Intl`, `WebAssembly`.

---
## ==Z1.3== P??tla zdarze?? (*event loop*)
### Opis p??tli zdarze??
P??tla zdarze?? pozwala Node.js wykonywa?? nie-blokuj??ce operacje wej??cia/wyj??cia, pomimo, ??e JavaScript jest jednow??tkowy, deleguj??c prac?? do j??dra systemu kiedy jest to mo??liwe. Kiedy j??dro sko??czy przetwarza?? operacj??, informuje o tym Node.js, kt??ry dodaje callback do kolejki **`poll`** zawieraj??cej callbacki gotowe do wykonania. ([??r??d??o](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/))

Przy starcie Node.js inicjalizuje on p??tl?? zdarze??, wykonuje kod podany w skrypcie (kt??ry mo??e wykonywa?? asynchroniczne ????dania do API, ustawia?? timeout, lub wywo??ywa?? `process.nextTick()`), po czym zaczyna przechodzi?? po p??tli zdarze??.

### Fazy p??tli zdarze??
Poszczeg??lne fazy p??tli zdarze?? to ([??r??d??o](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#phases-overview)):
- `timers`: callbacki z `setTimeout()` oraz `setInterval()`
- `pending callbacks`: operacje wej??cia/wyj??cia odroczone do nast??pnej iteracji p??tli
- `idle, prepare`
- `poll`: nowe zdarzenia wej??cia/wyj??cia, callbacki zwi??zane z wej??ciem/wyj??ciem (praktycznie wszystko opr??cz wydarze?? `close`, callback??w `setTimeout()`, `setInterval()`, `setImmediate()`)
- `check`: callbacki z `setImmediate()`
- `close callbacks`: callbacki z wydarze?? `close`, np. `socket.on('close', ...)`

### `process.nextTick()`
Wszystkie callbacki przekazane do `process.nextTick()` wykonuj?? si?? przed rozpocz??ciem kolejnej **fazy** p??tli zdarze??.

### Zdarzenia (*events*)
Spora cz?????? API Node.js bazuje na architekturze opartej na zdarzeniach, gdzie obiekty (*emitters*) emituj?? zdarzenia (*events*), kt??re wywo??uj?? funkcje (*listeners*). ([??r??d??o](https://nodejs.org/api/events.html#events))

Wszystkie obiekty, kt??re emituj?? zdarzenia s?? instancjami klasy `EventEmitter`, kt??re maj?? funkcj?? `eventEmitter.on()`, pozwalaj??c?? podpi???? callback pod konkretne (nazwane stringiem) zdarzenia. Kiedy `EventEmitter` emituje zdarzenie, wszystkie funkcje podpi??te pod dane zdarzenie s?? wywo??ane **synchronicznie** w kolejno??ci w jakiej by??y zarejestrowane.
```JavaScript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

Mo??na wykorzysta?? funkcj?? `eventEmitter.once()`, aby zarejestrowa?? callback, kt??ry b??dzie wywo??any maksymalnie jeden raz.

---
## ==Z1.4== npm
npm jest najwi??kszym repozytorium oprogramowania na ??wiecie, sk??adaj??cym si?? z trzech komponent??w: strony, CLI i repozytorium.

Wbrew opisowi zagadnienia, npm **nie** jest skr??tem od "node package manager" ([??r??d??o](https://github.com/npm/cli#is-npm-an-acronym-for-node-package-manager)).

### Komendy
- `npm init` - tworzy pakiet
- `npm run <command>` - uruchamia skrypt `command` z `package.json`
    - `npm start` - uruchamia skrypt `start` z `package.json`
    - `npm test` - uruchamia skrypt `test` z `package.json`
- `npm publish` - publikuje pakiet do rejestru npm
- `npm install (with no args, in package dir)`
    - instaluje pakiety z lokalnego `node_modules`
    - domy??lnie instaluje tylko pakiety wymienione jako `dependencies`
    - `npm install --production=false` - aby zainstalowa?? zar??wno `dependencies` oraz `devDependencies`, niezale??nie od warto??ci `NODE_ENV`
- `npm install [<@scope>/]<name>@<version/tag/version range>`
    - standardowo instaluje w `dependencies` (opcja `-P`)
    - `npm install -P` / `--save-prod` - wymusza instalacj?? w `dependencies`
    - `npm install -D` / `--save-dev` - wymusza instalacj?? w `devDependencies`
    - `npm install -O` / `--save-optional` - wymusza instalacj?? w `optionalDependencies`
    - `npm install --no-save` - instaluje bez zapisania w `package.json`
    - `npm install -g` / `--global` - instaluje globalnie

### Domy??lny `package.json`
Inicjalizacja nowego pakietu za pomoc?? `npm init` tworzy plik `package.json`:
```JSON
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

---
## ==Z1.5== Modu??y w Node.js
W systemie modu????w Node.js, ka??dy plik jest traktowany jako osobny modu??.

### Systemy modu????w
Node.js ma dwa systemy modu????w: CommonJS (**CJS**) oraz ECMAScript modules (**ESM**). Standardowo, dla kompatybilno??ci wstecznej wykorzystywany jest CJS. Jako modu??y CJS traktowane s?? ([??r??d??o](https://nodejs.org/api/packages.html#determining-module-system)):
- pliki `.cjs`
- pliki `.js`, gdy najbli??szy `package.json` posiada pole `"type": "commonjs"` lub w og??le nie posiada takiego pola w konfiguracji (zalecane jest, aby typ by?? podany nawet kiedy korzystamy z CJS)

Natomiast jako modu??y ESM traktowane s??:
- pliki `.mjs`
- pliki `.js`, gdy najbli??szy `package.json` posiada pole `"type": "module"`

### Module wrapper
Przed wykonaniem kodu modu??u, Node.js otoczy go funkcj??, kt??ra wygl??da tak ([??r??d??o](https://nodejs.org/api/modules.html#the-module-wrapper)):
```JavaScript
(function (exports, require, module, __filename, __dirname) {
	// kod z pliku
});
```

Dzi??ki temu Node.js zapewnia, ??e zmienne zadeklarowane na najwy??szym poziomie s?? definiowane w zakresie modu??u, a nie dodane do obiektu globalnego, oraz udost??pnia w zakresie modu??u pomocnicze zmienne:
- `exports` - referencja do `module.exports`
- `require(id)` - funkcja do importowania innych modu????w
- `module` - referencja do obiektu obecnego modu??u
- `__filename` - pe??na ??cie??ka do pliku modu??u. Mo??e to by?? inna nazwa, ni?? podana przy rozpocz??ciu progamu (`node file.js`), kiedy wykonamy dany modu?? za pomoc?? `require()`. Mo??emy sprawdzi??, czy obecny plik by?? wywo??any bezpo??rednio por??wnuj??c `require.main === module`.
- `__dirname` (`=== path.dirname(__filename)`) - pe??na ??cie??ka do folderu zawieraj??cego modu??

### `module.exports` vs `exports`
Zar??wno `module.exports` i `exports` wskazuj?? na ten sam obiekt, ale to `module.exports` jest wykorzystywany kiedy importujemy co?? z innego pliku. To znaczy, modyfikacja w??a??ciwo??ci na `module.exports` i `exports` jest r??wnowa??na ([??r??d??o](https://stackoverflow.com/a/26451885)):
```JavaScript
exports.a = // ...
// Jest r??wnowa??ne
module.exports.a = // ...
```

Natomiast, nadpisanie obiektu `exports` jedynie zmienia obiekt do kt??rego odnosi si?? ta zmienna, ale **nie** modyfikuje `module.exports` i tego co jest zwracane z modu??u kiedy importujemy go w innym pliku:
```JavaScript
// Dzia??a, zmienia to co jest importowane z innych plik??w:
module.exports = {
	a: // ...
};

// Nie dzia??a! Modyfikuje zmienn?? exports, ale nie module.exports oraz to co jest importowane z innych plik??w:
exports = {
	a: // ...
};
```

---
## ==Z1.6== Podstawowe modu??y wbudowane w Node.js
### `process` ([docs](https://nodejs.org/api/process.html))
Obiekt `process` jest dost??pny globalnie, ale zalecane jest jego jawne zaimportowanie (`import process from 'process';` / `const processs = require('process');`).

Wa??niejsze zdarzenia emitowane przez `process` to:
- `beforeExit` - emitowany kiedy p??tla zdarze?? jest w pe??ni opr????niona i Node.js planuje zako??czy?? proces (mo??na tu wymusi?? jego kontynuacj??), nie jest emitowany po u??yciu `process.exit()`.
- `exit` - emitowany kiedy Node.js chce zako??czy?? proces (bo p??tla zdarze?? si?? w pe??ni opr????ni??a, b??d?? wywo??ano `process.exit()`). Nie mo??na wymusi?? st??d kontynuacji procesu - po wywo??aniu wszystkich listener??w `exit` proces si?? zako??czy. Mo??na tu wykonywa?? tylko operacje synchroniczne (pozosta??e nigdy si?? nie wykonaj??, bo Node.js zako??czy natychmiast po przej??ciu przez wszystkie listenery).
- `uncaughtException` - emitowany kiedy rzucony b????d nie b??dzie z??apany i dojdzie a?? do najwy??szego poziomu. Standardowo Node.js wypisze stack trace i zako??czy z kodem wyj??cia 1, nadpisuj??c poprzednio ustawiony `process.exitCode`, ale dodanie listenera do tego eventu nadpisuje to zachowanie. Mo??na st??d zwr??ci?? w??asny kod wyj??cia, zako??czy?? uruchomione procesy zanim aplikacja si?? wy????czy, przekaza?? informacje o b????dzie dalej i powstrzyma?? zako??czenie aplikacji (chocia?? nie jest to zalecane!).
- `unhandledRejection` - emitowany, kiedy b????d z `Promise` nie jest wy??apany (np. za pomoc?? `.catch()`).
- sygna??y: `SIGINT`, `SIGTERM` itd. ([wi??cej info](https://nodejs.org/api/process.html#signal-events))

Wa??niejsze metody/w??a??ciwo??ci obiektu `process` to:
- `.abort()` - natychmiast wy????cza proces
- `.argv` - tablica argument??w podanych przez wiersz polece?? przy w????czeniu procesu
- `.env` - obiekt przechowuj??cy zmienne ??rodowiskowe
- `.exit(code)` - ko??czy synchronicznie proces ze kodem wyj??cia `code` (lub 0, je??eli ??aden nie zosta?? podany). Proces nie sko??czy si?? dop??ki nie zostan?? obs??u??one wszystkie listenery na zdarzeniu `exit`.
- `.exitCode` - liczba kt??ra b??dzie kodem wyj??cia, je??li proces zako??czy si?? sam lub za pomoc?? `process.exit()` bez podania kodu
- `.stderr`, `.stdin`, `.stdout` - strumienie pod????czone do standardowych wej????/wyj????

#### Kody wyj??cia
Proces zako??czy si?? z kodem wyj??cia 0 w normalnych okoliczno??ciach. Kod inny ni?? 0 sugeruje b????d. ([pe??na rozpiska](https://nodejs.org/api/process.html))

### `path` ([docs](https://nodejs.org/api/path.html))
- `.basename(path)` - ostatnia cz?????? ??cie??ki (nazwa pliku i rozszerzenie)
- `.dirname(path)` - nazwa folderu pliku
- `.extname(path)` - nazwa rozszerzenia pliku (z kropk??)
- `.format(object)` - zwraca string ??cie??ki z obiektu (przeciwie??stwo `.parse(string)`)
- `.isAbsolute(path)` - czy ??cie??ka jest bezwzgl??dna
- `.join(...paths)` - ????czy ??cie??ki
- `.parse(path)` - tworzy obiekt ??cie??ki ze stringa

### `os`
- `.freemem()` - pozosta??a wolna pami???? w systemie (w bajtach)
- `.homedir()` - ??cie??ka do folderu obecnego u??ytkownika
- `.networkInterfaces()` - obiekt zawieraj??cy iinformacje o interfejsach sieciowych
- `.totalmem()` - ca??kowita pami???? systemu (w bajtach)
- `.uptime()` - czas od w????czenia systemu (w sekundach)

### `fs` ([docs](https://nodejs.org/api/fs.html))
- `.readFile(path[, options], callback)` - czyta plik asynchronicznie, je??li nie podamy `options.encoding`, wczyta go do `Buffer`a, a je??li podamy (np. `utf-8`) to do stringa
- `.writeFile(file, data[, options], callback)` - zapisuje `data` do pliku `file` asynchronicznie

Mo??na skorzysta?? z `fs/promises` aby zaimportowa?? wersj?? modu??u wspieraj??c?? `Promise` zamiast callback??w.

### `http` ([docs](https://nodejs.org/api/http.html))
Wykorzystywane do implementacji serwera HTTP bez pomocy bibliotek.
```JavaScript
import http from 'http'

const host = 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      if (req.headers['content-type'] === 'application/json') {
        body = JSON.parse(body)
      }

      console.log(body)
      res.writeHead(201)
      res.end('ok')
    })
  } else {
    res.writeHead(200)
    res.end('hello from my server')
  }
})

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
```

### `child_process` ([docs](https://nodejs.org/api/child_process.html))
Metoda `child_process.spawn(command[, args][, options])` tworzy nowy proces za pomoc?? danej komendy i argument??w `args`.

---
## ==Z1.7== Biblioteka `nodemon`
Narz??dzie `nodemon` automatycznie restartuje aplikacj?? Node.js, kiedy wykryje zmiany w jej plikach. Nie wymaga dokonania zmian w kodzie. ([??r??d??o](https://www.npmjs.com/package/nodemon))

### Instalacja
```bash
# Instalacja globalna
npm install -g nodemon # or using yarn: yarn global add nodemon

# Instalacja lokalna
npm install --save-dev nodemon # or using yarn: yarn add nodemon -D
```

### U??ycie
```bash
nodemon [your app]
nodemon ./server.js localhost 8080
nodemon # je??li masz main w package.json
```

---
## ==Z1.8== R????nice pomi??dzy ESM (ES modules) a CJS (CommonJS)
### Wyb??r systemu modu????w
Standardowym systemem modu????w dla zachowania kompatybilno??ci wstecznej jest CJS. Aby w????czy?? modu??y ESM, nale??y: nazwa?? plik z rozszerzeniem `.mjs`, albo ustawi?? `"type": "module"` w `package.json`. Modu??y ECMAScript s?? oficjalnym i ustandardyzowanym formatem

### Zmienne w zakresie modu??u CJS
W zakresie modu??u CJS dost??pne s?? zmienne `exports`, `require`, `module`, `__filename`, `__dirname`, kt??re nie s?? dost??pne w modu??ach ESM.

Alternatyw?? dla `exports` / `module.exports` w ESM jest `export`, dla `require` jest `import`, natomiast dla `__filename` i `__dirname` odpowiednio:
```JavaScript
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// np.
path.join(__dirname, 'index.html'); /* <-> */ new URL('index.html', import.meta.url);
```

### Odpowiedniki `import` / `export`
```JavaScript
// CJS <-> ESM
const test = require('test'); /* <-> */ import test from 'test';
const test = require('test'); /* <-> */ import { default as test } from 'test';
const { elem } = require('test'); /* <-> */ import { elem } from 'test';
const elem = require('test').elem; /* <-> */ import { elem } from 'test';

module.exports = elem; /* <-> */ export default elem;
module.exports.elem = /* ... */; /* <-> */ export const elem = /* ... */;
```

`import` wymaga obowi??zkowego podania rozszerzenia pliku do importu modu????w okre??lonych ??cie??k?? wzgl??dn?? lub bezwzgl??dn??. ([??r??d??o](https://nodejs.org/api/esm.html#mandatory-file-extensions))

### Dynamiczne importy
Alternatyw?? dla `require()` u??ytego w warunku, lub na ????danie jest dynamiczny import `import()` ([??r??d??o](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)):
```JavaScript
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
```
---
## ==Z2.1== Znaczenie poj??cia API
**API** - Application Programming Interface - zestaw interakcji, w kt??re mo??emy wej???? z dan?? aplikacj??.

Wed??ug [Wikipedii](https://pl.wikipedia.org/wiki/Interfejs_programowania_aplikacji):
> **Interfejs programowania aplikacji**, **API** ??? zbi??r regu?? ??ci??le opisuj??cy, w jaki spos??b programy lub podprogramy komunikuj?? si?? ze sob??.

W kontek??cie serwera, API jest specyfikacj?? interfejs??w HTTP, pozwalaj??cych na interakcj?? z danymi, udostepnionych dla konsumenta. ([??r??d??o](https://slides.com/scotups/api-design-in-node-with-express-v3/#/2/0/4))

Typy architektur API to np:
- REST
- SOAP
- RPC
- GraphQL

---
## ==Z2.2== Znaczenie takich poj???? jak: standard REST, CRUD
### REST
Najpopularniejszy wzorzec projektowy API z bardzo rozmyt?? definicj?? (nie jest oficjalnie ustandardyzowany - [??r??d??o](https://en.wikipedia.org/wiki/Representational_state_transfer#Discussion)). Mo??na nazwa?? go zestawem standard??w dotycz??cych tworzenia API (mimo ??e sam w sobie nie jest ustandardyzowany).

Klient wysy??a do serwera zapytanie na odpowiedni adres URI (z odpowiedni?? metod?? HTTP), a ten odpowiada reprezentacj?? ????danego zasobu (przekazuj??c j?? za pomoc?? JSON lub XML).

REST opiera si?? na architekturze klient-serwer i jest bezstanowy - ka??de ????danie jest niezale??ne od poprzednich i mo??e by?? obs??u??one bez zapami??tania poprzednich (klient musi poda?? informacje o sesji).

RESTful API sk??ada si?? z poni??szych aspekt??w:
- bazowego adresu URI (np. `http://api.example.com/`)
- metod HTTP (GET, POST, PUT, DELETE)
- formatu pliku (JSON, XML itd.)

Zamierzone wykorzystanie metod HTTP w RESTful API to:
- GET: zdob??d?? reprezentacj?? statusu zasobu
- POST: pozw??l zasobowi docelowemu przetworzy?? reprezentacj?? podan?? w ????daniu (stw??rz zas??b)
- PUT: stw??rz lub zast??p stan zasobu docelowego reprezentacj?? podan?? w ????daniu
- DELETE: usu?? stan zasobu docelowego

Metoda GET jest *safe* - wykorzystanie jej na zasobie go nie zmienia. Metody GET, PUT i DELETE s?? *idempotent* - wykonanie ich kilka razy skutkuje tym samym co wykonanie ich raz. Metody GET i POST s?? *cacheable* - odpowiedzi z nich mog?? zosta?? zachowane do dalszego u??ytku.

### CRUD
**CRUD** - **C**reate, **R**ead, **U**pdate and **D**elete - cztery podstawowe operacje na zasobie. Mapuj?? do poni??szych metod HTTP:
- Create - POST (technicznie rzecz bior??c PUT, ale wszystkie materia??y korzystaj?? z POST, ??eby odr????ni?? Create od Update - to tylko kwestia konwencji)
- Read - GET
- Update - PUT
- Delete - DELETE

---
## ==Z2.3== Express.js
Express.js jest minimalistycznym, otwartym, prostym w u??yciu frameworkiem webowym dla Node.js. ([??r??d??o](https://expressjs.com/))

Upraszcza tworzenie serwera HTTP w por??wnaniu z wbudowanym w Node.js modu??em `http`.

Najprostsza mo??liwa aplikacja Express to:
```JavaScript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Tworzy serwer na porcie 3000 i odpowiada na ????dania GET wys??ane na URL `/` za pomoc?? "Hello World!", a dla ka??dej innej ??cie??ki odpowiada b????dem 404 Not Found.

---
## ==Z2.4== Middleware?? - zasada dzia??ania, zastosowanie w projekcie
### Definicja middleware
**Middleware** to funkcje, kt??re maj?? dost??p do obiekt??w `req`, `res` i `next`. Funkcja `next` jest funkcj??, kt??ra wykonuje kolejny middleware. ([??r??d??o](https://expressjs.com/en/guide/writing-middleware.html))

Middleware mo??e:
- wykona?? dowolny kod
- modyfikowa?? obiekty `req` i `res`
- zako??czy?? obs??ug?? ????dania
- wywo??a?? kolejny middleware

### Tworzenie middleware
Aby stworzy?? middleware definiujemy funkcj?? z dost??pem do `req`, `res`, `next`:
```JavaScript
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

Mo??emy stworzy?? konfigurowalny middleware za pomoc?? funkcji wy??szego rz??du:
```JavaScript
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

### U??ycie middleware
Mo??emy przypisa?? middleware na poziomie aplikacji wykorzystuj??c funkcje `app.use()` oraz `app.METHOD()`. Kolejno???? dodania middleware ma znaczenie - te kt??re s?? dodane wcze??niej b??d?? wywo??ane wcze??niej przy obs??udze ????dania.

Przyk??ady argumentu `path`:
```JavaScript
// Brak ??cie??ki - wywo??ane przy KA??DYM ????daniu w aplikacji
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// Podana ??cie??ka - wywo??ane dla ??cie??ek ZACZYNAJ??CYCH SI?? od /abcd
app.use('/abcd', function (req, res, next) {
  next()
})

// Kilka ??cie??ek - wywo??ane dla ZACZYNAJ??CYCH SI?? od /abcd, /xyza, /lmn, /pqr
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next()
})
```

Przyk??ady dodania middleware:
```JavaScript
// Pojedynczy, zadeklarowany lokalnie middleware
app.use(function (req, res, next) {
  next()
})

// Router to poprawny middleware
var router = express.Router()
router.get('/', function (req, res, next) {
  next()
})
app.use(router)

// Aplikacja Express to poprawny middleware
var subApp = express()
subApp.get('/', function (req, res, next) {
  next()
})
app.use(subApp)

// Middleware tylko dla danej metody HTTP
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})

// Kilka middleware dodanych na raz
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// Kilka middleware przekazanych przez tablic??
app.get('/user/:id', [logOriginalUrl, logMethod], function (req, res, next) {
  res.send('User Info')
})
```

Middleware mo??na te?? doda?? do routera w analogiczny spos??b.

### Error-handling middleware
Middleware, kt??re obs??uguj?? b????dy zawsze maj?? **cztery** argumenty. Musimy zdefiniowa?? cztery argumenty, nawet je??li nie korzystamy z `next`. Wtedy, pierwszym argumentem jest b????d:
```JavaScript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Express wy??apuje b????dy wyrzucone w kodzie synchronicznym w route handlerach i middleware. Mo??emy do niego przekaza?? b????d z innego ??r??d??a wywo??uj??c `next(error)`. Zaczynaj??c od Express 5, middleware i handlery, kt??re zwracaj?? `Promise` automatycznie wywo??uj?? `next(value)` kiedy s?? wywo??uje si?? na nich `reject`. Kiedy podajemy do `next()` dowoln?? warto???? (inn?? ni?? `"route"`), to dane ????danie ko??czy si?? b????dem i pomijamy wszystkie pozosta??e middleware, kt??re nie maj?? czterech argument??w. Standardowo, po wszystkich middleware jest dodany domy??lny error handler.

### Wbudowane middleware
Express zawiera wbudowane middleware, sa nimi `express.static` - do hostowania zasob??w statycznych jak HTML, zdj??cia itd. oraz body parsing middleware, np. `express.json`. Cz??sto do logowania wykorzystywana jest biblioteka `morgan` zapewniaj??ca middleware loguj??cy: `app.use(morgan('dev'))`.

### `app.param`
Metoda `app.param` pozwala doda?? callback wywo??any **przed wszystkimi handlerami** dla ??cie??ek zawieraj??cych dany parametr (lub parametry), np.:
```JavaScript
app.param('user', function (req, res, next, id) {
  // try to get the user details from the User model and attach it to the request object
  User.find(id, function (err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})
```

---
## ==Z2.5== Znaczenie poszczeg??lnych status??w zwracanych z API
Dost??pne na [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). Poni??ej wa??niejsze:
### 100-199 - Informacja
- 100 - Continue
- 101 - Switching Protocols
- 102 - Processing
- 103 - Early Hints

### 200-299 - Sukces
- 200 - OK
- 201 - Created
- 202 - Accepted

### 300-399 - Przekierowanie
- 300 - Multiple Choice
- 301 - Moved Permanently
- 302 - Found
- 303 - See Other
- 304 - Not Modified
- 307 - Temporary Redirect
- 308 - Permanent Redirect

### 400-499 - B????d klienta
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found

### 500-599 - B????d serwera
- 500 - Internal Server Error
- 501 - Not Implemented
- 502 - Bad Gateway
- 503 - Service Unavailable

---
## ==Z2.6== Obs??uga parametr??w oraz cia??a zapytania
### Obs??uga parametr??w
Specyfikuj??c path dla danego route, mo??emy podzbioru wyra??e?? regularnych: znak??w `?`, `+`, `*`, `()`. Opr??cz tego, do route mo??emy poda?? parametry, czyli nazwane segmenty URL, przechwytuj??ce przekazane tam warto??ci. Przechwycone warto??ci dodawane s?? do obiektu `req.params` z odpowiednim kluczem, np.:
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

### Obs??uga cia??a zapytania
Obiekt `req.body` zawiera pary klucz-warto???? danych przekazanych w ciele zapytania. Standardowo jest on `undefined` i musi zosta?? wype??niony za pomoc?? *body-parsing middleware*, takich jak `express.json()` lub `express.urlencoded()`:
- `express.urlencoded({ extended: true })` - parsuje dane typu `application/x-www-form-urlencoded`, np. przekazane w POST, kiedy submitujemy `<form>`
- `express.json()` - parsuje dane typu `application/json`
- `express.raw()` - parsuje ca??e cia??o do `Buffer`a
- `express.text()` - parsuje ca??e cia??o do stringa

Wszystkie te wbudowane middleware bazuj?? na bibliotece `body-parser` (kt??ra kiedy?? by??a wymagana a teraz jest "wbudowana" w Express).

---
## ==Z2.7== Tworzenie endpoint??w oraz obs??uga zapyta??
### Tworzenie route
*Route* (czyli kombinacj?? adresu URI oraz metody HTTP) definiujemy nast??puj??co (przy czym ka??dy route mo??e mie?? jeden lub wi??cej handler):
```JavaScript
app.METHOD(PATH, HANDLER)
```

Przyk??adem takiej prostej definicji jest:
```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

Mo??emy te?? skorzysta?? z `app.all()`, aby dopasowa?? wszystkie metody HTTP dla danego URI, oraz `app.use()` aby doda?? middleware.

Do jednego route mo??emy poda?? kilka funkcji. Wtedy warto wykorzysta?? trzeci argument handlera - `next`, kt??ry pozwala przej???? do kolejnego handlera:
```javascript
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// Lub tablica funkcji:
app.get('/example/c', [cb0, cb1, cb2])

// Lub ich kombinacja:
app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

### W??a??ciwo??ci `Request`
Opr??cz tego, do `req` i `res` mo??emy doda?? w??asne w??asciwo??ci.
- `.body` - puste bez u??ycia `express.json()` / `express.urlencoded()`
- `.cookies` - obiekt z ciasteczkami wys??anymi przez klienta
- `.ip` - IP klienta
- `.method` - metoda HTTP ????dania
- `.params` - zawiera parametry route wyci??gni??te ze ??cie??ki

### Metody `Response`
#### Modyfikuj??ce
Te metody zmieniaj?? obiekt `res` i to co zostanie odes??ane do klienta, ale nic do niego jeszcze nie wysy??aj??.
- `.append()` - dodaje header HTTP do odpowiedzi
- `.cookie()` - ustawia header `Set-Cookie` z danym ciasteczkiem
- `.get()` - pobiera warto???? nag??owka HTTP
- `.set()` - ustawia header HTTP
- `.status()` - ustawia kod statusu HTTP
- `.type()` - ustawia typ odpowiedzi (np. `application/json`)

#### Terminuj??ce
Te metody wysy??aj?? odpowied?? do klienta i terminuj?? cykl ????danie-odpowied??. Je??li ??adna z tych metod nie zostanie wywo??ana klient b??dzie ci??gle czeka?? na odpowied?? (strona si?? "zawiesi").
- `.download()` - dodaje plik jako za????cznik do odpowiedzi (pobranie pliku przez klienta)
- `.end()` - wysy??a odpowied?? bez ??adnych danych (aby doda?? dane u??yj `.send()`/`.json()`)
- `.json()` - wysy??a odpowied?? JSON
- `.jsonp()` - wysy??a odpowied?? JSONP
- `.redirect()` - przekierowuje u??ytkownika na inn?? stron??
- `.render()` - wysy??a string HTML z podstawieniem warto??ci w szablonach
- `.send()` - wysy??a odpowied?? (dopasowuje typ do argumentu: `Buffer`, string, obiekt)
- `.sendFile()` - wysy??a plik jako odpowied??
- `.sendStatus()` - wysy??a odpowied?? z danym statusem

---
## ==Z2.8== Mechanizm CORS
**CORS** - Cross-Origin Resource Sharing - mechanizm pozwalaj??cy przegl??darce pobra?? dane ze strony o innym originie (*origin* okre??lany jest jako tr??jka protok????, host, port). Pozwala rozlu??ni?? dodawane do przegl??darek zabezpieczenie **SOP** - Same-Origin Policy, kt??re ogranicza requesty do innych origin??w (*cross-origin request*).

Serwer odpowiadaj??c na cross-origin request dodaje header `Access-Control-Allow-Origin`, kt??ry musi si?? zgadza?? z headerem `Origin` ????dania (lub mo??e by?? r??wny `*` co pozwala na request z ka??dego URL). Je??li te headery nie b??d?? si?? zgadza??, przegl??darka nie dopu??ci klienta do zasobu.

W Expressie mo??emy doda?? obs??ug?? CORS za pomoc?? biblioteki `cors` udost??pniajacej middleware:
```JavaScript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://foo.com' }));
```

Requesty PUT, PATCH, DELETE i niestandardowe musz?? przej???? *preflight* - przegl??darka automatycznie wysy??a najpierw request OPTION, na kt??ry serwer odpowiada headerami:`Access-Control-Allow-Origin` oraz `Access-Control-Allow-Methods`. Preflight mo??na cache'owa?? za pomoc?? `Access-Control-Max-Age`.

Powodem do dodania obs??ugi CORS do aplikacji jest np. to, ??e klient i serwer znajduj?? si?? pod r????nymi adresami URL.

---
## ==Z3.1== Bazy danych typu NoSQL ??? cechy charakterystyczne, w??a??ciwo??ci
Bazy danych **NoSQL** to bazy, kt??re przechowuj?? dane za pomoc?? innych modeli ni?? bazy relacyjne, czyli nie w tabelach. ([??r??d??o](https://www.mongodb.com/nosql-explained))

Istnieje wiele r????nych typ??w baz NoSQL, g????wne to:
- *document* (np. **MongoDB**, Firestore)
- *key-value* (np. Redis)
- *wide-column* (np. Cassandra, Apache HBase)
- *graph* (np. Neo4j)

Ka??da baza NoSQL ma inne unikalne w??a??ciwo??ci, natomiast wi??kszo???? z nich ma nast??puj??ce:
- elastyczne schematy (np. w MongoDB dokumenty w kolekcji mog?? mie?? r????n?? struktur??)
- skalowanie horyzontalne (podzia?? na kilka serwer??w)
- szybkie kwerendy (dzi??ki u??ytym strukturom danych)
- ??atwe do u??ytku dla developera

Cechy MongoDB:
- przechowuje dane w nie-relacyjnych dokumentach (kt??re przechowuje w kolekcjach)
- otwarta i utrzymywana przez wielk?? firm??
- wiele dost??pnych hosting??w
- nie jest idealna do wszystkiego

---
## ==Z3.2== Podstawowe operacje na bazie MongoDB
### Po????czenie z baz??
```JavaScript
// Wersja z zdarzeniami
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => console.log('Connected to Database'))

// Wersja async/await
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
```

### CRUD
- C - `model.create()`, `new model()`
- R - `model.find()`, `model.findOne()`, `model.findById()`
- U - `model.update()`, `model.findByIdAndUpdate()`, `model.findOneAndUpdate()`
- D - `model.remove()`, `model.findByIdAndUpdate()`, `model.findOneAndRemove()`

---
## ==Z3.3== Tworzenie zale??no??ci pomi??dzy danymi w bazie danych typu NoSQL
(pytanie dotyczy baz typu NoSQL - nie jest doprecyzowane, bo w ka??dej b??dzie si?? to robi??o inaczej, np. w grafowej dodaj??c kraw??dzie mi??dzy wierzcho??kami, ale raczej chodzi o baz?? MongoDB)

```JavaScript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  name: String,
});

const storySchema = Schema({
  author: {
    type: Schema.Types.ObjectId, /* albo SchemaTypes - bez kropki */
    ref: 'Person', /* nazwa modelu */
  },
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
```

---
## ==Z3.4== Modele w Mongoose ??? tworzenie, wykorzystanie

---
## ==Z3.5== Schematy w Mongoose - tworzenie, wykorzystanie

---
## ==Z3.6== Zmienne ??rodowiskowe ??? definicja, gdzie nale??y je doda??, jakie zmienne powinni??my uzna?? jako ??rodowiskowe

---
## ==Z3.7== Serwis, kontroler, model ??? charakterystyka, zastosowanie, rola w aplikacjach serwerowych

---
## ==Z3.8== Walidacja danych przesy??anych w zapytaniu

---
## ==Z4.1== Uwierzytelnianie ??? definicja, zastosowanie

---
## ==Z4.2== Autoryzacja ??? definicja, zastosowanie

---
## ==Z4.3== JWT ??? co to jest, z jakich cz????ci si?? sk??ada, do czego jest wykorzystywany

---
## ==Z4.4== Biblioteka Passport.js ??? do czego jest wykorzystywana, podstawowe w??a??ciwo??ci, strategie (co to jest, do czego s??u????)

---
## ==Z4.5== R????nice pomi??dzy autoryzacj?? z u??yciem sesji a autoryzacj?? z u??yciem tokena

---
## ==Z4.6== Access token, refresh token ??? zasada dzia??ania

---
