export class ALERT {
    id?: number;
    alertCode?: string;
    content?: string;
    condition?: number;
    value?: number;
    level?: number;
    color?: string;

    constructor(id: number, alertCode: string, content: string, condition: number, value: number, level: number, color: string) {
        this.id = id;
        this.alertCode = alertCode;
        this.content = content;
        this.condition = condition;
        this.value = value;
        this.level = level;
        this.color = color;
    }
}
