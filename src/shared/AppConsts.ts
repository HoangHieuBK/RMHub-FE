export class AppConsts {

    static api: {
        baseUrl: string,
        baseUrlToken: string,
        baseUrlSocket: string,
        serverDevice: string,
        serverTraffic: string,
        serverWeather: string
    };

    static readonly page = {
        login: '/login',
        pageNotFound: '/page-not-found'
    };

    static readonly paths = {
        imagesRoot: '/assets/images/',
        iconRoot: '/assets/icon/',
        userImageFolder: '/assets/images/users/'
    };

    static readonly localization = {
        languages: [
            {
                code: 'hu',
                lang: '2',
                name: 'Hungarian ',
                culture: 'hu-HU',
                flag: 'famfamfam-flag-hu'
            },
            {
                code: 'en',
                lang: '1',
                name: 'English',
                culture: 'en-EN',
                flag: 'famfamfam-flag-gb'
            }
        ],
        defaultLanguage: 'en'
    };

    static readonly notifications = {
        options: {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            position: ['top', 'right'],
            theClass: 'sy-notification'
        },
        unauthorizedEndpoints: ['api/v1/right'],
        notFoundEndpoints: ['connect/token', 'api/v1/device']
    };

    static readonly tokens = {
        client_id: 'webclient.ro',
        client_secret: 'EA59A39A-B03D-4985-A4FA-9297663A1858',
        grant_type: 'password',
        scope: 'api'
    };
    static map: {
        defaultMaxZoom: number,
        coordinateView: any[],
        apiKey: string,
        radiusCircle: {
            weather: number,
            traffic: number
        },
        showIconTraffic: boolean,
        urlTileLayer: string,
        urlRoute: string,
        attribution: string
    };
}
