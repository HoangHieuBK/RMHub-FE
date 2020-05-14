

export interface DeviceTechnical {
    ID_EXT: string;
    Eqt_Conf_Version: number;
    Etat_Date: string;
    Etat_Sys: number;
    Etat_Alim: number;
    Etat_Com: number;
}
export interface ObjectTechnical {
    TechnicalStatus: {
        Nb_Et: number;
        ET: DeviceTechnical[];
        receivedDate: string;
    };

}
