//@ts-nocheck

import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from 'html5-qrcode'

interface Props {
  handleScannedBarcode: (string) => void
}

function BarcodeComponent({ handleScannedBarcode }: Props) {
  const qrReaderRef = useRef();

  function onScanSuccess(decodedText: string, decodedResult: string) {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    handleScannedBarcode(decodedText)
  }

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrReaderRef.current.id, { fps: 10, qrbox: 250 }
    );
    html5QrcodeScanner.render(onScanSuccess);
  }, [])

  return (
    <div className="col-12 d-flex justify-content-center">
      <div id="qr-reader" style={{ width: 400}} ref={qrReaderRef}></div>
    </div>
  )
}

export default BarcodeComponent;
