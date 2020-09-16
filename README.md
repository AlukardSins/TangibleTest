# Para poder ejecutar
## Instalar dependencias
> `npm install`

## Se debe crear el archivo de configuracion
> `src/app/enviroment/config.ts`

### El cual debe estar de la siguiente manera

> ```
> export const Enviroment = {
>   production: false,
>   firebaseConfig: {
>     apiKey: 'XXXXXXXXXX',
>     authDomain: 'XXXXXXXXXX',
>     databaseURL: 'XXXXXXXXXX',
>     projectId: 'XXXXXXXXXX',
>     storageBucket: 'XXXXXXXXXX',
>     messagingSenderId: 'XXXXXXXXXX',
>     appId: 'XXXXXXXXXX'
>   }
> }
> ```

### Todo esto lo provee el propio Firebase al momento de crear una aplicacion

### Para esta aplicacion se requiere de:
> #### Cloud Firestore
> #### Storage
