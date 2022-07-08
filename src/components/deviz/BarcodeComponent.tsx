import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useEffect } from "react";

interface Props {
  cameraId: string;
  BarCodeOnUpdate: any;
  scanat: boolean;
}

function BarcodeComponent({ cameraId, BarCodeOnUpdate, scanat }: Props) {
  if (!scanat)
    return (
      <BarcodeScannerComponent
        width="100%"
        height={300}
        facingMode="environment"
        stopStream={scanat}
        videoConstraints={{
          deviceId: cameraId,
        }}
        onUpdate={BarCodeOnUpdate}
      />
    );
  else return <></>;
}

export default BarcodeComponent;
