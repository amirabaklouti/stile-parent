// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const serverRootUrl = "http://192.168.1.80:8080"; 
//const serverRootUrl =  "https://de7e-196-224-34-150.eu.ngrok.io"

const serverRootUrl = "http://localhost:8080"; 

//const serverRootUrl = "http://stile.iovision.io"; 

const AiUrl =  "http://192.168.3.83:9090";

export const environment = {
  Path : `${serverRootUrl}/api`,
  AiPath : `${AiUrl}`,
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
