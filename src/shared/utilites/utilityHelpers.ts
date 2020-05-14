import { ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

import * as currencyHelper from './currencyHelper';

const typeCache: { [label: string]: boolean } = {};

type Predicate = (oldValues: Array<any>, newValues: Array<any>) => boolean;

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels are unique.
 *
 * @param label
 */
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unqiue"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}

/**
 * Runs through every condition, compares new and old values and returns true/false depends on condition state.
 * This is used to distinct if two observable values have changed.
 *
 * @param oldValues
 * @param newValues
 * @param conditions
 */
export function distinctChanges(oldValues: Array<any>, newValues: Array<any>, conditions: Predicate[]): boolean {
    if (conditions.every(cond => cond(oldValues, newValues))) { return false; }
    return true;
}

/**
 * Returns true if the given value is type of Object
 *
 * @param val
 */
export function isObject(val: any) {
    if (val === null) { return false; }

    return ((typeof val === 'function') || (typeof val === 'object'));
}

/**
 * Capitalizes the first character in given string
 *
 * @param s
 */
export function capitalize(s: string) {
    if (!s || typeof s !== 'string') { return s; }
    return s && s[0].toUpperCase() + s.slice(1);
}

/**
 * Uncapitalizes the first character in given string
 *
 * @param s
 */
export function uncapitalize(s: string) {
    if (!s || typeof s !== 'string') { return s; }
    return s && s[0].toLowerCase() + s.slice(1);
}

/**
 * Flattens multi dimensional object into one level deep
 *
 * @param obj
 * @param preservePath
 */
export function flattenObject(ob: any, preservePath: boolean = false): any {
    const toReturn = {};

    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) { continue; }

        if ((typeof ob[i]) === 'object') {
            const flatObject = flattenObject(ob[i], preservePath);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) { continue; }

                const path = preservePath ? (i + '.' + x) : x;

                toReturn[path] = flatObject[x];
            }
        } else { toReturn[i] = ob[i]; }
    }

    return toReturn;
}

/**
 * Returns formated date based on given culture
 *
 * @param dateString
 * @param culture
 */
export function localeDateString(dateString: string, culture: string = 'en-EN'): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(culture);
}

/**
 *
 * @param array is array
 * @param item is object
 * @param prop
 */
export function mergeArrayObject(array, item, prop) {
    const reduced = array.find(a => a[prop] === item[prop]);
    if (reduced) { return array; } else {
        return array.concat([item]);
    }
}

/**
 *
 * Splice Object
 * @param array
 * @param item
 * @param prop
 */
export function spliceObjectArray(array, item, prop) {
    // get index of object with id

    // const removeIndex = array.map(function (e) { return item[prop]; }).indexOf(item[prop]);
    // if (removeIndex !== -1) { array.splice(removeIndex, 1); }
    // return array;

    // fix delete item in array
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

/**
 *
 * @param a
 * @param b
 */
export function sortArrayObject(a, b) {
    return function compare(T1, T2) {
        if (T1.id < T2.id) {
            return -1;
        }
        if (T1.id > T2.id) {
            return 1;
        }
        return 0;
    };
}

export namespace browserFunction {
    /**
     *
     * @param event
     */
    export function getToggleSelector(event: any): any {
        let elToggleNav: ElementRef;
        const path = event.path;
        if (path !== undefined) {
            // for chorme
            const elheader = path.find(item => item.className === 'header-container');
            elToggleNav = elheader.children.item(2);
        } else {
            // fix for firefox
            elToggleNav = event.target.offsetParent.children.item(0).children.item(2);
        }
        return elToggleNav;
    }
}

/**
 *
 * @param jsonString string JSON parse
 */
export function tryParseJSON(jsonString) {
    // tslint:disable-next-line:curly
    if (!jsonString) return false;
    try {
        const ob = JSON.parse(jsonString);
        if (ob && typeof ob === 'object') {
            return ob;
        }
    } catch (e) { }
    return false;
}

export const Dialog = {
    // confirm: (title?: string, message?: string) => {
    //     return custom(<any>{
    //         title: title || 'confirm',
    //         showTitle: title ? true : false,
    //         message: message || '',
    //         buttons: [
    //             {
    //                 text: 'Yes', onClick: () => {
    //                     return true;
    //                 },
    //                 focusStateEnabled: false
    //             },
    //             {
    //                 text: 'No', onClick: () => {
    //                     return false;
    //                 },
    //                 onInitialized: (e) => { setTimeout(() => { e.component.focus(); }, 200); }
    //             }
    //         ]
    //     }).show();
    // },
    // alert: (messages, title?: string) => {
    //     let message = '';
    //     if (typeof (messages) === 'string') { message = messages; } else if (Array.isArray(messages)) { message = messages.join('<br/>'); }
    //     return custom(<any>{
    //         title: title,
    //         showTitle: title ? true : false,
    //         message: message,
    //         buttons: [{
    //             text: 'Ok', onClick: () => {
    //                 return true;
    //             }
    //         }]
    //     }).show();
    // }
};

export function tryParseJwt(token?: any) {
    if (!token) { return null; }
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } catch (e) { }
    return null;
}

