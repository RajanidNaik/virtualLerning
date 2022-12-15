// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {

//   constructor(private http:HttpClient) {
//    }
//    url ='http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/';

// dashHeader(){
//     let token = sessionStorage.getItem('token');
//     console.log(token);
//     var headers_object = new HttpHeaders().set(
//       'Authorization',
//       'Bearer' +
//         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWVsYW4uZWVlLnJ5bWVjQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTY3MTEwMDI3MCwiaWF0IjoxNjcxMDkxMjcwfQ.KPKvuLyFc6c26cQrVK3p8szn12mdwBYhg1wPXXaFSTEDLDO4mYrphgW3tzmEQu2AEG-LNecWejLzjgmJAurFsQ'
//     );
    
//     return this.http.get(this.url+'dashBoard/header',{headers:headers_object,responseType: 'text'}); 
    
// }



//   }
