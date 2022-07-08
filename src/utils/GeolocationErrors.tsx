import { alertWarning } from "./AlertTypes";

export default function showGelocationError(error: any) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alertWarning(
        "Utilizatorul a respins solicitarea de geolocalizare, va rugam sa o activati si dupa sa reactualizati pagina."
      );
      break;
    case error.POSITION_UNAVAILABLE:
      alertWarning("Informațiile despre locație nu sunt disponibile.");
      break;
    case error.TIMEOUT:
      alertWarning("Solicitarea de a obține locația utilizatorului a expirat.");
      break;
    case error.UNKNOWN_ERROR:
      alertWarning("O eroare necuonscuta a aparut la cerea locatiei.");
      break;
  }
}