export function tryMapPathApi(pathApi?: any, urlPath?: string): string {
    if (!pathApi) { return ''; }
    try {
        const url = urlPath || '';
        let result = `${url}?`;
        for (const property in pathApi) {
            if (pathApi.hasOwnProperty(property)) {
                result += `${property}=${(<any>pathApi)[property]}&`;
            }
        }
        result = result.replace(/[?&]$/, '');
        return result;
    } catch (e) { }
    return '';
}

export function tryMapPathApiEncoded(pathApi?: any, urlPath?: string): string {
    if (!pathApi) { return ''; }
    try {
        const url = urlPath || '';
        let result = `${url}?`;
        for (const property in pathApi) {
            if (pathApi.hasOwnProperty(property)) {
                if (!isNullOrUndefined((<any>pathApi)[property])) {
                    result += `${property}=${encodeURIComponent((<any>pathApi)[property])}&`;
                }
            }
        }
        result = result.replace(/[?&]$/, '');
        return result;
    } catch (e) { }
    return '';
}

export function sanitizeObject(object: any) {
    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            if (object[property] === null) {
                delete object[property];
            }
        }
    }
}

export function clearCache(): void {
    localStorage.clear();
}

export function moveItemToTopArr(arr: any, item: any): void {
    // find the current index of item:
    const index = arr.map(function (x) { return x.id; }).indexOf(item.id);
    if (index > -1) {
        // the identified index, and affecting 1 element(s):
        arr.splice(index, 1);
        // pushing the item string back in the array:
        // arr.unshift(item);
        arr.push(item);
    }
    return arr;
}

export function parseMenuItems(menuItems) {

    function parseItems(array, loop) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            // remove special symbol
            element['caption'] = element.name.toString().replace(/[^a-zA-Z- ]/g, '');
            // lowercase
            element['caption'] = element['caption'].toLowerCase();
            // replace space
            element['caption'] = element['caption'].split(' ').join('-');
            if (element.items.length > 0) {
                loop(element.items, loop);
            }
        }
    }
    parseItems(menuItems, parseItems);
    return menuItems;
}

// Function get all Xuser.
export function getXuserSessionStorage() {
    const XuserSessionStorage = JSON.parse(sessionStorage.getItem('user:Xuser'));
    return XuserSessionStorage;
}
// Function get all User Right.
export function getUserRightSessionStorage() {
    const userRightSessionStorage = JSON.parse(sessionStorage.getItem('user:right'));
    return userRightSessionStorage;
}

// Check Role of User login.
export function getRoleSessionStorage(userRight: string) {
    let UserRole = {
        IsRead: false,
        IsIsn: false,
        IsUpd: false,
        IsDel: false,
    };
    const XuserSessionStorage = JSON.parse(sessionStorage.getItem('user:Xuser'));
    if (XuserSessionStorage) {
        if (XuserSessionStorage[0].isUserAdmin) {
            UserRole = {
                IsRead: true,
                IsIsn: true,
                IsUpd: true,
                IsDel: true,
            };
        } else {
            const userRightSessionStorage = JSON.parse(sessionStorage.getItem('user:right'));
            const userRole = userRightSessionStorage.filter(item => item.rightName === userRight);
            if (userRole.length) {
                UserRole = {
                    IsRead: true,
                    IsIsn: userRole[0].ins,
                    IsUpd: userRole[0].upd,
                    IsDel: userRole[0].del,
                };
            }
        }
        return UserRole;
    }
}

