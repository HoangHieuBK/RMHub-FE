import {
    Injectable
} from '@angular/core';
import {
    FormControl,
    FormGroup
} from '@angular/forms';
import { CommonConstant } from '@shared/common/constant.common';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class ValidationService {

    constructor(private translate: TranslateService) { }

    /**
     * Validates email address
     *
     * @param formControl
     */
    public validateEmail(formControl: FormControl): { [error: string]: any } {
        const REGEXP1 = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)';
        const REGEXP2 = '(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])';
        const REGEXP3 = '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
        const EMAIL_REGEXP = new RegExp(`${REGEXP1}|${REGEXP2}|${REGEXP3}`);
        return EMAIL_REGEXP.test(formControl.value) ? null : { validateEmail: { valid: false } };
    }

    /**
     * Validates required numeric values
     *
     * @param formControl
     */
    public numericRequired(formControl: FormControl): { [error: string]: any } {
        return (formControl.value && formControl.value > 0) ? null : { numericRequired: { valid: false } };
    }

    /**
     * Validates matching string values
     *
     * @param controlKey
     * @param matchingControlKey
     */
    public matchingPasswords(controlKey: string, matchingControlKey: string): { [error: string]: any } {
        return (group: FormGroup): { [key: string]: any } => {
            if (group.controls[controlKey].value !== group.controls[matchingControlKey].value) {
                return { mismatch: { valid: false } };
            }
        };
    }

    public checkCommonValidator(frm: FormGroup, field: string) {
        for (let i = 0; i < CommonConstant.Validators_Type.length; ++i) {
            if (this.getValidatorValue(frm, field, CommonConstant.Validators_Type[i])) {
                return this.getValidatorValue(frm, field, CommonConstant.Validators_Type[i]);
            }
        }
    }

    public getValidatorValue(frm: FormGroup, field: string, typeErr: string) {
        const check = frm.get(field).hasError(typeErr);
        if (check) {
            switch (typeErr) {
                case CommonConstant.Validators_Type[0]: return 'Common_Validator.required';
                case CommonConstant.Validators_Type[1]: return 'Common_Validator.pattern';
                case CommonConstant.Validators_Type[2]: return 'Common_Validator.maxLength';
                case CommonConstant.Validators_Type[3]: return 'Common_Validator.min_max';
                case CommonConstant.Validators_Type[4]: return 'Common_Validator.min_max';
            }
        }
        return '';
    }
}
