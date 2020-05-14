import { CommonConstant } from '@shared/common/constant.common';

export interface NavAttributes {
    name?: string;
    icon?: string;
    url?: string;
    extraContent?: string;
    class?: string;
    icon_img?: string;
}

export interface LeftSideBars {
    title?: string;
    icons?: string;
    url?: string;
    icon_img?: string;
    children?: NavAttributes[];
    classHeader?: string;
    type?: string;
}

export const NavItems: LeftSideBars[] = [
    {
        title: 'Menu.left_menu.map_view',
        url: CommonConstant.URL_PROJECT.map,
        icons: 'icon-home',
        classHeader: 'start',
        icon_img: '/assets/icon/ic_map_disable.png',
        children: [
        ],
        type: CommonConstant.TITLE_TAP_MAP.map.type
    },
    {
        title: 'Menu.left_menu.traffic_logger.title_parent',
        icons: 'icon-present',
        url: '',
        icon_img: '/assets/icon/ic_traffic_disable.png',
        children: [
            { name: 'Menu.left_menu.traffic_logger.TL_List', icon: 'fa fa-circle', url: CommonConstant.URL_TRAFFIC_LOGGER.list },
            { name: 'Menu.left_menu.traffic_logger.TL_Alert', icon: 'fa fa-circle', url: CommonConstant.URL_TRAFFIC_LOGGER.alert },
        ],
        type: CommonConstant.TITLE_TAP_MAP.traffic.type
    },
    {
        title: 'Menu.left_menu.weather_station.title_parent',
        icons: 'icon-docs',
        url: '',
        icon_img: '/assets/icon/ic_weather_disable.png',
        children: [
            { name: 'Menu.left_menu.weather_station.WS_List', icon: 'fa fa-circle', url: CommonConstant.URL_WEATHER_STATION.list },
            { name: 'Menu.left_menu.weather_station.WS_Alert', icon: 'fa fa-circle', url: CommonConstant.URL_WEATHER_STATION.alert },
        ],
        type: CommonConstant.TITLE_TAP_MAP.weather.type
    },
];