// Function get UserId from local storage
export function getUserIdFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageUserId);
}

// Function get UserFirstName from local storage
export function getUserFirstNameFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageUserFirstName);
}

// Function get UserLastName from local storage
export function getUserLastNameFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageUserLastName);
}

// Function get ToogleNavbar from local storage
export function getToogleNavbarFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageToogleNavbar);
}

// Function get User from local storage
export function getUserFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageUser);
}

// Function get current language
export function getLanguageCodeFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LocalStorageCurrentLang) ? localStorage.getItem(CommonConstant.LocalStorageCurrentLang) : CommonConstant.LocalStorageDefaultLang;
}

// Function get current language
export function getLanguageCodeNumberFromLocalStorage() {
    return localStorage.getItem(CommonConstant.LanguageCode) ? localStorage.getItem(CommonConstant.LanguageCode) : CommonConstant.DefaltLanguageCode;
}

// Function copy
export function copyElement(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}

// Function get Array exclude index
export function removeElementsByIndexes(arr: Array<any>, indexes: Array<any>) {
    return arr.filter((element, index) => {
        return !indexes.includes(index);
    });
}

/**
 * Returns list with condition
 *
 * @param array: Array of list button
 * @param condition: Condition of Array
 */
export function getConditionListBtn(array, condition) {
    const result = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        for (let index2 = 0; index2 < condition.length; index2++) {
            const element2 = condition[index2];
            if (element2 === element.name) {
                break;
            }
            if (index2 + 1 === condition.length) {
                result.push(element);
            }
        }
    }
    return [...result];
}

// Function get request header
export function getRequestHeaderFromLocalStorage() {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem('user:token'),
        'Accept-Language': (localStorage.getItem('currentLang.Culture') || CommonConstant.LocalStorageDefaultLang).slice(0, 2)
    };
}

// Function get upload url
export function getUploadUrl(apiPath: string) {
    return AppConsts.api.baseUrl + apiPath;
}

export function parseInitialData(data, condition, typeConvert = true) {
    for (let index = 0; index < condition.length; index++) {
        const element = condition[index];
        data[element.name] = this.onFormatNumber(data[element.name], element.format, typeConvert);
    }
    return data;
}

// Format number #'###.00
export function onFormatNumber(number, format, typeConvert = true) {
    // typeConvert = false : deFormatNumber
    if (!typeConvert) {
        if (!isNullOrUndefined(number)) {
            return number.toString().charAt(0) !== '-' ? number.toString().replace(/[^0-9.]/g, '') : `-${number.toString().replace(/[^0-9.]/g, '')}`;
        }
    } else {
        let result: any;
        result = number || '0.00';
        result = result.toString().indexOf('.') === 0 ? '0' + result : result;
        if (format && result.toString().indexOf('.') > 0) {
            const index = result.indexOf('.') - 1;
            const unchangeStr = result.toString().substring(0, index);
            const tmpStr = result.toString().substring(index, result.length);
            const decima = Math.pow(10, format.precision);
            result = unchangeStr + parseFloat((Math.round(parseFloat(tmpStr.toString()) * decima) / decima).toString()).toFixed(format.precision).toString();
        }
        if (result.length > 3) {
            result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\'');
        }
        return result;
    }
}

// Check Role of User login by Local Storage
export function getRoleLocalStorage(userRight: string) {
    let UserRole = {
        IsRead: false,
        IsIsn: false,
        IsUpd: false,
        IsDel: false,
    };
    const XuserLocalStorage = JSON.parse(localStorage.getItem('user:Xuser'));
    if (XuserLocalStorage) {
        if (XuserLocalStorage[0].isUserAdmin) {
            UserRole = {
                IsRead: true,
                IsIsn: true,
                IsUpd: true,
                IsDel: true,
            };
        } else {
            const userRightLocalStorage = JSON.parse(localStorage.getItem('user:right'));
            const userRole = userRightLocalStorage.filter(item => item.rightName === userRight);
            if (userRole.length) {
                UserRole = {
                    IsRead: true,
                    IsIsn: userRole[0].ins,
                    IsUpd: userRole[0].upd,
                    IsDel: userRole[0].del,
                };
            }
        }
        return UserRole;
    }
}

