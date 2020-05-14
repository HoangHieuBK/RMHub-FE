import { NotifierOptions } from 'angular-notifier';

export class CommonConstant {
    public static location = 'Hang Bong, Hanoi, 04084';
    public static CurrentLangCulture = 'currentLang.Culture';
    public static DeCH = 'de-CH';
    public static institutionRequiredMessage = 'Das Feld \'Institution\' darf nicht leer bleiben !';
    public static nameRequiredMessage = 'Das Feld \'Name\' darf nicht leer bleiben !';
    public static idNewRow = 99999999999;

    public static DeleteBtn = 'deleteMenuItemTopGrd';
    public static GridSettingBtn = 'gridSetting';
    public static GridIsGrouping = 'isGrouping';
    public static GridIsSearch = 'isSearch';
    public static ListFullToolbarButtons = ['chooserColumn', 'exportExcel', 'printPdf'];
    public static isFilterBuilder = 'isFilterBuilder';
    public static LocalStorageUserId = 'user:userId';
    public static LocalStorageUserFirstName = 'user:firstName';
    public static LocalStorageUserLastName = 'user:lastName';
    public static LocalStorageToogleNavbar = 'settings:toogleNavbar';
    public static LocalStorageUser = 'user';
    public static FormatNumber = '#,###.00';
    public static FormatNumberN2 = '#,##0.00';
    public static FormatNumberN3 = '$ #,##0.00';
    public static FormatNumberAllowDelete = '#,###';
    public static FormatNumberExport = '#0.00';
    public static FormatNumberRequire = '#,##0';
    public static FormatNumberInteger = '#0';
    public static FormatNumberLength = 20;
    public static ButtonExportExcel = 'exportExcel';
    public static ButtonPrintPdf = 'printPdf';
    public static ButtonColumnChooser = 'chooserColumn';
    public static ButtonGridSetting = 'gridSetting';
    public static ButtonGridDelete = 'deleteMenuItemTopGrd';
    public static ButtonDeleteSelectedRecord = 'delete';
    public static ButtonClosePopup = 'closePopup';
    public static EventClickTitle = 'headerClicked';
    public static EventDoubleClickTitle = 'headerDblClicked';
    public static EventShiftDoubleClickTitle = 'headerShiftDblClicked';

    public static LocalStorageCurrentLang = 'currentLang.Culture';
    public static LocalStorageDefaultLang = 'en-EN';
    public static Languages = {en: 'en', hu: 'hu'};

    // set time out
    public static SetTimeOut = 100;
    public static SetTimeOut300 = 300;
    public static SetTimeOut400 = 400;
    public static SetTimeOut500 = 500;
    public static SetTimeOut900 = 900;
    public static SetTimeOut1000 = 1000;
    public static TwoMinutes = 2 * 60 * 1000;
    public static FiveMinutes = 5 * 60 * 1000;

    public static LanguageCode = 'languageCode';
    public static DefaltLanguageCode = 1;

    // key concurrency
    public static Concurrency = 'concurrency';

    // Kurs Form
    public static INT_MIN_VALUE = -2147483648;
    public static INT_MAX_VALUE = 2147483647;
    public static STRING_MAX_LENGTH = 100;
    public static FIX_WIDTH = 160;
    public static STRING_MAX_LENGTH_50 = 50;
    public static STRING_MAX_LENGTH_2000 = 2000;
    // number length
    public static DECIMA_SIZE = 3;
    public static MAX_LENGTH_NUMBER = 30;

    // date value
    public static DATE_MIN_FULLYEAR = 1753;
    public static DATE_MAX_FULLYEAR = 9999;
    public static DATE_MIN_MONTH = 1;
    public static DATE_MAX_MONTH = 12;
    // Grouping
    public static MenuGroupingHeaderGrid = ['Nach dieser Spalte gruppieren', 'Alle Gruppierung entfernen', 'Spalte ausblenden'];
    public static MenuGroupingContentGrid = ['Gruppierung entfernen', 'Alle Gruppierungen entfernen', 'Alle Gruppen erweitern', 'Alle Gruppen reduzieren'];

