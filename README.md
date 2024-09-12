## CountryInfo
CountryInfo is a website where you can find out the information about countries' and their holidays
### Technologies and tools

This project was created using the following technologies:
- `Angular (v. 18.2)`
- `Node (v. 20.16)`
- `TypeScript (v. 5.5)`

### Features and architecture
This project consists of a standalone `AppComponent` and a `HomeModule` that contains the following three components:
- `BaseComponent` - a basic component that contains a `HeaderComponent` and children `HomeComponent` and `CountryInfoComponent` with the routing configured for them
- `HeaderComponent` - contains the website logo and its name. When you click on the site name and logo fields, you are redirected to the home page of the site.
- `HomeComponent` - contains a table with a list of all available countries and a search field for dynamic table filtering. It also contains widgets that display information about the nearest holiday of random three countries.
- `CountryInfoComponent` - contains a list of all holidays of the selected year (by default, the current year) and a navigation bar for selecting the year of viewing the holiday

### Routing
- ```http://localhost:4200/countries``` - main page
- ```http://localhost:4200/countries/:countryCode``` - country info page, where `countryCode` is a code of selected country

### Startup
First of all, you need to add an `.env` file to the project root folder with the following content (the default values are shown below):
```
  API_URL=https://date.nager.at/api/v3
  NUMBER_OF_COUNTRIES_ON_WIDGET=3
  PAGINATION_START_YEAR=2020
  PAGINATION_END_YEAR=2030
  DEFAULT_COUNTRY_HOLIDAYS_YEAR=2024
```
Next, if you use Google Chrome to run the project, you need to install the [FlagEmoji extension](https://chromewebstore.google.com/detail/flagmoji/bnnhpohpnamnjhajbkgpmblleljodlhd?pli=1). This is necessary for flag emojis to be displayed correctly on project pages.

To run the project, you need to have `NodeJS`, `npm` and `AngularCLI` installed. Then you need to run the following commands in your terminal (in project root directory):

```
npm i
ng serve
```

After launching the project, go to the main page of the site here:

```
http://localhost:4200/countries
```
To start ESLint, run the following command:
```
ng lint
```
To start Prettier, run the following command:
```
prettier . --write
```

## Preview
![main page](/preview-images/main-page.png)
![main page search](/preview-images/main-page-search.png)
![country info page](/preview-images/country-info-page.png)
