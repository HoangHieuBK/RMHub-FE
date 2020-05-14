import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';

// function sortObject
export function compare(value_one, value_two) {
    if (value_one === value_two) {
        return 0;
    }
    return (value_one > value_two) ? 1 : -1;
}


// function sortObject
export function sortObject(obj, field, choice) {
    if (!isNullOrUndefined(obj) && obj.length !== 0) {
        let __choice = true;
        if (typeof obj !== 'object') { return; }
        const _keys = Object.keys(obj[0]);
        if (_keys.indexOf(field) < 0) { return obj; }
        if (typeof choice === 'boolean') { __choice = choice; }
        if (__choice) {
            return obj.sort((_obj1, _obj2) => compare(_obj1[field], _obj2[field]));
        }
        return obj.sort((_obj1, _obj2) => -compare(_obj1[field], _obj2[field]));
    }
    return [];
}

export function setStatus(status: number) {
    if (!isNullOrUndefined(status) && 0 <= status && status <= CommonConstant.STATUS_DEVICE.length - 1) {
        return CommonConstant.STATUS_DEVICE[status];
    }
    return CommonConstant.NA;
}

export function transformStatusList(arr: any[]) {
    arr.forEach(item => {
        item.status = setStatus(item.status);
    });
}
export function transformStatus(object: any) {
    object.status = setStatus(object.status);
}

// function get random am element of array
export function getRandomArrayElement(arr) {
    const max = arr.length;
    const randIndex = Math.floor(Math.random() * max);
    return arr[randIndex];
}

// function set N/A value if value of any key obj is null or undefined
export function setDefaultNAValue(obj: any) {
    Object.keys(obj).forEach((key) => {
        if (isNullOrUndefined(obj[key])) {
            if (key === 'id') {
                obj[key] = null;
            } else {
                obj[key] = CommonConstant.NA;
            }
        }
    });
    return obj;
}

export function setStyleScroll(numCustom: number, heightOfDiv: number) {
    const innerHeight = window.innerHeight - numCustom;
    const obj = { 'height': innerHeight + 'px' };
    if (heightOfDiv >= innerHeight) {
        return Object.assign(obj, CommonConstant.Style_Scroll.style);
    }
    return null;
}
export function mergeTwoArrayObject(firstArray: Array<any>, secondArray: Array<any>, key: any): Array<any> {
    let outputArray = firstArray;
    if (secondArray.length > 0) {
        for (const item of secondArray) {
            outputArray = addItemArrayObject(outputArray, item, key);
        }
    }
    return outputArray;
}
export function addItemArrayObject(arrayTarget: any[], item: any, key: any): any[] {
    const index = arrayTarget.findIndex(element => {
        return element[key] && item[key] && element[key] === item[key];
    });
    if (index > -1) {
        const itemMerge = Object.assign({}, arrayTarget[index], item);
        arrayTarget[index] = itemMerge;
    } else {
        arrayTarget.push(item);
    }
    return arrayTarget;
}

export function checkResponseOk(res) {
    return !isNullOrUndefined(res.status) && !isNullOrUndefined(res.status.code) && res.status.code === CommonConstant.STATUS_RES.Success;
}
