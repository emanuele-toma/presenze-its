interface Canale {
  id: number;
  descrizione: string;
}

interface DettaglioStatoFirmaLomView {
  messaggi: any[];
  abilitaInvio: boolean;
  idInvioPresenzaFirmaLom: null;
  canale: Canale;
}

interface TipoErog {
  id: number;
  descrizione: string;
}

interface TipoStatoInvio {
  id: number;
  descrizione: string;
}

interface Sede {
  id: number;
  descrizione: string;
}

interface Ente {
  id: number;
  descrizione: string;
}

interface RootObject {
  idStudente: number;
  codiceFiscale: null;
  nome: string;
  cognome: string;
  orePresenza: number;
  minutiPresenza: number;
  oreAssenza: number;
  minutiAssenza: number;
  oreAssenzaGiustificata: number;
  minutiAssenzaGiustificata: number;
  tipoEobStatoInvioPresenza: null;
  id: number;
  studenteEsenteFirmaLom: boolean;
  hasStudenteFirmaLom: boolean;
  dettaglioStatoFirmaLomView: DettaglioStatoFirmaLomView;
  abilitaModifica: boolean;
  flFirmaLomEsenzione: boolean;
  descrizioneEdizione: null;
  idFcCorso: null;
  tipoErog: TipoErog;
  dtLezione: number;
  tipoStatoInvio: TipoStatoInvio;
  termineCompilazionePresenze: number;
  disabilitaConvalida: boolean;
  sede: Sede;
  ente: Ente;
  idEdizione: null;
  idLezione: number;
  orePresenzaFormato: string;
  oreAssenzaFormato: string;
  oreAssenzaGiustificataFormato: string;
  oraInizio: number;
  oraFine: number;
  idItsSezione: number;
  idItsCorso: number;
  flModificaDaInviare: string;
  fadSperimentale: boolean;
  flFadPresenzaInviataApp: string;
  tipoEobStatoRispostaAppello: null;
  messaggiAppello: any[];
  noteReport: any[];
  tipoCanale: string;
  idIftsSezione: null;
  idIftsCorso: null;
  disabilitaInvioManuale: boolean;
  visualizzaPulsanteInvio: boolean;
  reported: boolean;
}