// Call back to customize export excel template
export function CustomizeExcelCell(cellData) {
    if (cellData.gridCell.rowType === 'header') {
        cellData.backgroundColor = AppEnums.TemplateExcel.HeaderBackgroundColor;
        cellData.font.bold = false;
        cellData.horizontalAlignment = 'left';
    }
    if (cellData.gridCell.rowType === 'data') {
        if (cellData.gridCell.column.dataType === 'number') {
            cellData.numberFormat = CommonConstant.FormatNumberExport;
        }
    }
    if (cellData.gridCell.rowType === 'totalFooter') {
        cellData.backgroundColor = AppEnums.TemplateExcel.TotalSummariesBackgroundColor;
        if (!isNullOrUndefined(cellData.value) && cellData.gridCell.column.dataType === 'number') {
            cellData.horizontalAlignment = 'right';
            cellData.font.bold = false;
            const minus = cellData.value[0] === '-' ? '-' : '';
            cellData.value = minus + currencyHelper.parse(cellData.value);
            if (!cellData.value.includes('.')) {
                cellData.value += '.00';
            }
        }
    }
}

export function customizeExcelCellOriginal(cellData) {
    if (cellData.gridCell.rowType === 'header') {
        cellData.backgroundColor = AppEnums.TemplateExcel.HeaderBackgroundColor;
        cellData.font.bold = false;
        cellData.horizontalAlignment = 'left';
    }
}

export function customizeExportData(columns, rows) {
    const booleanCols = [];
    const dateCols = [];
    const numberCols = [];
    columns.forEach((item, index) => {
        if (index >= 0) {
            if (item.dataType === 'boolean') {
                booleanCols.push(index);
            } else if (item.dataType === 'date') {
                dateCols.push(index);
            } else if (item.dataType === 'number') {
                numberCols.push(index);
            }
        }
    });
    rows.forEach(row => {
        const rowValues = row.values;
        booleanCols.forEach(systemCol => {
            rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
        });
        dateCols.forEach(systemCol => {
            if (rowValues[systemCol]) {
                rowValues[systemCol] = moment(rowValues[systemCol]).format(CommonConstant.FORMAT_DATE_EXPORT);
            }
        });
    });
}

export function customizeExportDataSummeries(columns, rows) {
    const booleanCols = [];
    const dateCols = [];
    columns.forEach((item, index) => {
        if (index >= 0) {
            if (item.dataType === 'boolean') {
                booleanCols.push(index);
            } else if (item.dataType === 'date') {
                dateCols.push(index);
            }
        }
    });
    rows.forEach(row => {
        const rowValues = row.values;
        booleanCols.forEach(systemCol => {
            rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
        });
        dateCols.forEach(systemCol => {
            if (rowValues[systemCol]) {
                rowValues[systemCol] = moment(rowValues[systemCol]).format(CommonConstant.FORMAT_DATE_EXPORT);
            }
        });
        if (row.rowType === 'totalFooter') {
            row.values.forEach(element => {
                if (element && element.valueFormat) {
                    element.valueFormat = CommonConstant.FormatNumberN2;
                }
            });
        }
    });
    if (rows.length === 0 || (rows.length === 1 && rows[0].rowType && rows[0].rowType === 'totalFooter')) {
        rows.unshift([]);
    }
}
/**
 *
 * @param array is origin array
 * @param item is object need to be merged
 * @param prop
 */
export function mergeOrUpdateObjectIntoArray(array, item, prop) {
    const matchedEle = array.find(ele => ele[prop] === item[prop]);
    if (matchedEle) {
        array[array.indexOf(matchedEle)] = item;
        return array;
    }
    return array.concat([item]);
}
// function check width resposive
export function getSizeQualifier(width: number) {
    if (width < 1300) {
        return 'xs';
    }
    return 'lg';
}