    // Icon for button C007
    public static IconAdd = 'assets/icon/ic_neue.png';
    public static IconEdit = 'assets/icon/ic_bearbeiten.png';
    public static IconSave = 'assets/icon/ic_speichern.png';
    public static IconCancel = 'assets/icon/ic_abbrechen.png';

    // Screen resolution
    public static SMALL_SCREEN_WIDTH = 960;
    public static SMALL_SCREEN_HEIGHT = 960;

    // Popup position
    public static POSITION_CENTER = 'center';
    public static POSITION_TOP = 'top';
    public static POSITION_BOTTOM = 'bottom';
    public static WidthNumberAndDateBox = '160px';
    public static FORMAT_DATE = 'dd.MM.yyyy';
    public static FORMAT_DATE_MMM_YYYY = 'MMM yyyy';
    public static SCREEN_RESOLUTION_LARGE = 1300;
    public static FORMAT_DATE_MM_DD_YYYY = 'MM/DD/YYYY';
    public static FORMAT_DATE_DD_MM_YYYY = 'DD.MM.YYYY';
    public static FORMAT_DATE_EXPORT = 'DD.MM.YYYY';
    public static DD_MM_YYYY_FORMAT_DATE = 'DD-MM-YYYY';
    public static shortDateFormat = 'MMMM yyyy';
    public static FORMAT_DATE_PRINT = 'DD.MM.YY h.m A';

    public static DATE_FORMAT = {
        MM_dd_yyyy: 'MM.dd.yyyy',
        dd_MM_yyyy: 'dd.MM.yyyy',
        yyyy_MM_dd: 'yyyy-MM-dd',
        YYYY_MM_DD: 'YYYY MM DD',
        MMMM_yyyy: 'MMMM yyyy'
    };

    public static MIN_DATE = new Date(1753, 0, 1);
    public static MAX_DATE = new Date(9999, 11, 31);
    public static MAX_FILE_SIZE = 20971520;
    public static FORMAT_NUMBER = '^[0-9]{0,}$';
    // J007
    public static FIX_WIDTH_DATE_BOX = 180;

    // Money type
    public static MONEY_MIN_VALUE = -922337203685477;
    public static MONEY_MAX_VALUE = 922337203685477;

    // LeftMenuWidth
    public static LeftMenuWidth = 424;

    // config pagination
    public static CONFIG_PAGINATION = {
        currentPage: 1,
        itemsPerPage: 10,
        beginItemPerPage: 1,
        endItemPerPage: 10
    };

    public static EMPTY_RECORD = 0;

    public static DEFAULT_FIELD_SORT = 'id';

    /*txt popup*/
    public static TXT_POPUP_DELETE = {
        type: 1,
        title1: 'Confirm-Popup.title_device',
        title2: 'Confirm-Popup.title_alert',
        id: 'popupDelete',
        content1: 'Confirm-Popup.content_device',
        content2: 'Confirm-Popup.content_alert',
        textYes: 'Confirm-Popup.textYes',
        textNo: 'Confirm-Popup.textNo',
    };

    /*txt popup*/
    public static TXT_POPUP_ALERT = {
        type: 3,
        title: 'Traffic.Alert-Popup.title',
        id: 'alertPopUp',
        id_sync: 'alertSync',
        content: 'Traffic.Alert-Popup.content',
        content_sync: 'Traffic.Alert-Popup.content-sync',
        textYes: 'Traffic.Alert-Popup.textYes',
        textNo: ''
    };

    public static ACTION_SUBMIT_DATA = {
        create: 'create',
        edit: 'edit'
    };

    public static typeNotification = 'success';
    public static errorNotification = 'error';

    public static infoNotification = 'Delete Successfully';


    // url weather station
    public static URL_WEATHER_STATION = {
        list: 'weather-station/devices',
        detail: 'weather-station/devices/detail',
        alert: 'weather-station/alert-setting'
    };

    // url traffic logger
    public static URL_TRAFFIC_LOGGER = {
        list: 'traffic-logger/devices',
        add: 'traffic-logger/devices/add',
        edit: 'traffic-logger/devices/edit',
        detail: 'traffic-logger/devices/detail',
        alert: 'traffic-logger/alert',
        report: 'traffic-logger/report'
    };

