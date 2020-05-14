
export interface Mesure {
    Eqt_Dt_Mes: string;
    Eqt_Mes_Per: string;
    Eqt_Mes_Lg_Id: string;
    Eqt_Mes_Id: string;
    Eqt_Mes_Lg_Type: string;
    Eqt_Mes_Nb_Val: string;
    Eqt_Mes_Val_1: string;
    Eqt_Mes_Klif_1: string;
    NUM: string;
    alertBase: {
        color: string;
        description: string;
        alertCode?: string;
        level?: number;
    };
}
export interface Centrale {
    Eqt_Nb_Mesure: string;
    externalId: string;
    MESURE: Mesure[];
    deviceType?: string;
}
export interface DeviceAlertBase {
    CORPS: {
        Rep_Nb_Eqt: string;
        CENTRALE: Centrale[];
        receivedDate: string;
        deployment_id?: number;
    };
}