export function menuGrouping(event, grid, arrayTextDisplayMenuOfHeaderGrid = CommonConstant.MenuGroupingHeaderGrid, arrayTextDisplayMenuOfContentGrid = CommonConstant.MenuGroupingContentGrid) {
    if (isNullOrUndefined(event.items)) {
        event.items = [];
    }
    const dataColumnNumber = countDataColumn(grid.instance.getVisibleColumns().filter((column: any) => !column.command));
    if (event.target === 'header' && event.row && event.row.rowType === 'header') {
        if (dataColumnNumber === 1) {
            event.items.filter(item => item.value === 'group').map(item => item.disabled = true);
        }
        event.items.push({
            disabled: dataColumnNumber === 1,
            onItemClick: () => hideColumn(event, grid),
            text: arrayTextDisplayMenuOfHeaderGrid[2]
        });
    } else if (event.target === 'content' && event.row && event.row.rowType === 'group') {
        event.items.push({
            disabled: false,
            onItemClick: () => grid.instance.expandAll(),
            text: arrayTextDisplayMenuOfContentGrid[2]
        });
        event.items.push({
            disabled: false,
            onItemClick: () => grid.instance.collapseAll(),
            text: arrayTextDisplayMenuOfContentGrid[3]
        });
    }
}

function hideColumn(e, grid) {
    let columnAmount = 0;
    grid.instance.getVisibleColumns().forEach((column) => {
        if (column.allowHiding) {
            columnAmount++;
        }
    });
    if (columnAmount !== 1) {
        grid.instance.columnOption(e.column.caption, 'visible', false);
    }
}

function groupingHeaderRightClick(e, grid) {
    let columnAmount = 0;
    grid.instance.getVisibleColumns().forEach((column) => {
        if (column.allowHiding) {
            columnAmount++;
        }
    });
    if (columnAmount !== 1) {
        const indexGroup = grid.instance.getVisibleColumns().map(indexColumnGroup => indexColumnGroup.groupIndex).filter(item => item !== undefined).length;
        grid.instance.columnOption(e, 'groupIndex', indexGroup);
    }
}

export function outFocus() {
    const el = document.querySelector(':focus');
    if (el) {
        (el as HTMLElement).blur();
    }
}

function countDataColumn(columns): number {
    return columns && columns.length;
}

//#region checks the input element was selected all.
function getElementById(event: any) {
    return event && event.element && event.element && document.getElementById(event.element.id);
}

function getInputElement(ele: any) {
    return ele && ele.getElementsByClassName('dx-texteditor-input')[0];
}

function isSelectionEqual(ctrl: any) {
    return ctrl && (ctrl.selectionEnd - ctrl.selectionStart) === ctrl.value.length;
}

/**
 * Checks if the input element was selected all. This method was called on key event.
 * Element must declare a id in template - html file
 * @param event is key input event as keydown, keyup, keypress
 */
export function isSelectedAllWithID(event: any) {
    return isSelectionEqual(getInputElement(getElementById(event)));
}

function getElementFromEvent(event: any) {
    return event && event.event && event.event.srcElement;
}

/**
 * Checks if the input element was selected all. This method was called on key event.
 * @param event is key input event as keydown, keyup, keypress
 */
export function isSelectedAll(event: any) {
    return isSelectionEqual(getElementFromEvent(event));
}

function isClearKeyPressed(event) {
    return event.event.keyCode === AppEnums.KeyCode.Delete ||
        event.event.keyCode === AppEnums.KeyCode.BackSpace;
}

/**
 * Checks if user press delete or backspace or space after the input element was selected all.
 * This method was called on key event.
 * @param event is key input event as keydown, keyup, keypress
 */
export function isClearNumberBox(event: any) {
    return isClearKeyPressed(event) && isSelectionEqual(getElementFromEvent(event));
}
//#endregion

//#region fix click on focused row then tab or arrow key
export function unRegisterFocusedRowEvent(listener: Element) {
    return listener && listener.removeEventListener('keydown', onFocusedRowKeyDown);
}

export function registerFocusedRowEvent(id: string): Element {
    const ele = document.getElementById(id);
    const ctrl = ele && ele.getElementsByClassName('dx-row-focused');
    const listener = ctrl && ctrl[0];
    if (listener) {
        listener.addEventListener('keydown', onFocusedRowKeyDown);
    }
    return listener;
}

function onFocusedRowKeyDown(event) {
    if (event.keyCode === AppEnums.KeyCode.Tab) {
        event.stopPropagation();
    }
}
//#endregion

export function formatNumberByCulture(data) {
    return new Intl.NumberFormat(getLanguageCodeFromLocalStorage(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data);
}