    public static STATUS_OF_TL_MAP = ['SlowTraffic', 'TrafficJam', 'Error', 'Disconnect'];
    public static URL_PROJECT = {
        map: 'map'

    };

    public static RECORD_OF_A_PAGE = [5, 10, 15, 20];
    public static LOADING_EFFECT = 30000;
    public static ROAD_ID_DEFAULT = 'm44';
    public static LOCATION = [
        {
            id: 'm44',
            name: 'Map.Location.m44_highway'
        },
    ];
    public static CODE_LOCATION_DEFAULT = 'm44';


    public static LANGUAGE = [
        {
            code: 'en',
            name: 'English',
            img: '../../../assets/img/english.png'
        },
        {
            code: 'hu',
            name: 'Hungary',
            img: '../../../assets/img/hungary-flag.png'
        }
    ];

    public static CURRENT_LANGUAGE = {
        code: 'en',
        name: 'English',
        img: '../../../assets/img/english.png'
    };

    public static TITLE_ROAD_OF_MAP = {
        m44: 'Map.map_menu.m44'
    };
    public static TitleTapAllMap = 'all';

    public static TITLE_TAP_MAP = {
        map: {
            type: CommonConstant.TitleTapAllMap,
            name: CommonConstant.TITLE_ROAD_OF_MAP[CommonConstant.ROAD_ID_DEFAULT]
        },
        traffic: {
            type: 'traffic',
            name: 'Map.map_menu.traffic',
            deviceType: 2
        },
        weather: {
            type: 'weather',
            name: 'Map.map_menu.weather',
            deviceType: 1
        },

    };

    public static Validators_Type = ['required', 'pattern', 'maxlength', 'min', 'max'];

    public static COLOR_ALERT = ['#A90B00', '#C1392D', '#E94C3D', '#D55204', '#E77F20'];

    public static CONDITION_ALERT = [
        { id: 1, condition: '>=' },
        { id: 2, condition: '<=' },
        { id: 3, condition: '=' },
    ];

    public static SPEED_LIMITED = [60, 80, 100, 120, 160];

    public static ALERT_CODES = [
        { no: 1, code: 'ALR_WIND_LEVEL1' },
        { no: 2, code: 'ALR_WIND_LEVEL2' },
        { no: 3, code: 'ALR_ES_LVL1_WET_TRANSITIONAL' },
        { no: 4, code: 'ALR_ES_LVL2_HUMID' },
        { no: 5, code: 'ALR_ES_LVL3_WET' },
        { no: 6, code: 'ALR_ES_LVL4_STREAMING_RAIN' },
        { no: 7, code: 'ALR_ES_LVL5_WHITE_FROZEN' },
        { no: 8, code: 'ALR_ES_LVL6_FROSTY' },
        { no: 9, code: 'ALR_ES_LVL7_ICY' },
        { no: 10, code: 'ALR_ES_LVL8_SLEET' },
        { no: 11, code: 'ALR_ES_LVL9_HAILED' },
        { no: 12, code: 'ALR_ES_LVL10_FRESH_SNOW' },
        { no: 13, code: 'ALR_ES_LVL11_MELTING_SNOW' },
        { no: 14, code: 'ALR_ES_LVL12_PACKED_SNOW' },
        { no: 15, code: 'ALR_ES_LVL13_ICE_FROZEN' },
        { no: 16, code: 'ALR_ES_LVL14_FROZEN_SNOW' },
        { no: 17, code: 'ALR_ES_LVL15_GRANULAR_SNOW' },
        { no: 18, code: 'ALR_ES_LVL16_SNOWDRIFTS' }
    ];

    public static ALERT_CODE_WIND = ['ALR_WIND_LEVEL1', 'ALR_WIND_LEVEL2'];

    public static ICON_DEVICE = {
        weather: [
            '/assets/icon/weather/icon_inactive.png',
            '/assets/icon/weather/icon_active.png',
            '/assets/icon/weather/icon_technical-issue.png'
        ],
        traffic : '/assets/icon/traffic/icon_active.png'
    };
    public static COORDINATE_ROAD = {
        'm44': [
            {
                'lat': 46.878917,
                'long': 19.711323
            },
            {
                'lat': 46.631253,
                'long': 21.328699
            }
        ]
    };

