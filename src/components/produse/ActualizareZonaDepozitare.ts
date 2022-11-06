import Swal from "sweetalert2";
import { actualizareZonaDepozitare } from "../../api/produseApi";
import { IProdus } from "./ProduseController";

export interface IZonaDepozitare {
  CodProdus: string;
  ZonaDepozitare: string;
}

export async function actualizeazaZonaDeDepozitarePopUp(
  token: string,
  { codProdus, denumireProdus, zonaDepozitare }: IProdus
): Promise<{ zonaNouaConfirmata: string; confirmat: boolean }> {
  return await Swal.fire({
    title: `Zona depozitare ${denumireProdus}`,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Actualizeaza",
    showLoaderOnConfirm: true,
    inputPlaceholder: zonaDepozitare,
    preConfirm: async (zonaNouaDepozitare: string) => {
      if (zonaNouaDepozitare.trim() === "") {
        Swal.showValidationMessage(
          "Va rugam sa completati campul cu macar un caracter."
        );
        return "";
      }

      try {
        const { rezultat } = await actualizareZonaDepozitare(token, {
          CodProdus: codProdus,
          ZonaDepozitare: zonaNouaDepozitare,
        });
        if (rezultat !== 0) throw new Error(rezultat.toString());
      } catch (error) {
        Swal.showValidationMessage(
          `Zona de depozitare a produsului nu a putut fi actualizata, eroare: ${error}`
        );
      }
      return zonaNouaDepozitare;
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    return {
      zonaNouaConfirmata: result.value ?? "",
      confirmat: result.isConfirmed && (result.value ?? "") !== "",
    };
  });
}
