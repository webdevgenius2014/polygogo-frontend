export const plateformsList = (googleconected?:boolean, facebookconnected?:boolean ) => {
    const plateforms= [{
        "plateforms": [
            {
                "id":1,
                "name":"google",       
                "icon":{ "image": "/dashboard/icons/google.svg", "alt":"google"},
                "plateformOptions":{
                    "modalTitle":"Google",
                    "buttonLabel":"Sign In with Google My Business"                
                },
                "connected":googleconected?true:false
            },
            {
                "id": 2,
                "name": "facebook",
                "icon":{ "image": "/dashboard/icons/faceboook.svg", "alt":"faceboook"},
                "plateformOptions":{
                    "modalTitle":"Facebook",
                    "buttonLabel":"Sign In with Facebook My Business"                   
                },
                "connected":facebookconnected?true:false
            },
            // {
            //     "id":3,
            //     "name":"glassdoor",
            //     "icon":{ "image":"/dashboard/icons/glassdoor.svg", "alt":"glassdoor"},
            //     "plateformOptions":{
            //         "modalTitle":"Glassdoor",
            //         "buttonLabel":"Sign In with Glassdoor My Business"
            //     },
            //     "connected":false
            // }
        ]
    }];
    return plateforms;    
}