    public static CONFIG_NOTIFIER: NotifierOptions = {
        position: {
            horizontal: {
                position: 'right',
                distance: 12
            },
            vertical: {
                position: 'top',
                distance: 60,
                gap: 10
            }
        },
        theme: 'material',
        behaviour: {
            autoHide: 3000,
            onClick: 'hide',
            onMouseover: 'pauseAutoHide',
            showDismissButton: true,
            stacking: 4
        },
        animations: {
            enabled: true,
            show: {
                preset: 'slide',
                speed: 300,
                easing: 'ease'
            },
            hide: {
                preset: 'fade',
                speed: 300,
                easing: 'ease',
                offset: 50
            },
            shift: {
                speed: 300,
                easing: 'ease'
            },
            overlap: 150
        }
    };

    public static ALERT_LEVELS = [1, 2, 3, 4, 5];

    public static MAPPING_WS_ALERT_VALUE = [
        { alertCode: 'ALR_WIND_LEVEL1', content: 'Weather-Station.Alert.Alert_Content.ALR_WIND_LEVEL1'},
        { alertCode: 'ALR_WIND_LEVEL2', content: 'Weather-Station.Alert.Alert_Content.ALR_WIND_LEVEL2' },
        { alertCode: 'ALR_ES_LVL1_WET_TRANSITIONAL', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL1_WET_TRANSITIONAL' },
        { alertCode: 'ALR_ES_LVL2_HUMID', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL2_HUMID' },
        { alertCode: 'ALR_ES_LVL3_WET', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL3_WET' },
        { alertCode: 'ALR_ES_LVL4_STREAMING_RAIN', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL4_STREAMING_RAIN' },
        { alertCode: 'ALR_ES_LVL5_WHITE_FROZEN', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL5_WHITE_FROZEN' },
        { alertCode: 'ALR_ES_LVL6_FROSTY', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL6_FROSTY' },
        { alertCode: 'ALR_ES_LVL7_ICY', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL7_ICY' },
        { alertCode: 'ALR_ES_LVL8_SLEET', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL8_SLEET' },
        { alertCode: 'ALR_ES_LVL9_HAILED', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL9_HAILED' },
        { alertCode: 'ALR_ES_LVL10_FRESH_SNOW', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL10_FRESH_SNOW' },
        { alertCode: 'ALR_ES_LVL11_MELTING_SNOW', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL11_MELTING_SNOW' },
        { alertCode: 'ALR_ES_LVL12_PACKED_SNOW', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL12_PACKED_SNOW' },
        { alertCode: 'ALR_ES_LVL13_ICE_FROZEN', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL13_ICE_FROZEN' },
        { alertCode: 'ALR_ES_LVL14_FROZEN_SNOW', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL14_FROZEN_SNOW' },
        { alertCode: 'ALR_ES_LVL15_GRANULAR_SNOW', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL15_GRANULAR_SNOW' },
        { alertCode: 'ALR_ES_LVL16_SNOWDRIFTS', content: 'Weather-Station.Alert.Alert_Content.ALR_ES_LVL16_SNOWDRIFTS' },
    ];
    public static LINES_COLORS = ['#38AB58', '#38AB58', '#12E34D', '#f80'];
    public static CONSTANT_MAP = {
        maxDistance: 10,
        zoomLevel: {
            firstLevel: 16,
            secondLevel: 15,
            threeLevel: 10
        },
        typeLayer: {
            icon: 'icon',
            alert: 'alert'
        },
        defaultDeviceType: 0,
        defaultColor: '#38AB58',
        api_mapCat: 'http://api.mapcat.com',
        defaultValueMesure: 'N/A',
        codeWindWeather: ['ALR_WIND_LEVEL1', 'ALR_WIND_LEVEL2']
    };
    public static Pattern_TextInput = '^[A-Za-z>=<_%/0123456789# ]{1,}$';
    public static Pattern_Number = '^[0-9]{0,}$';
    public static Pattern_Decimal = /(^[-]{0,1})[0-9]{0,}\.{0,1}[0-9]{1,}$/;
    public static Border_Input_Invalid = '#991414';
    public static MESURE_CONSTANT = {
        'QT': 'flow',
        'VT': 'averageSpeed',
        'TT': 'occupationRate'
    };
    public static LANE_ROAD_CONSTANT = [1, 2];
    public static DEPLOYMENT_ID = 1;
    public static CONSTANT_STORE = {
        mapStore: 'MapStore'
    };

    public static STATUS_RES = {
        Success: 200,
        Accepted: 202,
        Conflict: 409
    };

    public static Class_Custom_Popup = 'custom-popup';

    public static Device_Name_Type = ['WS', 'TS'];

    public static STATUS_DEVICE = ['Inactive', 'Active'];
    public static REGISTRATION_DEVICE = ['Unregistered', 'Registered'];
    public static NA = 'N/A';
    public static MaxMin_Lat = 90;
    public static MaxMin_Long = 180;

    public static Style_Scroll = {
        heightOfTable: 342,
        style: { 'overflow-y': 'scroll', 'overflow-x': 'hidden', 'margin-bottom': '20px' }
    };
    public static FORMAT_DATE_FORM = 'dd/MM/yyyy hh:mm:ss';
    public static MESURE_WEATHER_TYPE_CONSTANT = {
        'default': 0,
        'convert_text': 1,
        'convert_object': 2,
        'convert_multiple': 4
    };
    public static MESURE_WEATHER_CONSTANT = {
        '2/1/tSR/360/Am00': {
            typeData: 0,
            keyObject: 'surfaceTemperature',
            valueConvert: []
        },
        '2/1/kSR/360/Cm00': {
            typeData: 1,
            keyObject: 'surfaceStatus',
            valueConvert: ['MesureDataWeather.surfaceStatus.dry', 'MesureDataWeather.surfaceStatus.wetTransitional', 'MesureDataWeather.surfaceStatus.humid',
                'MesureDataWeather.surfaceStatus.wet', 'MesureDataWeather.surfaceStatus.streamingRain',
                'MesureDataWeather.surfaceStatus.whiteAndFrozen', 'MesureDataWeather.surfaceStatus.frosty', 'MesureDataWeather.surfaceStatus.icy',
                'MesureDataWeather.surfaceStatus.sleet', 'MesureDataWeather.surfaceStatus.hailed',
                'MesureDataWeather.surfaceStatus.freshSnow', 'MesureDataWeather.surfaceStatus.meltingSnow',
                'MesureDataWeather.surfaceStatus.packedSnow', 'MesureDataWeather.surfaceStatus.iceWithFrozenSurface',
                'MesureDataWeather.surfaceStatus.frozenSnow', 'MesureDataWeather.surfaceStatus.granularSnow', 'MesureDataWeather.surfaceStatus.snowdrifts'
            ]
        },
        '2/1/tS1/360/Am00': {
            typeData: 0,
            keyObject: 'freezingTemperature',
            valueConvert: []
        },
        '2/1/HWR/360/Am00': {
            typeData: 0,
            keyObject: 'waterFilmHeight',
            valueConvert: []
        },
        '2/z/tAM/360/Am00': {
            typeData: 0,
            keyObject: 'airTemperature',
            valueConvert: []
        },
        '2/z/uAM/360/Am00': {
            typeData: 0,
            keyObject: 'airHumidity',
            valueConvert: []
        },
        '2/z/tA1/360/Am00': {
            typeData: 0,
            keyObject: 'dewPointTemperature',
            valueConvert: []
        },
        '2/z/hMR/360/Cm00': {
            typeData: 0,
            keyObject: 'precipitationHeight',
            valueConvert: []
        },
        '2/z/sAR/360/Am00': {
            typeData: 0,
            keyObject: 'windSpeedMin',
            valueConvert: []
        },
        '2/z/sAR/360/Xm00': {
            typeData: 0,
            keyObject: 'windSpeedMax',
            valueConvert: []
        },
        '2/z/nMR/360/Cm00': {
            typeData: 1,
            keyObject: 'typeOfPrecipitation',
            valueConvert: ['MesureDataWeather.typeOfPrecipitation.no', 'MesureDataWeather.typeOfPrecipitation.mist',
                'MesureDataWeather.typeOfPrecipitation.drizzle', 'MesureDataWeather.typeOfPrecipitation.rain',
                'MesureDataWeather.typeOfPrecipitation.hail', 'MesureDataWeather.typeOfPrecipitation.sleet',
                'MesureDataWeather.typeOfPrecipitation.meltedPrecipitation', 'MesureDataWeather.typeOfPrecipitation.drySnow',
                'MesureDataWeather.typeOfPrecipitation.moistSnow', 'MesureDataWeather.typeOfPrecipitation.wetSnow'
            ]
        },
        '2/z/kMR/360/Cm00': {
            typeData: 1,
            keyObject: 'intensityOfPrecipitation',
            valueConvert: ['MesureDataWeather.intensityOfPrecipitation.no', 'MesureDataWeather.intensityOfPrecipitation.veryLightRain',
                'MesureDataWeather.intensityOfPrecipitation.light', 'MesureDataWeather.intensityOfPrecipitation.moderateRain',
                'MesureDataWeather.intensityOfPrecipitation.strongRain'
            ]
        },
        '2/z/dAR/360/Am00': {
            typeData: 2,
            keyObject: 'windDirection',
            valueConvert: [
                { 'MesureDataWeather.windDirection.north': [0, 22] },
                { 'MesureDataWeather.windDirection.northEast': [23, 67] },
                { 'MesureDataWeather.windDirection.east': [68, 112] },
                { 'MesureDataWeather.windDirection.southEast': [113, 157] },
                { 'MesureDataWeather.windDirection.south': [158, 202] },
                { 'MesureDataWeather.windDirection.southWest': [203, 247] },
                { 'MesureDataWeather.windDirection.west': [248, 292] },
                { 'MesureDataWeather.windDirection.northWest': [293, 336] },
                { 'MesureDataWeather.windDirection.north': [337, 360] },
            ]
        },
        '2/z/pAM/360/Am00': {
            typeData: 0,
            keyObject: 'atmosphericPressure',
            valueConvert: []
        },
        '2/9/Alr01/360/A000': {
            typeData: 1,
            keyObject: 'winterConditionsWarning',
            valueConvert: [
                'MesureDataWeather.winterConditionsWarning.off',
                'MesureDataWeather.winterConditionsWarning.on'
            ]
        },
        '2/9/Alr02/360/A000': {
            typeData: 1,
            keyObject: 'winterPrecipitationsWarning',
            valueConvert: [
                'MesureDataWeather.winterPrecipitationsWarning.off',
                'MesureDataWeather.winterPrecipitationsWarning.on'
            ]
        }
    };
    public static MapMesureWeather = {
        valueTechnicalNormal: 0,
        IdAlertWind: '2/z/sAR/360/Xm00',
        IdAlertWeather: '2/1/kSR/360/Cm00',
        valueTechnicalError: 1
    };
    public static MESURE_WEATHER_TECHNICAL = {
        '2/~/COM/360/0000': {
            typeData: 4,
            keyObject: 'communication',
            valueConvert: [
                'MesureDataWeather.communication.off',
                'MesureDataWeather.communication.on'
            ]
        },
        '2/~/GAT/360/0000': {
            typeData: 4,
            keyObject: 'gateOpen',
            valueConvert: [
                'MesureDataWeather.gateOpen.off',
                'MesureDataWeather.gateOpen.on'
            ]
        },
        '2/~/EDF/360/0000': {
            typeData: 4,
            keyObject: 'powerDefault',
            valueConvert: [
                'MesureDataWeather.powerDefault.off',
                'MesureDataWeather.powerDefault.on'
            ]
        },
    };

    public static MapMesureTraffic = {
        communication: {
            error: 'MesureDataTraffic.communication.error',
            normal: 'MesureDataTraffic.communication.normal'
        },
        communicationNormal: 0,
        colorCommunicationError: '#677484',
        colorCommunicationNormal: '#38AB58',
        communicationError: 1

    };

}





